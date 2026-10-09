import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import denis from "../../assets/fotoDenis.jpeg";

function FounderPhoto() {
    return (
        <figure className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-md">
            <div className="aspect-4/5 overflow-hidden rounded-2xl">
                <img
                    src={denis}
                    alt="Denis Santos, fundador da Open Haus"
                    className="h-full w-full object-cover object-top"
                />
            </div>

            <figcaption className="mt-5 flex flex-col items-center gap-1 text-center lg:items-start lg:text-left">
                <span className="font-secondary text-2xl font-bold tracking-tight text-white">
                    Denis Santos
                </span>
                <span className="text-xs font-medium tracking-[0.22em] text-secondary uppercase">
                    Fundador
                </span>
            </figcaption>
        </figure>
    );
}

export default function About() {
    return (
        <section
            id="about"
            className="scroll-mt-28 bg-primary px-10 py-24 text-white lg:px-40"
        >
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="flex justify-center lg:justify-start">
                    <FounderPhoto />
                </div>

                <div className="flex flex-col gap-6">
                    <span className="flex items-center gap-3">
                        <span className="h-px w-10 shrink-0 bg-secondary" />
                        <p className="text-xs font-medium tracking-[0.22em] text-secondary uppercase">
                            Sobre nós
                        </p>
                    </span>

                    <h2 className="font-secondary text-4xl font-bold tracking-tight sm:text-5xl">
                        Uma imobiliária que encontra{" "}
                        <span className="text-secondary">oportunidades</span>
                    </h2>

                    <p className="max-w-lg text-base leading-relaxed text-gray">
                        A Open Haus Negócios Imobiliários nasceu para aproximar pessoas de
                        imóveis e empreendimentos escolhidos com critério. Não se trata só de
                        um endereço: cada oportunidade é avaliada pela localização, pelo
                        potencial e pelo estilo de vida de quem vai morar ou investir.
                    </p>
                    <p className="max-w-lg text-base leading-relaxed text-gray">
                        Acompanhamos o cliente do primeiro contato à chave na mão, com
                        atendimento próximo, transparência e olhar estratégico para quem busca
                        viver melhor ou dar o próximo passo no mercado imobiliário.
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                        <a
                            href="https://www.instagram.com/openhausimob/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram da Open Haus"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-green text-white transition hover:bg-secondary"
                        >
                            <FaInstagram className="text-lg" />
                        </a>
                        <a
                            href="https://wa.me/558185399988"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="WhatsApp da Open Haus"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-green text-white transition hover:bg-secondary"
                        >
                            <FaWhatsapp className="text-lg" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}