import { useRef, useEffect } from 'react';
import { heroTimeline } from '../animations/gsap';
import './Hero.css';

export default function Hero({ profile }) {
    const greeting = useRef(null);
    const nameRef = useRef(null);
    const roleRef = useRef(null);
    const introRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        if (profile) {
            heroTimeline([
                greeting.current,
                nameRef.current,
                roleRef.current,
                introRef.current,
                ctaRef.current,
            ]);
        }
    }, [profile]);

    if (!profile) return null;

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="hero-section">
            <div className="hero-bg-orb hero-orb-1"></div>
            <div className="hero-bg-orb hero-orb-2"></div>
            <div className="hero-bg-orb hero-orb-3"></div>

            <div className="hero-content">
                <p className="hero-greeting" ref={greeting}>👋 Hello, I'm</p>
                <h1 className="hero-name" ref={nameRef}>
                    <span className="gradient-text">{profile.name}</span>
                </h1>
                <h2 className="hero-role" ref={roleRef}>{profile.role}</h2>
                <p className="hero-intro" ref={introRef}>{profile.intro}</p>
                <div className="hero-cta" ref={ctaRef}>
                    <button className="btn-primary" onClick={scrollToProjects}>
                        View My Work
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button className="btn-secondary" onClick={scrollToContact}>
                        Get In Touch
                    </button>
                </div>
            </div>

            <div className="hero-scroll-indicator">
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
                <span>Scroll down</span>
            </div>
        </section>
    );
}
