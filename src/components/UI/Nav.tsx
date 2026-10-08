export default function Nav() {
    return (
        <nav className="fixed flex justify-between items-center w-full px-10 py-5 bg-primary text-white">
            <div>
                <p>HAUS</p>
                <span>|</span>
                <p>NEGÓCIOS IMOBILIÁRIOS</p>
            </div>
            <ul>
                <li>Sobre nós</li>
                <li>Imóveis</li>
                <li>Depoimentos</li>
                <li>Fale conosco</li>
            </ul>
        </nav>
    )
}