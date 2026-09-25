import { Arrow, ButtonLink, SectionHeading } from "@/Components/HomeUI";
import { homePlans, homeDeliverables } from "@/data/homePlans";
import logo from "@/assets/img/logo.png";

export function Plans() {
    return (
        <section className="x8-container section-space plans" id="planos">
            <SectionHeading
                eyebrow="Soluções"
                description="Três formatos de operação, do primeiro passo estruturado à inteligência aplicada em escala. Você entra no ponto certo — e evolui a partir dele."
            >
                Uma solução
                <br />
                para cada momento.
            </SectionHeading>
            <div className="plan-grid">
                {homePlans.map((plan) => (
                    <article className="plan-card" key={plan.name} data-reveal>
                        <div className="plan-card-top">
                            <p className="eyebrow">{plan.stage}</p>
                            <img src={logo} alt="X8" width="40" />
                        </div>
                        <h3>{plan.name}</h3>
                        <p className="plan-description">{plan.description}</p>
                        <a href="#entregaveis">
                            Ver entregáveis
                            <span className="circle-arrow">
                                <Arrow />
                            </span>
                        </a>
                    </article>
                ))}
            </div>
            <div
                id="entregaveis"
                className="table-scroll"
                role="region"
                aria-label="Comparação de entregáveis dos planos"
                tabIndex={0}
            >
                <table className="plan-table">
                    <caption className="sr-only">
                        Entregáveis dos planos Performance, Growth e Scale
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col">Entregável</th>
                            {homePlans.map((plan) => (
                                <th scope="col" key={plan.name}>
                                    <img src={logo} alt="X8" width="40" />
                                    {plan.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {homeDeliverables.map(([name, ...values]) => (
                            <tr key={name}>
                                <th scope="row">{name}</th>
                                {values.map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td />
                            <td>
                                <ButtonLink>
                                    Fale com nosso especialista
                                </ButtonLink>
                            </td>
                            <td>
                                <ButtonLink>
                                    Fale com nosso especialista
                                </ButtonLink>
                            </td>
                            <td>
                                <ButtonLink>
                                    Fale com nosso especialista
                                </ButtonLink>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </section>
    );
}
