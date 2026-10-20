import { Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, LogIn, LogOut, Mail } from 'lucide-react';

import { Logo } from '@/components/brand/logo';
import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';
import { home, login, logout, register } from '@/routes';

const links: { name: string, href: string }[] = [
  {
    name: 'Home',
    href: '#hero'
  },
  {
    name: 'About',
    href: '#about',
  },
  {
    name: 'FAQ',
    href: '#faq',
  }
];

function Header({
  className,
}: {
  className?: string;
}) {
  const { auth } = usePage().props;
  const user = auth?.user;
  return (
    <header className={cn('bg-foreground text-background', className)}>
      <Container className="py-4 sm:py-6 justify-between items-center flex">
        <Logo variant='light' size="large" />
        <div className="flex justify-center gap-3">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div>
          {user ? (
            <Link
              href={logout.url()}
              className="hover:underline"
            >
              Keluar <LogOut className="h-5 w-5" />
            </Link>
          ) : (
            <div className='inline-flex gap-2.5'>
              <Link
                href={login.url()}
                className="inline-flex rounded-xs items-center gap-1 border border-white px-3 py-2 font-bold text-white transition-colors hover:bg-white/10"
              >
                Masuk
              </Link>
              <Link
                href={register.url()}
                className="inline-flex rounded-xs items-center gap-1 bg-primary px-3 py-2 font-bold text-white transition-colors hover:bg-primary/90"
              >
                Mulai sekarang <ArrowUpRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}

export { Header };
