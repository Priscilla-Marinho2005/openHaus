import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { LuBath, LuBedDouble } from "react-icons/lu";
import { TbRulerMeasure } from "react-icons/tb";
import {
    formatBRL,
    formatLocation,
    type CatalogCard,
} from "../../lib/catalog";

export default function PropertyCard({ item }: { item: CatalogCard }) {
    const image = item.imagens[0] ?? "";
    return (
        <Link
            to={`/imoveis/${item.slug}`}
            className="group flex min-h-130 cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-green/40 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-green/50"
        >
            <div className="relative h-72 overflow-hidden bg-white/5">
                {image ? (
                    <img
                        src={image}
                        alt={item.nome}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                ) : null}
                <span className="absolute top-4 left-4 rounded-full bg-green px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
                    {item.badge}
                </span>
            </div>

            <div className="flex flex-1 flex-col gap-5 bg-green/20 p-6">
                <div className="flex items-start justify-between gap-4 text-[11px] font-medium tracking-[0.12em] text-gray uppercase">
                    <span>{formatLocation(item)}</span>
                    <span>{item.tipo || item.kind}</span>
                </div>

                <div>
                    <h3 className="font-secondary text-xl font-bold tracking-tight uppercase">
                        {item.nome}
                    </h3>
                    <p className="mt-1 text-sm text-gray">
                        {item.kind === "empreendimento" && item.valor != null
                            ? `A partir de ${formatBRL(item.valor)}`
                            : formatBRL(item.valor)}
                    </p>
                    {item.empreendimentoNome ? (
                        <p className="mt-1 text-xs text-gray">{item.empreendimentoNome}</p>
                    ) : null}
                </div>

                <div className="flex items-center justify-center gap-12 text-sm text-gray">
                    <span className="inline-flex items-center gap-1.5">
                        <LuBedDouble className="text-base text-secondary" />
                        {item.quartos ?? "—"}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <LuBath className="text-base text-secondary" />
                        {item.banheiros ?? "—"}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <TbRulerMeasure className="text-base text-secondary" />
                        {item.areaM2 != null ? `${item.areaM2} m²` : "—"}
                    </span>
                </div>

                <span className="mt-auto inline-flex items-center justify-between gap-2 text-xs font-semibold tracking-[0.12em] text-white uppercase">
                    Conhecer {item.nome}
                    <FiArrowRight className="text-base text-secondary transition duration-300 group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    );
}
