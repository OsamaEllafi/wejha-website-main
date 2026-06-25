import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle, ChevronDown, Target, BookOpen, Heart,
  Users, Compass, BarChart2, Cpu, Award, Sparkles, ArrowRight, ArrowLeft
} from 'lucide-react';
import '../styles/AboutPage.css';

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: 'easeOut' }
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

  const seasons = [
    {
      title: t('about.s1_title'),
      year: t('about.s1_year'),
      desc: t('about.s1_desc'),
      icon: <Sparkles size={22} />,
      colorClass: 'season-card-1',
      badge: null,
    },
    {
      title: t('about.s2_title'),
      year: t('about.s2_year'),
      desc: t('about.s2_desc'),
      icon: <Award size={22} />,
      colorClass: 'season-card-2',
      badge: null,
    },
    {
      title: t('about.s3_title'),
      year: t('about.s3_year'),
      desc: t('about.s3_desc'),
      icon: <BarChart2 size={22} />,
      colorClass: 'season-card-3',
      badge: null,
    },
    {
      title: t('about.s4_title'),
      year: t('about.s4_year'),
      desc: t('about.s4_desc'),
      icon: <Compass size={22} />,
      colorClass: 'season-card-4',
      badge: t('about.s4_badge'),
    },
  ];

  const objectives = [
    { icon: <Compass size={28} />, title: t('about.obj_academic_title'), desc: t('about.obj_academic_desc') },
    { icon: <Award size={28} />, title: t('about.obj_capacity_title'), desc: t('about.obj_capacity_desc') },
    { icon: <BarChart2 size={28} />, title: t('about.obj_data_title'), desc: t('about.obj_data_desc') },
    { icon: <Cpu size={28} />, title: t('about.obj_digital_title'), desc: t('about.obj_digital_desc') },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="about-page"
    >
      {/* ── Dramatic Hero Banner ── */}
      <section className="about-hero-banner">
        <div className="about-hero-orb about-hero-orb-1" />
        <div className="about-hero-orb about-hero-orb-2" />
        <motion.div variants={cardVariants} className="about-hero-content">
          <span className="about-hero-badge">
            <Heart size={14} />
            {isRtl ? 'الهلال الأحمر الليبي — فرع بنغازي' : 'Libyan Red Crescent — Benghazi Branch'}
          </span>
          <h1 className="about-hero-title">
            {isRtl ? 'من نحن' : 'About Us'}
          </h1>
          <p className="about-hero-subtitle">{t('about.subtitle')}</p>
        </motion.div>
      </section>

      {/* ── Story + Objectives ── */}
      <section className="about-main-section">
        <div className="about-story-grid">
          {/* Story Card */}
          <motion.div variants={cardVariants} className="glass-panel main-story-card">
            <div className="story-header">
              <div className="story-icon-wrap">
                <BookOpen size={24} />
              </div>
              <h2>{t('about.story_title')}</h2>
            </div>
            <p className="story-text">{t('about.description')}</p>
            <div className="story-badges-row">
              <div className="story-badge-item">
                <span className="badge-val">1,928</span>
                <span className="badge-lbl">{isRtl ? 'طالب وطالبة' : 'Students'}</span>
              </div>
              <div className="story-badge-divider" />
              <div className="story-badge-item">
                <span className="badge-val">27</span>
                <span className="badge-lbl">{isRtl ? 'مدرسة ثانوية' : 'Schools'}</span>
              </div>
              <div className="story-badge-divider" />
              <div className="story-badge-item">
                <span className="badge-val">4</span>
                <span className="badge-lbl">{isRtl ? 'مواسم' : 'Seasons'}</span>
              </div>
            </div>
          </motion.div>

          {/* Objectives Card */}
          <motion.div variants={cardVariants} className="glass-panel objectives-card">
            <div className="story-header">
              <div className="story-icon-wrap">
                <Target size={24} />
              </div>
              <h2>{t('about.objectives_title')}</h2>
            </div>
            <div className="objectives-icon-list">
              {objectives.map((obj, i) => (
                <div key={i} className="obj-icon-item">
                  <div className="obj-icon-circle">{obj.icon}</div>
                  <div className="obj-icon-text">
                    <strong>{obj.title}</strong>
                    <span>{obj.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Horizontal Timeline ── */}
      <section className="about-timeline-section">
        <motion.div variants={cardVariants} className="timeline-header">
          <h2 className="timeline-main-title">{t('about.timeline_title')}</h2>
          <p className="timeline-sub">{t('about.timeline_subtitle')}</p>
        </motion.div>

        <div className="timeline-track">
          {/* Connecting line */}
          <div className="timeline-line" />
          {seasons.map((s, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`timeline-season-card glass-panel ${s.colorClass}`}
              whileHover={{ y: -6 }}
            >
              {s.badge && (
                <span className="season-coming-badge">{s.badge}</span>
              )}
              <div className="season-icon-ring">{s.icon}</div>
              <div className="season-year">{s.year}</div>
              <h3 className="season-title">{s.title}</h3>
              <p className="season-desc">{s.desc}</p>
              <div className="timeline-dot" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Volunteers / Team ── */}
      <section className="about-volunteers-section">
        <motion.div variants={cardVariants} className="glass-panel volunteers-card">
          <div className="volunteers-icon-col">
            <div className="volunteers-heart-ring">
              <Users size={32} />
            </div>
          </div>
          <div className="volunteers-text-col">
            <h2>{t('about.volunteers_title')}</h2>
            <p>{t('about.volunteers_desc')}</p>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ Section ── */}
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
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
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
