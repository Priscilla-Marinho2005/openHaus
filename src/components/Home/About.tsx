import { FaInstagram, FaWhatsapp } from "react-icons/fa";

function FacadeIllustration() {
    return (
        <svg
            viewBox="0 0 420 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-auto w-full max-w-105"
            aria-hidden
        >
            <circle cx="318" cy="78" r="92" stroke="#FF6600" strokeWidth="4" />
            <rect x="48" y="400" width="300" height="18" rx="4" fill="#041E0F" opacity="0.12" />
            <rect x="78" y="72" width="220" height="340" rx="10" fill="#041E0F" />
            <rect x="78" y="72" width="220" height="36" rx="10" fill="#0A2E1A" />
            <rect x="78" y="88" width="220" height="20" fill="#041E0F" />
            <rect x="168" y="52" width="40" height="28" rx="4" fill="#D75302" />
            <rect x="178" y="40" width="20" height="16" rx="2" fill="#041E0F" />

            {[0, 1, 2, 3, 4].map((row) => (
                <g key={row}>
                    <rect x="98" y={120 + row * 52} width="48" height="34" rx="3" fill="#1A4A2C" />
                    <rect x="104" y={126 + row * 52} width="16" height="22" rx="1.5" fill="#F4E4C8" />
                    <rect x="124" y={126 + row * 52} width="16" height="22" rx="1.5" fill="#E8C98A" />
                    <rect x="164" y={120 + row * 52} width="48" height="34" rx="3" fill="#1A4A2C" />
                    <rect x="170" y={126 + row * 52} width="16" height="22" rx="1.5" fill="#E8C98A" />
                    <rect x="190" y={126 + row * 52} width="16" height="22" rx="1.5" fill="#F4E4C8" />
                    <rect x="230" y={120 + row * 52} width="48" height="34" rx="3" fill="#1A4A2C" />
                    <rect x="236" y={126 + row * 52} width="16" height="22" rx="1.5" fill="#F4E4C8" />
                    <rect x="256" y={126 + row * 52} width="16" height="22" rx="1.5" fill="#E8C98A" />
                    <rect x="90" y={148 + row * 52} width="196" height="6" rx="2" fill="#FF6600" opacity="0.85" />
                </g>
            ))}

            <rect x="158" y="372" width="60" height="40" rx="4" fill="#FF6600" />
            <rect x="168" y="382" width="18" height="30" rx="2" fill="#041E0F" opacity="0.35" />
            <rect x="190" y="382" width="18" height="30" rx="2" fill="#041E0F" opacity="0.2" />
            <circle cx="208" cy="398" r="2.5" fill="#F4E4C8" />

            <rect x="298" y="280" width="72" height="132" rx="8" fill="#0A2E1A" />
            <rect x="310" y="298" width="22" height="28" rx="2" fill="#E8C98A" />
            <rect x="336" y="298" width="22" height="28" rx="2" fill="#F4E4C8" />
            <rect x="310" y="336" width="22" height="28" rx="2" fill="#F4E4C8" />
            <rect x="336" y="336" width="22" height="28" rx="2" fill="#E8C98A" />
            <rect x="322" y="376" width="24" height="36" rx="3" fill="#FF6600" />
        </svg>
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
                    <FacadeIllustration />
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
                            href="https://wa.me/5581988398888"
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
