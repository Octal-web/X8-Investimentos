import { SectionHeading } from "@/Components/HomeUI";
import { HeroProjectForm } from "@/Components/HeroProjectForm";

export function Contact() {
    return (
        <section className="contact-section section-space" id="contato">
            <div className="x8-container">
                <SectionHeading
                    eyebrow="Fale com a X8"
                    description={
                        <>
                            <p>
                                Conte um pouco sobre a sua operação. O primeiro
                                passo é sempre um diagnóstico da sua estrutura
                                de aquisição.
                            </p>
                            <ul className="contact-badges">
                                <li>◎ Diagnóstico</li>
                                <li>▧ Planejamento</li>
                                <li>◷ Implantação em 90 dias</li>
                            </ul>
                        </>
                    }
                >
                    Vamos desenhar a próxima
                    <br />
                    fase do seu crescimento
                </SectionHeading>
                <HeroProjectForm fieldPrefix="contact" variant="light" />
            </div>
        </section>
    );
}
