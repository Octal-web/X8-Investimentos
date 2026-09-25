import { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Arrow, SectionHeading } from "@/Components/HomeUI";
import { homeTestimonials } from "@/data/homeContent";

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
            className="testimonials section-space"
            aria-roledescription="carrossel"
            aria-label="Depoimentos"
        >
            <div className="x8-container">
                <div className="testimonial-heading">
                    <SectionHeading eyebrow="Quem já evoluiu">
                        O que dizem as marcas
                        <br />
                        que cresceram com a gente
                    </SectionHeading>
                    <div className="carousel-controls">
                        <button
                            type="button"
                            onClick={() => swiperRef.current?.slidePrev()}
                            aria-label="Depoimento anterior"
                        >
                            <Arrow className="rotate-180" />
                        </button>
                        <button
                            type="button"
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
                    className="testimonial-track"
                >
                    {homeTestimonials.map((item, index) => (
                        <SwiperSlide
                            key={item.quote}
                            className="testimonial-slide"
                        >
                            <figure
                                className="testimonial-card"
                                aria-label={`Depoimento ${index + 1} de ${homeTestimonials.length}`}
                            >
                                <span className="quote-mark" aria-hidden="true">
                                    “
                                </span>
                                <blockquote>{item.quote}</blockquote>
                                <figcaption>
                                    <span
                                        className="client-avatar"
                                        aria-hidden="true"
                                    />
                                    <span>
                                        <strong>{item.name}</strong>
                                        <small>{item.role}</small>
                                    </span>
                                </figcaption>
                            </figure>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {snaps > 1 && (
                    <div className="carousel-dots">
                        {Array.from({ length: snaps }, (_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => swiperRef.current?.slideTo(index)}
                                aria-label={`Ir para depoimento ${index + 1}`}
                                aria-current={
                                    active === index ? "true" : undefined
                                }
                            >
                                <span />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
