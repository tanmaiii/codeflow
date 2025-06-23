import { logger } from '@/utils/logger';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { GitHubRequestBody } from '@interfaces/github.interface';
import { GitHubService } from '@services/github.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class GitHubController {
  public github: GitHubService;

  constructor() {
    this.github = Container.get(GitHubService);
  }

  /**
   * Get GitHub user information
   */
  public getUserInfo = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = req.body as GitHubRequestBody;

      if (!accessToken) {
        throw new HttpException(400, 'Access token is required');
      }

      const userData = await this.github.getUserInfo(accessToken);
      res.status(200).json({ data: userData, message: 'github-user-info' });
    } catch (error) {
      next(error);
    }
  };

  public getUserInfoByUsername = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { username } = req.params;

      if (!username) {
        throw new HttpException(400, 'Username is required');
      }

      const userData = await this.github.getUserInfoByUsername(username);
      res.status(200).json({ data: userData, message: 'github-user-info' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get repositories for a GitHub user
   */
  public getUserRepositories = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = req.body as GitHubRequestBody;
      const { username } = req.params;

      if (!accessToken) {
        throw new HttpException(400, 'Access token is required');
      }

      if (!username) {
        throw new HttpException(400, 'Username is required');
      }

      const repositories = await this.github.getUserRepositories(accessToken);
      res.status(200).json({ data: repositories, message: 'github-user-repositories' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get repository details
   */
  public getRepository = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = req.body as GitHubRequestBody;
      const { owner, repo } = req.params;

      if (!accessToken) {
        throw new HttpException(400, 'Access token is required');
      }

      if (!owner || !repo) {
        throw new HttpException(400, 'Owner and repo are required');
      }

      const repository = await this.github.getRepository(accessToken, owner);
      res.status(200).json({ data: repository, message: 'github-repository' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get repository contents
   */
  public getRepositoryContents = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { accessToken } = req.body as GitHubRequestBody;
      const { owner, repo } = req.params;
      const { path = '' } = req.query;

      if (!accessToken) {
        throw new HttpException(400, 'Access token is required');
      }

      if (!owner || !repo) {
        throw new HttpException(400, 'Owner and repo are required');
      }

      const contents = await this.github.getRepositoryContents(owner, repo, path as string);
      res.status(200).json({ data: contents, message: 'github-repository-contents' });
    } catch (error) {
      next(error);
    }
  };

  public inviteUserToOrganization = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const username = req.body.username;

      logger.info(`[GitHub Controller] username: ${username}`);

      if (!username) {
        throw new HttpException(400, 'Username is required');
      }

      if (!username) {
        throw new HttpException(400, 'Organization and username are required');
      }

      await this.github.inviteUserToOrganization(username);
      res.status(200).json({ message: 'github-invite-user-to-organization' });
    } catch (error) {
      next(error);
    }
  };

  public getOrganizationMembers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const members = await this.github.getOrganizationMembers();
      res.status(200).json({ data: members, message: 'github-organization-members' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Xử lý webhook commit
  */
  public handleWebhookCommit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const signature = req.headers['x-hub-signature-256'] as string;

      // Xác thực chữ ký từ webhook
      if (!signature || !this.github.verifyWebhookSignature(signature)) {
        throw new HttpException(401, 'Invalid webhook signature');
      }

      // Kiểm tra sự kiện từ webhook
      const event = req.headers['x-github-event'] as string;
      
      if (event === 'push') {
        const { repository, commits, ref } = body;
        
        logger.info(`[GitHub Webhook] Push event received for repository: ${repository.full_name}`);
        logger.info(`[GitHub Webhook] Branch: ${ref}, Commits count: ${commits.length}`);
        
        //TODO: Xử lý commit
        //TODO: Lưu vào cơ sở dữ liệu
        //TODO: Gửi thông báo
        for (const commit of commits) {
          await this.processCommit(commit, repository);
        }
        
        res.status(200).json({ message: 'Webhook processed successfully' });
      } else {
        logger.info(`[GitHub Webhook] Unhandled event type: ${event}`);
        res.status(200).json({ message: 'Event ignored' });
      }
    } catch (error) {
      logger.error(`[GitHub Webhook] Error processing webhook: ${error}`);
      next(error);
    }
  };

  private async processCommit(commit: any, repository: any) {
    try {
      const commitData = {
        sha: commit.id,
        message: commit.message,
        author: commit.author.name,
        email: commit.author.email,
        timestamp: commit.timestamp,
        repository: repository.full_name,
        branch: repository.default_branch,
        added: commit.added || [],
        modified: commit.modified || [],
        removed: commit.removed || []
      };

      logger.info(`[GitHub Webhook] Processing commit: ${commitData.sha}`);
      
      // Here you can add your business logic to process the commit
      // For example:
      // - Update database with commit information
      // - Trigger notifications
      // - Update progress tracking
      // - Send notifications to team members
      
      // Example: Save commit to database (implement based on your needs)
      // await this.commitService.saveCommit(commitData);
      
      // Example: Update topic progress if commit is related to a topic
      // await this.updateTopicProgress(commitData);
      
    } catch (error) {
      logger.error(`[GitHub Webhook] Error processing commit ${commit.id}: ${error}`);
    }
  }

  private updateTopicProgress = async (commitData: any) => {
    try {
      // Find topic by repository name
      // const topic = await this.topicService.findByRepository(commitData.repository);
      
      // if (topic) {
      //   // Update progress based on commit activity
      //   await this.topicService.updateProgress(topic.id, commitData);
      // }
      
      logger.info(`[GitHub Webhook] Topic progress updated for commit: ${commitData.sha}`);
    } catch (error) {
      logger.error(`[GitHub Webhook] Error updating topic progress: ${error}`);
    }
  };
}
