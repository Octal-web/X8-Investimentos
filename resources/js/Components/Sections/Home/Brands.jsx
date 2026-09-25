import { SectionHeading } from "@/Components/HomeUI";
import { homeBrands, brandImage } from "@/data/homeBrands";
import logo from "@/assets/img/logo.png";

export function Brands() {
    return (
        <section className="x8-container brands section-space" id="marcas">
            <SectionHeading
                eyebrow="Trajetória"
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
            <div className="brand-grid">
                {homeBrands.map((brand) => (
                    <div className="brand-cell" key={brand.name}>
                        <img
                            src={brand.image}
                            alt={brand.name}
                            loading="lazy"
                            width="140"
                            height="50"
                        />
                    </div>
                ))}
                <div className="group-cell">
                    <p className="eyebrow">Somos parte da 8poroito</p>
                    <div>
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
