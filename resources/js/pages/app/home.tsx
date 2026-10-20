import type { ReactNode } from 'react';

import { HomeDashboard } from '@/features/home/components/home-dashboard';
import type { HomeData } from '@/features/home/types';
import AppLayout from '@/layout/AppLayout';

const Home: InertiaPageWithLayout<{
    home: HomeData;
}> = ({ home }) => {
    return <HomeDashboard data={home} />;
};

Home.layout = (page: ReactNode) => (
    <AppLayout title="Beranda">{page}</AppLayout>
);

export default Home;
