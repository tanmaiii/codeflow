import { GitHubContent, GitHubRepository, GitHubRepositoryCreate, GitHubUser } from '@interfaces/github.interface';
import { logger } from '@utils/logger';
import axios from 'axios';
import { env } from 'process';
import { Service } from 'typedi';
import { join } from 'path';

@Service()
export class GitHubService {
  private baseUrl = 'https://api.github.com';
  private organization = process.env.GITHUB_ORGANIZATION || 'organization-codeflow';

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

  public async getUserInfoByUsername(username: string): Promise<GitHubUser> {
    try {
      const response = await axios.get(`${this.baseUrl}/users/${username}`, {
        headers: this.headers,
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
  public async createRepoInOrg(repoData: Partial<GitHubRepositoryCreate>): Promise<GitHubRepository> {
    try {
      logger.info(`[GitHub Service] Creating repository: ${JSON.stringify(repoData)} ${this.baseUrl}/orgs/${this.organization}/repos`);
      const response = await axios.post(`${this.baseUrl}/orgs/${this.organization}/repos`, repoData, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error creating repository: ${error.message}`);
      throw error;
    }
  }


  public async deleteRepoInOrg(repoName: string): Promise<GitHubRepository> {
    try {
      logger.info(`[GitHub Service] Deleting repository: ${repoName} ${this.baseUrl}/repos/${this.organization}/${repoName}`);
      const response = await axios.delete(`${this.baseUrl}/repos/${this.organization}/${repoName}`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error deleting repository: ${error.message}`);
      throw error;
    }
  }

  public async updateRepoInOrg(repoName: string, repoData: Partial<GitHubRepositoryCreate>): Promise<GitHubRepository> {
    try {
      logger.info(`[GitHub Service] Updating repository: ${repoName} ${this.baseUrl}/repos/${this.organization}/${repoName}`);
      const response = await axios.patch(`${this.baseUrl}/repos/${this.organization}/${repoName}`, repoData, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error updating repository: ${error.message}`);
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

      const response = await axios.post(
        `${this.baseUrl}/orgs/${this.organization}/invitations`,
        {
          invitee_id: userId,
          role: 'direct_member',
        },
        {
          headers: this.headers,
        },
      );
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error inviting user to organization: ${error.message}`);
      throw error;
    }
  }

  /**
   * Kiểm tra xem user có tồn tại trong tổ chức GitHub hay không
   * @param username GitHub username
   * @returns true nếu user tồn tại trong tổ chức, false nếu ngược lại
   */
  public async checkUserInOrganization(username: string): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/orgs/${this.organization}/members/${username}`, {
        headers: this.headers,
      });
      return response.status === 204;
    } catch (error) {
      return false;
    }
  }


  public async collaborateRepo(repoName: string, username: string): Promise<void> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/repos/${this.organization}/${repoName}/collaborators/${username}`,
        {},
        {
          headers: this.headers,
        }
      );
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error collaborating repo: ${error.message}`);
      throw error;
    }
  }

  /**
   * Kiểm tra xem repository có tồn tại trong tổ chức hay không
   * @param repoName Tên repository cần kiểm tra
   * @returns true nếu repository tồn tại, false nếu không
   */
  public async checkRepoExists(repoName: string): Promise<boolean> {
    try {
      await axios.get(`${this.baseUrl}/repos/${this.organization}/${repoName}`, {
        headers: this.headers,
      });
      return true;
    } catch (error) {
      // Nếu repository không tồn tại, GitHub API sẽ trả về lỗi 404
      if (error.response && error.response.status === 404) {
        return false;
      }
      // Nếu có lỗi khác, log và coi như repository đã tồn tại để an toàn
      logger.error(`[GitHub Service] Error checking repository existence: ${error.message}`);
      return true;
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
