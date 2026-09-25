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
            <section className="x8-container doubts section-space" id="duvidas">
                <SectionHeading
                    eyebrow="Dúvidas frequentes"
                    description={
                        <>
                            <p>
                                Não encontrou o que procurava? Fale direto com o
                                time da X8.
                            </p>
                            <ButtonLink>Falar com a X8</ButtonLink>
                        </>
                    }
                >
                    Dúvidas?
                </SectionHeading>
                <div className="faq-list">
                    {homeDoubts.map((item, index) => (
                        <article
                            className={`faq-item ${open === index ? "is-open" : ""}`}
                            key={item.question}
                        >
                            <h3>
                                <button
                                    type="button"
                                    id={`faq-question-${index}`}
                                    aria-expanded={open === index}
                                    aria-controls={`faq-answer-${index}`}
                                    onClick={() =>
                                        setOpen(open === index ? null : index)
                                    }
                                >
                                    {item.question}
                                    <span
                                        className="faq-toggle"
                                        aria-hidden="true"
                                    >
                                        +
                                    </span>
                                </button>
                            </h3>
                            <div
                                className="faq-answer"
                                id={`faq-answer-${index}`}
                                role="region"
                                aria-labelledby={`faq-question-${index}`}
                                aria-hidden={open !== index}
                            >
                                <div>
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}
