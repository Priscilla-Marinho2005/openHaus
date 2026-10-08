import Nav from "../components/UI/Nav";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Properties from "../components/Home/Properties";
import Testimonials from "../components/Home/Testimonials";
import CTA from "../components/Home/CTA";
import Footer from "../components/UI/Footer";

export default function Index() {
    return (
        <div>
            <Nav />
            <Hero />
            <About />
            <Properties />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    )
}