import ky from "ky";
import { baseKy } from ".";

export const GITHUB_ID = 36968271;

const githubKy = baseKy.extend((options) => ({prefixUrl: `${options.prefixUrl}/api.github.com`}));

export const github = {
  me: async (): Promise<GithubUser> => (await githubKy.get(`user/${GITHUB_ID}`).json<GithubUser>()),

  repos: async (login: string): Promise<GithubRepo[]> => {
    const repos = await githubKy.get(`users/${login}/repos`).json<GithubRepo[]>();
    const mapped = repos.map(repo => ({
      ...repo,
      og_url: `https://github.html.zone/${repo.full_name}`,
    }));
    return mapped;
  },
};

export type GithubUser = {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
  url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  hireable: boolean;
  twitter_username: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
};

export type GithubRepo = {
  // computed in client: https://kai.bi/post/github-og-image
  og_url: string;
  // from GitHub API
  full_name: string;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  language: string | null;
  topics?: string[];
};