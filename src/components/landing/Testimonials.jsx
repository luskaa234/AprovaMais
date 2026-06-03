import { Star } from "lucide-react";
import { motion } from "framer-motion";

const defaultTestimonials = [
  {
    name: "Ana Lima",
    approvedRole: "Aprovada Polícia Civil SP",
    organization: "Polícia Civil SP",
    year: "2024",
    rating: 5,
    text: "Em 4 meses organizei meu estudo por edital e passei em 3º lugar.",
  },
  {
    name: "Carlos Mendes",
    approvedRole: "Aprovado PRF",
    organization: "PRF",
    year: "2024",
    rating: 5,
    text: "O cronograma inteligente me fez estudar menos e acertar mais.",
  },
  {
    name: "Fernanda Souza",
    approvedRole: "Aprovada Guarda Municipal RJ",
    organization: "Guarda Municipal RJ",
    year: "2025",
    rating: 5,
    text: "Nunca tinha conseguido passar. Com o plano por edital, passei na primeira tentativa.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: index * 0.12, ease: "easeOut" },
  }),
};

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Testimonials({ testimonials = defaultTestimonials }) {
  return (
    <section className="section-shell testimonials-section">
      <div className="section-heading">
        <span className="eyebrow">Resultados reais</span>
        <h2>Quem já aprovou com a Aprova+</h2>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <motion.article
            className="premium-card testimonial-card"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={cardVariants}
            key={`${testimonial.name}-${testimonial.year}`}
          >
            <div className="testimonial-top">
              {testimonial.photo ? (
                <img src={testimonial.photo} alt={testimonial.name} />
              ) : (
                <span className="testimonial-avatar">{getInitials(testimonial.name)}</span>
              )}
              <div>
                <h3>{testimonial.name}</h3>
                <p>{testimonial.approvedRole}</p>
              </div>
            </div>

            <div className="testimonial-meta">
              <span>{testimonial.organization}</span>
              <span>{testimonial.year}</span>
            </div>

            <div className="testimonial-stars" aria-label={`${testimonial.rating} de 5 estrelas`}>
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star
                  key={starIndex}
                  size={16}
                  fill={starIndex < testimonial.rating ? "currentColor" : "none"}
                />
              ))}
            </div>

            <p className="testimonial-text">“{testimonial.text}”</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
