import { useEffect } from 'react';

/**
 * useScrollReveal — attaches IntersectionObserver to elements with
 * class `reveal`, `reveal-left`, or `reveal-right`, toggling `visible`
 * when they enter the viewport.
 *
 * Usage: call once at the top of any page/layout component.
 */
export function useScrollReveal() {
    useEffect(() => {
        const revealInViewport = () => {
            const elements = document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)');
            elements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight + 80 && rect.bottom > 0) {
                    el.classList.add('visible');
                }
            });
        };

        // Immediate check on mount so content is never stuck hidden
        revealInViewport();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.02, rootMargin: '60px 0px' }
        );

        const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        elements.forEach((el) => observer.observe(el));

        window.addEventListener('scroll', revealInViewport, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', revealInViewport);
        };
    }, []);
}
