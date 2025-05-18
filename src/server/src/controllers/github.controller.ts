import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { GitHubService } from '@services/github.service';
import { RequestWithUser } from '@interfaces/auth.interface';
import { HttpException } from '@exceptions/HttpException';
import { GitHubRequestBody } from '@interfaces/github.interface';
import { env } from 'process';
import { logger } from '@/utils/logger';

export class GitHubController {
  public github = Container.get(GitHubService);

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

      const repositories = await this.github.getUserRepositories(accessToken, username);
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

      const repository = await this.github.getRepository(accessToken, owner, repo);
      res.status(200).json({ data: repository, message: 'github-repository' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get repository contents
   */
  public getRepositoryContents = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
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

      const contents = await this.github.getRepositoryContents(
        accessToken,
        owner,
        repo,
        path as string,
      );
      res.status(200).json({ data: contents, message: 'github-repository-contents' });
    } catch (error) {
      next(error);
    }
  };

  public inviteUserToOrganization = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
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

  public getOrganizationMembers = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const members = await this.github.getOrganizationMembers();
      res.status(200).json({ data: members, message: 'github-organization-members' });
    } catch (error) {
      next(error);
    }
  };
}
