import Register from '@/components/pages/auth/register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng ký | CodeFlow',
};

export default function Page() {
  return <Register />;
}
