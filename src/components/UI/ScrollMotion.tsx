import { useEffect } from "react";

export default function ScrollMotion() {
    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const seen = new WeakSet<Element>();

        const show = (element: HTMLElement) => {
            const delay = reduced ? 0 : Number(element.dataset.revealDelay || 0);
            window.setTimeout(() => element.classList.add("is-in"), delay);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    show(entry.target as HTMLElement);
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
        );

        const watch = (node: Element) => {
            if (!(node instanceof HTMLElement) || !node.hasAttribute("data-reveal")) return;
            if (seen.has(node) || node.classList.contains("is-in")) return;
            seen.add(node);
            observer.observe(node);
        };

        const scan = (root: ParentNode) => {
            if (root instanceof HTMLElement) watch(root);
            root.querySelectorAll?.("[data-reveal]").forEach(watch);
        };

        let frame = 0;
        const moveParallax = () => {
            frame = 0;
            if (reduced) return;
            document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
                const rect = element.getBoundingClientRect();
                const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
                const shift = Math.max(-16, Math.min(16, progress * -26));
                element.style.transform = `translate3d(0, ${shift}px, 0)`;
            });
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(moveParallax);
        };

        scan(document);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        moveParallax();

        const mutations = new MutationObserver((records) => {
            records.forEach((record) => {
                record.addedNodes.forEach((node) => {
                    if (node instanceof HTMLElement) scan(node);
                });
            });
        });
        mutations.observe(document.body, { childList: true, subtree: true });

        return () => {
            if (frame) cancelAnimationFrame(frame);
            observer.disconnect();
            mutations.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return null;
}
