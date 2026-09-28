import { useState } from "react";
import { Head } from "@inertiajs/react";
import { ButtonLink, SectionHeading } from "@/Components/HomeUI";
import { homeDoubts } from "@/data/homeDoubts";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeDoubts.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
};

export function Doubts() {
    const [open, setOpen] = useState(0);
    return (
        <>
            <Head>
                <script type="application/ld+json">
                    {JSON.stringify(faqSchema)}
                </script>
            </Head>
            <section className="x8-container pb-[150px] pt-[160px] max-md:py-16" id="duvidas">
                <SectionHeading
                    eyebrow="Dúvidas frequentes"
                    layout="mb-[72px] grid grid-cols-[2fr_1fr] items-end gap-[65px] max-desk:gap-10 max-md:mb-10 max-md:grid-cols-1 max-md:gap-6"
                    titleClassName="text-[72px] font-normal leading-[1.06] tracking-[-.04em] max-md:text-[56px]"
                    description={
                        <>
                            <p>
                                Não encontrou o que procurava? Fale direto com o
                                time da X8.
                            </p>
                            <ButtonLink className="mt-4">Falar com a X8</ButtonLink>
                        </>
                    }
                >
                    Dúvidas?
                </SectionHeading>
                <div>
                    {homeDoubts.map((item, index) => (
                        <article
                            className="border-t border-x8-border last:border-b"
                            key={item.question}
                        >
                            <h3>
                                <button
                                    type="button"
                                    id={`faq-question-${index}`}
                                    aria-expanded={open === index}
                                    aria-controls={`faq-answer-${index}`}
                                    className="flex w-full items-center justify-between gap-6 py-7 text-left text-[25px] leading-[1.4] text-[#e2e5eb] max-md:gap-4 max-md:py-6 max-md:text-[19px]"
                                    onClick={() =>
                                        setOpen(open === index ? null : index)
                                    }
                                >
                                    {item.question}
                                    <span
                                        className={`grid size-10 shrink-0 place-items-center rounded-full border text-[28px] font-light transition-[transform,background] duration-[250ms] max-md:size-[34px] max-md:text-[25px] ${open === index ? "rotate-45 border-x8-blue bg-x8-blue" : "border-white/[.23]"}`}
                                        aria-hidden="true"
                                    >
                                        +
                                    </span>
                                </button>
                            </h3>
                            <div
                                className={`grid ${open === index ? "visible grid-rows-[1fr] [transition:grid-template-rows_.4s_ease]" : "invisible grid-rows-[0fr] [transition:grid-template-rows_.4s_ease,visibility_0s_.4s]"}`}
                                id={`faq-answer-${index}`}
                                role="region"
                                aria-labelledby={`faq-question-${index}`}
                                aria-hidden={open !== index}
                            >
                                <div className="min-h-0 overflow-hidden">
                                    <p className="max-w-[840px] px-5 pb-8 text-[18px] leading-[1.6] text-x8-muted max-md:px-0 max-md:pb-[26px] max-md:text-[16px]">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}
