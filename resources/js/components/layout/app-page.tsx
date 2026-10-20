import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const appPageClassName =
    'mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pb-6';

const appPageCardClassName = 'rounded-2xl border bg-card p-6 shadow-xs';

type AppPageProps = ComponentProps<'div'> & {
    title?: ReactNode;
    description?: ReactNode;
};

function AppPage({
    className,
    title,
    description,
    children,
    ...props
}: AppPageProps) {
    return (
        <div className={cn(appPageClassName, className)} {...props}>
            {(title || description) && (
                <div className="flex flex-col gap-1">
                    {title ? (
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {title}
                        </h1>
                    ) : null}
                    {description ? (
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    ) : null}
                </div>
            )}
            {children}
        </div>
    );
}

type AppPageCardProps = Omit<ComponentProps<'section'>, 'title'> & {
    title?: ReactNode;
    description?: ReactNode;
};

function AppPageCard({
    className,
    title,
    description,
    children,
    ...props
}: AppPageCardProps) {
    const hasHeader = Boolean(title || description);

    return (
        <section className={cn(appPageCardClassName, className)} {...props}>
            {hasHeader && (
                <div className="flex flex-col gap-1">
                    {title ? (
                        <h2 className="text-base font-semibold tracking-tight">
                            {title}
                        </h2>
                    ) : null}
                    {description ? (
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    ) : null}
                </div>
            )}
            {children}
        </section>
    );
}

export { AppPage, AppPageCard, appPageClassName, appPageCardClassName };
export type { AppPageProps, AppPageCardProps };
