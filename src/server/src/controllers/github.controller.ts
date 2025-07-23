import { CodeAnalysisCreate, CodeAnalysisMetrics } from '@/interfaces/code_analysis.interface';
import { CommitCreate } from '@/interfaces/commits.interface';
import CodeAnalysisService from '@/services/code_analysis.service';
import { CommitService } from '@/services/commit.service';
import { ReposService } from '@/services/repos.service';
import { SonarService } from '@/services/sonar.service';
import { UserService } from '@/services/users.service';
import { logger } from '@/utils/logger';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { PushEvent, WorkflowRunEvent } from '@octokit/webhooks-types';
import { GitHubService } from '@services/github.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class GitHubController {
  public github: GitHubService;
  public commitService: CommitService;
  public userService: UserService;
  public reposService: ReposService;
  public sonarService: SonarService;
  public codeAnalysisService: CodeAnalysisService;

  constructor() {
    this.github = Container.get(GitHubService);
    this.commitService = Container.get(CommitService);
    this.userService = Container.get(UserService);
    this.reposService = Container.get(ReposService);
    this.sonarService = Container.get(SonarService);
    this.codeAnalysisService = Container.get(CodeAnalysisService);
  }

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

  public getOrganizationMembers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const members = await this.github.getOrganizationMembers();
      res.status(200).json({ data: members, message: 'github-organization-members' });
    } catch (error) {
      next(error);
    }
  };

  public getRepoInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { repoName } = req.params;
      const repoInfo = await this.github.getRepoInfo(repoName);
      res.status(200).json({ data: repoInfo, message: 'github-repo-info' });
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
        const workflowEvent = body as WorkflowRunEvent;
        const { workflow_run } = workflowEvent;

        logger.info(`[GitHub Webhook] Workflow run event received. Status: ${workflow_run.status}, Conclusion: ${workflow_run.conclusion}`);

        // Kiểm tra nếu workflow run đã completed
        if (workflow_run.status === 'completed') {
          logger.info(`[GitHub Webhook] Workflow run completed for repository: ${workflow_run.repository.full_name}`);
          logger.info(`[GitHub Webhook] Workflow conclusion: ${workflow_run.conclusion}`);

          // Xử lý logic khi workflow hoàn thành
          await this.processWorkflowCompletion(workflow_run);
        }

        res.status(200).json({ message: 'Workflow run webhook processed successfully' });
        return;
      }

      if (event === 'push') {
        const pushEvent = body as PushEvent;
        const { repository, commits, ref } = pushEvent;

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

  // Xử lý khi workflow run hoàn thành
  private async processWorkflowCompletion(workflow_run: WorkflowRunEvent['workflow_run']) {
    try {
      logger.info(`[GitHub Webhook] Processing workflow completion: ${workflow_run.name}`);

      let repo = null;
      try {
        repo = await this.reposService.findRepoByRepositoryName(workflow_run.repository.name);
      } catch (error) {
        logger.warn(`[GitHub Webhook] Repository not found: ${workflow_run.repository.name}`);
        return;
      }

      if (!repo) {
        logger.warn(`[GitHub Webhook] Repository not found: ${workflow_run.repository.name}`);
        return;
      }

      const sonarAnalysis = await this.sonarService.getMeasures(repo.sonarKey);

      if (sonarAnalysis.component.measures.length === 0) {
        logger.warn(`[GitHub Webhook] Sonar analysis not found: ${workflow_run.repository.name}`);
        return;
      }

      const user = await this.userService.findUserByUsername(workflow_run.actor.login);
      if (!user.uid || !user) throw new HttpException(404, 'User not found');

      const codeAnalysis: CodeAnalysisCreate = {
        reposId: repo.id,
        branch: workflow_run.head_branch,
        commitSha: workflow_run.head_sha,
        status: workflow_run.conclusion,
        workflowRunId: workflow_run.id.toString(),
        analyzedAt: new Date(),
        authorId: user.id,
      };

      const newCodeAnalysis = await this.codeAnalysisService.createCodeAnalysis(codeAnalysis);

      for (const measure of sonarAnalysis.component.measures) {
        const codeAnalysisMetrics: CodeAnalysisMetrics = {
          codeAnalysisId: newCodeAnalysis.id,
          name: measure.metric,
          value: measure.value,
          bestValue: measure.bestValue,
        };
        await this.codeAnalysisService.createCodeAnalysisMetrics(codeAnalysisMetrics);
      }

      return;
    } catch (error) {
      logger.error(`[GitHub Webhook] Error processing workflow completion: ${error}`);
    }
  }

  // Lưu commit
  private async processCommit(commit: PushEvent['commits'][0], repository: PushEvent['repository']) {
    try {
      // logger.info(`[GitHub Webhook] Processing commit: ${JSON.stringify(commit)}`);
      // logger.info(`[GitHub Webhook] Processing repository: ${JSON.stringify(repository)}`);

      // Kiểm tra nếu author.username tồn tại
      if (!commit.author.username) {
        logger.warn(`[GitHub Webhook] Commit ${commit.id} does not have author username, skipping...`);
        return;
      }

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
}
