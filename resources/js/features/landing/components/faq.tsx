import { Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, LogIn, LogOut, Mail } from 'lucide-react';
import * as React from 'react';

import { Logo } from '@/components/brand/logo';
import { Container } from '@/components/layout/container';
import { cn, sentenceCase } from '@/lib/utils';
import { home, login, logout, register } from '@/routes';
import { FooterColumn, FooterProps } from '../types';

function Faq({
  className,
}: {
  className?: string;
}) {
  const { auth } = usePage().props;
  const user = auth?.user;
  return (
    <Container id='faq' className="py-4 sm:py-6 justify-between items-center flex min-h-screen">
      {/* TODO  */}
      faq
    </Container>
  );
}

export { Faq };
