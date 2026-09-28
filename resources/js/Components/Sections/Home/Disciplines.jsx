import { SectionHeading } from "@/Components/HomeUI";
import { homeDisciplines } from "@/data/homeContent";
import logoSvg from "@/assets/img/logo.svg";

export function Disciplines() {
    return (
        <section
            className="disciplines relative bg-[radial-gradient(ellipse_at_45%_54%,#0e2047_0,rgba(7,16,41,.6)_48%,transparent_73%)] pb-[120px] pt-[100px] max-md:pb-16 max-md:pt-0"
            id="solucoes"
        >
            <img
                className="disciplines-watermark absolute bottom-[-20px] right-[-170px] w-[1000px] max-w-none opacity-[.12] [filter:brightness(.4)_sepia(1)_saturate(7)_hue-rotate(177deg)] max-md:bottom-[-30px] max-md:right-[-260px] max-md:w-[620px]"
                src={logoSvg}
                alt=""
                aria-hidden="true"
            />
            <div className="x8-container relative">
                <SectionHeading
                    eyebrow="O que a X8 conecta"
                    description="Cada frente trabalha para a próxima. É assim que investimento vira aprendizado — e aprendizado vira crescimento."
                >
                    Cinco disciplinas.
                    <br />
                    Uma única operação.
                </SectionHeading>
                <ol>
                    {homeDisciplines.map((discipline, index) => (
                        <li
                            key={discipline}
                            className="group/item flex items-center gap-20 border-b border-x8-border py-3 text-[clamp(42px,6.65vw,96px)] leading-[1.25] tracking-[-.035em] transition-[color,border-color,padding-left] duration-[350ms] ease-[ease] max-md:gap-6 max-md:py-[18px] max-md:text-[clamp(28px,7.6vw,52px)] can-hover:hover:border-b-x8-accent/[.45] can-hover:hover:pl-8 can-hover:hover:text-x8-accent"
                            data-reveal
                        >
                            <span className="eyebrow shrink-0 tracking-normal text-x8-dim transition-colors duration-[350ms] ease-[ease] max-md:text-[10px] can-hover:group-hover/item:text-x8-accent">
                                0{index + 1}
                            </span>
                            <span>{discipline}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
