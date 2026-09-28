import { SectionHeading } from "@/Components/HomeUI";
import { HeroProjectForm } from "@/Components/HeroProjectForm";

export function Contact() {
    return (
        <section className="bg-white py-[120px] text-x8-ink max-md:py-16" id="contato">
            <div className="x8-container">
                <SectionHeading
                    eyebrow="Fale com a X8"
                    light
                    layout="mb-[60px] grid grid-cols-[1.45fr_1fr] items-end gap-[65px] max-desk:gap-8 max-lg:grid-cols-1"
                    description={
                        <>
                            <p>
                                Conte um pouco sobre a sua operação. O primeiro
                                passo é sempre um diagnóstico da sua estrutura
                                de aquisição.
                            </p>
                            <ul className="mt-3.5 flex flex-wrap gap-2 [&>li]:rounded-[25px] [&>li]:bg-[#edf2fc] [&>li]:px-2.5 [&>li]:py-1 [&>li]:text-[12px] [&>li]:text-x8-royal">
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
