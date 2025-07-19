import { CommitCreate } from '@/interfaces/commits.interface';
import { CommitService } from '@/services/commit.service';
import { ReposService } from '@/services/repos.service';
import { UserService } from '@/services/users.service';
import { logger } from '@/utils/logger';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { GitHubCommit, GitHubRepository, GitHubRequestBody } from '@interfaces/github.interface';
import { GitHubService } from '@services/github.service';
import { NextFunction, Request, Response } from 'express';
import { stringify } from 'querystring';
import { Container } from 'typedi';

export class GitHubController {
  public github: GitHubService;
  public commitService: CommitService;
  public userService: UserService;
  public reposService: ReposService;
  constructor() {
    this.github = Container.get(GitHubService);
    this.commitService = Container.get(CommitService);
    this.userService = Container.get(UserService);
    this.reposService = Container.get(ReposService);
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
   * Thêm webhook commit
   */
  public addWebhookCommit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { repoName, webhookUrl } = req.body;
      logger.info(`[GitHub Controller] repoName: ${repoName}, webhookUrl: ${webhookUrl}`);
      await this.github.createWebhookCommit(repoName, webhookUrl);
      res.status(200).json({ message: 'Webhook added successfully' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Xử lý webhook commit
   */
  // TODO: Xử lý Webhook commit
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

      if (event === 'workflow_run') {
        const { workflow_run } = body;
        logger.info(`[GitHub Webhook] Workflow run event received for repository: ${stringify(workflow_run)}`);
      }

      if (event === 'push') {
        const { repository, commits, ref } = body;

        logger.info(`[GitHub Webhook] Push event received for repository: ${repository.full_name}`);
        logger.info(`[GitHub Webhook] Branch: ${ref}, Commits count: ${commits.length}`);

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

  private async processCommit(commit: GitHubCommit, repository: GitHubRepository) {
    try {
      // logger.info(`[GitHub Webhook] Processing commit: ${JSON.stringify(commit)}`);
      // logger.info(`[GitHub Webhook] Processing repository: ${JSON.stringify(repository)}`);

      const user = await this.userService.findUserByUsername(commit.author.username);
      if (!user) throw new HttpException(404, 'User not found');

      const repo = await this.reposService.findRepoByRepositoryName(repository.name);
      if (!repo) throw new HttpException(404, 'Repo not found');

      const commitData: CommitCreate = {
        reposId: repo.id,
        commitHash: commit.id,
        message: commit.message,
        authorId: user.id,
        url: commit.url,
      };
      this.commitService.createCommit(commitData);
    } catch (error) {
      logger.error(`[GitHub Webhook] Error processing commit ${commit.id}: ${error}`);
    }
  }

  /**
   * Xử lý ngôn ngữ của repository
   */
  public processCommitLanguage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { repoName } = req.params;
      const language = await this.github.detectRepoLanguage(repoName);

      res.status(200).json({ data: language, message: 'github-commit-language' });
    } catch (error) {
      next(error);
    }
  };
}
