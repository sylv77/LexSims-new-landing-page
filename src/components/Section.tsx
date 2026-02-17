import React from 'react';

type SectionProps = {
    children: React.ReactNode;
    variant?: 'dark' | 'light' | 'lime';
    className?: string;
    grid?: boolean;
    fullWidth?: boolean;
};

export default function Section({
    children,
    variant = 'dark',
    className = '',
    grid = false,
    fullWidth = false
}: SectionProps) {
    const baseClasses = variant === 'light' ? 'bg-light' :
        variant === 'lime' ? 'bg-lime' :
            'bg-dark';

    const gridClasses = grid ? (variant === 'light' ? 'grid-lines-light' : 'grid-lines') : '';

    return (
        <section className={`relative w-full py-20 md:py-32 ${baseClasses} ${gridClasses} ${className}`}>
            <div className={fullWidth ? "w-full" : "max-w-7xl mx-auto px-4 md:px-8"}>
                {children}
            </div>
        </section>
    );
}
