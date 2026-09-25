import { SectionHeading } from "@/Components/HomeUI";
import { homeCapabilities } from "@/data/homeContent";

const MethodArrow = () => (
    <svg className="method-arrow" width="40" height="10" viewBox="0 0 40 10" fill="none" stroke="currentColor" aria-hidden="true">
        <path className="method-arrow-line" d="M0 5h37" />
        <path className="method-arrow-head" d="m33 9 4-4-4-4" />
    </svg>
);

export function Method() {
    return (
        <section className="method section-space" id="metodo">
            <div className="x8-container">
                <SectionHeading eyebrow="Método">
                    Tudo conectado.
                    <br />
                    Tudo orientado à performance.
                </SectionHeading>
                <ol className="method-flow" data-reveal>
                    {["Planejar", "Ativar", "Medir", "Aprender", "Evoluir"].map(
                        (step, index) => (
                            <li key={step}>
                                <span
                                    className={`method-step ${index === 4 ? "method-final" : ""}`}
                                >
                                    {step}
                                </span>
                                {index < 4 && <MethodArrow />}
                            </li>
                        ),
                    )}
                </ol>
                <div className="capabilities" data-reveal>
                    <p className="eyebrow">O que entra na operação</p>
                    <ul>
                        {homeCapabilities.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
