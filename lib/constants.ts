import axios from 'axios';
import { getCurrentUser } from './current-user';

export const siteConfig = {
  name: 'MOSAAS Stater KIT V1.0.0',
  short_name: 'mosaas',
  domain: 'https://starterkit.vercel.app',
  logo: '/logo-2.jpg',
  LinkedinUrl: '',
  twitterUrl: '',
  websiteUrl: '',
  address: 'ME4 5RB, Chatham, London UK',
  description: '',
  resend_domain: 'desishub.com',
};

const api_url = process.env.NEXT_PUBLIC_API_URL!;

export const api = axios.create({
  baseURL: `${api_url}/api/v1`,
  withCredentials: true,
});

export async function withAuthHeaders() {
  const user = await getCurrentUser();
  const apiKey = process.env.API_KEY;

  const headers: Record<string, string> = {};

  if (apiKey) headers['x-api-key'] = apiKey;
  if (user?.id) headers['x-user-id'] = user.id;

  return headers;
}
