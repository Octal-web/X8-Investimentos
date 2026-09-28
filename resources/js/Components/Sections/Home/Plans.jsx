import { Arrow, ButtonLink, SectionHeading } from "@/Components/HomeUI";
import { homePlans, homeDeliverables } from "@/data/homePlans";
import logo from "@/assets/img/logo.png";

const cell = "border-t border-x8-border text-[15px] font-normal leading-normal text-x8-muted max-md:text-[13px]";
const bodyCell = `${cell} px-6 py-4 max-md:px-4 max-md:py-3.5`;
const firstColumn = "w-[35%] text-left max-md:w-[30%]";

export function Plans() {
    return (
        <section className="x8-container pb-[100px] pt-[70px] max-md:py-16" id="planos">
            <SectionHeading
                eyebrow="Soluções"
                description="Três formatos de operação, do primeiro passo estruturado à inteligência aplicada em escala. Você entra no ponto certo — e evolui a partir dele."
            >
                Uma solução
                <br />
                para cada momento.
            </SectionHeading>
            <div className="plan-grid grid grid-cols-3 gap-4 max-lg:gap-3 max-md:grid-cols-1 max-md:gap-5">
                {homePlans.map((plan) => (
                    <article
                        className="plan-card relative isolate overflow-hidden rounded-[22px] border border-x8-border bg-x8-panel p-8 transition-[border-color,background] duration-[250ms] before:pointer-events-none before:absolute before:left-1/2 before:top-[-170px] before:z-[-1] before:h-[260px] before:w-[120%] before:-translate-x-1/2 before:rounded-[50%] before:bg-[#517ef8] before:opacity-0 before:blur-[60px] before:transition-opacity before:duration-[400ms] before:ease-[ease] hover:border-[#354c77] hover:bg-[#0b1733] hover:before:opacity-30 max-desk:p-[26px] max-lg:p-[22px] max-md:p-7"
                        key={plan.name}
                    >
                        <div className="flex items-center justify-between">
                            <p className="eyebrow">{plan.stage}</p>
                            <img src={logo} alt="X8" width="40" className="opacity-50" />
                        </div>
                        <h3 className="mb-[22px] mt-[120px] text-[36px] leading-[1.15] tracking-[-.03em] max-lg:mt-[85px] max-lg:text-[29px] max-md:mt-[60px] max-md:text-[36px]">
                            {plan.name}
                        </h3>
                        <p className="min-h-[80px] text-[17px] leading-normal text-x8-muted max-desk:min-h-[104px] max-lg:text-[15px] max-md:min-h-0 max-md:text-[17px]">
                            {plan.description}
                        </p>
                        <a
                            href="#entregaveis"
                            className="mt-7 flex items-center justify-between border-t border-x8-border pt-5 text-[14px] text-x8-soft"
                        >
                            Ver entregáveis
                            <span className="grid size-9 place-items-center rounded-full border border-[rgba(174,187,209,.3)]">
                                <Arrow />
                            </span>
                        </a>
                    </article>
                ))}
            </div>
            <div
                id="entregaveis"
                className="mt-[160px] overflow-x-auto rounded-3xl border border-x8-border bg-[#060e20] max-md:mt-14 max-md:rounded-2xl"
                role="region"
                aria-label="Comparação de entregáveis dos planos"
                tabIndex={0}
            >
                <table className="w-full min-w-[760px] border-collapse">
                    <caption className="sr-only">
                        Entregáveis dos planos Performance, Growth e Scale
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col" className={`px-6 pb-6 pt-[30px] align-bottom text-[22px] font-normal text-[#eef2fa] max-md:text-[18px] ${firstColumn}`}>
                                Entregável
                            </th>
                            {homePlans.map((plan) => (
                                <th
                                    scope="col"
                                    key={plan.name}
                                    className="px-6 pb-6 pt-[30px] align-bottom text-[22px] font-normal text-[#eef2fa] max-md:text-[18px]"
                                >
                                    <img src={logo} alt="X8" width="40" className="mx-auto mb-2.5" />
                                    {plan.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {homeDeliverables.map(([name, ...values]) => (
                            <tr key={name} className="hover:bg-x8-accent/[.04]">
                                <th scope="row" className={`${bodyCell} ${firstColumn}`}>
                                    {name}
                                </th>
                                {values.map((value, index) => (
                                    <td key={index} className={`${bodyCell} text-center`}>
                                        {value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-[#091430]">
                        <tr>
                            <td className={`${cell} px-3 pb-10 pt-8 text-center`} />
                            {[0, 1, 2].map((index) => (
                                <td key={index} className={`${cell} px-3 pb-10 pt-8 text-center`}>
                                    <ButtonLink
                                        className="min-h-12 whitespace-nowrap px-4 py-3 text-[13px]"
                                        arrowClassName="hidden"
                                    >
                                        Fale com nosso especialista
                                    </ButtonLink>
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    );
}
