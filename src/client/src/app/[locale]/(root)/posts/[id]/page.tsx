import PostDetailLayout from '@/components/pages/posts/posts-detail';
import postService from '@/services/post.service';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string; locale: string };
}

// Generate static params for popular posts (optional optimization)
export async function generateStaticParams() {
  try {
    // Fetch first 10 posts for static generation
    const posts = await postService.getAll({ 
      limit: 10, 
      page: 1,
      sortBy: 'createdAt',
      order: 'DESC'
    });
    
    return posts.data.map((post) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = await postService.getById(params.id);
    
    if (!post.data) {
      return {
        title: 'Post Not Found',
        description: 'The requested post could not be found.',
      };
    }

    const description = post.data.content.slice(0, 160).replace(/<[^>]*>/g, '') + '...';

    return {
      title: post.data.title,
      description,
      openGraph: {
        title: post.data.title,
        description,
        images: post.data.thumbnail ? [post.data.thumbnail] : undefined,
        type: 'article',
        authors: post.data.author?.name ? [post.data.author.name] : undefined,
        publishedTime: post.data.createdAt ? new Date(post.data.createdAt).toISOString() : undefined,
        modifiedTime: post.data.updatedAt ? new Date(post.data.updatedAt).toISOString() : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.data.title,
        description,
        images: post.data.thumbnail ? [post.data.thumbnail] : undefined,
      },
      keywords: post.data.tags?.map(tag => tag.name).join(', '),
      alternates: {
        canonical: `/posts/${params.id}`,
      },
    };
  } catch {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }
}

export default async function Page({ params }: PageProps) {
  try {
    // Fetch post data and comments in parallel on server-side
    const [postResponse, commentsResponse] = await Promise.all([
      postService.getById(params.id),
      postService.comments(params.id).catch(() => ({ data: [] })), // Handle comments error gracefully
    ]);

    if (!postResponse.data) {
      notFound();
    }

    return (
        <PostDetailLayout 
          initialPostData={postResponse.data}
          initialCommentsData={commentsResponse.data || []}
          postId={params.id}
        />
    );
  } catch (error) {
    console.error('Error fetching post data:', error);
    notFound();
  }
}
