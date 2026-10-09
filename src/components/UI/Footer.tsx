const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=R.+Francisco+Lacerda,+297+-+V%C3%A1rzea,+Recife+-+PE,+50741-150";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-primary px-10 pt-16 text-white lg:px-25">
            <div className="grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(3,1fr)] lg:items-start">
                <div className="flex items-center gap-3">
                    <p className="font-secondary text-[25px] font-medium leading-none tracking-tight text-green-light">
                        OPEN{" "}
                        <span className="text-orange">HAUS</span>

                    </p>
                    <span className="text-2xl font-light text-gray">|</span>
                    <p className="text-[11px] leading-[1.2] font-medium tracking-[0.14em] text-gray uppercase">
                        NEGÓCIOS
                        <br />
                        IMOBILIÁRIOS
                    </p>
                </div>

                <div>
                    <h3 className="mb-5 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
                        Open Haus
                    </h3>
                    <ul className="flex flex-col gap-3 text-sm text-gray">
                        <li>
                            <a href="/#about" className="transition hover:text-white">
                                Sobre nós
                            </a>
                        </li>
                        <li>
                            <a href="/#imoveis" className="transition hover:text-white">
                                Imóveis
                            </a>
                        </li>
                        <li>
                            <a href="/#depoimentos" className="transition hover:text-white">
                                Depoimentos
                            </a>
                        </li>
                        <li>
                            <a href="/#contato" className="transition hover:text-white">
                                Contato
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-5 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
                        Atendimento
                    </h3>
                    <ul className="flex flex-col gap-3 text-sm text-gray">
                        <li>
                            <a
                                href="https://wa.me/5581988398888"
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-white"
                            >
                                WhatsApp
                            </a>
                        </li>
                        <li>
                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-white"
                            >
                                Endereço
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-5 text-xs font-semibold tracking-[0.18em] text-secondary uppercase">
                        Redes
                    </h3>
                    <ul className="flex flex-col gap-3 text-sm text-gray">
                        <li>
                            <a
                                href="https://www.instagram.com/openhausimob/"
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-white"
                            >
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://wa.me/5581988398888"
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-white"
                            >
                                WhatsApp
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <p className="sr-only">
                R. Francisco Lacerda, 297 - Várzea, Recife - PE, 50741-150
            </p>

            <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-[11px] tracking-[0.12em] text-gray uppercase sm:flex-row sm:items-center sm:justify-between">
                <p>Open Haus negócios imobiliários</p>
                <p>© 2026 todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
