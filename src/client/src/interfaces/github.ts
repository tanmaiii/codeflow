export interface GitHubUser {
  login: string;
  id: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  user_view_type?: string;
  site_admin?: boolean;
  name?: string;
  company?: string | null;
  blog?: string;
  location?: string;
  email?: string | null;
  hireable?: string | null;
  bio?: string;
  twitter_username?: string | null;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
}

export interface GithubMeta {
  id: number;
  name: string;
  stars: number;
  forks: number;
  commits: number;
  pull_requests_open: number;
  pull_requests_closed: number;
  pull_requests_merged: number;
  issues: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}
