import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Award, BarChart2, BookOpen, Compass, Image, Cpu, Play, Sparkles, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Counter from '../components/Counter';
import '../styles/Home.css';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // State to track cursor position for parallax effect in Hero
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFaq, setActiveFaq] = useState(null);

  // Slideshow state for the seasonal background
  const [currentSlide, setCurrentSlide] = useState(0);
  const base = import.meta.env.BASE_URL;
  const slides = [
    {
      image: `${base}assets/images/Wejha_Seasons/Season1/20240720_125035.jpg`,
      titleAr: 'الموسم الأول لوجهة',
      titleEn: 'Wejha Season 1',
      descAr: 'خطوتنا الأولى نحو إرشاد الطلبة واكتشاف شغفهم الأكاديمي والمهني.',
      descEn: 'Our first step towards guiding students and discovering their academic and professional passion.',
    },
    {
      image: `${base}assets/images/Wejha_Seasons/Season2/IMG-20240723-WA0012.jpg`,
      titleAr: 'الموسم الثاني لوجهة',
      titleEn: 'Wejha Season 2',
      descAr: 'توسيع التغطية لتشمل المزيد من المدارس وتقديم ورش عمل تدريبية وبناء القدرات.',
      descEn: 'Expanding coverage to include more schools, delivering training workshops, and capacity building.',
    },
    {
      image: `${base}assets/images/Wejha_Seasons/Season3/photo_2025-09-13_20-59-13.jpg`,
      titleAr: 'الموسم الثالث لوجهة',
      titleEn: 'Wejha Season 3',
      descAr: 'التحول الرقمي الكامل ورصد خارطة التفكير والمخاوف لدى طلبة الثانوية.',
      descEn: 'Complete digital transformation and mapping high school students\' thoughts and concerns.',
    },
    {
      image: `${base}assets/images/Wejha_Seasons/Season4 preparation/photo_2026-06-20_21-45-07.jpg`,
      titleAr: 'التحضير للموسم الرابع',
      titleEn: 'Season 4 Preparations',
      descAr: 'تطوير مستمر لتقديم تجربة إرشادية وتنموية استثنائية لجيل 2026.',
      descEn: 'Continuous development to provide an exceptional guiding and developmental experience for the 2026 generation.',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToContent = () => {
    const nextSection = document.getElementById('faq-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    // Calculate offset from center, scaled down
    const x = (clientX - window.innerWidth / 2) / 30;
    const y = (clientY - window.innerHeight / 2) / 30;
    setMousePos({ x, y });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Static stats
  const statItems = [
    { value: 1928, suffix: "", label: t('stats.total_students'), desc: isRtl ? "طالب وطالبة مستهدفين في بنغازي" : "High school respondents in Benghazi" },
    { value: 27, suffix: "", label: t('stats.schools'), desc: isRtl ? "مدرسة ثانوية مغطاة (عامة وخاصة)" : "Public & private secondary schools" },
    { value: 1300, suffix: "", label: t('stats.graduates'), desc: isRtl ? "طالب وطالبة بالصف الثالث ثانوي" : "Graduating high school students" },
    { value: 626, suffix: "", label: t('stats.english_learners'), desc: isRtl ? "طالب وطالبة طلبوا تطوير لغة إضافية" : "Students requesting additional language skills" }
  ];

  // Wejha objectives
  const objectives = [
    { icon: <Compass size={32} className="obj-icon" />, title: t('about.obj_academic_title'), desc: t('about.obj_academic_desc') },
    { icon: <Award size={32} className="obj-icon" />, title: t('about.obj_capacity_title'), desc: t('about.obj_capacity_desc') },
    { icon: <BarChart2 size={32} className="obj-icon" />, title: t('about.obj_data_title'), desc: t('about.obj_data_desc') },
    { icon: <Cpu size={32} className="obj-icon" />, title: t('about.obj_digital_title'), desc: t('about.obj_digital_desc') }
  ];

  const faqItems = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="home-page-container"
      onMouseMove={handleMouseMove}
    >
      {/* Impressive Slideshow Hero Section */}
      <section className="hero-slideshow-section">
        {/* Background Slideshow */}
        <div className="hero-slideshow-container">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              className="hero-slide-bg"
              style={{
                backgroundImage: `url("${slides[currentSlide].image}")`
              }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.12 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.8, ease: "easeInOut" },
                scale: { duration: 6, ease: "easeOut" }
              }}
            />
          </AnimatePresence>
          <div className="hero-slideshow-overlay" />
        </div>

        {/* Content Overlay */}
        <div className="hero-slideshow-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-content-glass-card glass-panel"
          >
            <span className="hero-sponsor-badge-top">
              <Sparkles size={16} style={{ color: 'var(--color-orange)' }} />
              {t('hero.sponsor')}
            </span>

            <h1 className="hero-slideshow-title">
              {isRtl ? "وجهتك تبدأ بوعي" : "Your Journey Begins with Awareness"}
            </h1>

            {/* Slide-specific info with cross-fade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
                className="slide-info-wrapper"
              >
                <span className="slide-badge">
                  {isRtl ? slides[currentSlide].titleAr : slides[currentSlide].titleEn}
                </span>
                <p className="hero-slideshow-desc">
                  {isRtl ? slides[currentSlide].descAr : slides[currentSlide].descEn}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="hero-slideshow-taglines">
              <span className="hero-slogan-badge">
                <Sparkles size={16} className="slogan-sparkle-icon" />
                {t('hero.slogan')}
              </span>
            </div>

            <button onClick={scrollToContent} className="btn-accent hero-scroll-btn">
              <span>{isRtl ? "استكشف التفاعلات والمؤشرات" : "Explore Dashboard & Indicators"}</span>
              <ArrowRight size={18} className="rotate-down" style={{ transform: 'rotate(90deg)' }} />
            </button>
          </motion.div>
        </div>

        {/* Navigation Dots */}
        <div className="slideshow-nav-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`nav-dot ${currentSlide === index ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator" onClick={scrollToContent}>
          <div className="mouse-icon">
            <div className="mouse-wheel" />
          </div>
          <span>{isRtl ? "اسحب للأسفل" : "Scroll Down"}</span>
        </div>
      </section>

      <div className="home-page">
        {/* 2. About Section */}
        <section className="home-section about-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="section-container"
          >
            <div className="section-header">
              <h2 className="section-title">{t('about.title')}</h2>
              <p className="section-subtitle">{t('about.subtitle')}</p>
            </div>
            <p className="about-intro-text glass-panel">{t('about.description')}</p>

            <div className="objectives-grid">
              {objectives.map((obj, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-panel objective-card"
                  whileHover={{ y: -8 }}
                >
                  <div className="icon-wrapper">{obj.icon}</div>
                  <h3>{obj.title}</h3>
                  <p>{obj.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="section-action-btn">
              <Link to="/about" className="btn-primary">
                {isRtl ? "اقرأ المزيد عن أهدافنا" : "Read more about our goals"}
                {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </Link>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section id="faq-section" className="home-section faq-section">
          <div className="section-header">
            <h2 className="section-title">{t('faq.title')}</h2>
            <p className="section-subtitle">{t('faq.subtitle')}</p>
          </div>

          <div className="faq-container" style={{ marginTop: '40px' }}>
            <div className="faq-list">
              {faqItems.map((item, index) => {
                const isOpen = activeFaq === index;
                return (
                  <motion.div
                    key={index}
                    className={`faq-item glass-panel ${isOpen ? 'open' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      className="faq-question-btn"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq-question-title-row">
                        <HelpCircle size={20} className="faq-icon-question" />
                        <span className="faq-question-text">{item.q}</span>
                      </div>
                      <span className="faq-arrow-icon">
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="faq-answer-wrapper"
                        >
                          <p className="faq-answer-text">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <div className="faq-cta-card glass-panel">
              <div className="faq-cta-content">
                <Sparkles size={36} className="faq-cta-icon animate-pulse" />
                <h3>{isRtl ? "هل تبحث عن إرشاد مخصص؟" : "Looking for Personalized Guidance?"}</h3>
                <p>
                  {isRtl
                    ? "خض اختبار تحديد التوافق الأكاديمي المبتكر لتكتشف الكليات الأكثر ملاءمة لقدراتك واهتماماتك المهنية."
                    : "Take our innovative academic compatibility quiz to discover which colleges align best with your skills and career interests."}
                </p>
                <Link to="/quiz" className="btn-accent faq-cta-btn">
                  <Compass size={18} className="animate-spin-slow" />
                  <span>{isRtl ? "ابدأ اختبار التوافق الآن" : "Start Compatibility Quiz"}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Statistics Section */}
        <section className="home-section stats-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="section-container"
          >
            <div className="section-header">
              <h2 className="section-title">{t('stats.title')}</h2>
              <p className="section-subtitle">{t('stats.subtitle')}</p>
            </div>

            <p className="stats-intro-text">{t('stats.intro')}</p>

            <div className="stats-counter-grid">
              {statItems.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="glass-panel stat-counter-card"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stat-number">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <h4 className="stat-label">{stat.label}</h4>
                  <p className="stat-desc">{stat.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="section-action-btn">
              <Link to="/statistics" className="btn-accent">
                <BarChart2 size={18} />
                {isRtl ? "عرض التحليلات التفصيلية للطلاب" : "View Detailed Student Analytics"}
              </Link>
            </div>
          </motion.div>
        </section>

        {/* 4. Media Section */}
        <section className="home-section media-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="section-container"
          >
            <div className="section-header">
              <h2 className="section-title">{t('media.title')}</h2>
              <p className="section-subtitle">{t('media.subtitle')}</p>
            </div>

            <div className="media-teaser-grid">
              {/* Interviews teaser */}
              <motion.div variants={itemVariants} className="glass-panel media-teaser-card">
                <div className="teaser-image-container">
                  <img src={`${base}assets/images/interview_video_thumbnail.png`} alt="Personal Interview Video Thumbnail" className="teaser-bg" />
                  <div className="teaser-overlay">
                    <Play size={48} className="teaser-play-icon" />
                  </div>
                </div>
                <div className="teaser-body">
                  <h3>{t('media.videos_title')}</h3>
                  <p>{t('media.videos_desc')}</p>
                  <Link to="/media" className="teaser-link">
                    {isRtl ? "شاهد المقابلات" : "Watch Interviews"}
                    {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                  </Link>
                </div>
              </motion.div>

              {/* Seasons Teaser */}
              <motion.div variants={itemVariants} className="glass-panel media-teaser-card">
                <div className="teaser-image-container">
                  <img src={`${base}assets/images/Wejha_Seasons/Season1/20240720_125035.jpg`} alt="Wejha Seasons Archive" className="teaser-bg" />
                  <div className="teaser-overlay">
                    <Image size={48} className="teaser-play-icon" />
                  </div>
                </div>
                <div className="teaser-body">
                  <h3>{t('media.seasons_title')}</h3>
                  <p>{t('media.seasons_desc')}</p>
                  <Link to="/media" className="teaser-link">
                    {isRtl ? "تصفح ألبوم الصور" : "Browse Image Album"}
                    {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 5. Brand Identity Section with 3D Merchandise Card Deck */}
        <section className="home-section brand-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="section-container"
          >
            <div className="section-header">
              <h2 className="section-title">{t('tracks.title')}</h2>
              <p className="section-subtitle">{t('tracks.subtitle')}</p>
            </div>

            <div className="brand-teaser-content glass-panel">
              <div className="brand-teaser-grid">
                <div className="brand-teaser-text">
                  <p>{t('tracks.description')}</p>
                  <div className="brand-taglines">
                    <blockquote className="home-blockquote">"{t('hero.slogan')}"</blockquote>
                    <blockquote className="home-blockquote">"{t('hero.campaign')}"</blockquote>
                  </div>
                  <Link to="/tracks" className="btn-primary" style={{ marginTop: '20px' }}>
                    <BookOpen size={18} />
                    <span>{t('tracks.explore_btn')}</span>
                  </Link>
                </div>

                {/* 3D Spreading Tracks Deck */}
                <div className="brand-interactive-deck-wrapper">
                  <motion.div
                    className="merch-cards-deck"
                    whileHover="spread"
                    initial="rest"
                    animate="rest"
                  >
                    {/* Card 1 - Soft Skills */}
                    <motion.div
                      className="deck-card card-soft-skills glass-panel"
                      variants={{
                        rest: { x: -10, y: 10, rotate: -8, scale: 0.95 },
                        spread: { x: -110, y: 0, rotate: -15, scale: 1 }
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <img src={`${base}assets/images/tracks/track_soft_skills.svg`} alt="Soft Skills Track" className="deck-card-svg" />
                      <span className="deck-card-label">{t('tracks.soft_skills')}</span>
                    </motion.div>

                    {/* Card 3 - Digital Literacy */}
                    <motion.div
                      className="deck-card card-digital-literacy glass-panel"
                      variants={{
                        rest: { x: 10, y: -10, rotate: 8, scale: 0.95 },
                        spread: { x: 110, y: 0, rotate: 15, scale: 1 }
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <img src={`${base}assets/images/tracks/track_digital_literacy.svg`} alt="Digital Literacy Track" className="deck-card-svg" />
                      <span className="deck-card-label">{t('tracks.digital')}</span>
                    </motion.div>

                    {/* Card 2 - Academic Guidance (Central, floats on top) */}
                    <motion.div
                      className="deck-card card-academic-guidance glass-panel"
                      variants={{
                        rest: { x: 0, y: 0, rotate: 0, scale: 1 },
                        spread: { x: 0, y: -25, rotate: 0, scale: 1.05, boxShadow: "0 15px 30px rgba(0, 31, 143, 0.2)" }
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <img src={`${base}assets/images/tracks/track_academic_guidance.svg`} alt="Academic Guidance Track" className="deck-card-svg" />
                      <span className="deck-card-label">{t('tracks.academic')}</span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div> {/* Close home-page */}
    </motion.div>
  );
}
