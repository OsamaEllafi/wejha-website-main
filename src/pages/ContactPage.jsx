import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Globe } from 'lucide-react';
import '../styles/ContactPage.css';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'general',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) {
      tempErrors.name = isRtl ? 'الرجاء إدخال الاسم بالكامل' : 'Name is required';
    }
    if (!formData.email.trim()) {
      tempErrors.email = isRtl ? 'الرجاء إدخال البريد الإلكتروني' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = isRtl ? 'البريد الإلكتروني غير صحيح' : 'Invalid email address';
    }
    if (!formData.subject.trim()) {
      tempErrors.subject = isRtl ? 'الرجاء إدخال موضوع الرسالة' : 'Subject is required';
    }
    if (!formData.message.trim()) {
      tempErrors.message = isRtl ? 'الرجاء كتابة رسالتك' : 'Message is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);

    // Simulate async submission
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      
      // Log to console & save to localStorage for mockup completeness
      console.log('Contact Us Form Submission:', formData);
      const submissions = JSON.parse(localStorage.getItem('wejha_contact_submissions') || '[]');
      submissions.push({ ...formData, date: new Date().toISOString() });
      localStorage.setItem('wejha_contact_submissions', JSON.stringify(submissions));

      // Reset form
      setFormData({
        name: '',
        email: '',
        inquiryType: 'general',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="contact-page"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">{t('contact.title')}</h1>
        <p className="page-subtitle">{t('contact.subtitle')}</p>
      </header>

      {/* Main Grid Content */}
      <div className="contact-grid">
        
        {/* Info Column */}
        <motion.div variants={cardVariants} className="glass-panel contact-info-card">
          <div className="info-section-header">
            <Globe className="info-icon" size={28} />
            <h2>{t('contact.info_title')}</h2>
          </div>
          <p className="info-desc">{t('contact.info_desc')}</p>

          <div className="info-details-list">
            {/* Address */}
            <div className="info-detail-item">
              <div className="detail-icon-circle">
                <MapPin size={20} />
              </div>
              <div className="detail-content">
                <h4>{t('contact.address_label')}</h4>
                <p>{t('contact.address_val')}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="info-detail-item">
              <div className="detail-icon-circle">
                <Phone size={20} />
              </div>
              <div className="detail-content">
                <h4>{t('contact.phone_label')}</h4>
                <p dir="ltr">{t('contact.phone_val')}</p>
              </div>
            </div>

            {/* Email */}
            <div className="info-detail-item">
              <div className="detail-icon-circle">
                <Mail size={20} />
              </div>
              <div className="detail-content">
                <h4>{t('email_label', { defaultValue: 'البريد الإلكتروني' })}</h4>
                <p>{t('contact.email_val')}</p>
              </div>
            </div>
          </div>

          {/* Social Links inside Card */}
          <div className="contact-social-section">
            <h4>{t('contact.social_title')}</h4>
            <div className="social-links-grid">
              <a href="https://www.facebook.com/share/17jYdNTeBv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-card facebook">
                <span>Facebook</span>
              </a>
              <a href="https://www.instagram.com/wejha_wejha?igsh=dWs3eGx6cjN1cWt1" target="_blank" rel="noopener noreferrer" className="social-card instagram">
                <span>Instagram</span>
              </a>
              <a href="https://www.tiktok.com/@wejha_wejha?_r=1&_t=ZS-97VpTmN1mPU" target="_blank" rel="noopener noreferrer" className="social-card tiktok">
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div variants={cardVariants} className="glass-panel contact-form-card">
          <div className="form-section-header">
            <MessageSquare className="form-icon" size={28} />
            <h2>{t('contact.form_title')}</h2>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            
            {/* Name and Email Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{t('contact.name_label')}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.name_placeholder')}
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">{t('contact.email_label')}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.email_placeholder')}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.name && <span className="error-text">{errors.email}</span>}
              </div>
            </div>

            {/* Inquiry Type and Subject Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="inquiryType">{t('contact.inquiry_label')}</label>
                <select 
                  id="inquiryType" 
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                >
                  <option value="general">{t('contact.inquiry_general')}</option>
                  <option value="student">{t('contact.inquiry_student')}</option>
                  <option value="volunteer">{t('contact.inquiry_volunteer')}</option>
                  <option value="sponsor">{t('contact.inquiry_sponsor')}</option>
                  <option value="institution">{t('contact.inquiry_institution')}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">{t('contact.subject_label')}</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contact.subject_placeholder')}
                  className={errors.subject ? 'input-error' : ''}
                />
                {errors.subject && <span className="error-text">{errors.subject}</span>}
              </div>
            </div>

            {/* Message Group */}
            <div className="form-group">
              <label htmlFor="message">{t('contact.message_label')}</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.message_placeholder')}
                rows={5}
                className={errors.message ? 'input-error' : ''}
              ></textarea>
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`submit-btn ${isSending ? 'sending' : ''}`}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <span className="spinner"></span>
                  <span>{t('contact.sending_btn')}</span>
                </>
              ) : (
                <>
                  <span>{t('contact.send_btn')}</span>
                  <Send size={18} className="send-icon" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="glass-panel success-modal"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="success-icon-circle">
                <CheckCircle2 size={48} />
              </div>
              <h3>{t('contact.success_title')}</h3>
              <p>{t('contact.success_desc')}</p>
              <button 
                onClick={() => setShowSuccess(false)}
                className="close-modal-btn"
              >
                {t('contact.success_close')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
