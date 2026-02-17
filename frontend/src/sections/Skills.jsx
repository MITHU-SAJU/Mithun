import { useRef, useEffect } from 'react';
import { useSkills } from '../hooks/useSkills';
import { revealSection, staggerCards } from '../animations/gsap';
import SectionTitle from '../components/SectionTitle';
import Loader from '../components/Loader';
import './Skills.css';

export default function Skills() {
    const { skills, loading } = useSkills();
    const sectionRef = useRef(null);
    const categoryRefs = useRef([]);

    useEffect(() => {
        revealSection(sectionRef.current);
    }, []);

    useEffect(() => {
        if (!loading && categoryRefs.current.length > 0) {
            staggerCards(categoryRefs.current.filter(Boolean));
        }
    }, [loading, skills]);

    // Group skills by category
    const categories = {
        Frontend: [],
        Backend: [],
        Database: []
    };

    skills.forEach(skill => {
        if (categories[skill.category]) {
            categories[skill.category].push(skill);
        }
    });

    return (
        <section id="skills" className="skills-section" ref={sectionRef}>
            <SectionTitle title="Skills & Tech" subtitle="My technical expertise" />
            {loading ? (
                <Loader />
            ) : (
                <div className="skills-container">
                    {Object.entries(categories).map(([category, items], index) => (
                        <div
                            key={category}
                            className="skills-category-card glass-card"
                            ref={el => categoryRefs.current[index] = el}
                        >
                            <h3 className="skills-category-title">{category}</h3>
                            <div className="skills-list">
                                {items.map(skill => (
                                    <div key={skill.id} className="skill-item">
                                        <span className="skill-name">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
