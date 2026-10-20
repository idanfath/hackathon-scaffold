import { Link } from '@inertiajs/react';
import { Bell, Settings, UserRound } from 'lucide-react';

import { AppPage, AppPageCard } from '@/components/layout/app-page';
import { Button } from '@/components/ui/button';
import app from '@/routes/app';

import type { HomeData } from '../types';

export function HomeDashboard({ data }: { data: HomeData }) {
    return (
        <AppPage
            title={`Selamat datang, ${data.viewer_name}`}
            description="Dasbor utama aplikasi Anda siap digunakan untuk hackathon."
        >
            <div className="grid gap-4 md:grid-cols-3">
                <AppPageCard
                    title="Profil Pengguna"
                    description="Kelola informasi pribadi, foto profil, dan wilayah."
                >
                    <div className="mt-4">
                        <Button asChild variant="outline" className="w-full">
                            <Link href={app.profile().url}>
                                <UserRound className="mr-2 h-4 w-4" />
                                Lihat Profil
                            </Link>
                        </Button>
                    </div>
                </AppPageCard>

                <AppPageCard
                    title="Pengaturan Akun"
                    description="Ubah kata sandi dan keamanan akun Anda."
                >
                    <div className="mt-4">
                        <Button asChild variant="outline" className="w-full">
                            <Link href={app.account().url}>
                                <Settings className="mr-2 h-4 w-4" />
                                Pengaturan
                            </Link>
                        </Button>
                    </div>
                </AppPageCard>

                <AppPageCard
                    title="Notifikasi"
                    description="Pusat notifikasi dan pesan sistem."
                >
                    <div className="mt-4">
                        <Button asChild variant="outline" className="w-full">
                            <Link href={app.notifications().url}>
                                <Bell className="mr-2 h-4 w-4" />
                                Buka Notifikasi
                            </Link>
                        </Button>
                    </div>
                </AppPageCard>
            </div>
        </AppPage>
    );
}
