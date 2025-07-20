import crypto from 'crypto';
import { stringify } from 'querystring';
import { Service } from 'typedi';
import { GitHubBaseService } from './github-base.service';

@Service()
export class GitHubWebhookService extends GitHubBaseService {
  constructor() {
    super('GitHub Webhook Service');
  }

  public async verifyWebhookSignature(signature: string): Promise<boolean> {
    try {
      this.logInfo('Verifying webhook signature', { signature });
      
      const hmac = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET);
      hmac.update(signature);
      const calculatedSignature = hmac.digest('hex');
      return calculatedSignature === signature;
    } catch (error) {
      this.logError('Error verifying webhook signature', error);
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
      this.logInfo('Creating webhook commit', { repoName, webhookUrl });

      const response = await this.makeRequest({
        method: 'POST',
        url: `${this.getOrgRepoUrl(repoName)}/hooks`,
        data: {
          name: 'web',
          active: true,
          events: ['push', 'workflow_run', 'pull_request'],
          config: {
            url: webhookUrl,
            content_type: 'json',
            secret: process.env.GITHUB_WEBHOOK_SECRET,
            insecure_ssl: '0',
          },
        },
      });
      
      return response;
    } catch (error) {
      this.logError(`Error creating webhook commit: ${webhookUrl}`, error);
      this.logError(`Error creating webhook commit details: ${stringify(error.response?.data)}`, error);
      throw error.response?.data || error;
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
      this.logInfo('Handling webhook commit', { signature });
      // Implement webhook handling logic here
    } catch (error) {
      this.logError('Error handling webhook commit', error);
      throw error;
    }
  }
} 