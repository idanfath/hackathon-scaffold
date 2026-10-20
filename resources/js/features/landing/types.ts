export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface FooterProps {
    description?: React.ReactNode;
    columns?: FooterColumn[];
    className?: string;
}
