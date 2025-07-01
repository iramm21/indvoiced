import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link href="/dashboard/account/settings/profile" passHref>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              Edit your personal details, name, contact info, etc.
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/account/settings/security" passHref>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              Change your password or manage login devices.
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
