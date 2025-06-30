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
    // Route to get GitHub user info
    this.router.post(`${this.path}/user`, this.github.getUserInfo);

    this.router.get(`${this.path}/user/:username`, this.github.getUserInfoByUsername);

    // Route to get user repositories
    this.router.post(`${this.path}/user/:username/repos`, AuthMiddleware, this.github.getUserRepositories);

    // Route to get repository details
    this.router.post(`${this.path}/repos/:owner/:repo`, AuthMiddleware, this.github.getRepository);

    // Route to get repository contents
    this.router.post(`${this.path}/repos/:owner/:repo/contents`, AuthMiddleware, this.github.getRepositoryContents);

    this.router.post(`${this.path}/orgs/invitations`, this.github.inviteUserToOrganization);

    this.router.get(`${this.path}/orgs/members`, this.github.getOrganizationMembers);

    this.router.post(`${this.path}/webhook`, this.github.handleWebhookCommit);

    this.router.post(`${this.path}/add-webhook`, ValidationMiddleware(AddWebHookDto, 'body'), this.github.addWebhookCommit);
  }
}
