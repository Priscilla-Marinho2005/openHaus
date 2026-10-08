import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { LuBath, LuBedDouble } from "react-icons/lu";
import { TbRulerMeasure } from "react-icons/tb";
import { properties } from "../../data/properties";

const filters = [
    { label: "Localização", name: "localizacao" },
    { label: "Tipo de imóvel", name: "tipo" },
    { label: "Faixa de preço", name: "preco" },
    { label: "Quartos", name: "quartos" },
    { label: "Finalidade", name: "finalidade" },
];

const PAGE_SIZE = 3;

export default function Properties() {
    const [page, setPage] = useState(1);
    const total = properties.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const visibleProperties = properties.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
                        negócio.
                    </h2>
                </div>
                <p className="lg:text-right">
                    <span className="font-secondary text-5xl font-bold">{total}</span>
                    <span className="ml-2 text-sm text-gray">
                        {total === 1 ? "imóvel" : "imóveis"}
                    </span>
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {visibleProperties.map((property) => (
                    <Link
                        key={property.id}
                        to={`/imoveis/${property.slug}`}
                        className="group flex min-h-130 cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-green/40 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-green/50"
                    >
                        <div className="relative h-72 overflow-hidden">
                            <img
                                src={property.image}
                                alt={property.name}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                            />
                            <span className="absolute top-4 left-4 rounded-full bg-green px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
                                {property.badge}
                            </span>
                        </div>

                        <div className="flex flex-1 flex-col gap-5 bg-green/20 p-6">
                            <div className="flex items-start justify-between gap-4 text-[11px] font-medium tracking-[0.12em] text-gray uppercase">
                                <span>{property.location}</span>
                                <span>{property.type}</span>
                            </div>

                            <div>
                                <h3 className="font-secondary text-xl font-bold tracking-tight uppercase">
                                    {property.name}
                                </h3>
                                <p className="mt-1 text-sm text-gray">{property.price}</p>
                            </div>

                            <div className="flex items-center justify-center gap-12 text-sm text-gray">
                                <span className="inline-flex items-center gap-1.5">
                                    <LuBedDouble className="text-base text-secondary" />
                                    {property.bedrooms}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <LuBath className="text-base text-secondary" />
                                    {property.bathrooms}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <TbRulerMeasure className="text-base text-secondary" />
                                    {property.area} m²
                                </span>
                            </div>

                            <span className="mt-auto inline-flex items-center justify-between gap-2 text-xs font-semibold tracking-[0.12em] text-white uppercase">
                                Conhecer {property.name}
                                <FiArrowRight className="text-base text-secondary transition duration-300 group-hover:translate-x-1" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-12 flex items-center justify-center gap-2">
                <button
                    type="button"
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page === 1}
                    aria-label="Página anterior"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-30"
                >
                    <FiChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === page;
                    return (
                        <button
                            key={pageNumber}
                            type="button"
                            onClick={() => setPage(pageNumber)}
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
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                    disabled={page === totalPages}
                    aria-label="Próxima página"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-30"
                >
                    <FiChevronRight />
                </button>
            </div>
        </section>
    );
}
