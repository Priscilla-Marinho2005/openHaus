import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { fetchCatalog, type CatalogCard } from "../../lib/catalog";
import PropertyCard from "./PropertyCard";

const filters = [
    { label: "Localização", name: "localizacao" },
    { label: "Tipo de imóvel", name: "tipo" },
    { label: "Faixa de preço", name: "preco" },
    { label: "Quartos", name: "quartos" },
    { label: "Finalidade", name: "finalidade" },
];

function getPageSize() {
    if (typeof window === "undefined") return 3;
    if (window.matchMedia("(min-width: 1024px)").matches) return 3;
    if (window.matchMedia("(min-width: 768px)").matches) return 2;
    return 1;
}

function CatalogGrid({ items }: { items: CatalogCard[] }) {
    const listRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(getPageSize);
    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(page, totalPages);
    const visible = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    useEffect(() => {
        const update = () => setPageSize(getPageSize());
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [items]);

    const goToPage = (nextPage: number) => {
        setPage(nextPage);
        listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (total === 0) return null;

    return (
        <>
            <div ref={listRef} className="grid scroll-mt-28 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {visible.map((item) => (
                    <PropertyCard key={`${item.kind}-${item.id}`} item={item} />
                ))}
            </div>
            {totalPages > 1 ? (
                <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                        type="button"
                        onClick={() => goToPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        aria-label="Página anterior"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <FiChevronLeft />
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => {
                        const pageNumber = index + 1;
                        const isActive = pageNumber === currentPage;
                        return (
                            <button
                                key={pageNumber}
                                type="button"
                                onClick={() => goToPage(pageNumber)}
                                className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition ${
                                    isActive
                                        ? "bg-secondary text-white"
                                        : "border border-white/20 text-gray hover:border-secondary hover:text-white"
                                }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}
                    <button
                        type="button"
                        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        aria-label="Próxima página"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-30"
                    >
                        <FiChevronRight />
                    </button>
                </div>
            ) : null}
        </>
    );
}

export default function Properties() {
    const [empreendimentos, setEmpreendimentos] = useState<CatalogCard[]>([]);
    const [imoveis, setImoveis] = useState<CatalogCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;
        fetchCatalog()
            .then((catalog) => {
                if (!active) return;
                setEmpreendimentos(catalog.empreendimentos);
                setImoveis(catalog.imoveis);
            })
            .catch(() => {
                if (!active) return;
                setError("Não foi possível carregar os imóveis agora.");
            })
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, []);

    const total = useMemo(
        () => empreendimentos.length + imoveis.length,
        [empreendimentos.length, imoveis.length],
    );

    return (
        <section
            id="imoveis"
            className="scroll-mt-28 bg-green px-10 py-20 text-white lg:px-50"
        >
            <form
                className="mb-16 flex flex-col overflow-hidden rounded-xl bg-green text-white lg:flex-row"
                onSubmit={(event) => event.preventDefault()}
            >
                <div className="grid flex-1 grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-5">
                    {filters.map((filter) => (
                        <label
                            key={filter.name}
                            className="relative flex flex-col gap-1 px-5 py-4"
                        >
                            <span className="text-[10px] font-semibold tracking-[0.16em] text-gray uppercase">
                                {filter.label}
                            </span>
                            <div className="flex items-center justify-between gap-2">
                                <select
                                    name={filter.name}
                                    defaultValue="todos"
                                    className="w-full appearance-none bg-transparent text-sm font-medium text-white outline-none"
                                >
                                    <option value="todos">Todos</option>
                                </select>
                                <FiChevronDown className="pointer-events-none shrink-0 text-gray" />
                            </div>
                        </label>
                    ))}
                </div>
                <button
                    type="submit"
                    className="shrink-0 bg-secondary px-6 py-4 text-xs font-bold tracking-[0.12em] text-white uppercase transition hover:bg-orange lg:px-8 lg:py-0"
                >
                    Encontrar imóvel
                </button>
            </form>

            <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex flex-col gap-4">
                    <span className="flex items-center gap-3">
                        <span className="h-px w-10 shrink-0 bg-secondary" />
                        <p className="text-xs font-medium tracking-[0.22em] text-secondary uppercase">
                            Empreendimentos
                        </p>
                    </span>
                    <h2 className="font-secondary max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
                        Encontre seu próximo
                        <br />
                        imóvel.
                    </h2>
                </div>
                <p className="lg:text-right">
                    <span className="font-secondary text-5xl font-bold">{loading ? "—" : total}</span>
                    <span className="ml-2 text-sm text-gray">
                        {total === 1 ? "imóvel" : "imóveis"}
                    </span>
                </p>
            </div>

            {loading ? (
                <p className="text-sm text-gray">Carregando catálogo...</p>
            ) : error ? (
                <p className="text-sm text-gray">{error}</p>
            ) : total === 0 ? (
                <p className="text-sm text-gray">
                    Nenhum empreendimento publicado neste momento.
                </p>
            ) : (
                <div className="flex flex-col gap-16">
                    {empreendimentos.length > 0 ? (
                        <div>
                            <p className="mb-6 text-xs font-semibold tracking-[0.16em] text-secondary uppercase">
                                Empreendimentos
                            </p>
                            <CatalogGrid items={empreendimentos} />
                        </div>
                    ) : null}
                    {imoveis.length > 0 ? (
                        <div id="usados">
                            <p className="mb-6 text-xs font-semibold tracking-[0.16em] text-secondary uppercase">
                                Imóveis vinculados
                            </p>
                            <CatalogGrid items={imoveis} />
                        </div>
                    ) : null}
                </div>
            )}
        </section>
    );
}
