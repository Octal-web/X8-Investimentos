import { SectionHeading } from "@/Components/HomeUI";
import { homeCapabilities } from "@/data/homeContent";

const MethodArrow = () => (
    <svg className="h-auto w-10 shrink-0 text-x8-accent/50 max-md:w-5" width="40" height="10" viewBox="0 0 40 10" fill="none" stroke="currentColor" aria-hidden="true">
        <path className="method-arrow-line" d="M0 5h37" />
        <path className="method-arrow-head" d="m33 9 4-4-4-4" />
    </svg>
);

export function Method() {
    return (
        <section
            className="relative bg-[radial-gradient(ellipse_470px_240px_at_50%_65%,#102653,transparent)] pb-[100px] pt-20 text-center max-md:py-16"
            id="metodo"
        >
            <div className="x8-container">
                <SectionHeading eyebrow="Método" layout="mb-[68px] max-md:mb-9">
                    Tudo conectado.
                    <br />
                    Tudo orientado à performance.
                </SectionHeading>
                <ol
                    className="method-flow m-auto flex max-w-[800px] items-center justify-between rounded-[50px] border border-x8-accent/30 bg-[rgba(12,27,61,.65)] py-2 pl-6 pr-2 max-md:flex-wrap max-md:justify-center max-md:gap-x-1 max-md:gap-y-5 max-md:rounded-[22px] max-md:px-3 max-md:py-[18px]"
                    data-reveal
                >
                    {["Planejar", "Ativar", "Medir", "Aprender", "Evoluir"].map(
                        (step, index) => (
                            <li
                                key={step}
                                className="flex flex-1 items-center justify-around gap-3 text-[18px] text-x8-muted last:flex-none max-md:flex-[0_1_auto] max-md:gap-2.5 max-md:text-[14px]"
                            >
                                <span
                                    className={`method-step inline-block ${index === 4 ? "ml-4 rounded-[40px] bg-[linear-gradient(110deg,#2f74e6,#1f5bd6)] px-7 py-4 text-white shadow-[0_4px_22px_#2f74e64d] max-md:px-[18px] max-md:py-2.5" : ""}`}
                                >
                                    {step}
                                </span>
                                {index < 4 && <MethodArrow />}
                            </li>
                        ),
                    )}
                </ol>
                <div className="mx-auto mt-[70px] max-w-[880px] max-md:mt-10" data-reveal>
                    <p className="eyebrow mb-6 text-[14px] tracking-normal text-x8-dim">O que entra na operação</p>
                    <ul className="flex flex-wrap justify-center gap-3 max-md:gap-2">
                        {homeCapabilities.map((item) => (
                            <li
                                key={item}
                                className="rounded-[40px] border border-x8-accent/[.35] px-[18px] py-2.5 text-[16px] leading-normal text-x8-soft max-md:px-3 max-md:py-[9px] max-md:text-[13px]"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
