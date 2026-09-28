import React from 'react';

export const sectionHeadingLayout = 'grid grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] items-end gap-[65px] mb-[72px] max-desk:gap-10 max-md:grid-cols-1 max-md:gap-6 max-md:mb-10';
export const sectionTitle = 'text-[clamp(32px,3.62vw,52px)] font-normal leading-[1.06] tracking-[-.04em] max-md:text-[34px]';

export const Arrow = ({ className = '', ...props }) => <svg className={`shrink-0 ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
export const ButtonLink = ({ children, href = '#contato', light = false, className = '', arrowClassName = '' }) => <a href={href} className={`x8-button ${light ? 'x8-button-light' : ''} ${className}`}>{children}<Arrow className={arrowClassName} /></a>;
export const SectionHeading = ({ eyebrow, children, description, layout = sectionHeadingLayout, titleClassName = sectionTitle, light = false }) => (
    <div className={layout} data-reveal>
        <div>
            <p className={`eyebrow mb-6 max-md:mb-4 ${light ? 'text-x8-royal' : ''}`}>{eyebrow}</p>
            <h2 className={titleClassName}>{children}</h2>
        </div>
        {description && <div className={`leading-[1.6] max-md:max-w-[520px] [&_p+p]:!mt-[18px] ${light ? 'text-[16px] text-[#687080]' : 'text-[18px] text-x8-muted max-lg:text-[16px]'}`}>{description}</div>}
    </div>
);
