import { SectionHeading } from "@/Components/HomeUI";
import { homeSteps } from "@/data/homeContent";

const hoverFade = "transition-colors duration-[400ms] ease-[ease]";

export function Implementation() {
    return (
        <section
            className="implementation overflow-clip bg-[linear-gradient(0deg,#122959_0,rgba(12,27,61,.5)_60%,transparent_100%)] pb-[90px] pt-[100px] max-md:py-16"
            id="implantacao"
        >
            <div className="x8-container">
                <SectionHeading
                    eyebrow="Implantação"
                    description="Noventa dias para sair do diagnóstico e chegar a uma operação que aprende com os próprios dados."
                >
                    A implantação da operação
                    <br />
                    acontece em três etapas.
                </SectionHeading>
                <div className="steps-grid grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:gap-10" data-reveal>
                    {homeSteps.map((step, index) => (
                        <article key={step.title} className="group/step">
                            <span
                                className="relative block text-[172px] font-semibold leading-none tracking-[-.05em] text-transparent [-webkit-text-stroke:1px_#48679b] [transition:-webkit-text-stroke-color_.4s_ease] after:absolute after:inset-0 after:bg-[linear-gradient(180deg,#d8e4f5_0%,#86aaf2_45%,#397ded_100%)] after:bg-clip-text after:opacity-0 after:transition-opacity after:duration-[400ms] after:ease-[ease] after:content-[attr(data-number)] after:[-webkit-text-fill-color:transparent] after:[-webkit-text-stroke:0] max-lg:text-[130px] max-md:text-[125px] can-hover:group-hover/step:[-webkit-text-stroke-color:transparent] can-hover:group-hover/step:after:opacity-100"
                                data-number={`0${index + 1}`}
                                aria-hidden="true"
                            >
                                0{index + 1}
                            </span>
                            <p className={`eyebrow mb-[22px] mt-3 flex items-center gap-3 text-x8-muted after:h-px after:flex-1 after:bg-[rgba(174,187,209,.25)] after:transition-colors after:duration-[400ms] after:ease-[ease] ${hoverFade} can-hover:group-hover/step:text-white can-hover:group-hover/step:after:bg-[rgba(174,187,209,.5)]`}>
                                {step.month}
                            </p>
                            <h3 className={`mb-5 text-[30px] tracking-[-.02em] text-x8-accent ${hoverFade} can-hover:group-hover/step:text-white`}>
                                {step.title}
                            </h3>
                            <ul className={`list-disc pl-[22px] text-[15px] leading-[1.8] text-x8-muted ${hoverFade} max-lg:text-[14px] max-md:text-[16px] can-hover:group-hover/step:text-x8-soft`}>
                                {step.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
