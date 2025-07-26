import { HttpException } from '@/exceptions/HttpException';
import { GeminiService } from '@/services/gemini.service';
import { GitHubService } from '@/services/github.service';
import { ReposService } from '@/services/repos.service';
import { getStartLinePullRequest } from '@/utils/util';
import { NextFunction, Request, Response } from 'express';
import Container, { Service } from 'typedi';

@Service()
export class ReviewsAIController {
  public gemini = Container.get(GeminiService);
  public gitHub = Container.get(GitHubService);
  public reposService = Container.get(ReposService);

  public evaluatePullRequestGithub = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reposId, pullNumber } = req.params;
      const repos = await this.reposService.findById(reposId);
      if (!repos) throw new HttpException(404, 'Repository not found');
      const pullRequest = await this.gitHub.getPullRequestDetails(repos.name, Number(pullNumber));

      const result = await this.gemini.evaluateCodeWithPrompt(
        `${pullRequest.pullRequest.title}\n${pullRequest.pullRequest.body}`,
        pullRequest.files.map(content => ({
          file: content.filename,
          start_line: getStartLinePullRequest(content.patch),
          code: content.patch,
        })),
      );

      // Thêm comments vào pull request với error handling
      await Promise.allSettled(
        result.comments.map(async comment => {
          try {
            await this.gitHub.commentPullRequest(
              repos.name,
              Number(pullNumber),
              comment.comment,
              pullRequest.pullRequest.head.sha,
              comment.file,
              comment.line,
            );
            return { success: true, comment: comment.comment };
          } catch (error) {
            console.error(`Failed to post comment: ${error.message}`);
            return { success: false, comment: comment.comment, error: error.message };
          }
        }),
      );

      res.status(200).json({
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };
}
