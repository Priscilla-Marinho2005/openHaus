import { FiArrowRight } from "react-icons/fi";

export default function CTA() {
    return (
        <section id="contato" className="relative overflow-hidden border-t border-white/10 bg-primary px-10 py-28 text-center text-white lg:px-40">
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6">
                <h2 className="font-secondary text-4xl font-bold tracking-tight uppercase sm:text-5xl lg:text-6xl">
                    Seu próximo negócio
                    <br />
                    começa aqui.
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-gray">
                    Encontre imóveis e oportunidades alinhadas ao que você procura.
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                    <a
                        href="https://wa.me/5581988398888"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3.5 text-sm font-semibold tracking-wide text-white uppercase transition hover:bg-orange"
                    >
                        Falar com a Haus
                        <FiArrowRight className="text-base" />
                    </a>
                    <a
                        href="#imoveis"
                        className="rounded-md border border-white/40 px-6 py-3.5 text-sm font-semibold tracking-wide text-white uppercase transition hover:bg-white/10"
                    >
                        Ver empreendimentos
                    </a>
                </div>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-1/2 h-[min(78vw,760px)] w-[min(96vw,980px)] -translate-x-1/2 translate-y-[48%]">
                <div className="h-full w-full animate-spin-slow">
                    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
                        <circle
                            cx="100"
                            cy="100"
                            r="93"
                            fill="none"
                            stroke="#FF6600"
                            strokeWidth="1.35"
                            strokeLinecap="round"
                            strokeDasharray="430 155"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}
