import { homeChart } from "@/data/homeContent";
import logo from "@/assets/img/logo.png";

const barTransition =
    "[transition:height_.5s_cubic-bezier(.22,1,.36,1),box-shadow_.5s_ease,filter_.5s_ease]";

export function GrowthChart() {
    return (
        <section
            className="x8-container pb-[120px] max-md:pb-0"
            aria-label="Comparativo de posicionamento da X8"
        >
            <div
                className="growth-chart group/chart relative rounded-[28px] border border-x8-border bg-[linear-gradient(170deg,#0c1b3d,rgba(7,16,41,.85)_62%,#050b15)] px-10 pb-4 pt-[30px] after:absolute after:inset-x-[15%] after:bottom-[-50px] after:top-[40%] after:z-[-1] after:bg-[#122959] after:opacity-40 after:blur-[70px] max-md:rounded-[22px] max-md:px-3.5 max-md:pb-[18px] max-md:pt-6"
                data-reveal
            >
                <p className="eyebrow normal-case text-x8-dim max-md:text-[10px]">
                    A [R]evolução do tráfego
                </p>
                <div className="grid grid-cols-5 gap-12 px-6 pt-7 max-desk:gap-[30px] max-md:gap-2.5 max-md:px-0 max-md:pt-[42px]">
                    {homeChart.map((item, index) => {
                        const isX8 = index === 4;
                        return (
                            <div key={item.name}>
                                <div className="flex h-[320px] items-end max-md:h-[210px]">
                                    <div
                                        className={`chart-bar relative h-[var(--bar-height)] w-full rounded-t-[5px] border border-[rgba(174,187,209,.12)] ${barTransition} ${
                                            isX8
                                                ? "bg-[linear-gradient(#d8e4f5,#2c6dda)] shadow-[0_0_55px_rgba(76,136,244,.34)] can-hover:group-hover/chart:h-[calc(var(--bar-height)+20px)] can-hover:group-hover/chart:shadow-[0_0_60px_rgba(76,136,244,.55),0_0_140px_rgba(76,136,244,.35)] can-hover:group-hover/chart:brightness-[1.08] can-hover:group-hover/chart:[transition:height_1.4s_cubic-bezier(.22,1,.36,1),box-shadow_.5s_ease,filter_.5s_ease]"
                                                : "bg-[linear-gradient(#35425a,#101725)] can-hover:group-hover/chart:h-[calc(var(--bar-height)*.82)]"
                                        }`}
                                        style={{
                                            "--bar-height": `${item.height}%`,
                                        }}
                                    >
                                        {isX8 && (
                                            <>
                                                <img
                                                    src={logo}
                                                    alt=""
                                                    className="absolute left-1/2 top-[-36px] w-14 -translate-x-1/2 max-md:top-[-27px] max-md:w-9"
                                                />
                                                <span className="absolute right-[calc(100%+24px)] top-3 whitespace-nowrap font-mono text-[11px] uppercase leading-[normal] tracking-[.06em] text-[#6b8cc3] max-md:right-[calc(100%+12px)] max-md:text-[8px]">
                                                    ≈ 4× mais crescimento →
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="border-t border-white/[.17] pt-3 text-[14px] text-x8-muted max-md:text-[10px] max-md:leading-[1.3]">
                                    <span>{item.name}</span>
                                    <small
                                        className={`mt-1 block font-mono text-[10px] uppercase leading-normal tracking-[.05em] max-md:text-[7px] max-md:leading-[1.4] max-md:tracking-normal ${isX8 ? "text-x8-accent" : "text-x8-dim"}`}
                                    >
                                        {item.detail}
                                    </small>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
