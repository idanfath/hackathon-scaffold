import { About } from '@/features/landing/components/about';
import { Faq } from '@/features/landing/components/faq';
import { Footer } from '@/features/landing/components/footer';
import { Header } from '@/features/landing/components/header';
import { Hero } from '@/features/landing/components/hero';
import { login, logout, register } from '@/routes';
import { Auth } from '@/types/auth';
import { Head, Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';

const description = 'description';
const title = 'title';

function LandingPage() {

  const {
    url,
    props: { auth },
  } = usePage<{ auth: Auth }>();

  return (
    <>
      <Head title={title}>
        <meta
          head-key="description"
          name="description"
          content={description}
        />
        <meta name="theme-color" content="#FAF9F6" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Head>
      <Header />
      <Hero />
      <About />
      <Faq />
      <Footer />
    </>
  );
}

LandingPage.layout = (page: ReactNode) => page;

export default LandingPage;
