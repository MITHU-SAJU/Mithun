import './SectionTitle.css';

export default function SectionTitle({ title, subtitle }) {
    return (
        <div className="section-title-wrapper">
            <h2 className="section-title">
                <span className="gradient-text">{title}</span>
            </h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
            <div className="section-title-line"></div>
        </div>
    );
}
