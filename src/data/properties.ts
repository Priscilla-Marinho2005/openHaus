export type Property = {
    id: string;
    slug: string;
    badge: string;
    image: string;
    images: string[];
    plans: { title: string; image: string }[];
    location: string;
    address: string;
    type: string;
    name: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    suites: number;
    parking: number;
    area: number;
    totalArea: number;
    specs: { label: string; value: string }[];
};

export const properties: Property[] = [
    {
        id: "residence-1",
        slug: "haus-residence",
        badge: "Lançamento",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
        ],
        plans: [
            {
                title: "Planta tipo 1",
                image: "https://images.unsplash.com/photo-1523217582562-09d4ea5a0f5e?auto=format&fit=crop&w=1200&q=80",
            },
            {
                title: "Planta tipo 2",
                image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
            },
        ],
        location: "Recife · PE",
        address: "Recife, Pernambuco",
        type: "Médio padrão",
        name: "Haus Residence",
        price: "A partir de R$ XXX.XXX",
        bedrooms: 2,
        bathrooms: 2,
        suites: 1,
        parking: 1,
        area: 75,
        totalArea: 90,
        specs: [
            { label: "Quartos", value: "2" },
            { label: "Suítes", value: "1" },
            { label: "Banheiros", value: "2" },
            { label: "Vagas", value: "1" },
            { label: "Área privativa", value: "75 m²" },
            { label: "Área total", value: "90 m²" },
            { label: "Padrão", value: "Médio" },
            { label: "Status", value: "Lançamento" },
        ],
    },
    {
        id: "prime-1",
        slug: "haus-prime",
        badge: "Exclusivo",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
        images: [
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
        ],
        plans: [
            {
                title: "Planta living",
                image: "https://images.unsplash.com/photo-1523217582562-09d4ea5a0f5e?auto=format&fit=crop&w=1200&q=80",
            },
            {
                title: "Planta master",
                image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
            },
        ],
        location: "Boa Viagem · PE",
        address: "Boa Viagem, Recife - PE",
        type: "Alto padrão",
        name: "Haus Prime",
        price: "A partir de R$ X.XXX.XXX",
        bedrooms: 3,
        bathrooms: 3,
        suites: 2,
        parking: 2,
        area: 140,
        totalArea: 180,
        specs: [
            { label: "Quartos", value: "3" },
            { label: "Suítes", value: "2" },
            { label: "Banheiros", value: "3" },
            { label: "Vagas", value: "2" },
            { label: "Área privativa", value: "140 m²" },
            { label: "Área total", value: "180 m²" },
            { label: "Padrão", value: "Alto" },
            { label: "Status", value: "Exclusivo" },
        ],
    },
    {
        id: "skyline-1",
        slug: "haus-skyline",
        badge: "Oportunidade",
        image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
        images: [
            "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1600&q=80",
        ],
        plans: [
            {
                title: "Planta vista mar",
                image: "https://images.unsplash.com/photo-1523217582562-09d4ea5a0f5e?auto=format&fit=crop&w=1200&q=80",
            },
            {
                title: "Planta garden",
                image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
            },
        ],
        location: "Olinda · PE",
        address: "Olinda, Pernambuco",
        type: "Praia",
        name: "Haus Skyline",
        price: "A partir de R$ XXX.XXX",
        bedrooms: 2,
        bathrooms: 2,
        suites: 1,
        parking: 1,
        area: 90,
        totalArea: 110,
        specs: [
            { label: "Quartos", value: "2" },
            { label: "Suítes", value: "1" },
            { label: "Banheiros", value: "2" },
            { label: "Vagas", value: "1" },
            { label: "Área privativa", value: "90 m²" },
            { label: "Área total", value: "110 m²" },
            { label: "Padrão", value: "Praia" },
            { label: "Status", value: "Oportunidade" },
        ],
    },
    {
        id: "residence-2",
        slug: "haus-residence",
        badge: "Lançamento",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
        images: [],
        plans: [],
        location: "Recife · PE",
        address: "Recife, Pernambuco",
        type: "Médio padrão",
        name: "Haus Residence",
        price: "A partir de R$ XXX.XXX",
        bedrooms: 2,
        bathrooms: 2,
        suites: 1,
        parking: 1,
        area: 75,
        totalArea: 90,
        specs: [],
    },
    {
        id: "prime-2",
        slug: "haus-prime",
        badge: "Exclusivo",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
        images: [],
        plans: [],
        location: "Boa Viagem · PE",
        address: "Boa Viagem, Recife - PE",
        type: "Alto padrão",
        name: "Haus Prime",
        price: "A partir de R$ X.XXX.XXX",
        bedrooms: 3,
        bathrooms: 3,
        suites: 2,
        parking: 2,
        area: 140,
        totalArea: 180,
        specs: [],
    },
    {
        id: "skyline-2",
        slug: "haus-skyline",
        badge: "Oportunidade",
        image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
        images: [],
        plans: [],
        location: "Olinda · PE",
        address: "Olinda, Pernambuco",
        type: "Praia",
        name: "Haus Skyline",
        price: "A partir de R$ XXX.XXX",
        bedrooms: 2,
        bathrooms: 2,
        suites: 1,
        parking: 1,
        area: 90,
        totalArea: 110,
        specs: [],
    },
];

export function getPropertyBySlug(slug: string) {
    return properties.find((property) => property.slug === slug && property.specs.length > 0)
        ?? properties.find((property) => property.slug === slug);
}
