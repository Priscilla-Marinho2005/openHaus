import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiChevronLeft, FiChevronRight, FiMapPin } from "react-icons/fi";
import { LuBath, LuBedDouble } from "react-icons/lu";
import { TbRulerMeasure } from "react-icons/tb";
import Nav from "../components/UI/Nav";
import Footer from "../components/UI/Footer";
import { getPropertyBySlug } from "../data/properties";

export default function PropertyDetails() {
    const { slug } = useParams();
    const property = slug ? getPropertyBySlug(slug) : undefined;
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!property) {
        return <Navigate to="/#imoveis" replace />;
    }

    const images = property.images.length ? property.images : [property.image];
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.address)}`;
    const whatsappUrl = `https://wa.me/5581988398888?text=${encodeURIComponent(`Olá! Tenho interesse no ${property.name}.`)}`;

    const prevImage = () => {
        setImageIndex((current) => (current === 0 ? images.length - 1 : current - 1));
    };

    const nextImage = () => {
        setImageIndex((current) => (current === images.length - 1 ? 0 : current + 1));
    };

    return (
        <div className="bg-primary text-white">
            <Nav />
            <main className="px-10 pt-32 pb-20 lg:px-25">
                <Link
                    to="/#imoveis"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-gray transition hover:text-white"
                >
                    <FiArrowLeft />
                    Voltar aos imóveis
                </Link>

                <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={images[imageIndex]}
                                alt={`${property.name} - foto ${imageIndex + 1}`}
                                className="h-105 w-full object-cover lg:h-130"
                            />
                            <button
                                type="button"
                                onClick={prevImage}
                                aria-label="Foto anterior"
                                className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary/70 text-white backdrop-blur-md transition hover:bg-secondary"
                            >
                                <FiChevronLeft />
                            </button>
                            <button
                                type="button"
                                onClick={nextImage}
                                aria-label="Próxima foto"
                                className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary/70 text-white backdrop-blur-md transition hover:bg-secondary"
                            >
                                <FiChevronRight />
                            </button>
                            <span className="absolute top-4 left-4 rounded-full bg-green px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase">
                                {property.badge}
                            </span>
                        </div>
                        <div className="mt-4 grid grid-cols-4 gap-3">
                            {images.map((image, index) => (
                                <button
                                    key={image}
                                    type="button"
                                    onClick={() => setImageIndex(index)}
                                    className={`overflow-hidden rounded-xl border ${
                                        index === imageIndex ? "border-secondary" : "border-transparent"
                                    }`}
                                >
                                    <img src={image} alt="" className="h-20 w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-green/40 p-8 backdrop-blur-xl">
                        <span className="text-[11px] font-medium tracking-[0.14em] text-gray uppercase">
                            {property.type}
                        </span>
                        <h1 className="font-secondary text-4xl font-bold tracking-tight uppercase">
                            {property.name}
                        </h1>
                        <p className="text-2xl font-semibold text-secondary">{property.price}</p>
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-gray transition hover:text-white"
                        >
                            <FiMapPin className="text-secondary" />
                            {property.location}
                            <span className="text-white/50">· {property.address}</span>
                        </a>
                        <div className="flex items-center gap-8 text-sm text-gray">
                            <span className="inline-flex items-center gap-1.5">
                                <LuBedDouble className="text-secondary" />
                                {property.bedrooms} quartos
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <LuBath className="text-secondary" />
                                {property.bathrooms} banheiros
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <TbRulerMeasure className="text-secondary" />
                                {property.area} m²
                            </span>
                        </div>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-6 py-3.5 text-sm font-semibold tracking-wide text-white uppercase transition hover:bg-orange"
                        >
                            Falar sobre este imóvel
                            <FiArrowRight />
                        </a>
                    </div>
                </div>

                <section className="mt-16">
                    <h2 className="font-secondary mb-6 text-2xl font-bold tracking-tight uppercase">
                        Ficha técnica
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {property.specs.map((spec) => (
                            <div
                                key={spec.label}
                                className="rounded-xl border border-white/10 bg-green/30 px-5 py-4"
                            >
                                <p className="text-[11px] tracking-[0.14em] text-gray uppercase">
                                    {spec.label}
                                </p>
                                <p className="mt-1 text-lg font-semibold">{spec.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {property.plans.length > 0 && (
                    <section className="mt-16">
                        <h2 className="font-secondary mb-6 text-2xl font-bold tracking-tight uppercase">
                            Plantas do imóvel
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            {property.plans.map((plan) => (
                                <figure
                                    key={plan.title}
                                    className="overflow-hidden rounded-2xl border border-white/10 bg-green/30"
                                >
                                    <img
                                        src={plan.image}
                                        alt={plan.title}
                                        className="h-72 w-full object-cover"
                                    />
                                    <figcaption className="px-5 py-4 text-sm font-medium tracking-[0.12em] uppercase">
                                        {plan.title}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
}
