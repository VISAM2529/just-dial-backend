import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../lib/auth';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';
export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Debug logging
  console.log('AdminLayout Session:', {
    sessionExists: !!session,
    user: session?.user,
    role: session?.user?.role,
  });

  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="space-x-4">
            <Link href="/admin" className="hover:underline">Dashboard</Link>
            <Link href="/admin/businesses/pending" className="hover:underline">Pending Businesses</Link>
            <Link href="/admin/users" className="hover:underline">Users</Link>
            <Link href="/profile" className="hover:underline">Profile</Link>
            <Link href="/api/auth/signout" className="hover:underline">Logout</Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}