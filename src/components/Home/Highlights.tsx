import { FiKey, FiMapPin, FiMessageCircle, FiSearch } from "react-icons/fi";
import { LuHandshake, LuScanSearch, LuShieldCheck, LuSparkles } from "react-icons/lu";

const steps = [
    {
        icon: FiMessageCircle,
        title: "Primeiro contato",
        text: "Você conta o que procura: morar, investir, região e faixa de valor.",
    },
    {
        icon: FiSearch,
        title: "Seleção",
        text: "A Open Haus filtra empreendimentos e imóveis com critério, sem lista genérica.",
    },
    {
        icon: FiMapPin,
        title: "Visita",
        text: "Acompanhamos a visita, as plantas e as condições com clareza.",
    },
    {
        icon: FiKey,
        title: "Chave na mão",
        text: "Seguimos até a documentação e a entrega, do primeiro papo ao imóvel.",
    },
];

const points = [
    {
        icon: LuScanSearch,
        title: "Escolha com critério",
        text: "Localização, potencial e estilo de vida entram na avaliação de cada oportunidade.",
    },
    {
        icon: LuHandshake,
        title: "Atendimento próximo",
        text: "Um contato direto, sem fila de setores, do começo ao fim da negociação.",
    },
    {
        icon: LuShieldCheck,
        title: "Transparência",
        text: "Preço, prazo e o que está incluso são ditos antes da decisão.",
    },
    {
        icon: LuSparkles,
        title: "Morar ou investir",
        text: "O mesmo olhar serve para quem vai viver no imóvel e para quem busca retorno.",
    },
];

export default function Highlights() {
    return (
        <>
            <section id="como-funciona" className="scroll-mt-28 bg-green px-10 py-24 text-white lg:px-40">
                <div data-reveal className="reveal mb-14 flex max-w-xl flex-col gap-4">
                    <span className="flex items-center gap-3">
                        <span className="h-px w-10 shrink-0 bg-secondary" />
                        <p className="text-xs font-medium tracking-[0.22em] text-secondary uppercase">Como funciona</p>
                    </span>
                    <h2 className="font-secondary text-4xl font-bold tracking-tight sm:text-5xl">
                        Do primeiro contato à chave na mão
                    </h2>
                </div>
                <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <li
                            key={step.title}
                            data-reveal
                            data-reveal-delay={index * 90}
                            className="reveal flex flex-col gap-4 rounded-2xl border border-white/10 bg-primary/40 p-6"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                                <step.icon className="text-xl" />
                            </span>
                            <span className="text-[11px] font-semibold tracking-[0.18em] text-gray uppercase">
                                0{index + 1}
                            </span>
                            <h3 className="font-secondary text-xl font-bold tracking-tight">{step.title}</h3>
                            <p className="text-sm leading-relaxed text-gray">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section id="diferenciais" className="scroll-mt-28 bg-primary px-10 py-24 text-white lg:px-40">
                <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                    <div data-reveal className="reveal flex flex-col gap-4">
                        <span className="flex items-center gap-3">
                            <span className="h-px w-10 shrink-0 bg-secondary" />
                            <p className="text-xs font-medium tracking-[0.22em] text-secondary uppercase">Diferenciais</p>
                        </span>
                        <h2 className="font-secondary text-4xl font-bold tracking-tight sm:text-5xl">
                            Mais do que um endereço
                        </h2>
                        <p className="max-w-md text-base leading-relaxed text-gray">
                            A Open Haus acompanha a escolha com o mesmo cuidado de quem vai indicar o lugar para morar ou investir.
                        </p>
                    </div>
                    <ul className="grid gap-5 sm:grid-cols-2">
                        {points.map((point, index) => (
                            <li
                                key={point.title}
                                data-reveal
                                data-reveal-delay={index * 80}
                                className="reveal rounded-2xl border border-white/10 bg-green/30 p-6"
                            >
                                <point.icon className="text-2xl text-secondary" />
                                <h3 className="font-secondary mt-5 text-lg font-bold tracking-tight">{point.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray">{point.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}
