'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        className="
          w-full
          py-20
          px-8
          bg-primary/10
          dark:bg-gradient-to-b dark:from-black/80 dark:via-transparent dark:to-black/80
        "
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left max-w-lg mx-auto lg:mx-0 text-primary dark:text-primary-foreground">
            <h1 className="text-4xl font-extrabold leading-tight mb-6 dark:text-white dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              Simplify your invoicing, <br /> get paid faster.
            </h1>
            <p className="text-lg mb-8 text-muted-foreground dark:text-gray-300 dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
              Indvoiced is a modern invoicing platform built for freelancers and
              small businesses. Create professional invoices, track payments,
              and manage clients with ease.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link href="/register" passHref>
                <Button
                  asChild
                  size="lg"
                  className="font-semibold"
                  variant="default"
                >
                  <span>Get Started</span>
                </Button>
              </Link>
              <Link href="/features" passHref>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="
                    font-semibold
                    text-primary
                    dark:text-gray-300
                    dark:border-gray-300
                    hover:bg-accent
                    hover:text-accent-foreground
                    dark:hover:bg-input/50
                    dark:hover:text-accent-foreground
                  "
                >
                  <span>Learn More</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative w-full h-80 sm:h-[28rem] lg:h-[32rem] mx-auto max-w-lg lg:max-w-none rounded-xl overflow-hidden shadow-lg bg-background">
            <Image
              src="/hero.jpg"
              alt="Illustration of invoicing app"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="bg-background dark:bg-background-dark py-20 px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-primary">
              Professional Invoices
            </h3>
            <p className="text-muted-foreground">
              Customize and send beautiful invoices in minutes.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-primary">
              Automatic Reminders
            </h3>
            <p className="text-muted-foreground">
              Never miss a payment with smart, automatic reminders.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-primary">
              Secure Payments
            </h3>
            <p className="text-muted-foreground">
              Connect payment gateways and get paid faster, securely.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 text-center">
        <h3 className="text-3xl font-bold mb-10 text-primary">
          Trusted by professionals worldwide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-5xl font-extrabold text-primary">5,000+</p>
            <p className="text-muted-foreground mt-2">Active Users</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-primary">1M+</p>
            <p className="text-muted-foreground mt-2">Invoices Created</p>
          </div>
          <div>
            <p className="text-5xl font-extrabold text-primary">99.9%</p>
            <p className="text-muted-foreground mt-2">Uptime</p>
          </div>
        </div>
      </section>
    </main>
  );
}
