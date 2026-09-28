import { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Arrow, SectionHeading } from "@/Components/HomeUI";
import { homeTestimonials } from "@/data/homeContent";

const controlButton =
    "grid size-[52px] place-items-center rounded-full border transition-[background] duration-200 hover:bg-[#245bb8] max-md:size-11";

export function Testimonials() {
    const sectionRef = useRef(null);
    const swiperRef = useRef(null);
    const [active, setActive] = useState(0);
    const [snaps, setSnaps] = useState(1);
    const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    useEffect(() => {
        if (reducedMotion) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                const autoplay = swiperRef.current?.autoplay;
                if (!autoplay) return;
                if (entry.isIntersecting) autoplay.start();
                else autoplay.stop();
            },
            { threshold: 0.4 },
        );
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [reducedMotion]);

    return (
        <section
            ref={sectionRef}
            className="pb-20 pt-[90px] max-md:py-16"
            aria-roledescription="carrossel"
            aria-label="Depoimentos"
        >
            <div className="x8-container">
                <div className="mb-[60px] flex items-end justify-between gap-[30px] max-md:mb-7 max-md:flex-col max-md:items-start max-md:gap-5">
                    <SectionHeading eyebrow="Quem já evoluiu" layout="">
                        O que dizem as marcas
                        <br />
                        que cresceram com a gente
                    </SectionHeading>
                    <div className="flex gap-2.5 max-md:self-end">
                        <button
                            type="button"
                            className={`${controlButton} border-white/[.22]`}
                            onClick={() => swiperRef.current?.slidePrev()}
                            aria-label="Depoimento anterior"
                        >
                            <Arrow className="rotate-180" />
                        </button>
                        <button
                            type="button"
                            className={`${controlButton} border-x8-blue bg-x8-blue`}
                            onClick={() => swiperRef.current?.slideNext()}
                            aria-label="Próximo depoimento"
                        >
                            <Arrow />
                        </button>
                    </div>
                </div>
                <Swiper
                    rewind
                    grabCursor
                    modules={[Autoplay]}
                    breakpoints={{
                        0: { slidesPerView: 1.15, spaceBetween: 16 },
                        768: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 24 },
                    }}
                    autoplay={
                        !reducedMotion && {
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }
                    }
                    speed={reducedMotion ? 0 : 600}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        swiper.autoplay?.stop();
                        setSnaps(swiper.snapGrid.length);
                    }}
                    onSnapGridLengthChange={(swiper) =>
                        setSnaps(swiper.snapGrid.length)
                    }
                    onSlideChange={(swiper) => setActive(swiper.snapIndex)}
                    className="!overflow-visible max-md:-mr-5"
                >
                    {homeTestimonials.map((item, index) => (
                        <SwiperSlide
                            key={item.quote}
                            className="!h-auto"
                        >
                            <figure
                                className="h-full rounded-[22px] border border-x8-border bg-[#071124] px-8 pb-8 pt-[30px] max-md:p-[26px]"
                                aria-label={`Depoimento ${index + 1} de ${homeTestimonials.length}`}
                            >
                                <span className="block h-[45px] text-[48px] font-bold leading-none text-x8-accent" aria-hidden="true">
                                    “
                                </span>
                                <blockquote className="min-h-[190px] text-[20px] leading-normal text-[#e1e7f2] max-md:min-h-[180px] max-md:text-[18px]">{item.quote}</blockquote>
                                <figcaption className="flex items-center gap-3.5 border-t border-x8-border pt-5">
                                    <span
                                        className="size-11 shrink-0 rounded-full bg-[linear-gradient(110deg,#2f74e6,#122959)]"
                                        aria-hidden="true"
                                    />
                                    <span>
                                        <strong className="block text-[15px] font-medium">{item.name}</strong>
                                        <small className="mt-1 block text-[13px] text-x8-dim">{item.role}</small>
                                    </span>
                                </figcaption>
                            </figure>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {snaps > 1 && (
                    <div className="mt-9 flex gap-1.5 max-md:mt-5">
                        {Array.from({ length: snaps }, (_, index) => (
                            <button
                                key={index}
                                type="button"
                                className="grid h-11 min-w-6 place-items-center"
                                onClick={() => swiperRef.current?.slideTo(index)}
                                aria-label={`Ir para depoimento ${index + 1}`}
                                aria-current={
                                    active === index ? "true" : undefined
                                }
                            >
                                <span
                                    className={`h-[3px] rounded transition-[width] duration-200 ${active === index ? "w-10 bg-x8-accent" : "w-3 bg-[#ffffff30]"}`}
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
