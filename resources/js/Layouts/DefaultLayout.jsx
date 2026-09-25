import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePage, Link, Head } from '@inertiajs/react';

import { navigation } from '@/data/navigation';

import logoWhite from '@/assets/img/logo.png';

const ArrowRight = ({ className = 'size-4' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

const Logo = () => (
    <span className="flex items-center gap-2.5">
        <img
            src={logoWhite}
            alt="X8"
            width="62"
            height="24"
            decoding="async"
            className="block h-auto w-[52px] lg:w-[62px]"
        />
        <span className="text-[10px] leading-[1.15] text-secondary">
            A (R)evolução
            <br />
            da performance
        </span>
    </span>
);

const DefaultLayout = ({
    children,
    title = 'X8 – A (R)evolução da performance',
    description = 'Mídia, dados, automação, tecnologia e inteligência artificial conectados em uma única operação — orientada ao que realmente movimenta o negócio.'
}) => {
    const { notifyCookie } = usePage().props;

    const [isAtTop, setIsAtTop] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const closeMenu = (event) => { if (event.key === 'Escape') setIsMenuOpen(false); };
        document.addEventListener('keydown', closeMenu);
        return () => document.removeEventListener('keydown', closeMenu);
    }, []);

    const gtmLoadedRef = useRef(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (ticking) {
                return;
            }

            ticking = true;

            window.requestAnimationFrame(() => {
                setIsAtTop(window.scrollY <= 80);
                ticking = false;
            });
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!notifyCookie || gtmLoadedRef.current) {
            return;
        }

        let idleId = null;
        let timeoutId = null;

        const loadGtm = () => {
            if (gtmLoadedRef.current) {
                return;
            }

            gtmLoadedRef.current = true;

            const script = document.createElement('script');

            script.innerHTML = `
                (function(w,d,s,l,i){
                    w[l]=w[l]||[];
                    w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),
                        dl=l!='dataLayer'?'&l='+l:'';
                    j.async=true;
                    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `;

            document.head.appendChild(script);
        };

        if ('requestIdleCallback' in window) {
            idleId = window.requestIdleCallback(loadGtm, { timeout: 3000 });
        } else {
            timeoutId = window.setTimeout(loadGtm, 2500);
        }

        return () => {
            if (idleId && 'cancelIdleCallback' in window) {
                window.cancelIdleCallback(idleId);
            }

            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [notifyCookie]);

    const organizationSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "X8",
        "url": window.location.origin,
        "sameAs": []
    }), []);

    const menuItems = navigation;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />

                <meta property="og:url" content={window.location.pathname} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />

                <meta name="robots" content="index, follow" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description || ''} />

                <link rel="icon" href="/favicon.ico" type="image/x-icon" />

                <script type="application/ld+json">
                    {JSON.stringify(organizationSchema)}
                </script>
            </Head>

            <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
            <header
                className={`fixed left-0 right-0 top-0 z-20 border-b transition-colors duration-300 ${
                    isAtTop && !isMenuOpen
                        ? 'border-white/10 bg-transparent'
                        : 'border-white/10 bg-black/70 backdrop-blur-md'
                }`}
            >
                <div className="x8-container">
                    <div className="flex h-[72px] items-center justify-between lg:h-[108px]">
                        <Link href="/" className="relative z-[2]" aria-label="X8 — página inicial">
                            <Logo />
                        </Link>

                        <nav
                            id="primary-navigation" aria-label="Navegação principal"
                            className={`fixed inset-x-0 top-[72px] border-b border-white/10 bg-black/90 backdrop-blur-md transition-all duration-300 lg:static lg:border-0 lg:bg-transparent lg:backdrop-blur-none ${
                                isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0 lg:visible lg:opacity-100'
                            }`}
                        >
                            <ul className="flex flex-col items-center gap-6 py-8 lg:flex-row lg:gap-8 lg:py-0">
                                {menuItems.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.to}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-base text-secondary transition-colors hover:text-white lg:text-sm"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}

                                <li className="lg:hidden">
                                    <a
                                        href="/#contato"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-blue-700"
                                    >
                                        Falar com a X8
                                        <ArrowRight />
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <a
                            href="/#contato"
                            className="hidden items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-blue-700 transition-colors hover:bg-secondary lg:flex"
                        >
                            Falar com a X8
                            <ArrowRight />
                        </a>

                        <button
                            className="relative z-[2] lg:hidden"
                            onClick={() => setIsMenuOpen((current) => !current)}
                            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                            aria-controls="primary-navigation"
                            aria-expanded={isMenuOpen}
                        >
                            <div className="relative h-4 w-6">
                                <span className={`absolute left-0 top-0 h-[2px] w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'top-[7px] rotate-45' : ''}`} />
                                <span className={`absolute left-0 top-[7px] h-[2px] w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'scale-x-0' : ''}`} />
                                <span className={`absolute left-0 top-[14px] h-[2px] w-6 bg-white transition-all duration-300 ${isMenuOpen ? 'top-[7px] -rotate-45' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            <main id="main-content" className="relative overflow-hidden bg-[#040914]">
                {/* Sombra azul do topo: elipse com blur */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-[-420px] h-[640px] w-[140%] -translate-x-1/2 rounded-[50%] bg-blue-700 opacity-70 blur-[140px] lg:w-[110%]"
                />

                <div className="relative">
                    {children}
                </div>
            </main>

            <footer className="site-footer">
                <div className="x8-container">
                    <div className="footer-main"><Link href="/" aria-label="X8 — página inicial"><Logo /></Link><nav aria-label="Navegação do rodapé"><ul>{menuItems.map(item => <li key={item.name}><a href={item.to}>{item.name}</a></li>)}</ul></nav></div>
                    <div className="footer-bottom"><p>© {new Date().getFullYear()} X8</p><a href="/politica-de-privacidade">Política de Privacidade</a></div>
                </div>
            </footer>
        </>
    );
};

export default DefaultLayout;
