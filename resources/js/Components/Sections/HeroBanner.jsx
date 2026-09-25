import React from 'react';
import { HeroProjectForm } from '@/Components/HeroProjectForm';

const iconProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
};

const ConnectIcon = ({ className }) => (
    <svg {...iconProps} className={className}>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.59 13.51 6.83 3.98" />
        <path d="m15.41 6.51-6.82 3.98" />
    </svg>
);

const AiIcon = ({ className }) => (
    <svg {...iconProps} className={className}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
        <path d="m8.5 15 1.75-6h.5L12.5 15M9.1 13h2.8M15.5 9v6" />
    </svg>
);

const LaunchIcon = ({ className }) => (
    <svg {...iconProps} className={className}>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
);

const ArrowRight = ({ className = 'size-4' }) => (
    <svg {...iconProps} strokeWidth={2} className={className}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

const highlights = [
    { icon: ConnectIcon, label: 'Mídia, dados e automação conectados' },
    { icon: AiIcon, label: 'IA aplicada à operação' },
    { icon: LaunchIcon, label: 'Implantação em 90 dias' },
];

export const HeroBanner = () => (
    <section className="hero-banner">
        <div className="x8-container hero-grid">
            <div className="hero-copy">
                <p className="hero-intro">Investir em mídia é fácil.</p>
                <h1>Transformar<br />investimento<br />em crescimento <span>é<br />outra história.</span></h1>
                <p className="hero-description">Mídia, dados, automação, tecnologia e inteligência artificial conectados em uma única operação — orientada ao que realmente movimenta o negócio.</p>
                <a href="#planos" className="x8-button">Ver planos<ArrowRight /></a>
                <ul className="hero-highlights">{highlights.map(({ icon: Icon, label }) => <li key={label}><Icon className="size-5" />{label}</li>)}</ul>
            </div>
            <div className="hero-form"><HeroProjectForm fieldPrefix="hero" /></div>
        </div>
    </section>
);
