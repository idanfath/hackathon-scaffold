import { User as UserIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarData } from '@/lib/avatar';
import { cn } from '@/lib/utils';

type UserAvatarProps = {
    user: {
        name: string;
        avatar_url?: string | null;
        avatar?: string | null;
    };
    className?: string;
    size?: 'sm' | 'lg';
    fallbackType?: 'initials' | 'icon' | 'text' | 'default';
};

const sizeClasses = {
    sm: 'size-8',
    lg: 'size-28',
};

const iconSizes = {
    sm: 'size-4',
    lg: 'size-8',
};

const textSizes = {
    sm: 'hidden',
    lg: 'text-xs font-medium text-neutral-500 dark:text-neutral-400 select-none',
};

export function UserAvatar({
    user,
    className,
    size,
    fallbackType = 'default',
}: UserAvatarProps) {
    const avatarData = getAvatarData(user.name);
    const src = user.avatar_url || user.avatar;
    const sizeKey = size || 'sm';

    return (
        <Avatar className={cn(size && sizeClasses[size], className)}>
            <AvatarImage
                src={src || undefined}
                alt={user.name}
                className="object-cover"
            />
            <AvatarFallback
                className="flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full bg-secondary text-secondary-foreground"
            >
                {fallbackType === 'text' && (
                    <div className="flex flex-col items-center justify-center gap-1.5 text-muted-foreground select-none">
                        <UserIcon className={cn('text-neutral-400 dark:text-neutral-500', iconSizes[sizeKey])} />
                        <span className={textSizes[sizeKey]}>Belum ada foto</span>
                    </div>
                )}
                {fallbackType === 'icon' && (
                    <UserIcon className={cn('text-muted-foreground', iconSizes[sizeKey])} />
                )}
                {(fallbackType === 'default' || fallbackType === 'initials') && (
                    avatarData ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 128"
                            className="size-full! select-none"
                        >
                            <rect width="128" height="128" fill={avatarData.bg} />
                            <text
                                x="64"
                                y="64"
                                fill={avatarData.fg}
                                fontFamily="system-ui,sans-serif"
                                fontSize="52"
                                fontWeight="600"
                                textAnchor="middle"
                                dominantBaseline="central"
                            >
                                {avatarData.initials}
                            </text>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 128"
                            className="size-full! select-none"
                        >
                            <rect width="128" height="128" fill="#0052c9" />
                            <circle cx="64" cy="48" r="20" fill="#f6f4f0" />
                            <path d="M14 128c0-32 22-53 50-53s50 21 50 53z" fill="#f6f4f0" />
                            <circle cx="100" cy="28" r="6" fill="#ff8a00" />
                        </svg>
                    )
                )}
            </AvatarFallback>
        </Avatar>
    );
}
export default UserAvatar;
