import { useEffect, useState } from "react";

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-10 py-6 text-white transition-all duration-300 lg:px-25 ${
                scrolled
                    ? "border-b border-white/10 bg-primary/70 backdrop-blur-md"
                    : "border-b border-transparent bg-primary"
            }`}
        >
            <div className="flex items-center gap-3">
                <p className="font-secondary text-[28px] font-extrabold leading-none tracking-tight">
                    H
                    <span className="text-orange">A</span>
                    US
                </p>
                <p className="text-[11px] leading-[1.2] font-medium tracking-[0.14em] text-gray uppercase">
                    NEGÓCIOS
                    <br />
                    IMOBILIÁRIOS
                </p>
            </div>

            <ul className="flex items-center gap-10 text-sm font-medium text-gray">
                <li>
                    <a href="#about" className="transition hover:text-white">
                        Sobre nós
                    </a>
                </li>
                <li>
                    <a href="#imoveis" className="transition hover:text-white">
                        Imóveis
                    </a>
                </li>
                <li>Depoimentos</li>
                <li className="rounded-md bg-secondary px-3.5 py-2 font-medium text-primary hover:text-white">
                    Fale conosco
                </li>
            </ul>
        </nav>
    );
}
