import { ButtonLink } from "@/Components/HomeUI";
import logo from "@/assets/img/logo.svg";

export function NextStep() {
    return (
        <section className="next-step">
            <div className="x8-container" data-reveal>
                <p className="eyebrow">Próximo passo</p>
                <h2>
                    Sua performance entrega
                    <br className="desktop-break" /> números ou{" "}
                    <span>movimenta o negócio?</span>
                </h2>
                <p className="next-step-description">
                    O próximo nível da sua performance começa agora.
                </p>
                <div className="next-step-bottom">
                    <div className="button-group">
                        <ButtonLink light>Agendar diagnóstico</ButtonLink>
                        <ButtonLink>Falar com especialista</ButtonLink>
                    </div>
                    <div className="cta-logo">
                        <img src={logo} alt="X8" width="218" />
                        <span>
                            A (R)evolução
                            <br />
                            da performance
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
