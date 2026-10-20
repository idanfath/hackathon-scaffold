import { Calendar, Mail, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/ui/user-avatar';
import { formatDate } from '@/lib/date';
import { getUserRoleLabel } from '@/types/enum';
import type { Profile } from '../types';
import { PrivacyTooltip } from './privacy-tooltip';

type ProfileHeaderProps = {
    profile: Profile;
    avatarUrl?: string;
    isOwner: boolean;
    editing: boolean;
    onEdit: () => void;
};

function ProfileHeader({
    profile,
    avatarUrl,
    isOwner,
    editing,
    onEdit,
}: ProfileHeaderProps) {
    return (
        <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
                <UserAvatar
                    user={{ name: profile.name, avatar_url: avatarUrl }}
                    size="lg"
                    className="size-16 shrink-0 sm:size-20"
                />
                <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-xl font-bold tracking-tight text-foreground">
                            {profile.name}
                        </h1>
                        {profile.role && (
                            <Badge variant="secondary" className="font-medium">
                                {getUserRoleLabel(profile.role)}
                            </Badge>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 pt-1 text-xs text-muted-foreground">
                        {isOwner && profile.date_of_birth && (
                            <div className="flex items-center gap-2">
                                <Calendar className="size-3.5 shrink-0 text-muted-foreground/70" />
                                <span className="font-medium text-foreground">
                                    {formatDate(
                                        profile.date_of_birth,
                                        'dd MMM yyyy',
                                    )}
                                </span>
                                <PrivacyTooltip />
                            </div>
                        )}
                        {isOwner && profile.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="size-3.5 shrink-0 text-muted-foreground/70" />
                                <span className="font-medium text-foreground">
                                    {profile.email}
                                </span>
                                <PrivacyTooltip />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isOwner && !editing && (
                <Button
                    type="button"
                    onClick={onEdit}
                    className="w-full sm:absolute sm:top-6 sm:right-6 sm:w-auto"
                >
                    <Pencil data-icon="inline-start" />
                    Edit profil
                </Button>
            )}
        </div>
    );
}

export { ProfileHeader };
