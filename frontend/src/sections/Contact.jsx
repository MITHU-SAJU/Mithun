import emailjs from '@emailjs/browser';
import { useRef, useEffect, useState } from 'react';
import { revealSection } from '../animations/gsap';
import { submitContact } from '../services/api';
import SectionTitle from '../components/SectionTitle';
import './Contact.css';

export default function Contact() {
    const sectionRef = useRef(null);
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [sending, setSending] = useState(false);

    useEffect(() => {
        revealSection(sectionRef.current);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            setStatus({ type: 'error', message: 'Please fill in all required fields.' });
            return;
        }
        setSending(true);
        try {
            // 1. Save to local backend
            await submitContact(form);

            // 2. Send email via EmailJS
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (serviceId && templateId && publicKey && serviceId !== 'your_service_id') {
                const templateParams = {
                    name: form.name,     // Matches {{name}} in your screenshot
                    email: form.email,
                    phone: form.phone,
                    reply_to: form.email,
                    title: form.subject || 'New Portfolio Contact', // Matches {{title}} in your screenshot
                    message: form.message,
                    to_email: 'mithunmano0001@gmail.com'
                };

                const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
                console.log('EmailJS Success:', response.status, response.text);
            }

            setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            console.error('Contact Error:', error);
            const errorMessage = error?.text || error?.message || 'Something went wrong. Please try again later.';
            setStatus({ type: 'error', message: `Error: ${errorMessage}` });
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" className="contact-section" ref={sectionRef}>
            <SectionTitle title="Get In Touch" subtitle="Have a project in mind? Let's work together!" />
            <div className="contact-content">
                <form className="contact-form glass-card" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="contact-name">Name *</label>
                            <input
                                id="contact-name"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-email">Email *</label>
                            <input
                                id="contact-email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="contact-phone">Phone</label>
                            <input
                                id="contact-phone"
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Your phone number"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-subject">Subject</label>
                            <input
                                id="contact-subject"
                                type="text"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="What's this about?"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-message">Message *</label>
                        <textarea
                            id="contact-message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Your message..."
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    {status.message && (
                        <div className={`form-status ${status.type}`}>
                            {status.message}
                        </div>
                    )}
                    <button type="submit" className="btn-primary contact-submit" disabled={sending}>
                        {sending ? 'Sending...' : 'Send Message'}
                        {!sending && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
}
