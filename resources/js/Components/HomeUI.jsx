import React from 'react';

export const Arrow = ({ className = '', ...props }) => <svg className={`arrow-icon ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
export const ButtonLink = ({ children, href = '#contato', light = false, className = '' }) => <a href={href} className={`x8-button ${light ? 'x8-button-light' : ''} ${className}`}>{children}<Arrow /></a>;
export const SectionHeading = ({ eyebrow, children, description, className = '' }) => <div className={`section-heading ${className}`} data-reveal><div><p className="eyebrow">{eyebrow}</p><h2>{children}</h2></div>{description && <div className="section-description">{description}</div>}</div>;
