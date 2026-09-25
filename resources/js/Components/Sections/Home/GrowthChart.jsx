import { homeChart } from "@/data/homeContent";
import logo from "@/assets/img/logo.png";

export function GrowthChart() {
    return (
        <section
            className="x8-container growth-section"
            aria-label="Comparativo de posicionamento da X8"
        >
            <div className="growth-chart" data-reveal>
                <p className="eyebrow">A [R]evolução do tráfego</p>
                <div className="chart-columns">
                    {homeChart.map((item, index) => (
                        <div
                            className={`chart-column ${index === 4 ? "chart-column-x8" : ""}`}
                            key={item.name}
                        >
                            <div className="chart-track">
                                <div
                                    className="chart-bar"
                                    style={{
                                        "--bar-height": `${item.height}%`,
                                    }}
                                >
                                    {index === 4 && (
                                        <>
                                            <img
                                                src={logo}
                                                alt=""
                                                className="chart-logo"
                                            />
                                            <span className="chart-annotation">
                                                ≈ 4× mais crescimento →
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="chart-label">
                                <span>{item.name}</span>
                                <small>{item.detail}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
