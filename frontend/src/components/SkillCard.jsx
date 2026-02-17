import { useRef, useEffect } from 'react';
import { animateProgressBar } from '../animations/gsap';
import './SkillCard.css';

export default function SkillCard({ skill }) {
    const barRef = useRef(null);

    useEffect(() => {
        animateProgressBar(barRef.current, skill.proficiency);
    }, [skill.proficiency]);

    return (
        <div className="skill-card glass-card">
            <div className="skill-card-header">
                <span className="skill-icon">{skill.icon}</span>
                <div className="skill-info">
                    <h4 className="skill-name">{skill.name}</h4>
                    <span className="skill-category">{skill.category}</span>
                </div>
                <span className="skill-percent">{skill.proficiency}%</span>
            </div>
            <div className="skill-bar-track">
                <div className="skill-bar-fill" ref={barRef}></div>
            </div>
        </div>
    );
}
