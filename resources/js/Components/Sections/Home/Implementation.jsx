import { SectionHeading } from "@/Components/HomeUI";
import { homeSteps } from "@/data/homeContent";

export function Implementation() {
    return (
        <section className="implementation section-space" id="implantacao">
            <div className="x8-container">
                <SectionHeading
                    eyebrow="Implantação"
                    description="Noventa dias para sair do diagnóstico e chegar a uma operação que aprende com os próprios dados."
                >
                    A implantação da operação
                    <br />
                    acontece em três etapas.
                </SectionHeading>
                <div className="steps-grid" data-reveal>
                    {homeSteps.map((step, index) => (
                        <article key={step.title}>
                            <span className="step-number" data-number={`0${index + 1}`} aria-hidden="true">
                                0{index + 1}
                            </span>
                            <p className="step-month eyebrow">{step.month}</p>
                            <h3>{step.title}</h3>
                            <ul>
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
