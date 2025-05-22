import { Service } from 'typedi';
import axios from 'axios';
import { logger } from '@utils/logger';
import { GitHubContent, GitHubRepository, GitHubUser } from '@interfaces/github.interface';
import { env } from 'process';

@Service()
export class GitHubService {
  private baseUrl = 'https://api.github.com';
  private organization = 'TVU-CodeFlow';

  private headers = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  };

  /**
   * Lấy thông tin user từ GitHub
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
   * Tạo repository mới trên GitHub
   * @param repoData Thông tin repository
   * @returns Thông tin repository đã tạo
   */
  public async createRepository(repoData: Partial<GitHubRepository>): Promise<GitHubRepository> {
    try {
      const response = await axios.post(`${this.baseUrl}/user/repos`, {
        headers: this.headers,
        data: repoData,
      });
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error creating repository: ${error.message}`);
      throw error;
    }
  }

  /**
   * Lấy danh sách repository từ GitHub
   * @param accessToken GitHub access token
   * @param username GitHub username
   * @returns Danh sách repository
   */
  public async getUserRepositories(username: string): Promise<GitHubRepository[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/users/${username}/repos`, {
        headers: this.headers,
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
   * Lấy chi tiết repository từ GitHub
   * @param accessToken GitHub access token
   * @param owner Repository owner
   * @param repo Repository name
   * @returns Chi tiết repository
   */
  public async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    try {
      const response = await axios.get(`${this.baseUrl}/repos/${owner}/${repo}`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error getting repository: ${error.message}`);
      throw error;
    }
  }

  /**
   * Lấy nội dung repository từ GitHub
   * @param accessToken GitHub access token
   * @param owner Repository owner
   * @param repo Repository name
   * @param path Đường dẫn đến file hoặc thư mục
   * @returns Nội dung repository
   */
  public async getRepositoryContents(owner: string, repo: string, path: string): Promise<GitHubContent | GitHubContent[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error getting repository contents: ${error.message}`);
      throw error;
    }
  }

  /**
   * Mời user vào tổ chức GitHub
   * @param username GitHub username
   */
  public async inviteUserToOrganization(username: string): Promise<void> {
    try {
      const userResp = await axios.get(`https://api.github.com/users/${username}`, {
        headers: this.headers,
      });
      const userId = userResp.data.id;

      const response = await axios.post(`${this.baseUrl}/orgs/${this.organization}/invitations`, {
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

  /**
   * Lấy danh sách thành viên tổ chức GitHub
   * @returns Danh sách thành viên tổ chức
   */
  public async getOrganizationMembers(): Promise<GitHubUser[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/orgs/${this.organization}/members`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error getting organization members: ${error.message}`);
      throw error;
    }
  }
}
