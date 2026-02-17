import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade-up reveal for a section when scrolled into view.
 */
export function revealSection(el, options = {}) {
    if (!el) return;
    gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'top 50%',
                toggleActions: 'play none none none',
                ...options.scrollTrigger,
            },
            ...options,
        }
    );
}

/**
 * Staggered reveal for an array of cards/items.
 */
export function staggerCards(els, options = {}) {
    if (!els || els.length === 0) return;
    gsap.fromTo(
        els,
        { y: 50, opacity: 0, scale: 0.95 },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: els[0],
                start: 'top 85%',
                toggleActions: 'play none none none',
                ...options.scrollTrigger,
            },
            ...options,
        }
    );
}

/**
 * Hero entrance timeline — sequential animation of multiple elements.
 */
export function heroTimeline(elements) {
    const tl = gsap.timeline({ delay: 0.3 });

    elements.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
            el,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
            i * 0.15
        );
    });

    return tl;
}

/**
 * Animate a progress bar to its target width.
 */
export function animateProgressBar(el, targetWidth, options = {}) {
    if (!el) return;
    gsap.fromTo(
        el,
        { width: '0%' },
        {
            width: `${targetWidth}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
                ...options.scrollTrigger,
            },
            ...options,
        }
    );
}

/**
 * Timeline entry slide-in animation.
 */
export function timelineSlideIn(els) {
    if (!els || els.length === 0) return;
    els.forEach((el, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        gsap.fromTo(
            el,
            { x: direction * 60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });
}

/**
 * Refresh all ScrollTrigger instances — call after data loads.
 */
export function refreshScrollTrigger() {
    ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
