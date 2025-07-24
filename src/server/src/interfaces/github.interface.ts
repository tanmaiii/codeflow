export interface GitHubRepositoryCreate {
  name: string;
  private?: boolean;
  auto_init?: boolean;
  description?: string;
  team_id?: number;
}

export interface GithubMeta {
  id: number;
  name: string;
  commits: number;
  stars: number;
  pull_requests_open: number;
  pull_requests_closed: number;
  pull_requests_merged: number;
  forks: number;
  issues: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
  };
  topics: string[];
  visibility: string;
  default_branch: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
    html_url: string;
    type: string;
  };
}

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubContributor {
  login: string; // Tên đăng nhập GitHub
  id: number; // ID duy nhất của người dùng
  node_id: string; // Node ID trong GraphQL
  avatar_url: string; // URL ảnh đại diện
  gravatar_id: string; // ID Gravatar
  url: string; // URL API của người dùng
  html_url: string; // URL trang GitHub của người dùng
  followers_url: string; // URL API danh sách người theo dõi
  following_url: string; // URL API danh sách đang theo dõi
  gists_url: string; // URL API danh sách gist
  starred_url: string; // URL API danh sách repo đã star
  subscriptions_url: string; // URL API danh sách subscription
  organizations_url: string; // URL API danh sách tổ chức
  repos_url: string; // URL API danh sách repository
  events_url: string; // URL API danh sách sự kiện
  received_events_url: string; // URL API danh sách sự kiện nhận được
  type: string; // Loại tài khoản (User/Organization)
  user_view_type: string; // Loại hiển thị người dùng
  site_admin: boolean; // Có phải admin site không
  contributions: number; // Số lượng đóng góp
}

export interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content?: string;
  encoding?: string;
}

export interface GitHubRequestBody {
  accessToken: string;
}

export interface GitHubCommitDetail {
  sha: string;
  node_id: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
    tree: {
      sha: string;
      url: string;
    };
    url: string;
    comment_count: number;
    verification: {
      verified: boolean;
      reason: string;
      signature: string | null;
      payload: string | null;
      verified_at: string | null;
    };
  };
  url: string;
  html_url: string;
  comments_url: string;
  author: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
  };
  committer: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
  };
  parents: Array<{
    sha: string;
    url: string;
    html_url: string;
  }>;
  stats: {
    total: number;
    additions: number;
    deletions: number;
  };
  files: Array<{
    sha: string;
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    changes: number;
    blob_url: string;
    raw_url: string;
    contents_url: string;
    patch: string;
  }>;
}
