import { Router } from 'express';
import { GitHubController } from '@controllers/github.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class GitHubRoute implements Routes {
  public path = '/github';
  public router = Router();
  public github = new GitHubController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Route to get GitHub user info
    this.router.post(`${this.path}/user`, AuthMiddleware, this.github.getUserInfo);
    
    // Route to get user repositories
    this.router.post(`${this.path}/user/:username/repos`, AuthMiddleware, this.github.getUserRepositories);
    
    // Route to get repository details
    this.router.post(`${this.path}/repos/:owner/:repo`, AuthMiddleware, this.github.getRepository);
    
    // Route to get repository contents
    this.router.post(`${this.path}/repos/:owner/:repo/contents`, AuthMiddleware, this.github.getRepositoryContents);
  }
} 