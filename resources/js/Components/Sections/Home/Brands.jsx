import { SectionHeading } from "@/Components/HomeUI";
import { homeBrands, brandImage } from "@/data/homeBrands";
import logo from "@/assets/img/logo.png";

export function Brands() {
    return (
        <section className="x8-container pb-[100px] pt-[120px] max-md:py-16" id="marcas">
            <SectionHeading
                eyebrow="Trajetória"
                layout="mb-[72px] grid grid-cols-[1.5fr_1fr] items-start gap-[65px] max-desk:gap-10 max-md:mb-10 max-md:grid-cols-1 max-md:gap-6"
                description={
                    <>
                        <p>
                            Antes da X8 existir, já existia uma trajetória
                            construída ao lado de grandes marcas e de trabalhos
                            que geraram impacto real para os negócios.
                        </p>
                        <p>
                            A X8 surge para acelerar esse movimento. Com dados,
                            tecnologia e inteligência de performance, ampliamos
                            o potencial de marcas que querem evoluir sem
                            depender de fórmulas prontas.
                        </p>
                    </>
                }
            >
                Marcas que contam
                <br />a história do nosso grupo.
            </SectionHeading>
            <div className="grid grid-cols-5 border-t border-x8-border max-md:grid-cols-3">
                {homeBrands.map((brand, index) => (
                    <div
                        className={`group/brand relative grid min-h-[120px] place-items-center border-b border-r border-x8-border before:absolute before:inset-[-1px] before:rounded-[15px] before:border before:border-x8-accent before:bg-white/5 before:opacity-0 before:transition-opacity before:duration-[250ms] hover:before:opacity-[.35] max-md:min-h-[95px] ${(index + 1) % 5 === 0 ? "md:border-r-0" : ""} ${(index + 1) % 3 === 0 ? "max-md:border-r-0" : ""}`}
                        key={brand.name}
                    >
                        <img
                            src={brand.image}
                            alt={brand.name}
                            loading="lazy"
                            width="140"
                            height="50"
                            className="h-[50px] w-[140px] object-contain opacity-[.42] transition-opacity duration-[250ms] group-hover/brand:opacity-90 max-lg:h-[45px] max-lg:w-[110px] max-md:h-10 max-md:max-w-[80%]"
                        />
                    </div>
                ))}
                <div className="col-span-2 border-b border-x8-border bg-x8-panel p-[30px] max-desk:p-6 max-md:col-span-full">
                    <p className="eyebrow mb-3 text-[11px]">Somos parte da 8poroito</p>
                    <div className="flex items-center gap-7 max-desk:gap-4 max-md:gap-7 [&>img]:object-contain max-desk:[&>img]:max-w-[30%] max-md:[&>img]:max-w-[28%]">
                        <img
                            src={brandImage("8poroito")}
                            alt="8poroito"
                            width="92"
                            height="26"
                            loading="lazy"
                        />
                        <img
                            src={brandImage("octa")}
                            alt="Octa Web"
                            width="100"
                            height="20"
                            loading="lazy"
                        />
                        <img src={logo} alt="X8" width="60" loading="lazy" />
                    </div>
                </div>
            </div>
        </section>
    );
}
