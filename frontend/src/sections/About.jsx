import { useRef, useEffect } from 'react';
import { revealSection } from '../animations/gsap';
import SectionTitle from '../components/SectionTitle';
import './About.css';

export default function About({ profile }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        revealSection(sectionRef.current);
    }, []);

    if (!profile) return null;

    return (
        <section id="about" className="about-section" ref={sectionRef}>
            <SectionTitle title="About Me" subtitle="Get to know me a little better" />
            <div className="about-content">
                <div className="about-card glass-card">
                    <div className="about-avatar-wrapper">
                        {profile.avatar ? (
                            <img src={profile.avatar} alt={profile.name} className="about-avatar" />
                        ) : (
                            <div className="about-avatar-placeholder">{profile.name?.[0]}</div>
                        )}
                    </div>
                    <div className="about-text">
                        <p className="about-bio">{profile.bio}</p>
                        <div className="about-highlights">
                            <div className="highlight-item">
                                <span className="highlight-number gradient-text">1+</span>
                                <span className="highlight-label">Year Experience</span>
                            </div>
                            <div className="highlight-item">
                                <span className="highlight-number gradient-text">5+</span>
                                <span className="highlight-label">Projects Built</span>
                            </div>
                            <div className="highlight-item">
                                <span className="highlight-number gradient-text">5+</span>
                                <span className="highlight-label">Technologies</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
