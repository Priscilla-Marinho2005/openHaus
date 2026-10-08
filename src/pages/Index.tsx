import Nav from "../components/UI/Nav";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Properties from "../components/Home/Properties";

export default function Index() {
    return (
        <div>
            <Nav />
            <Hero />
            <About />
            <Properties />
        </div>
    )
}