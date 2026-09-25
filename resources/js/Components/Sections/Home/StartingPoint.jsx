import { SectionHeading } from "@/Components/HomeUI";
import { homeMetrics } from "@/data/homeContent";

export function StartingPoint() {
    return (
        <section className="x8-container section-space starting-point">
            <SectionHeading
                eyebrow="O ponto de partida"
                description="Em muitas operações, a performance termina no relatório da campanha. Na X8, ela começa ali — e só termina quando aparece no caixa."
            >
                Mídia gera números.
                <br />
                Negócio precisa de resultado.
            </SectionHeading>
            <div className="performance-statements">
                {[
                    "Cliques não pagam a conta.",
                    "Leads sem qualidade não movimentam o negócio.",
                    "Dados sem direção não geram decisões.",
                ].map((text) => (
                    <p key={text} data-reveal>
                        {text}
                    </p>
                ))}
                <p className="statement-highlight" data-reveal>
                    Performance precisa ir
                    além da campanha.
                </p>
            </div>
            <div className="metrics-grid">
                {homeMetrics.map((metric, index) => (
                    <div key={metric.value} className="metric" data-reveal>
                        <span className="eyebrow">0{index + 1}</span>
                        <p className="metric-value">{metric.value}</p>
                        <p>{metric.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
