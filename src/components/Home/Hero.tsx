import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
    return (
        <header className="relative flex min-h-0 items-center overflow-hidden bg-primary px-5 pb-12 pt-24 text-white sm:px-10 lg:min-h-screen lg:px-35 lg:pb-16 lg:pt-20">
            <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-6">
                <div className="flex flex-col gap-8">
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
                            href="https://wa.me/5581988398888"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-md border border-gray px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-gray transition hover:bg-white/10"
                        >
                            falar com um especialista
                        </a>
                    </div>
                </div>

                <div className="relative h-52 w-full sm:h-64 md:h-80 lg:h-[min(65vh,650px)]">
                    <div className="pointer-events-none absolute -right-10 -top-12 z-0 h-64 w-64 rounded-full border-[3px] border-secondary sm:h-80 sm:w-80 lg:h-104 lg:w-104" />
                    <img
                        src="https://res.cloudinary.com/dkgjwrjpv/image/upload/v1782485175/faxada_-_cita_jose_ruffino_vxgkqa.jpg"
                        alt=""
                        className="relative z-10 h-full w-full rounded-2xl object-cover"
                    />
                </div>
            </div>
        </header>
    );
}
