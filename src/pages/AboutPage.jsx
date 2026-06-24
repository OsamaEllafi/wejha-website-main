import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Target, BookOpen } from 'lucide-react';
import '../styles/AboutPage.css';

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

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

  const [expandedId, setExpandedId] = useState(null);

  const faqList = [
    { id: 1, question: t('faq.q1'), answer: t('faq.a1') },
    { id: 2, question: t('faq.q2'), answer: t('faq.a2') },
    { id: 3, question: t('faq.q3'), answer: t('faq.a3') },
    { id: 4, question: t('faq.q4'), answer: t('faq.a4') },
    { id: 5, question: t('faq.q5'), answer: t('faq.a5') },
    { id: 6, question: t('faq.q6'), answer: t('faq.a6') }
  ];

  const toggleFaq = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="about-page"
    >
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">{t('about.title')}</h1>
        <p className="page-subtitle">{t('about.subtitle')}</p>
      </header>

      {/* Main Story & Profile */}
      <section className="about-main-section">
        <div className="about-story-grid">
          {/* Executive Summary Card */}
          <motion.div variants={cardVariants} className="glass-panel main-story-card">
            <div className="story-header">
              <BookOpen className="story-icon" size={28} />
              <h2>{isRtl ? "الملخص التنفيذي للمشروع" : "Executive Summary"}</h2>
            </div>
            <p className="story-text">
              {t('about.description')}
            </p>
            <div className="story-additional-info">
              <div className="info-badge">
                <strong>{isRtl ? "الجهة الراعية:" : "Sponsor:"}</strong> {t('hero.sponsor')}
              </div>
              <div className="info-badge">
                <strong>{isRtl ? "الشعار اللفظي:" : "Slogan:"}</strong> «{t('hero.slogan')}»
              </div>
            </div>
          </motion.div>

          {/* Strategic Objectives Details */}
          <motion.div variants={cardVariants} className="glass-panel objectives-details-card">
            <div className="story-header">
              <Target className="story-icon" size={28} />
              <h2>{t('about.objectives_title')}</h2>
            </div>
            <ul className="objectives-detailed-list">
              <li>
                <strong>{t('about.obj_academic_title')}: </strong>
                <span>{t('about.obj_academic_desc')}</span>
              </li>
              <li>
                <strong>{t('about.obj_capacity_title')}: </strong>
                <span>{t('about.obj_capacity_desc')}</span>
              </li>
              <li>
                <strong>{t('about.obj_data_title')}: </strong>
                <span>{t('about.obj_data_desc')}</span>
              </li>
              <li>
                <strong>{t('about.obj_digital_title')}: </strong>
                <span>{t('about.obj_digital_desc')}</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <motion.div variants={cardVariants} className="glass-panel faq-intro-panel">
          <div className="faq-header">
            <HelpCircle className="faq-icon" size={32} />
            <h2>{t('faq.title')}</h2>
          </div>
          <p>{t('faq.subtitle')}</p>
        </motion.div>

        <div className="faq-list">
          {faqList.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <motion.div
                key={faq.id}
                variants={cardVariants}
                className={`glass-panel faq-item ${isExpanded ? 'active' : ''}`}
                onClick={() => toggleFaq(faq.id)}
              >
                <div className="faq-question-bar">
                  <h3 className="faq-question">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="faq-chevron"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </div>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="faq-answer-wrapper"
                    >
                      <div className="faq-answer-content">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
