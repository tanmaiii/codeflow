import { Service } from 'typedi';
import axios from 'axios';
import { logger } from '@utils/logger';
import { GitHubContent, GitHubRepository, GitHubUser } from '@interfaces/github.interface';
import { env } from 'process';

@Service()
export class GitHubService {
  private baseUrl = 'https://api.github.com';

  private headers = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  };

  /**
   * Get user information from GitHub
   * @param accessToken GitHub access token
   * @returns GitHub user information
   */
  public async getUserInfo(accessToken: string): Promise<GitHubUser> {
    try {
      const response = await axios.get(`${this.baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      logger.info(`[GitHub Service] User info: ${response.data}`);
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error getting user info: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get user repositories from GitHub
   * @param accessToken GitHub access token
   * @param username GitHub username
   * @returns List of repositories
   */
  public async getUserRepositories(
    accessToken: string,
    username: string,
  ): Promise<GitHubRepository[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/users/${username}/repos`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
        params: {
          sort: 'updated',
          per_page: 100,
        },
      });
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error getting user repositories: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get repository details from GitHub
   * @param accessToken GitHub access token
   * @param owner Repository owner
   * @param repo Repository name
   * @returns Repository details
   */
  public async getRepository(
    accessToken: string,
    owner: string,
    repo: string,
  ): Promise<GitHubRepository> {
    try {
      const response = await axios.get(`${this.baseUrl}/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error getting repository: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get repository contents from GitHub
   * @param accessToken GitHub access token
   * @param owner Repository owner
   * @param repo Repository name
   * @param path Path to the file or directory
   * @returns Repository contents
   */
  public async getRepositoryContents(
    accessToken: string,
    owner: string,
    repo: string,
    path: string = '',
  ): Promise<GitHubContent | GitHubContent[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error getting repository contents: ${error.message}`);
      throw error;
    }
  }

  public async inviteUserToOrganization(organization: string, username: string): Promise<void> {
    try {
      const userResp = await axios.get(`https://api.github.com/users/${username}`, {
        headers: this.headers,
      });
      const userId = userResp.data.id;

      const response = await axios.post(`${this.baseUrl}/orgs/${organization}/invitations`, {
        headers: this.headers,
        data: {
          invitee_id: userId,
          role: 'direct_member',
        },
      });
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error inviting user to organization: ${error.message}`);
      throw error;
    }
  }
}
