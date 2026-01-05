import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="about min-h-screen">
      <section className="about-hero">
        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="about-title">
            THE <span className="text-accent">REDOLIC</span> STORY
          </h1>
          <div className="about-divider"></div>
        </motion.div>
      </section>

      <section className="about-content">
        <div className="about-grid">
          <motion.div
            className="about-text-block"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="about-subtitle">WHO WE ARE</h2>
            <p className="about-description">
              Redolic is not just a brand—it's a movement. Born from the streets
              and refined by passion, we create pieces that challenge convention
              and celebrate individuality.
            </p>
            <p className="about-description">
              Each design tells a story, each stitch carries intention. We
              believe fashion should be fearless, authentic, and unapologetically
              bold.
            </p>
          </motion.div>

          <motion.div
            className="about-image-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="About Redolic"
              className="about-image"
            />
          </motion.div>
        </div>
      </section>

      <section className="philosophy-section">
        <motion.div
          className="philosophy-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="philosophy-title">OUR PHILOSOPHY</h2>
          <div className="philosophy-grid">
            {[
              {
                title: 'QUALITY',
                desc: 'Premium fabrics, meticulous craftsmanship',
              },
              {
                title: 'AUTHENTICITY',
                desc: 'Stay true, stay unique',
              },
              {
                title: 'REBELLION',
                desc: 'Break rules, set trends',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="philosophy-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="philosophy-card-title">{item.title}</h3>
                <p className="philosophy-card-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="vision-section">
        <motion.div
          className="vision-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <blockquote className="vision-quote">
            "Style is a way to say who you are without having to speak."
          </blockquote>
          <p className="vision-author">— REDOLIC MANIFESTO</p>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
