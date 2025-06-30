import { GalleryVerticalEnd, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LoginForm } from '@/features/auth/components/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left side: Logo + Form */}
      <div className="flex flex-1 flex-col justify-center px-6 sm:px-12 py-12 lg:max-w-xl relative">
        {/* Home Button */}
        <div className="absolute top-6 left-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
          </Button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center lg:justify-start">
          <div className="bg-primary text-primary-foreground flex h-9 w-9 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-primary">
            Company Inc.
          </span>
        </div>

        {/* Login Form */}
        <div className="w-full">
          <LoginForm />
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden lg:block lg:flex-1 relative">
        <Image
          src="/auth.jpg"
          alt="Login background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
