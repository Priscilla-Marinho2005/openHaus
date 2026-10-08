import { useEffect, useState } from "react";
import { FaGoogle, FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
    {
        url: "https://share.google/5XevNKSczgnMs61gf",
        name: "Thamyres Vitória",
        context: "Avaliação no Google",
        quote: "Fui bem recebida, a empresa tem um ambiente agradável e tranquilo. Denis, o CEO da imobiliária, é muito simpático e acolhedor! 👏👏",
    },
    {
        url: "https://share.google/R1wDDRqJV4lTEk0AF",
        name: "Gabriel Castro",
        context: "Avaliação no Google",
        quote: "A open Haus foi uma excelente empresa na solução da busca pela minha casa própria, profissionais atenciosos e me ajudaram a encontrar a melhor opção para mim, recomendo Muito essa empresa e seus profissionais!",
    },
    {
        url: "https://share.google/zh6WJfMaTkzKHCcXP",
        name: "Denis Henrique",
        context: "Avaliação no Google",
        quote: "Ótimo atendimento!",
    },
    {
        url: "https://share.google/Bd6pSFoPzQRLorMjC",
        name: "Eduardo",
        context: "Avaliação no Google",
        quote: "Muito bom, recomendo demais.",
    },
];

export default function Testimonials() {
    const [index, setIndex] = useState(0);
    const [perView, setPerView] = useState(2);
    const [paused, setPaused] = useState(false);
    const maxIndex = Math.max(0, testimonials.length - perView);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 768px)");
        const update = () => {
            const nextPerView = media.matches ? 2 : 1;
            setPerView(nextPerView);
            setIndex((current) => Math.min(current, Math.max(0, testimonials.length - nextPerView)));
        };
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (paused) return;
        const timer = window.setInterval(() => {
            setIndex((current) => (current >= maxIndex ? 0 : current + 1));
        }, 5000);
        return () => window.clearInterval(timer);
    }, [maxIndex, paused]);

    const prev = () => {
        setIndex((current) => (current <= 0 ? maxIndex : current - 1));
    };

    const next = () => {
        setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    };

    return (
        <section
            id="depoimentos"
            className="scroll-mt-28 bg-primary px-10 py-24 text-white lg:px-40"
        >
            <div className="mb-12 flex items-end justify-between gap-6">
                <div className="flex flex-col gap-4">
                    <span className="flex items-center gap-3">
                        <span className="h-px w-10 shrink-0 bg-secondary" />
                        <p className="text-xs font-medium tracking-[0.22em] text-secondary uppercase">
                            Depoimentos
                        </p>
                    </span>
                    <h2 className="font-secondary max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
                        Quem vive a experiência Haus.
                    </h2>
                    <p className="flex items-center gap-2 text-sm text-gray">
                        <FaGoogle className="text-secondary" />
                        Avaliações reais publicadas no Google.
                    </p>
                </div>

                <div className="hidden items-center gap-3 sm:flex">
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Depoimento anterior"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-secondary hover:text-secondary"
                    >
                        <FiChevronLeft className="text-xl" />
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Próximo depoimento"
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-secondary hover:text-secondary"
                    >
                        <FiChevronRight className="text-xl" />
                    </button>
                </div>
            </div>

            <div
                className="-mx-3 overflow-hidden"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div
                    className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
                >
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.url}
                            className="box-border px-3"
                            style={{ flex: `0 0 ${100 / perView}%` }}
                        >
                        <a
                            href={testimonial.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex min-h-65 flex-col gap-5 rounded-2xl border border-white/10 bg-green p-8 transition duration-300 hover:border-white/20"
                        >
                            <div className="flex items-center gap-1 text-secondary">
                                {Array.from({ length: 5 }).map((_, star) => (
                                    <FaStar key={star} className="text-sm" />
                                ))}
                            </div>
                            <p className="text-base leading-relaxed text-white">
                                “{testimonial.quote}”
                            </p>
                            <div className="mt-auto">
                                <p className="text-sm font-semibold">{testimonial.name}</p>
                                <p className="text-xs text-gray">{testimonial.context}</p>
                            </div>
                        </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex items-center gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
                    <button
                        key={dotIndex}
                        type="button"
                        onClick={() => setIndex(dotIndex)}
                        aria-label={`Ir para o depoimento ${dotIndex + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                            index === dotIndex ? "w-8 bg-secondary" : "w-4 bg-white/25"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
