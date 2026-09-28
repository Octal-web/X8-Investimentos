import { SectionHeading } from "@/Components/HomeUI";
import { homeMetrics } from "@/data/homeContent";

const statement =
    "border-t py-[26px] text-[clamp(24px,3.06vw,44px)] leading-[1.35] tracking-[-.025em] transition-[color,padding-left] duration-[350ms] ease-[ease] before:-ml-6 before:mb-2 before:mr-6 before:inline-block before:bg-x8-blue before:align-middle before:transition-all before:duration-[350ms] before:ease-[ease] max-md:py-[22px] max-md:text-[25px]";

export function StartingPoint() {
    return (
        <section className="x8-container pb-0 pt-20 max-md:py-16">
            <SectionHeading
                eyebrow="O ponto de partida"
                description="Em muitas operações, a performance termina no relatório da campanha. Na X8, ela começa ali — e só termina quando aparece no caixa."
            >
                Mídia gera números.
                <br />
                Negócio precisa de resultado.
            </SectionHeading>
            <div>
                {[
                    "Cliques não pagam a conta.",
                    "Leads sem qualidade não movimentam o negócio.",
                    "Dados sem direção não geram decisões.",
                ].map((text) => (
                    <p
                        key={text}
                        className={`${statement} border-x8-border px-6 text-white/[.32] before:h-5 before:w-0 max-md:px-0 can-hover:hover:pl-0 can-hover:hover:text-white can-hover:hover:before:ml-0 can-hover:hover:before:h-0.5 can-hover:hover:before:w-6`}
                        data-reveal
                    >
                        {text}
                    </p>
                ))}
                <p
                    className={`${statement} border-x8-accent/[.35] pl-0 pr-6 text-x8-accent before:ml-0 before:h-0.5 before:w-6 max-md:pr-0`}
                    data-reveal
                >
                    Performance precisa ir
                    além da campanha.
                </p>
            </div>
            <div className="mt-[88px] grid grid-cols-4 border-y border-x8-border max-md:mt-12 max-md:grid-cols-2">
                {homeMetrics.map((metric, index) => (
                    <div
                        key={metric.value}
                        className="group/metric relative overflow-hidden border-l border-x8-border p-7 transition-[border-color] duration-500 ease-[ease] before:pointer-events-none before:absolute before:inset-0 before:translate-y-full before:bg-[linear-gradient(to_top,rgba(46,115,229,.12),rgba(46,115,229,0))] before:transition-transform before:duration-700 before:ease-[ease-out] hover:border-x8-blue hover:before:translate-y-0 max-desk:px-4 max-desk:py-6 max-md:border-b max-md:px-3 max-md:py-[22px]"
                        data-reveal
                    >
                        <span className="eyebrow">0{index + 1}</span>
                        <p className="mb-3 mt-11 whitespace-nowrap bg-[linear-gradient(110deg,#fff_0_40%,#c9d1e2_60%,#80a2da_100%)] bg-[length:250%_100%] bg-[position:0_0] bg-clip-text text-[clamp(35px,4.1vw,60px)] leading-[1.1] tracking-[-.06em] text-white transition-[background-position] duration-[600ms] ease-[ease] [-webkit-text-fill-color:transparent] group-hover/metric:bg-[position:100%_0] max-lg:text-[39px] max-md:mt-[30px] max-md:text-[clamp(31px,7vw,48px)]">
                            {metric.value}
                        </p>
                        <p className="text-[15px] leading-normal text-x8-muted max-md:text-[12px]">
                            {metric.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
