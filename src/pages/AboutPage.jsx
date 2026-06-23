import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldAlert, Users, Target, BookOpen, UserCheck } from 'lucide-react';
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

  // Red Crescent volunteers data
  const volunteersList = [
    { name: isRtl ? "فضيلة" : "Fadilah", count: 362 },
    { name: isRtl ? "لمياء" : "Lamia", count: 349 },
    { name: isRtl ? "وعد" : "Waad", count: 344 },
    { name: isRtl ? "مهند" : "Mohanned", count: 338 },
    { name: isRtl ? "مروة" : "Marwa", count: 336 },
    { name: isRtl ? "براء" : "Baraa", count: 199 }
  ];

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

      {/* Volunteers Appreciation Section */}
      <section className="volunteers-section">
        <motion.div variants={cardVariants} className="glass-panel volunteers-intro-panel">
          <div className="volunteers-header">
            <Users className="volunteers-icon" size={32} />
            <h2>{isRtl ? "فريق أرشفة وتدقيق البيانات" : "Data Archiving Volunteers"}</h2>
          </div>
          <p>{t('volunteers.appreciation')}</p>
        </motion.div>

        <div className="volunteers-grid">
          {volunteersList.map((vol, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="glass-panel volunteer-badge-card"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="volunteer-avatar-circle">
                <UserCheck size={28} />
              </div>
              <div className="volunteer-info">
                <h3>{vol.name}</h3>
                <span className="archive-count">
                  {isRtl 
                    ? `أرشف(ت) ${vol.count} استمارة` 
                    : `Archived ${vol.count} surveys`
                  }
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
