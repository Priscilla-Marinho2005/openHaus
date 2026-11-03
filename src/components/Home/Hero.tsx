import { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
    const photoRef = useRef<HTMLImageElement>(null);
    const [photoReady, setPhotoReady] = useState(false);

    useEffect(() => {
        const photo = photoRef.current;
        if (photo?.complete && photo.naturalWidth > 0) {
            setPhotoReady(true);
        }
    }, []);

    return (
        <header className="relative flex min-h-svh items-center overflow-hidden bg-primary px-5 pb-16 pt-32 text-white sm:px-10 lg:px-35 lg:pb-16 lg:pt-20">
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="cine-photo absolute inset-0">
                    <img
                        src="/cittaJoseRufino-tiny.webp"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full scale-110 object-cover object-[70%_center] blur-2xl lg:object-center"
                    />
                    <img
                        ref={photoRef}
                        src="/cittaJoseRufino.webp"
                        alt="Empreendimento Citta José Ruffino ao entardecer"
                        width={1885}
                        height={834}
                        fetchPriority="high"
                        decoding="async"
                        onLoad={() => setPhotoReady(true)}
                        className={`absolute inset-0 h-full w-full object-cover object-[70%_center] transition-opacity duration-700 lg:object-center ${
                            photoReady ? "opacity-100" : "opacity-0"
                        }`}
                    />
                </div>
                <div className="absolute inset-0 bg-primary/70 lg:hidden" />
                <div className="absolute inset-0 hidden bg-linear-to-r from-primary/60 via-primary/10 to-transparent lg:block" />
            </div>

            <div className="pointer-events-none absolute -right-28 -top-44 z-1 hidden h-125 w-125 rounded-full border-[3px] border-secondary md:block" />
            <div className="pointer-events-none absolute left-[-20%] top-[92%] z-1 h-150 w-150 rounded-full border-[3px] border-secondary lg:left-[13%] lg:top-[86%] lg:h-270 lg:w-270" />

            <div className="relative z-10 w-full">
                <div className="flex max-w-xl flex-col gap-8">
                    <span className="cine-rise flex items-center gap-3" style={{ animationDelay: "0.35s" }}>
                        <span className="h-px w-10 shrink-0 bg-secondary"></span>
                        <p className="text-xs font-medium tracking-[0.22em] text-secondary uppercase">
                            OPEN HAUS NEGÓCIOS IMOBILIÁRIOS
                        </p>
                    </span>

                    <h1
                        className="cine-rise font-secondary text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
                        style={{ animationDelay: "0.55s" }}
                    >
                        Seu {" "}
                        <span className="text-secondary">imóvel </span>
                        novo começa aqui
                        <span className="inline-block origin-bottom animate-jump text-secondary">!</span>
                    </h1>
                    <p
                        className="cine-rise max-w-md text-base leading-relaxed text-gray"
                        style={{ animationDelay: "0.95s" }}
                    >
                        Imóveis, empreendimentos e oportunidades selecionadas para quem busca mais do que um endereço.
                    </p>

                    <div className="cine-rise flex flex-wrap items-center gap-4" style={{ animationDelay: "1.3s" }}>
                        <a
                            href="/#imoveis"
                            className="btn-lift inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary hover:bg-orange"
                        >
                            Ver empreendimentos
                            <FiArrowRight className="text-base" />
                        </a>
                        <a
                            href="https://wa.me/558185399988"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-lift rounded-md border border-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-white/10"
                        >
                            falar com um especialista
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
