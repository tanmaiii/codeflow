import CardCourse from '@/components/common/CardCourse/CardCourse';
import CardPost from '@/components/common/CardPost/CardPost';
import TextHeading from '@/components/ui/text';
import { PaginatedResponseAPIDto } from '@/interfaces/common';
import { ICourse } from '@/interfaces/course';
import { IPost } from '@/interfaces/post';
import courseService from '@/services/course.service';
import postService from '@/services/post.service';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface DataBatch {
  courses: ICourse[];
  posts: IPost[];
}

export default function LoadMore({
  params,
  tagId,
}: {
  params: {
    page: number;
    sort?: string;
    limit: number;
    dataTypes?: string[];
  };
  tagId: string;
}) {
  const { ref, inView } = useInView();
  const [currentPage, setCurrentPage] = useState(params.page);
  const [isLoading, setIsLoading] = useState(false);
  const [dataBatches, setDataBatches] = useState<DataBatch[]>([]);
  const [totalPages, setTotalPages] = useState({
    courses: 1,
    posts: 1,
  });
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const loadMoreData = useCallback(async () => {
    if (isLoading) return;

    const { dataTypes = ['course', 'post'] } = params;

    const hasCoursesToLoad = dataTypes.includes('course') && currentPage <= totalPages.courses;
    const hasPostsToLoad = dataTypes.includes('post') && currentPage <= totalPages.posts;

    if (!hasCoursesToLoad && !hasPostsToLoad) return;

    setIsLoading(true);

    try {
      const promises: (
        | Promise<PaginatedResponseAPIDto<ICourse[]>>
        | Promise<PaginatedResponseAPIDto<IPost[]>>
        | Promise<null>
      )[] = [];

      if (hasCoursesToLoad) {
        promises.push(
          courseService.getAllByTag(
            {
              ...params,
              page: currentPage,
              limit: params.limit,
            },
            tagId,
          ),
        );
      } else {
        promises.push(Promise.resolve(null));
      }

      if (hasPostsToLoad) {
        promises.push(
          postService.getAllByTag(
            {
              ...params,
              page: currentPage,
              limit: params.limit,
            },
            tagId,
          ),
        );
      } else {
        promises.push(Promise.resolve(null));
      }

      const [coursesRes, postsRes] = await Promise.allSettled(promises);

      const newBatch: DataBatch = {
        courses: [],
        posts: [],
      };

      if (
        coursesRes.status === 'fulfilled' &&
        coursesRes.value !== null &&
        dataTypes.includes('course')
      ) {
        const courseResponse = coursesRes.value as PaginatedResponseAPIDto<ICourse[]>;
        newBatch.courses = courseResponse.data;
        setTotalPages(prev => ({
          ...prev,
          courses: courseResponse.pagination.totalPages,
        }));
      }

      if (
        postsRes.status === 'fulfilled' &&
        postsRes.value !== null &&
        dataTypes.includes('post')
      ) {
        const postResponse = postsRes.value as PaginatedResponseAPIDto<IPost[]>;
        newBatch.posts = postResponse.data;
        setTotalPages(prev => ({
          ...prev,
          posts: postResponse.pagination.totalPages,
        }));
      }

      setDataBatches(prev => [...prev, newBatch]);
      setCurrentPage(prev => prev + 1);

      if (!initialLoadDone) {
        setInitialLoadDone(true);
      }
    } catch (error) {
      console.error('Error loading mixed data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, currentPage, totalPages.courses, totalPages.posts, params, initialLoadDone]);

  useEffect(() => {
    if (!initialLoadDone && !isLoading) {
      loadMoreData();
    }
  }, [initialLoadDone, isLoading, loadMoreData]);

  useEffect(() => {
    if (inView && initialLoadDone && !isLoading) {
      const delay = 200;
      const timeoutId = setTimeout(() => {
        loadMoreData();
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [inView, initialLoadDone, isLoading, loadMoreData]);

  useEffect(() => {
    setCurrentPage(params.page);
    setDataBatches([]);
    setInitialLoadDone(false);
    setTotalPages({
      courses: 1,
      posts: 1,
    });
  }, [tagId, params.dataTypes?.join(','), params.sort]);

  const hasMoreData = () => {
    const { dataTypes = ['course', 'post'] } = params;
    const hasCoursesToLoad = dataTypes.includes('course') && currentPage <= totalPages.courses;
    const hasPostsToLoad = dataTypes.includes('post') && currentPage <= totalPages.posts;
    return hasCoursesToLoad || hasPostsToLoad;
  };

  useEffect(() => {
    console.log(dataBatches);
  }, [dataBatches]);

  return (
    <>
      {dataBatches.map((batch, batchIndex) => (
        <div key={`batch-${batchIndex}`}>
          {/* Courses Section */}
          {batch.courses.length > 0 && params.dataTypes?.includes('course') && (
            <div className="flex flex-col py-2 gap-3 relative mb-6">
              <TextHeading>Course</TextHeading>
              <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4 py-2">
                {batch.courses.map((course, index) => (
                  <CardCourse key={`course-${batchIndex}-${course.id}-${index}`} course={course} />
                ))}
              </div>
            </div>
          )}

          {/* Posts Section */}
          {batch.posts.length > 0 && params.dataTypes?.includes('post') && (
            <div className="flex flex-col py-2 gap-3 relative mb-6">
              <TextHeading>Post</TextHeading>
              <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4 py-2">
                {batch.posts.map((post, index) => (
                  <CardPost key={`post-${batchIndex}-${post.id}-${index}`} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {hasMoreData() && (
        <div
          ref={ref}
          style={{
            flexBasis: '100%',
            flexGrow: 1,
            justifyContent: 'center',
            alignContent: 'center',
            display: 'flex',
            marginTop: '20px',
          }}
        >
          {inView && isLoading && (
            <button style={{ margin: '0 auto' }}>
              ...Loading {params.dataTypes?.join(', ') || 'Course, Post'} (Batch{' '}
              {dataBatches.length + 1})
            </button>
          )}
        </div>
      )}
    </>
  );
}
