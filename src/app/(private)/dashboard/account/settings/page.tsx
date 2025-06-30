// app/dashboard/account/settings/page.tsx
export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
      <p className="text-muted-foreground mb-6">
        This is where you will be able to manage your profile, change your
        password, and configure other preferences.
      </p>

      {/* You can build this out into a full form */}
      <div className="space-y-4">
        <div className="bg-background p-4 border rounded shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Profile</h2>
          <p className="text-sm text-muted-foreground">
            Edit your personal details, name, contact info, etc.
          </p>
        </div>

        <div className="bg-background p-4 border rounded shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Security</h2>
          <p className="text-sm text-muted-foreground">
            Change your password or manage login devices.
          </p>
        </div>
      </div>
    </div>
  );
}
