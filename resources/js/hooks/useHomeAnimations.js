import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useHomeAnimations(root) {
    useEffect(() => {
        const media = gsap.matchMedia();
        media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
            const context = gsap.context(() => {
                const section = root.current?.querySelector('.implementation');
                const grid = section?.querySelector('.steps-grid');
                if (!grid) return;
                const steps = gsap.utils.toArray(grid.children);
                const offset = () => window.innerWidth - grid.getBoundingClientRect().left;
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        pin: true,
                        start: () => section.offsetHeight > window.innerHeight ? 'bottom bottom' : 'center center',
                        end: () => `+=${window.innerWidth}`,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    },
                });
                steps.forEach((step, index) => {
                    timeline.fromTo(step, { x: () => offset() + index * 160 }, { x: 0, duration: 1, ease: 'power2.out' }, index * 0.12);
                });
            }, root);
            return () => context.revert();
        });
        media.add('(prefers-reduced-motion: no-preference)', () => {
            const context = gsap.context(() => {
                gsap.from('.hero-copy > *, .hero-form', { y: 22, opacity: 0, duration: 0.85, stagger: 0.09, ease: 'power2.out', clearProps: 'all' });
                gsap.utils.toArray('[data-reveal]').forEach(element => {
                    gsap.from(element, { y: 28, opacity: 0, duration: 0.75, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
                });
                gsap.from('.chart-bar', { scaleY: 0, transformOrigin: 'bottom', duration: 1.3, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.growth-chart', start: 'top 85%', once: true } });
                const flow = root.current?.querySelector('.method-flow');
                if (flow) {
                    const steps = gsap.utils.toArray('.method-step', flow);
                    const final = steps.pop();
                    const lines = gsap.utils.toArray('.method-arrow-line', flow);
                    const heads = gsap.utils.toArray('.method-arrow-head', flow);
                    gsap.set(lines, { strokeDasharray: 37, strokeDashoffset: 37 });
                    gsap.set(heads, { opacity: 0, x: -6 });
                    gsap.set(final, { opacity: 0.35, scale: 0.94 });
                    const flowTimeline = gsap.timeline({ delay: 0.15, scrollTrigger: { trigger: flow, start: 'top 80%', once: true } });
                    steps.forEach((step, index) => {
                        flowTimeline
                            .to(step, { color: '#fff', duration: 0.15, ease: 'power1.out' })
                            .to(lines[index], { strokeDashoffset: 0, duration: 0.22, ease: 'power2.inOut' }, '-=0.05')
                            .to(heads[index], { opacity: 1, x: 0, duration: 0.12, ease: 'power2.out' }, '-=0.08')
                            .to(step, { color: '#aebbd1', duration: 0.3 }, '-=0.08');
                    });
                    flowTimeline
                        .to(final, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, '-=0.25')
                        .fromTo(final, { boxShadow: '0 4px 22px rgba(47,116,230,.3)' }, { boxShadow: '0 4px 44px rgba(47,116,230,.75)', duration: 1.4, ease: 'sine.inOut', repeat: -1, yoyo: true });
                }
                gsap.to('.disciplines-watermark', { y: -65, ease: 'none', scrollTrigger: { trigger: '.disciplines', start: 'top bottom', end: 'bottom top', scrub: 1 } });
            }, root);
            return () => context.revert();
        });
        return () => media.revert();
    }, [root]);
}
