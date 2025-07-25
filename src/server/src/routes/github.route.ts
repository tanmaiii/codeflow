import { Router } from 'express';
import { GitHubController } from '@controllers/github.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { AddWebHookDto } from '@/dtos/github.dto';

export class GitHubRoute implements Routes {
  public path = '/github';
  public router = Router();
  public github = new GitHubController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/repos/:repoName`, this.github.getRepoInfo);

    this.router.get(`${this.path}/user/:username`, this.github.getUserInfoByUsername);

    this.router.get(`${this.path}/orgs/members`, this.github.getOrganizationMembers);

    this.router.post(`${this.path}/webhook`, this.github.handleWebhookCommit);

    this.router.post(`${this.path}/add-webhook`, ValidationMiddleware(AddWebHookDto, 'body'), this.github.addWebhookCommit);
  }
}
