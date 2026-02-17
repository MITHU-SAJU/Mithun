import { useRef, useEffect } from 'react';
import { useExperience } from '../hooks/useExperience';
import { revealSection, timelineSlideIn } from '../animations/gsap';
import SectionTitle from '../components/SectionTitle';
import TimelineItem from '../components/TimelineItem';
import Loader from '../components/Loader';
import './Experience.css';

export default function Experience() {
    const { experience, loading } = useExperience();
    const sectionRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        revealSection(sectionRef.current);
    }, []);

    useEffect(() => {
        if (!loading && itemsRef.current.length > 0) {
            timelineSlideIn(itemsRef.current.filter(Boolean));
        }
    }, [loading, experience]);

    return (
        <section id="experience" className="experience-section" ref={sectionRef}>
            <SectionTitle title="Experience" subtitle="My professional journey" />
            {loading ? (
                <Loader />
            ) : (
                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    {experience.map((item, i) => (
                        <div key={item.id} ref={el => itemsRef.current[i] = el}>
                            <TimelineItem item={item} index={i} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
