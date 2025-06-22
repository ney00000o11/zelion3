import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  Star, 
  Trophy, 
  Target,
  Shield,
  Zap,
  Gift,
  Percent,
  Clock
} from 'lucide-react';

interface EmailFormData {
  email: string;
}

function Offers() {
  const [formData, setFormData] = useState<EmailFormData>({
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const offers = [
    {
      title: "Elite Pro Bundle",
      discount: "25% OFF",
      description: "Complete cricket kit with premium bat, pads, and gloves",
      originalPrice: "₹45,999",
      offerPrice: "₹34,499",
      icon: <Trophy size={24} />,
      color: "from-yellow-500 to-orange-500",
      badge: "Best Value"
    },
    {
      title: "Professional Bat Series",
      discount: "20% OFF",
      description: "Handcrafted English willow bats for serious players",
      originalPrice: "₹19,999",
      offerPrice: "₹15,999",
      icon: <Target size={24} />,
      color: "from-green-500 to-emerald-500",
      badge: "Limited Time"
    },
    {
      title: "Guardian Protection Set",
      discount: "30% OFF",
      description: "Complete protective gear including pads, helmet, and guards",
      originalPrice: "₹25,999",
      offerPrice: "₹18,199",
      icon: <Shield size={24} />,
      color: "from-blue-500 to-cyan-500",
      badge: "Popular"
    },
    {
      title: "Speed Training Kit",
      discount: "15% OFF",
      description: "Professional training equipment for skill development",
      originalPrice: "₹12,999",
      offerPrice: "₹11,049",
      icon: <Zap size={24} />,
      color: "from-purple-500 to-indigo-500",
      badge: "New"
    }
  ];

  const testimonials = [
    {
      quote: "Zelion balls changed the game for me! The precision and quality are unmatched.",
      author: "Rohit Sharma",
      role: "International Cricketer",
      rating: 5
    },
    {
      quote: "The bat feels like an extension of my arm. Perfect balance and power delivery.",
      author: "Virat Kohli",
      role: "Former Captain",
      rating: 5
    },
    {
      quote: "Zelion's protective gear gives me confidence to play my natural game fearlessly.",
      author: "MS Dhoni",
      role: "Wicket-keeper Batsman",
      rating: 5
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ email: value });
    setError('');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // EmailJS configuration
      const templateParams = {
        user_email: formData.email,
        to_email: 'adhiln968@gmail.com',
        message: `New subscription from: ${formData.email}`,
        subject: 'New Newsletter Subscription - Zelion Cricket'
      };

      // Replace these with your actual EmailJS credentials
      const serviceId = 'your_service_id';
      const templateId = 'your_template_id';
      const publicKey = 'your_public_key';

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setIsSubmitted(true);
      setFormData({ email: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Failed to send email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="offers-section">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="offers-header"
        >
          <div className="offers-badge">
            <Gift size={20} />
            <span>Exclusive Offers</span>
          </div>
          <h2 className="section-title">Glimpse to our assets</h2>
          <p className="section-subtitle">
            Get exclusive access to our premium cricket gear at unbeatable prices. 
            Subscribe to our newsletter for early access to sales and special offers.
          </p>
        </motion.div>

        {/* Centered Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="offers-image-container"
        >
          <img 
            src="/images/product-kit.png" 
            alt="Zelion Cricket Equipment" 
            className="offers-image"
          />
        </motion.div>

        {/* Email Subscription Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="email-subscription"
        >
          <div className="subscription-content">
            <div className="subscription-info">
              <h3 className="subscription-title">Stay Updated with Exclusive Offers</h3>
              <p className="subscription-description">
                Join our community of cricket enthusiasts and be the first to know about 
                new products, special discounts, and exclusive deals.
              </p>
              <div className="subscription-benefits">
                <div className="benefit-item">
                  <Percent size={16} />
                  <span>Early access to sales</span>
                </div>
                <div className="benefit-item">
                  <Gift size={16} />
                  <span>Exclusive member discounts</span>
                </div>
                <div className="benefit-item">
                  <Clock size={16} />
                  <span>New product notifications</span>
                </div>
              </div>
            </div>

            <div className="subscription-form-container">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="subscription-form">
                  <div className="email-input-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="adhiln968@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="email-input"
                      disabled={isSubmitting}
                    />
                    <button 
                      type="submit" 
                      className="submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="spinner"></div>
                      ) : (
                        <Send size={18} />
                      )}
                    </button>
                  </div>
                  {error && (
                    <div className="error-message">
                      {error}
                    </div>
                  )}
                </form>
              ) : (
                <div className="success-message">
                  <CheckCircle size={48} />
                  <h4>Successfully Subscribed!</h4>
                  <p>Thank you for joining our community. Check your email for exclusive offers.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Offers Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="offers-grid"
        >
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="offer-card"
            >
              <div className="offer-badge">
                {offer.badge}
              </div>
              <div className={`offer-icon bg-gradient-to-br ${offer.color}`}>
                {offer.icon}
              </div>
              <div className="offer-discount">{offer.discount}</div>
              <h3 className="offer-title">{offer.title}</h3>
              <p className="offer-description">{offer.description}</p>
              <div className="offer-pricing">
                <span className="original-price">{offer.originalPrice}</span>
                <span className="offer-price">{offer.offerPrice}</span>
              </div>
              <button className="offer-button">
                Claim Offer
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="testimonials-section"
        >
          <div className="testimonials-header">
            <h3 className="testimonials-title">"Zelion balls changed the game for me!" - Pro Cricketer</h3>
            <p className="testimonials-subtitle">What professional cricketers say about Zelion</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="testimonial-card"
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>
                <blockquote className="testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>
                <div className="testimonial-author">
                  <div className="author-info">
                    <span className="author-name">{testimonial.author}</span>
                    <span className="author-role">{testimonial.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Offers;