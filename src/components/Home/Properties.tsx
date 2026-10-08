import { FiArrowRight, FiChevronDown } from "react-icons/fi";

const filters = [
    { label: "Localização", name: "localizacao" },
    { label: "Tipo de imóvel", name: "tipo" },
    { label: "Faixa de preço", name: "preco" },
    { label: "Quartos", name: "quartos" },
    { label: "Finalidade", name: "finalidade" },
];

const properties = [
    {
        badge: "Lançamento",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        location: "Recife · PE",
        type: "Apartamentos",
        name: "Haus Residence",
        price: "A partir de R$ XXX.XXX",
    },
    {
        badge: "Exclusivo",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        location: "Boa Viagem · PE",
        type: "Alto padrão",
        name: "Haus Prime",
        price: "A partir de R$ X.XXX.XXX",
    },
    {
        badge: "Oportunidade",
        image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
        location: "Olinda · PE",
        type: "Investimento",
        name: "Haus Skyline",
        price: "A partir de R$ XXX.XXX",
    },
];

export default function Properties() {
    return (
        <section
            id="imoveis"
            className="scroll-mt-28 bg-primary px-10 py-20 text-white lg:px-50"
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
                <p className="max-w-sm text-sm leading-relaxed text-gray lg:text-right">
                    Uma seleção de empreendimentos e oportunidades para diferentes
                    momentos, objetivos e estilos de vida.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                    <article
                        key={property.name}
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

                            <button
                                type="button"
                                className="mt-auto inline-flex items-center justify-between gap-2 text-xs font-semibold tracking-[0.12em] text-white uppercase"
                            >
                                Conhecer {property.name}
                                <FiArrowRight className="text-base text-secondary transition duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
