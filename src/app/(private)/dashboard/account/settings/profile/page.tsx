'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { getUserProfile } from '@/features/userProfile/actions/getUserProfile';
import { updateUserProfile } from '@/features/userProfile/actions/updateUserProfile';
import { UpdateUserProfileDialog } from '@/features/userProfile/components/UpdateUserProfileDialog';
import { UserProfileData } from '@/types/userProfile';

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Load user profile on mount
  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        const data = await getUserProfile();
        setProfile({
          email: data.email ?? '',
          firstName: data.firstName ?? '',
          lastName: data.lastName ?? '',
          phone: data.phone ?? '',
          address: data.address ?? '',
        });
      } catch {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  // Handle update success: update local state and close dialog
  const handleUpdateSuccess = (updated: UserProfileData) => {
    setProfile(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      {!profile ? (
        <p>Loading profile...</p>
      ) : (
        <>
          <div className="max-w-md space-y-4 mb-6 bg-background p-6 rounded shadow-sm">
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>First Name:</strong> {profile.firstName || '-'}
            </p>
            <p>
              <strong>Last Name:</strong> {profile.lastName || '-'}
            </p>
            <p>
              <strong>Phone:</strong> {profile.phone || '-'}
            </p>
            <p>
              <strong>Address:</strong> {profile.address || '-'}
            </p>
          </div>

          <Button onClick={() => setDialogOpen(true)} disabled={loading}>
            Edit Profile
          </Button>

          <UpdateUserProfileDialog
            open={dialogOpen}
            initialData={profile}
            onClose={() => setDialogOpen(false)}
            onSuccess={handleUpdateSuccess}
            updateAction={updateUserProfile}
          />
        </>
      )}
    </div>
  );
}
