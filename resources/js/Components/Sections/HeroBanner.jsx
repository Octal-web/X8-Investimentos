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
    <section className="relative overflow-clip bg-[radial-gradient(ellipse_at_45%_-24%,#214785_0,rgba(24,59,123,.6)_35%,transparent_66%)] pb-[88px] pt-[172px] before:pointer-events-none before:absolute before:right-[10%] before:top-0 before:h-[980px] before:w-[680px] before:animate-[arrow-nudge_2s_ease-in-out_infinite_alternate] before:bg-[url('../js/assets/img/arrow-shape.svg')] before:bg-[length:100%_100%] before:bg-center before:bg-no-repeat max-lg:pt-[125px] max-md:pb-12 max-md:pt-[120px] max-md:before:h-[588px] max-md:before:w-[408px]">
        <div className="x8-container relative z-[1] grid grid-cols-[minmax(0,680px)_464px] items-center gap-14 max-desk:grid-cols-[minmax(0,1fr)_410px] max-desk:gap-8 max-lg:grid-cols-[minmax(0,1fr)_370px] max-lg:gap-7 max-md:grid-cols-1 max-md:gap-11">
            <div className="hero-copy">
                <p className="mb-6 text-[24px] leading-[1.4] text-x8-accent max-lg:text-[21px] max-md:text-[22px]">Investir em mídia é fácil.</p>
                <h1 className="mb-8 text-[clamp(42px,4.45vw,64px)] font-bold uppercase leading-[1.02] tracking-[-.065em] max-desk:text-[48px] max-lg:text-[40px] max-md:text-[clamp(30px,8vw,56px)] max-md:tracking-[-.055em] hd:text-[64px]">Transformar<br />investimento<br />em crescimento <span className="bg-[linear-gradient(110deg,#86aaf2,#397ded)] bg-clip-text text-x8-accent [-webkit-text-fill-color:transparent]">é<br />outra história.</span></h1>
                <p className="mb-10 max-w-[590px] text-[20px] leading-normal text-x8-muted max-desk:text-[18px] max-lg:text-[17px] max-md:max-w-[540px] max-md:text-[18px]">Mídia, dados, automação, tecnologia e inteligência artificial conectados em uma única operação — orientada ao que realmente movimenta o negócio.</p>
                <a href="#planos" className="x8-button">Ver planos<ArrowRight /></a>
                <ul className="mt-14 flex gap-5 max-desk:flex-wrap max-desk:gap-3 max-md:mt-8 max-md:flex-col">{highlights.map(({ icon: Icon, label }) => <li key={label} className="flex items-center gap-2 whitespace-nowrap text-[12px] text-x8-muted"><Icon className="size-5 shrink-0 text-x8-blue" />{label}</li>)}</ul>
            </div>
            <div className="hero-form max-md:w-full max-md:max-w-[520px] max-md:justify-self-center"><HeroProjectForm fieldPrefix="hero" /></div>
        </div>
    </section>
);
