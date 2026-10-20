import { createInertiaApp } from '@inertiajs/react';
import type { ReactNode } from 'react';
import './echo';
import Layout from './layout/Layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: async (name) => {
    const pages = import.meta.glob('./pages/**/*.tsx'); // lazy: one chunk per page
    const page: any = await pages[`./pages/${name}.tsx`]();
    page.default.layout ??= (page: ReactNode) => <Layout>{page}</Layout>;
    return page;
  },
});
