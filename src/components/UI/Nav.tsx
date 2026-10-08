import { useEffect, useState } from "react";

const links = [
    { href: "/#about", label: "Sobre nós" },
    { href: "/#imoveis", label: "Imóveis" },
    { href: "/#depoimentos", label: "Depoimentos" },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) setOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const close = () => setOpen(false);

    return (
        <nav
            className={`fixed top-0 left-0 z-50 w-full text-white transition-all duration-300 ${
                scrolled || open
                    ? "border-b border-white/10 bg-primary/80 backdrop-blur-md"
                    : "border-b border-transparent bg-primary"
            }`}
        >
            <div className="flex items-center justify-between px-5 py-5 sm:px-10 lg:px-25">
                <a href="/" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={close}>
                    <p className="font-secondary text-[22px] font-extrabold leading-none tracking-tight sm:text-[28px]">
                        H
                        <span className="text-orange">A</span>
                        US
                    </p>
                    <p className="hidden text-[10px] leading-[1.2] font-medium tracking-[0.14em] text-gray uppercase sm:block sm:text-[11px]">
                        NEGÓCIOS
                        <br />
                        IMOBILIÁRIOS
                    </p>
                </a>

                <ul className="hidden items-center gap-10 text-sm font-medium text-gray lg:flex">
                    {links.map((link) => (
                        <li key={link.href}>
                            <a href={link.href} className="transition hover:text-white">
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="https://wa.me/5581988398888"
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-md bg-secondary px-3.5 py-2 font-medium text-primary hover:text-white"
                        >
                            Fale conosco
                        </a>
                    </li>
                </ul>

                <button
                    type="button"
                    aria-label={open ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={open}
                    onClick={() => setOpen((current) => !current)}
                    className="relative flex h-10 w-10 items-center justify-center lg:hidden"
                >
                    <span
                        className={`absolute h-px w-5 bg-white transition-all duration-300 ${
                            open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                        }`}
                    />
                    <span
                        className={`absolute h-px w-5 bg-white transition-all duration-300 ${
                            open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                        }`}
                    />
                    <span
                        className={`absolute h-px w-5 bg-white transition-all duration-300 ${
                            open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                        }`}
                    />
                </button>
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${
                    open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <ul className="flex flex-col gap-1 px-5 pb-6 sm:px-10">
                    {links.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={close}
                                className="block py-3 text-sm font-medium text-gray transition hover:text-white"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li className="pt-2">
                        <a
                            href="https://wa.me/5581988398888"
                            target="_blank"
                            rel="noreferrer"
                            onClick={close}
                            className="inline-flex rounded-md bg-secondary px-3.5 py-2 text-sm font-medium text-primary"
                        >
                            Fale conosco
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
