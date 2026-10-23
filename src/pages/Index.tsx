import Seo from "../components/Seo";
import Nav from "../components/UI/Nav";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "../lib/site";

const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    telephone: "+55-81-8539-9988",
    areaServed: "Brasil",
};
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Highlights from "../components/Home/Highlights";
import Properties from "../components/Home/Properties";
import Testimonials from "../components/Home/Testimonials";
import CTA from "../components/Home/CTA";
import Footer from "../components/UI/Footer";

export default function Index() {
    return (
        <div>
            <Seo
                title={SITE_NAME}
                description={DEFAULT_DESCRIPTION}
                path="/"
                jsonLd={homeJsonLd}
            />
            <Nav />
            <Hero />
            <About />
            <Highlights />
            <Properties />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    )
}