import { FaWhatsapp } from "react-icons/fa";

export default function FloatingButton() {
    return (
        <a
            href="https://wa.me/5581988398888"
            target="_blank"
            rel="noreferrer"
            aria-label="Falar no WhatsApp"
            className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-secondary bg-primary text-secondary shadow-lg transition hover:scale-105 hover:bg-secondary hover:text-white lg:right-8 lg:bottom-8"
        >
            <FaWhatsapp className="text-2xl" />
        </a>
    );
}
