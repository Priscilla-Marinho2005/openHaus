import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
    return (
        <header className="relative flex min-h-0 items-center overflow-hidden bg-primary px-5 pb-16 pt-32 text-white sm:px-10 lg:min-h-screen lg:px-35 lg:pb-16 lg:pt-20">
            {/* Imagem de fundo */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <img
                    src="/cittaJoseRufino.png"
                    alt="Empreendimento Citta José Ruffino ao entardecer"
                    className="h-full w-full object-cover object-[70%_center] lg:object-center"
                />
                {/* Mobile: escurece para garantir leitura do texto */}
                <div className="absolute inset-0 bg-primary/70 lg:hidden" />
                {/* Desktop: leve degradê à esquerda para reforçar o texto */}
                <div className="absolute inset-0 hidden bg-linear-to-r from-primary/60 via-primary/10 to-transparent lg:block" />
            </div>

            {/* Arco laranja superior direito */}
            <div className="pointer-events-none absolute -right-28 -top-44 z-1 hidden h-125 w-125 rounded-full border-[3px] border-secondary md:block" />

            {/* Arco laranja inferior */}
            <div className="pointer-events-none absolute left-[-20%] top-[92%] z-1 h-150 w-150 rounded-full border-[3px] border-secondary lg:left-[13%] lg:top-[86%] lg:h-270 lg:w-270" />

            {/* Conteúdo */}
            <div className="relative z-10 w-full">
                <div className="flex max-w-xl flex-col gap-8">
                    <span className="flex items-center gap-3">
                        <span className="h-px w-10 shrink-0 bg-secondary"></span>
                        <h1 className="text-xs font-medium tracking-[0.22em] text-secondary uppercase">
                            OPEN HAUS NEGÓCIOS IMOBILIÁRIOS
                        </h1>
                    </span>

                    <h2 className="font-secondary text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                        Seu {" "}
                        <span className="text-secondary">imóvel </span>
                        novo começa aqui
                        <span className="inline-block origin-bottom animate-jump text-secondary">!</span>
                    </h2>
                    <p className="max-w-md text-base leading-relaxed text-gray">
                        Imóveis, empreendimentos e oportunidades selecionadas para quem busca mais do que um endereço.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <a
                            href="/#imoveis"
                            className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary transition hover:bg-orange"
                        >
                            Ver empreendimentos
                            <FiArrowRight className="text-base" />
                        </a>
                        <a
                            href="https://wa.me/558185399988"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-md border border-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
                        >
                            falar com um especialista
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}