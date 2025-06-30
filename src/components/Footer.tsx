export function Footer() {
  return (
    <footer className="w-full border-t border-muted/20 bg-background py-6 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} Your App Name. All rights reserved.
    </footer>
  );
}
