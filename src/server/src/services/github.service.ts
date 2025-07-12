import { GitHubContent, GitHubRepository, GitHubRepositoryCreate, GitHubUser } from '@interfaces/github.interface';
import { logger } from '@utils/logger';
import axios from 'axios';
import crypto from 'crypto';
import { env } from 'process';
import Container, { Service } from 'typedi';
import { templateNodejs } from '@/templates/workflow/template_nodejs';
import { workflowProperties } from '@/templates/workflow/workflow_propeties';
import { SonarService } from './sonar.service';

@Service()
export class GitHubService {
  private baseUrl = 'https://api.github.com';
  private organization = process.env.GITHUB_ORGANIZATION || 'organization-codeflow';
  private readonly sonarService = Container.get(SonarService);

  private headers = {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  };

  public async verifyWebhookSignature(signature: string): Promise<boolean> {
    try {
      logger.info(`[GitHub Service] Verifying webhook signature: ${signature} ${process.env.GITHUB_WEBHOOK_SECRET}`);
      const hmac = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET);
      hmac.update(signature);
      const calculatedSignature = hmac.digest('hex');
      return calculatedSignature === signature;
    } catch (error) {
      logger.error(`[GitHub Service] Error verifying webhook signature: ${error.message}`);
      throw error;
    }
  }

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
        },
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

  /**
   * Tạo webhook commit trên repository
   * @param repoName Tên repository
   * @param webhookUrl URL của webhook
   * @returns Webhook đã tạo
   */
  public async createWebhookCommit(repoName: string, webhookUrl: string) {
    try {
      // The payload sent to GitHub API for creating a webhook is incorrect.
      // It should be an object with a "config" property, and "content_type" should be "json" (not 'json'), and the event types should be specified.
      // Reference: https://docs.github.com/en/rest/webhooks/repos?apiVersion=2022-11-28#create-a-repository-webhook

      const response = await axios.post(
        `${this.baseUrl}/repos/${this.organization}/${repoName}/hooks`,
        {
          name: 'web',
          active: true,
          events: ['push'], // You can customize events as needed
          config: {
            url: webhookUrl,
            content_type: 'json',
            secret: process.env.GITHUB_WEBHOOK_SECRET,
            insecure_ssl: '0', // '0' means SSL verification enabled
          },
        },
        {
          headers: this.headers,
        },
      );
      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error creating webhook commit: ${webhookUrl}`);
      throw error;
    }
  }

  /**
   * Xử lý webhook commit
   * @param body
   * @param signature
   * @returns
   */
  public async handleWebhookCommit(body: any, signature: string): Promise<void> {
    try {
    } catch (error) {}
  }

  /**
   * Xác định ngôn ngữ của repository bằng cách lấy danh sách các file trong repository
   * @param repoName Tên repository
   * @returns Ngôn ngữ của repository
   */
  public async detectRepoLanguage(repoName: string): Promise<string> {
    try {
      const response = await axios.get(`${this.baseUrl}/repos/${this.organization}/${repoName}/languages`, {
        headers: this.headers,
      });

      const languages = response.data;
      const sorted = Object.entries(languages).sort((a: [string, number], b: [string, number]) => b[1] - a[1]);
      const mainLanguage = sorted.length > 0 ? sorted[0][0] : 'Unknown';

      if (mainLanguage === 'Unknown') {
        return '';
      }
      return mainLanguage;
    } catch (error) {
      logger.error(`[GitHub Service] Error detecting repository language: ${error.message}`);
      throw error;
    }
  }

  //

  /**
   * Tạo và push GitHub Actions workflow vào repository
   * @param repoName Tên repository
   * @param workflowName Tên file workflow (không bao gồm .yml)
   * @param workflowContent Nội dung workflow YAML
   * @returns Thông tin commit đã tạo
   */
  public async pushCode(repoName: string, message: string, content: string, path: string): Promise<any> {
    try {
      // Encode workflow content to base64
      const contentBase64 = Buffer.from(content).toString('base64');

      // Check if file already exists
      let sha: string | undefined;
      try {
        const existingFile = await axios.get(`${this.baseUrl}/repos/${this.organization}/${repoName}/contents/${path}`, {
          headers: this.headers,
        });
        sha = existingFile.data.sha;
      } catch (error) {
        // File doesn't exist, which is fine
        if (error.response && error.response.status !== 404) {
          throw error;
        }
      }

      const body: any = {
        message: `Add/Update ${message}`,
        content: contentBase64,
        branch: 'main', // hoặc 'master' tùy thuộc vào default branch
      };

      // If file exists, include sha for update
      if (sha) {
        body.sha = sha;
      }

      logger.info(`[GitHub Service] Pushing workflow: ${message} to ${repoName}`);

      const response = await axios.put(`${this.baseUrl}/repos/${this.organization}/${repoName}/contents/${path}`, body, {
        headers: this.headers,
      });

      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error pushing workflow: ${error.message}`);
      throw error;
    }
  }

  /**
   * Tạo workflow cơ bản cho CI/CD
   * @param repoName Tên repository
   * @param language Ngôn ngữ lập trình chính của repository
   * @returns Thông tin commit đã tạo
   */
  public async createBasicWorkflow(repoName: string, language: string): Promise<any> {
    try {
      let workflowContent = '';
      let workflowPropertiesContent = '';

      const sonarData = await this.sonarService.createProject(repoName);

      switch (language.toLowerCase()) {
        case 'javascript':
        case 'typescript':
          workflowContent = templateNodejs();
          workflowPropertiesContent = workflowProperties({
            organization: 'organization-codeflow',
            projectKey: sonarData.project.key,
          });
          break;
        // case 'python':
        //   workflowContent = this.getPythonWorkflow();
        //   break;
        // case 'java':
        //   workflowContent = this.getJavaWorkflow();
        //   break;
        // case 'go':
        //   workflowContent = this.getGoWorkflow();
        //   break;
        // default:
        //   workflowContent = this.getGenericWorkflow();
      }

      await this.pushCode(repoName, 'ci', workflowContent, '.github/workflows/ci.yml');
      await this.pushCode(repoName, 'sonar', workflowPropertiesContent, 'sonar-project.properties');
      return true;
    } catch (error) {
      logger.error(`[GitHub Service] Error creating basic workflow: ${error.message}`);
      throw error;
    }
  }

  /**
   * Xóa workflow khỏi repository
   * @param repoName Tên repository
   * @param workflowName Tên file workflow
   * @returns Thông tin commit đã tạo
   */
  public async deleteWorkflow(repoName: string, workflowName: string): Promise<any> {
    try {
      const path = `.github/workflows/${workflowName}.yml`;

      // Get file SHA
      const existingFile = await axios.get(`${this.baseUrl}/repos/${this.organization}/${repoName}/contents/${path}`, {
        headers: this.headers,
      });

      const response = await axios.delete(`${this.baseUrl}/repos/${this.organization}/${repoName}/contents/${path}`, {
        headers: this.headers,
        data: {
          message: `Delete ${workflowName} workflow`,
          sha: existingFile.data.sha,
          branch: 'main',
        },
      });

      return response.data;
    } catch (error) {
      logger.error(`[GitHub Service] Error deleting workflow: ${error.message}`);
      throw error;
    }
  }
}
