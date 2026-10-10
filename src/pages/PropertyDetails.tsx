
import { useEffect, useMemo, useState } from "react";

import { Link, Navigate, useParams } from "react-router-dom";

import {
    FiArrowLeft,
    FiArrowRight,
    FiChevronLeft,
    FiChevronRight,
    FiMapPin,
    FiX,
} from "react-icons/fi";

import { LuBath, LuBedDouble } from "react-icons/lu";

import { TbRulerMeasure } from "react-icons/tb";

import Nav from "../components/UI/Nav";

import Footer from "../components/UI/Footer";

import PropertyCard from "../components/Home/PropertyCard";

import {
    fetchEmpreendimento,
    fetchImovel,
    formatBRL,
    formatLocation,
    imovelIdFromSlug,
    type CatalogCard,
    type EmpreendimentoPublico,
} from "../lib/catalog";

export default function PropertyDetails() {
    const { slug } = useParams();

    const imovelId = slug ? imovelIdFromSlug(slug) : null;

    const [item, setItem] = useState<
        CatalogCard | EmpreendimentoPublico | null
    >(null);

    const [loading, setLoading] = useState(true);

    const [missing, setMissing] = useState(false);

    const [imageIndex, setImageIndex] = useState(0);

    // Controla a planta aberta em tamanho completo
    const [selectedPlan, setSelectedPlan] = useState<{
        title: string;
        image: string;
    } | null>(null);

    
useEffect(() => {
    window.scrollTo(0, 0);

    let active = true;

    if (!slug) {
        return () => {
            active = false;
        };
    }

    const request = imovelId
        ? fetchImovel(imovelId)
        : fetchEmpreendimento(slug);

    request
        .then((data) => {
            if (!active) return;

            setItem(data);
            setImageIndex(0);
            setMissing(false);
            setLoading(false);
        })
        .catch(() => {
            if (!active) return;

            setItem(null);
            setMissing(true);
            setLoading(false);
        });

    return () => {
        active = false;
    };
}, [slug, imovelId]);

    // Fecha a planta ao pressionar Esc
    useEffect(() => {
        if (!selectedPlan) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedPlan(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedPlan]);

    const images = item?.imagens?.length ? item.imagens : [];

    const mapsQuery = [
        item?.endereco,
        item?.localidade,
        item?.cidade,
    ]
        .filter(Boolean)
        .join(", ");

    const mapsUrl = mapsQuery
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              mapsQuery,
          )}`
        : null;

    const whatsappUrl = item
        ? `https://wa.me/558185399988?text=${encodeURIComponent(
              `Olá! Tenho interesse no ${item.nome}.`,
          )}`
        : "";

    const linked = useMemo(
        () =>
            "imoveis" in (item ?? {})
                ? (item as EmpreendimentoPublico).imoveis ?? []
                : [],
        [item],
    );

    const vitrine = item && "vitrine" in item ? item.vitrine : null;

    const plans = [
        ...(vitrine?.plantas ?? []).map((image, index) => ({
            title: `Planta ${index + 1}`,
            image,
        })),

        ...(vitrine?.tipologias ?? [])
            .filter((row) => row.plantaUrl)
            .map((row) => ({
                title: row.nome,
                image: row.plantaUrl as string,
            })),
    ];

    const specs = item
        ? [
              {
                  label: "Quartos",
                  value: item.quartos != null ? String(item.quartos) : "—",
              },
              {
                  label: "Suítes",
                  value: item.suites != null ? String(item.suites) : "—",
              },
              {
                  label: "Banheiros",
                  value:
                      item.banheiros != null
                          ? String(item.banheiros)
                          : "—",
              },
              {
                  label: "Vagas",
                  value: item.vagas != null ? String(item.vagas) : "—",
              },
              {
                  label: "Área",
                  value:
                      item.areaM2 != null ? `${item.areaM2} m²` : "—",
              },
              {
                  label: "Tipo",
                  value: item.tipo || "—",
              },
              {
                  label: "Status",
                  value: item.status || item.badge,
              },
          ]
        : [];

    const prevImage = () => {
        setImageIndex((current) =>
            current === 0 ? images.length - 1 : current - 1,
        );
    };

    const nextImage = () => {
        setImageIndex((current) =>
            current === images.length - 1 ? 0 : current + 1,
        );
    };

    if (!loading && missing) {
        return <Navigate to="/#imoveis" replace />;
    }

    return (
        <div className="bg-primary text-white">
            <Nav />

            <main className="px-5 pt-32 pb-20 sm:px-10 lg:px-25">
                <Link
                    to="/#imoveis"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-gray transition hover:text-white"
                >
                    <FiArrowLeft />
                    Voltar aos imóveis
                </Link>

                {loading || !item ? (
                    <p className="text-sm text-gray">
                        Carregando imóvel...
                    </p>
                ) : (
                    <>
                        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                            {/* Galeria de imagens */}
                            <div>
                                <div className="relative overflow-hidden rounded-2xl bg-white/5">
                                    {images[imageIndex] ? (
                                        <img
                                            src={images[imageIndex]}
                                            alt={`${item.nome} - foto ${imageIndex + 1}`}
                                            className="h-80 w-full object-cover sm:h-105 lg:h-130"
                                        />
                                    ) : (
                                        <div className="h-80 w-full sm:h-105 lg:h-130" />
                                    )}

                                    {images.length > 1 && (
                                        <>
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
                                        </>
                                    )}

                                    <span className="absolute top-4 left-4 rounded-full bg-green px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase">
                                        {item.badge}
                                    </span>
                                </div>

                                {images.length > 1 && (
                                    <div className="mt-4 grid grid-cols-4 gap-3">
                                        {images.map((image, index) => (
                                            <button
                                                key={`${image}-${index}`}
                                                type="button"
                                                onClick={() =>
                                                    setImageIndex(index)
                                                }
                                                aria-label={`Visualizar foto ${index + 1}`}
                                                aria-pressed={
                                                    index === imageIndex
                                                }
                                                className={`overflow-hidden rounded-xl border transition ${
                                                    index === imageIndex
                                                        ? "border-secondary"
                                                        : "border-transparent"
                                                }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt=""
                                                    className="h-20 w-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Informações do imóvel */}
                            <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-green/40 p-6 backdrop-blur-xl sm:p-8">
                                <span className="text-[11px] font-medium tracking-[0.14em] text-gray uppercase">
                                    {item.tipo}
                                </span>

                                <h1 className="font-secondary text-3xl font-bold tracking-tight uppercase sm:text-4xl">
                                    {item.nome}
                                </h1>

                                <p className="text-2xl font-semibold text-secondary">
                                    {item.kind === "empreendimento" &&
                                    item.valor != null
                                        ? `A partir de ${formatBRL(item.valor)}`
                                        : formatBRL(item.valor)}
                                </p>

                                {mapsUrl ? (
                                    <a
                                        href={mapsUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-gray transition hover:text-white"
                                    >
                                        <FiMapPin className="shrink-0 text-secondary" />

                                        {formatLocation(item)}

                                        {item.endereco && (
                                            <span className="text-white/50">
                                                · {item.endereco}
                                            </span>
                                        )}
                                    </a>
                                ) : (
                                    <p className="inline-flex items-center gap-2 text-sm text-gray">
                                        <FiMapPin className="text-secondary" />
                                        {formatLocation(item)}
                                    </p>
                                )}

                                <div className="flex flex-wrap items-center gap-5 text-sm text-gray">
                                    <span className="inline-flex items-center gap-1.5">
                                        <LuBedDouble className="text-secondary" />
                                        {item.quartos ?? "—"} quartos
                                    </span>

                                    <span className="inline-flex items-center gap-1.5">
                                        <LuBath className="text-secondary" />
                                        {item.banheiros ?? "—"} banheiros
                                    </span>

                                    <span className="inline-flex items-center gap-1.5">
                                        <TbRulerMeasure className="text-secondary" />
                                        {item.areaM2 != null
                                            ? `${item.areaM2} m²`
                                            : "—"}
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

                        {/* Ficha técnica */}
                        <section className="mt-16">
                            <h2 className="font-secondary mb-6 text-2xl font-bold tracking-tight uppercase">
                                Ficha técnica
                            </h2>

                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                                {specs.map((spec) => (
                                    <div
                                        key={spec.label}
                                        className="rounded-xl border border-white/10 bg-green/30 px-5 py-4"
                                    >
                                        <p className="text-[11px] tracking-[0.14em] text-gray uppercase">
                                            {spec.label}
                                        </p>

                                        <p className="mt-1 text-lg font-semibold">
                                            {spec.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Descrição */}
                        {vitrine?.descricao && (
                            <section className="mt-16">
                                <h2 className="font-secondary mb-6 text-2xl font-bold tracking-tight uppercase">
                                    Sobre
                                </h2>

                                <p className="max-w-3xl text-sm leading-relaxed text-gray whitespace-pre-line">
                                    {vitrine.descricao}
                                </p>
                            </section>
                        )}

                        {/* Plantas do imóvel */}
                        {plans.length > 0 && (
                            <section className="mt-16">
                                <h2 className="font-secondary mb-3 text-2xl font-bold tracking-tight uppercase">
                                    Plantas do imóvel
                                </h2>

                                <p className="mb-6 text-sm text-gray">
                                    Clique em uma planta para visualizar a
                                    imagem completa.
                                </p>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    {plans.map((plan) => (
                                        <figure
                                            key={`${plan.title}-${plan.image}`}
                                            onClick={() =>
                                                setSelectedPlan(plan)
                                            }
                                            className="group cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-green/30 transition hover:border-secondary/60"
                                        >
                                            <div className="overflow-hidden bg-white">
                                                <img
                                                    src={plan.image}
                                                    alt={plan.title}
                                                    loading="lazy"
                                                    className="h-72 w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                                                />
                                            </div>

                                            <figcaption className="flex items-center justify-between gap-3 px-5 py-4 text-sm font-medium tracking-[0.12em] uppercase">
                                                <span>{plan.title}</span>

                                                <span className="inline-flex shrink-0 items-center gap-1 text-xs tracking-normal text-secondary normal-case">
                                                    Ampliar
                                                    <FiArrowRight />
                                                </span>
                                            </figcaption>
                                        </figure>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Imóveis vinculados */}
                        {linked.length > 0 && (
                            <section className="mt-16">
                                <h2 className="font-secondary mb-6 text-2xl font-bold tracking-tight uppercase">
                                    Imóveis vinculados
                                </h2>

                                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {linked.map((unit) => (
                                        <PropertyCard
                                            key={unit.id}
                                            item={unit}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>

            {/* Modal para visualizar a planta completa */}
            {selectedPlan && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
                    onClick={() => setSelectedPlan(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedPlan.title}
                >
                    {/* Botão para fechar */}
                    <button
                        type="button"
                        onClick={() => setSelectedPlan(null)}
                        aria-label="Fechar planta"
                        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-secondary sm:top-6 sm:right-6"
                    >
                        <FiX size={24} />
                    </button>

                    {/* Imagem ampliada */}
                    <div
                        className="flex h-full w-full items-center justify-center"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <img
                            src={selectedPlan.image}
                            alt={selectedPlan.title}
                            className="max-h-[85vh] max-w-full rounded-lg object-contain sm:max-h-[88vh]"
                        />
                    </div>

                    {/* Nome da planta */}
                    <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-center text-xs text-white/80 sm:bottom-5 sm:text-sm">
                        {selectedPlan.title}
                    </p>
                </div>
            )}

            <Footer />
        </div>
    );
}