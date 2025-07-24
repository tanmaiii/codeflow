import { GitHubCommitDetail, GitHubContent, GithubMeta, GitHubRepository, GitHubRepositoryCreate, GitHubUser } from '@interfaces/github.interface';
import {
  GitHubUserService,
  GitHubRepositoryService,
  GitHubContentService,
  GitHubWebhookService,
  GitHubWorkflowService,
  GitHubCommitsService,
} from './github';
import Container, { Service } from 'typedi';

@Service()
export class GitHubService {
  private readonly userService = Container.get(GitHubUserService);
  private readonly repositoryService = Container.get(GitHubRepositoryService);
  private readonly contentService = Container.get(GitHubContentService);
  private readonly webhookService = Container.get(GitHubWebhookService);
  private readonly workflowService = Container.get(GitHubWorkflowService);
  private readonly commitService = Container.get(GitHubCommitsService);

  // Webhook methods
  public async verifyWebhookSignature(signature: string): Promise<boolean> {
    return this.webhookService.verifyWebhookSignature(signature);
  }

  public async createWebhookCommit(repoName: string, webhookUrl: string) {
    return this.webhookService.createWebhookCommit(repoName, webhookUrl);
  }

  public async handleWebhookCommit(body: any, signature: string): Promise<void> {
    return this.webhookService.handleWebhookCommit(body, signature);
  }

  // User methods
  public async getUserInfo(accessToken: string): Promise<GitHubUser> {
    return this.userService.getUserInfo(accessToken);
  }

  public async getUserInfoByUsername(username: string): Promise<GitHubUser> {
    return this.userService.getUserInfoByUsername(username);
  }

  public async inviteUserToOrganization(username: string): Promise<void> {
    return this.userService.inviteUserToOrganization(username);
  }

  public async checkUserInOrganization(username: string): Promise<boolean> {
    return this.userService.checkUserInOrganization(username);
  }

  public async getOrganizationMembers(): Promise<GitHubUser[]> {
    return this.userService.getOrganizationMembers();
  }

  // Repository methods
  public async getRepoInfo(repoName: string): Promise<GithubMeta> {
    return this.repositoryService.infoRepo(repoName);
  }

  public async createRepoInOrg(repoData: Partial<GitHubRepositoryCreate>): Promise<GitHubRepository> {
    return this.repositoryService.createRepoInOrg(repoData);
  }

  public async renameBranchMainToMaster(repoName: string): Promise<void> {
    return this.repositoryService.renameBranchMainToMaster(repoName);
  }

  public async deleteRepoInOrg(repoName: string): Promise<GitHubRepository> {
    return this.repositoryService.deleteRepoInOrg(repoName);
  }

  public async updateRepoInOrg(repoName: string, repoData: Partial<GitHubRepositoryCreate>): Promise<GitHubRepository> {
    return this.repositoryService.updateRepoInOrg(repoName, repoData);
  }

  public async getUserRepositories(username: string): Promise<GitHubRepository[]> {
    return this.repositoryService.getUserRepositories(username);
  }

  public async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    return this.repositoryService.getRepository(owner, repo);
  }

  public async collaborateRepo(repoName: string, username: string): Promise<void> {
    return this.repositoryService.collaborateRepo(repoName, username);
  }

  public async checkRepoExists(repoName: string): Promise<boolean> {
    return this.repositoryService.checkRepoExists(repoName);
  }

  // Content methods
  public async getRepositoryContents(owner: string, repo: string, path: string): Promise<GitHubContent | GitHubContent[]> {
    return this.contentService.getRepositoryContents(owner, repo, path);
  }

  public async pushCode(repoName: string, message: string, content: string, path: string): Promise<any> {
    return this.contentService.pushCode(repoName, message, content, path);
  }

  public async detectRepoLanguage(repoName: string): Promise<string> {
    return this.contentService.detectRepoLanguage(repoName);
  }

  // Workflow methods
  public async createBasicWorkflow(repoName: string, language: string, framework: string, sonarKey: string): Promise<any> {
    return this.workflowService.createBasicWorkflow(repoName, language, framework, sonarKey);
  }

  public async deleteWorkflow(repoName: string, workflowName: string): Promise<any> {
    return this.workflowService.deleteWorkflow(repoName, workflowName);
  }

  // Commit
  public async getCommitDetails(repoName: string, commitSha: string): Promise<GitHubCommitDetail> {
    return this.commitService.getCommitDetails(repoName, commitSha);
  }
}
