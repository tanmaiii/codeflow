import Register from '@/components/pages/auth/Register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng ký | CodeFlow',
};

export default function Page() {
  return <Register />;
}
