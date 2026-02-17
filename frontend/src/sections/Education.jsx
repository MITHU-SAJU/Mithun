import { useRef, useEffect } from 'react';
import { revealSection, staggerCards } from '../animations/gsap';
import SectionTitle from '../components/SectionTitle';
import './Education.css';

export default function Education({ profile }) {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        revealSection(sectionRef.current);
    }, []);

    useEffect(() => {
        if (profile?.education && cardsRef.current.length > 0) {
            staggerCards(cardsRef.current.filter(Boolean));
        }
    }, [profile]);

    if (!profile?.education) return null;

    return (
        <section id="education" className="education-section" ref={sectionRef}>
            <SectionTitle title="Education" subtitle="My academic background" />
            <div className="education-grid">
                {profile.education.map((edu, i) => (
                    <div className="education-card glass-card" key={i} ref={el => cardsRef.current[i] = el}>
                        <div className="education-icon-wrapper">
                            <span className="education-icon">🎓</span>
                        </div>
                        <div className="education-card-content">
                            <div className="education-card-header">
                                <h3 className="education-card-degree">{edu.degree}</h3>
                                <div className="education-badges">
                                    {edu.status && <span className="edu-badge edu-badge-status">{edu.status}</span>}
                                    {edu.cgpa && <span className="edu-badge edu-badge-cgpa">CGPA: {edu.cgpa}</span>}
                                </div>
                            </div>
                            <p className="education-card-institution">{edu.institution}</p>
                            <span className="education-card-period">{edu.period}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
