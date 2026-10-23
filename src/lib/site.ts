export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ||
  "https://openhaus-delta.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "OpenHaus Negócios Imobiliários";

export const DEFAULT_DESCRIPTION =
  "Imóveis, empreendimentos e oportunidades selecionadas para quem busca mais do que um endereço.";

export const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dkgjwrjpv/image/upload/w_1200,h_630,c_pad,b_white,q_auto,f_jpg/v1791578302/WhatsApp_Image_2026-10-07_at_20.23.20_w5zyd0.jpg";

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
