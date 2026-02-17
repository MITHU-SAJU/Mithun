import { useRef, useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';
import SectionTitle from '../components/SectionTitle';
import Loader from '../components/Loader';
import { gsap } from '../animations/gsap';
import './Projects.css';

export default function Projects() {
    const { projects, loading } = useProjects();
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        if (!loading && projects.length > 0) {
            const ctx = gsap.context(() => {
                // Animate Cards
                cardsRef.current.forEach((card, i) => {
                    if (!card) return;
                    const isEven = i % 2 === 0;

                    gsap.fromTo(card,
                        { x: isEven ? -50 : 50, opacity: 0, scale: 0.95 },
                        {
                            x: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 80%',
                                end: 'top 50%',
                                toggleActions: 'play none none none' // Play once
                            }
                        }
                    );
                });
            }, sectionRef); // Scope to section

            return () => ctx.revert();
        }
    }, [loading, projects]);

    if (loading) return <Loader />;

    return (
        <section id="projects" className="projects-section" ref={sectionRef}>
            <SectionTitle title="Featured Projects" subtitle="Selected works from my portfolio" />

            <div className="projects-list">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`project-card-vertical glass-card ${index % 2 !== 0 ? 'reverse' : ''}`}
                        ref={el => cardsRef.current[index] = el}
                    >
                        <div className="project-visual-vertical">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="project-img-vertical"
                                onError={(e) => { e.target.src = '/images/project-placeholder.svg'; }}
                            />
                            {project.featured && <span className="visual-badge">Featured</span>}
                            <div className="project-highlight-overlay"></div>
                        </div>

                        <div className="project-details-vertical">
                            <h3 className="project-title-vertical">{project.title}</h3>

                            <div className="project-tags-vertical">
                                {project.tech_stack.map((tech, i) => (
                                    <span key={i} className="tech-pill">{tech}</span>
                                ))}
                            </div>

                            <p className="project-desc-vertical">{project.description}</p>

                            <div className="project-actions-vertical">
                                {project.live_url && (
                                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                                        Live Demo
                                    </a>
                                )}

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
