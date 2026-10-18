import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { fetchCatalog, type CatalogCard } from "../../lib/catalog";
import PropertyCard from "./PropertyCard";

const emptyFilters = {
    localizacao: "todos",
    tipo: "todos",
    preco: "todos",
    quartos: "todos",
    finalidade: "todos",
};

type FilterState = typeof emptyFilters;

function priceBand(valor: number | null) {
    if (valor == null) return "sob-consulta";
    if (valor < 300_000) return "ate-300";
    if (valor < 600_000) return "300-600";
    if (valor < 1_000_000) return "600-1000";
    return "acima-1000";
}

function placeOf(item: CatalogCard) {
    return item.bairro || item.cidade || item.localidade || "Sem localização";
}

function matchesFilters(item: CatalogCard, filters: FilterState) {
    if (filters.localizacao !== "todos" && placeOf(item) !== filters.localizacao) return false;
    if (filters.tipo !== "todos" && (item.tipo || item.kind) !== filters.tipo) return false;
    if (filters.preco !== "todos" && priceBand(item.valor) !== filters.preco) return false;
    if (filters.quartos !== "todos") {
        const rooms = item.quartos ?? 0;
        if (filters.quartos === "4" ? rooms < 4 : String(rooms) !== filters.quartos) return false;
    }
    if (filters.finalidade !== "todos" && item.badge !== filters.finalidade) return false;
    return true;
}

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
                {visible.map((item, index) => (
                    <div
                        key={`${item.kind}-${item.id}`}
                        data-reveal
                        data-reveal-delay={index * 90}
                        className="reveal"
                    >
                        <PropertyCard item={item} parallax={index === 0} />
                    </div>
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
    const [filtersOpen, setFiltersOpen] = useState(true);
    const [draft, setDraft] = useState<FilterState>(emptyFilters);
    const [applied, setApplied] = useState<FilterState>(emptyFilters);
    const [searchTick, setSearchTick] = useState(0);

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

    const catalog = useMemo(() => [...empreendimentos, ...imoveis], [empreendimentos, imoveis]);
    const locations = useMemo(
        () => [...new Set(catalog.map(placeOf))].sort((a, b) => a.localeCompare(b, "pt-BR")),
        [catalog],
    );
    const types = useMemo(
        () => [...new Set(catalog.map((item) => item.tipo || item.kind).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR")),
        [catalog],
    );
    const purposes = useMemo(
        () => [...new Set(catalog.map((item) => item.badge).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR")),
        [catalog],
    );
    const visibleEmpreendimentos = useMemo(
        () => empreendimentos.filter((item) => matchesFilters(item, applied)),
        [empreendimentos, applied],
    );
    const visibleImoveis = useMemo(
        () => imoveis.filter((item) => matchesFilters(item, applied)),
        [imoveis, applied],
    );
    const total = visibleEmpreendimentos.length + visibleImoveis.length;

    const updateDraft = (name: keyof FilterState, value: string) => {
        setDraft((current) => ({ ...current, [name]: value }));
    };

    return (
        <section
            id="imoveis"
            className="scroll-mt-28 bg-green px-10 py-20 text-white lg:px-50"
        >
            <form
                data-reveal
                className="reveal mb-16 overflow-hidden rounded-xl bg-green text-white"
                onSubmit={(event) => {
                    event.preventDefault();
                    setApplied(draft);
                    setSearchTick((current) => current + 1);
                }}
            >
                <div className="flex items-center justify-between gap-4 px-5 py-3 lg:hidden">
                    <span className="text-[10px] font-semibold tracking-[0.16em] text-gray uppercase">
                        Busca
                    </span>
                    <button
                        type="button"
                        onClick={() => setFiltersOpen((open) => !open)}
                        className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-white uppercase"
                        aria-expanded={filtersOpen}
                    >
                        Filtros
                        <FiChevronDown className={`transition duration-300 ${filtersOpen ? "rotate-180" : ""}`} />
                    </button>
                </div>
                <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        filtersOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] lg:grid-rows-[1fr]"
                    }`}
                >
                    <div className="overflow-hidden">
                        <div className="flex flex-col lg:flex-row">
                            <div className="grid flex-1 grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-5">
                                <label className="search-field relative flex flex-col gap-1 px-5 py-4">
                                    <span className="text-[10px] font-semibold tracking-[0.16em] text-gray uppercase">Localização</span>
                                    <select
                                        value={draft.localizacao}
                                        onChange={(event) => updateDraft("localizacao", event.target.value)}
                                        className="w-full appearance-none bg-transparent text-sm font-medium text-white outline-none"
                                    >
                                        <option value="todos">Todos</option>
                                        {locations.map((location) => (
                                            <option key={location} value={location}>{location}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="search-field relative flex flex-col gap-1 px-5 py-4">
                                    <span className="text-[10px] font-semibold tracking-[0.16em] text-gray uppercase">Tipo de imóvel</span>
                                    <select
                                        value={draft.tipo}
                                        onChange={(event) => updateDraft("tipo", event.target.value)}
                                        className="w-full appearance-none bg-transparent text-sm font-medium text-white outline-none"
                                    >
                                        <option value="todos">Todos</option>
                                        {types.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="search-field relative flex flex-col gap-1 px-5 py-4">
                                    <span className="text-[10px] font-semibold tracking-[0.16em] text-gray uppercase">Faixa de preço</span>
                                    <select
                                        value={draft.preco}
                                        onChange={(event) => updateDraft("preco", event.target.value)}
                                        className="w-full appearance-none bg-transparent text-sm font-medium text-white outline-none"
                                    >
                                        <option value="todos">Todos</option>
                                        <option value="ate-300">Até R$ 300 mil</option>
                                        <option value="300-600">R$ 300 a 600 mil</option>
                                        <option value="600-1000">R$ 600 mil a 1 mi</option>
                                        <option value="acima-1000">Acima de R$ 1 mi</option>
                                        <option value="sob-consulta">Sob consulta</option>
                                    </select>
                                </label>
                                <label className="search-field relative flex flex-col gap-1 px-5 py-4">
                                    <span className="text-[10px] font-semibold tracking-[0.16em] text-gray uppercase">Quartos</span>
                                    <select
                                        value={draft.quartos}
                                        onChange={(event) => updateDraft("quartos", event.target.value)}
                                        className="w-full appearance-none bg-transparent text-sm font-medium text-white outline-none"
                                    >
                                        <option value="todos">Todos</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4+</option>
                                    </select>
                                </label>
                                <label className="search-field relative flex flex-col gap-1 px-5 py-4">
                                    <span className="text-[10px] font-semibold tracking-[0.16em] text-gray uppercase">Finalidade</span>
                                    <select
                                        value={draft.finalidade}
                                        onChange={(event) => updateDraft("finalidade", event.target.value)}
                                        className="w-full appearance-none bg-transparent text-sm font-medium text-white outline-none"
                                    >
                                        <option value="todos">Todos</option>
                                        {purposes.map((purpose) => (
                                            <option key={purpose} value={purpose}>{purpose}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="btn-lift shrink-0 bg-secondary px-6 py-4 text-xs font-bold tracking-[0.12em] text-white uppercase hover:bg-orange lg:px-8"
                            >
                                Encontrar imóvel
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div data-reveal data-reveal-delay="80" className="reveal flex flex-col gap-4">
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
                <p data-reveal data-reveal-delay="180" className="reveal lg:text-right">
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
            ) : catalog.length === 0 ? (
                <p className="text-sm text-gray">
                    Nenhum empreendimento publicado neste momento.
                </p>
            ) : (
                <div key={searchTick} className="flex flex-col gap-16">
                    {visibleEmpreendimentos.length > 0 ? (
                        <div>
                            <p className="mb-6 text-xs font-semibold tracking-[0.16em] text-secondary uppercase">
                                Empreendimentos
                            </p>
                            <CatalogGrid items={visibleEmpreendimentos} />
                        </div>
                    ) : null}
                    {visibleImoveis.length > 0 ? (
                        <div id="usados">
                            <p className="mb-6 text-xs font-semibold tracking-[0.16em] text-secondary uppercase">
                                Imóveis vinculados
                            </p>
                            <CatalogGrid items={visibleImoveis} />
                        </div>
                    ) : null}
                    {total === 0 ? (
                        <p className="text-sm text-gray">Nenhum imóvel encontrado com esses filtros.</p>
                    ) : null}
                </div>
            )}
        </section>
    );
}
