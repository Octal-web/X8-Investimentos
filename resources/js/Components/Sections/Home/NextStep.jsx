import { ButtonLink } from "@/Components/HomeUI";
import logo from "@/assets/img/logo.svg";

const buttonSize = "max-md:px-[18px] max-md:py-3 max-md:text-[13px]";

export function NextStep() {
    return (
        <section className="relative overflow-clip bg-[linear-gradient(150deg,#040914_8%,#102751_45%,#3479e9_100%)] pb-[125px] pt-[150px] before:pointer-events-none before:absolute before:right-[-60px] before:top-[-50px] before:h-[980px] before:w-[680px] before:bg-[url('../js/assets/img/arrow-shape.svg')] before:bg-[length:100%_100%] before:bg-center before:bg-no-repeat max-md:py-20 max-md:before:h-[588px] max-md:before:w-[408px]">
            <div className="x8-container relative" data-reveal>
                <p className="eyebrow mb-[30px]">Próximo passo</p>
                <h2 className="max-w-[980px] text-[clamp(42px,5.55vw,80px)] font-normal leading-[1.04] tracking-[-.045em] max-md:text-[43px]">
                    Sua performance entrega
                    <br className="max-md:hidden" /> números ou{" "}
                    <span className="bg-[linear-gradient(110deg,#86aaf2,#397ded)] bg-clip-text text-x8-accent [-webkit-text-fill-color:transparent]">
                        movimenta o negócio?
                    </span>
                </h2>
                <p className="mt-8 text-[22px] text-x8-ice max-md:text-[18px]">
                    O próximo nível da sua performance começa agora.
                </p>
                <div className="mt-9 flex items-end justify-between gap-[30px] max-md:mt-[30px]">
                    <div className="flex flex-wrap gap-3">
                        <ButtonLink light className={buttonSize}>Agendar diagnóstico</ButtonLink>
                        <ButtonLink className={buttonSize}>Falar com especialista</ButtonLink>
                    </div>
                    <div className="flex items-end gap-6 max-lg:hidden">
                        <img src={logo} alt="X8" width="218" className="w-[218px] max-desk:w-[150px]" />
                        <span className="text-[14px] leading-[1.25] tracking-[.025em] text-[#c7d8f4]">
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
