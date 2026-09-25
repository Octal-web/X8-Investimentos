import { SectionHeading } from "@/Components/HomeUI";
import { homeDisciplines } from "@/data/homeContent";
import logoSvg from "@/assets/img/logo.svg";

export function Disciplines() {
    return (
        <section className="disciplines section-space" id="solucoes">
            <img
                className="disciplines-watermark"
                src={logoSvg}
                alt=""
                aria-hidden="true"
            />
            <div className="x8-container">
                <SectionHeading
                    eyebrow="O que a X8 conecta"
                    description="Cada frente trabalha para a próxima. É assim que investimento vira aprendizado — e aprendizado vira crescimento."
                >
                    Cinco disciplinas.
                    <br />
                    Uma única operação.
                </SectionHeading>
                <ol className="discipline-list">
                    {homeDisciplines.map((discipline, index) => (
                        <li key={discipline} data-reveal>
                            <span className="eyebrow">0{index + 1}</span>
                            <span>{discipline}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
