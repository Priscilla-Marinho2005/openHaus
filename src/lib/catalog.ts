export type CatalogKind = "empreendimento" | "imovel";

export type CatalogCard = {
    kind: CatalogKind;
    id: string;
    slug: string;
    nome: string;
    cidade: string | null;
    endereco: string | null;
    localidade: string | null;
    tipo: string | null;
    status: string | null;
    badge: string;
    quartos: number | null;
    banheiros: number | null;
    suites: number | null;
    vagas: number | null;
    areaM2: number | null;
    valor: number | null;
    imagens: string[];
    construtora?: string | null;
    bairro?: string | null;
    estado?: string | null;
    empreendimentoId?: string | null;
    empreendimentoNome?: string | null;
    empreendimentoSlug?: string | null;
};

export type CatalogResponse = {
    tenantSlug: string;
    imobiliaria: string;
    empreendimentos: CatalogCard[];
    imoveis: CatalogCard[];
};

export type EmpreendimentoPublico = CatalogCard & {
    previsaoEntrega?: string | null;
    valorReferencia?: number | null;
    vitrine?: {
        headline?: string | null;
        descricao?: string | null;
        plantas?: string[];
        suites?: number | null;
        bairro?: string | null;
        estado?: string | null;
        tipologias?: {
            nome: string;
            areaM2: number | null;
            quartos: number | null;
            suites: number | null;
            banheiros: number | null;
            vagas: number | null;
            valor: number | null;
            plantaUrl: string | null;
        }[];
    } | null;
    imoveis?: CatalogCard[];
};

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") || "/api";
export const TENANT_SLUG =
    (import.meta.env.VITE_TENANT_SLUG as string | undefined)?.trim() || "open-haus";

async function fetchJson<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`);
    if (!response.ok) {
        throw new Error("Não foi possível carregar o catálogo.");
    }
    return response.json() as Promise<T>;
}

export function fetchCatalog() {
    return fetchJson<CatalogResponse>(
        `/publico/empreendimentos/catalogo/${encodeURIComponent(TENANT_SLUG)}`,
    );
}

export function fetchEmpreendimento(slug: string) {
    return fetchJson<EmpreendimentoPublico>(
        `/publico/empreendimentos/${encodeURIComponent(TENANT_SLUG)}/${encodeURIComponent(slug)}`,
    );
}

export function fetchImovel(id: string) {
    return fetchJson<CatalogCard>(
        `/publico/empreendimentos/catalogo/${encodeURIComponent(TENANT_SLUG)}/imoveis/${encodeURIComponent(id)}`,
    );
}

export function formatBRL(value: number | null | undefined) {
    if (value == null || !Number.isFinite(value)) return "Consulte condições";
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatLocation(item: Pick<CatalogCard, "localidade" | "cidade" | "estado">) {
    const city = item.localidade || item.cidade;
    if (city && item.estado) return `${city} · ${item.estado}`;
    return city || "Local a confirmar";
}

export function imovelIdFromSlug(slug: string) {
    return slug.startsWith("imovel-") ? slug.slice("imovel-".length) : null;
}
