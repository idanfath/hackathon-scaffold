import { NotificationCategory, UserRole } from './enum.generated';

export * from './enum.generated';

export const USER_ROLE_LABELS: Record<UserRole, string> = {
    [UserRole.User]: 'Pengguna',
    [UserRole.Admin]: 'Admin',
} as const;

export const NOTIFICATION_CATEGORY_LABELS: Record<
    NotificationCategory,
    string
> = {
    [NotificationCategory.System]: 'Sistem',
} as const;

// aliases for backward compatibility
export const UserRoleFrontendLabel = USER_ROLE_LABELS;
export type UserRoleFrontendLabel = typeof UserRoleFrontendLabel;

export const NotificationCategoryFrontendLabel = NOTIFICATION_CATEGORY_LABELS;
export type NotificationCategoryFrontendLabel =
    typeof NotificationCategoryFrontendLabel;

export function getUserRoleLabel(role?: string | null): string {
    if (!role) {
        return '';
    }

    return USER_ROLE_LABELS[role as UserRole] ?? role;
}

export function getNotificationCategoryLabel(category?: string | null): string {
    if (!category) {
        return '';
    }

    return (
        NOTIFICATION_CATEGORY_LABELS[category as NotificationCategory] ??
        category
    );
}
