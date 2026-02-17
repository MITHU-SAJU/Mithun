import './TimelineItem.css';

export default function TimelineItem({ item, index }) {
    return (
        <div className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}>
            <div className="timeline-dot"></div>
            <div className="timeline-card glass-card">
                <span className="timeline-period">{item.period}</span>
                <h3 className="timeline-role">{item.role}</h3>
                <h4 className="timeline-company">{item.company}</h4>
                <p className="timeline-description">{item.description}</p>
                <div className="timeline-tech">
                    {item.tech.map((t, i) => (
                        <span key={i} className="tech-tag">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
