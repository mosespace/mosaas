import LoginForm from '@/components/authentication/login';
import { getCurrentUser } from '@/lib/current-user';
import { redirect } from 'next/navigation';

export default async function page() {
  const current_user = await getCurrentUser();

  if (current_user?.id) {
    redirect('/');
  }
  return <LoginForm />;
}
