import prisma from '@/lib/prisma';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser(); // ✅ Secure method

  if (!user) {
    return (
      <p className="text-center mt-10">Please log in to see your dashboard.</p>
    );
  }

  const userProfile = await prisma.userProfile.findUnique({
    where: { authUserId: user.id },
  });

  if (!userProfile) {
    return <p className="text-center mt-10">User profile not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Your Profile Info</h2>
      <ul className="list-disc pl-6 space-y-2 text-lg">
        <li>
          <strong>Email:</strong> {userProfile.email}
        </li>
        <li>
          <strong>First Name:</strong> {userProfile.firstName ?? 'N/A'}
        </li>
        <li>
          <strong>Last Name:</strong> {userProfile.lastName ?? 'N/A'}
        </li>
        <li>
          <strong>Phone:</strong> {userProfile.phone ?? 'N/A'}
        </li>
        <li>
          <strong>Address:</strong> {userProfile.address ?? 'N/A'}
        </li>
      </ul>
    </div>
  );
}
