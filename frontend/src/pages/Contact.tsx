import { motion } from 'framer-motion';
import { MapPin, Phone, Instagram, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="contact min-h-screen">
      <section className="contact-hero">
        <motion.div
          className="contact-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="contact-title">
            GET IN <span className="text-accent">TOUCH</span>
          </h1>
          <p className="contact-subtitle">
            Let's create something extraordinary together
          </p>
        </motion.div>
      </section>

      <section className="contact-content">
        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="contact-info-title">REACH OUT</h2>
            <div className="contact-info-items">
              <div className="contact-info-item">
                <MapPin className="contact-icon" />
                <div>
                  <h3>LOCATION</h3>
                  <p>
                    Coimbatore, Tamil Nadu - 641108
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <Phone className="contact-icon" />
                <div>
                  <h3>PHONE</h3>
                  <a href="tel:+916381901716" className="cursor-hover">
                    +91 63819 01716
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <Instagram className="contact-icon" />
                <div>
                  <h3>INSTAGRAM</h3>
                  <a
                    href="https://www.instagram.com/redolic.in/?igsh=YWF6dXF6bDNoeXRi&utm_source=qr#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-hover"
                  >
                    @redolic.in
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="YOUR NAME"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="YOUR EMAIL"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="YOUR MESSAGE"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  rows={6}
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="form-button cursor-hover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SEND MESSAGE
                <Send className="button-icon" size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="map-section">
        <motion.div
          className="map-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5!2d76.9!3d11.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAwJzAwLjAiTiA3NsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Redolic Location"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
