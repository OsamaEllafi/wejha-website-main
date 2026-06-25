import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BookOpen, School, Cpu, Calendar } from 'lucide-react';
import '../styles/StatisticsPage.css';

export default function StatisticsPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } }
  };

  // 1. General Metrics
  const generalMetrics = [
    { label: isRtl ? "إجمالي الطلبة المستهدفين" : "Total Reached Students", value: "1,928", desc: isRtl ? "طلبة ثانوية مشاركين في الاستبيان" : "High school respondents in Benghazi" },
    { label: isRtl ? "عدد المدارس المغطاة" : "Covered Schools", value: "27", desc: isRtl ? "مدارس ثانوية عامة وخاصة" : "Public & private secondary schools" },
    { label: isRtl ? "نسبة الإناث المشاركات" : "Female Representation", value: "72%", desc: isRtl ? "1,388 طالبة مشاركة" : "1,388 Female students" },
    { label: isRtl ? "نسبة الذكور المشاركين" : "Male Representation", value: "28%", desc: isRtl ? "540 طالباً مشاركاً" : "540 Male students" }
  ];

  // 2. Academic Year Distribution
  const academicYears = [
    { label: isRtl ? "السنة الثالثة ثانوي علمي" : "3rd Year Scientific", count: 1041, pct: 54 },
    { label: isRtl ? "السنة الأولى ثانوي" : "1st Year Secondary", count: 275, pct: 14.2 },
    { label: isRtl ? "السنة الثالثة ثانوي أدبي" : "3rd Year Literary", count: 259, pct: 13.4 },
    { label: isRtl ? "السنة الثانية ثانوي علمي" : "2nd Year Scientific", count: 253, pct: 13.1 },
    { label: isRtl ? "السنة الثانية ثانوي أدبي" : "2nd Year Literary", count: 100, pct: 5.3 }
  ];

  const forumPhases = [
    {
      id: 'phase1',
      dateAr: '22 - 23 أغسطس',
      dateEn: 'August 22 - 23',
      icon: <BookOpen size={24} />,
      titleAr: 'الندوة التعريفية بالتخصصات',
      titleEn: 'Majors Orientation Seminar',
      descAr: 'يتم استضافة خريجين حديثي التخرج من مختلف الكليات لعرض تجربة التخصص من واقع عملي، مع توضيح طبيعة الدراسة والتحديات التي قد يواجهها الطالب، وتقديم نصائح عملية حول طرق الدراسة والتميز الأكاديمي والفرص المهنية.',
      descEn: 'Hosting recent graduates from various colleges to share their hands-on academic and professional experiences, clarify the nature of study, address challenges, and provide practical advice on study methods and career paths.'
    },
    {
      id: 'phase2',
      dateAr: '25 - 27 أغسطس',
      dateEn: 'August 25 - 27',
      icon: <School size={24} />,
      titleAr: 'ملتقى الجامعات',
      titleEn: 'University Forum',
      descAr: 'يُقام ملتقى مفتوح يجمع الجامعات العامة والخاصة والمراكز التدريبية والمؤسسات التعليمية في مكان واحد يتيح للطلبة التعرف المباشر على التخصصات، آليات القبول، والبرامج المتاحة بعد الثانوية.',
      descEn: 'An open forum bringing together public and private universities, training centers, and educational institutions in one place, allowing students to learn firsthand about majors, admission processes, and post-secondary opportunities.'
    },
    {
      id: 'phase3',
      dateAr: '29 - 30 أغسطس',
      dateEn: 'August 29 - 30',
      icon: <Cpu size={24} />,
      titleAr: 'ورش المهارات التعليمية والحياتية',
      titleEn: 'Academic & Life Skills Workshops',
      descAr: 'يتم تقديم مجموعة من الورش التدريبية التي تركز على المهارات الأساسية للنجاح في الحياة الجامعية، تشمل الورش مهارات إدارة الوقت، التواصل الفعال، التخطيط للأهداف، والتعلم الذاتي وموضوعات مثل التفكير النقدي والذكاء الاصطناعي.',
      descEn: 'A series of training workshops focusing on essential success skills for university life, including time management, effective communication, goal setting, self-learning, and modern topics like critical thinking and AI.'
    }
  ];

  return (
    <div className="statistics-page">
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">{isRtl ? "وجهة 2026" : "Wejha 2026"}</h1>
        <p className="page-subtitle">{isRtl ? "برنامج وجهة 2026 والمؤشرات الميدانية" : "Wejha 2026 Program & Field Indicators"}</p>
      </header>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="stats-page-layout-container"
      >
        {/* 1. University Forum Section */}
        <section className="forum-timeline-section">
          <div className="section-title-wrapper">
            <h2 className="sub-section-title">{isRtl ? "برنامج وجهة 2026" : "Wejha 2026 Program"}</h2>
            <p className="sub-section-subtitle">
              {isRtl 
                ? "الجدول الزمني ومراحل الفعاليات التعليمية والمهنية المصاحبة للمشروع" 
                : "Timeline and stages of educational and career events accompanying the project"}
            </p>
          </div>
          
          <div className="forum-phases-grid">
            {forumPhases.map((phase) => (
              <motion.div 
                key={phase.id} 
                variants={itemVariants} 
                className="glass-panel forum-phase-card"
                whileHover={{ y: -8 }}
              >
                <div className="phase-card-header">
                  <span className="phase-date-badge">
                    <Calendar size={14} />
                    <span>{isRtl ? phase.dateAr : phase.dateEn}</span>
                  </span>
                  <div className="phase-icon-wrapper">
                    {phase.icon}
                  </div>
                </div>
                <h3 className="phase-title">{isRtl ? phase.titleAr : phase.titleEn}</h3>
                <p className="phase-desc">{isRtl ? phase.descAr : phase.descEn}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2. Survey Statistics Section (Moved to the bottom) */}
        <section className="survey-metrics-section">
          <div className="section-title-wrapper">
            <h2 className="sub-section-title">{isRtl ? "مؤشرات وإحصائيات عام 2026" : "2026 Survey Statistics"}</h2>
            <p className="sub-section-subtitle">
              {isRtl 
                ? "نتائج ومؤشرات الاستبيان الميداني الشامل لطلبة المدارس الثانوية في بنغازي" 
                : "Results and indicators from the comprehensive high school student survey in Benghazi"}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="metrics-summary-grid">
            {generalMetrics.map((met, idx) => (
              <motion.div key={idx} variants={itemVariants} className="glass-panel metric-card">
                <span className="metric-card-label">{met.label}</span>
                <span className="metric-card-value">{met.value}</span>
                <span className="metric-card-desc">{met.desc}</span>
              </motion.div>
            ))}
          </div>

          {/* Academic Year Chart */}
          <motion.div variants={itemVariants} className="glass-panel academic-years-card" style={{ marginTop: '30px' }}>
            <h2>{isRtl ? "التوزيع حسب السنوات الدراسية" : "Distribution by Academic Year"}</h2>
            <div className="bar-chart-vertical">
              {academicYears.map((year, idx) => (
                <div key={idx} className="chart-row-bar">
                  <div className="row-bar-label">
                    <strong>{year.label}</strong>
                    <span>{year.count} {isRtl ? "طالب" : "students"}</span>
                  </div>
                  <div className="row-bar-track">
                    <motion.div 
                      className="row-bar-fill fill-royal"
                      initial={{ width: 0 }}
                      animate={{ width: `${year.pct}%` }}
                      transition={{ duration: 1, delay: 0.1 }}
                    />
                  </div>
                  <span className="row-bar-pct">{year.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
