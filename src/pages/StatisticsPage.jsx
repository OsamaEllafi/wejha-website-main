import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Users2, Brain, ShieldAlert, Award } from 'lucide-react';
import '../styles/StatisticsPage.css';

export default function StatisticsPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('general');

  // Tab definitions
  const tabs = [
    { id: 'general', label: isRtl ? "المؤشرات العامة والسنوات" : "General & Academic Years", icon: <Users2 size={18} /> },
    { id: 'colleges', label: isRtl ? "المجالات المهنية الكبرى" : "Major Career Sectors", icon: <BarChart3 size={18} /> },
    { id: 'skills', label: isRtl ? "المهارات والهوايات" : "Skills & Hobbies", icon: <Brain size={18} /> },
    { id: 'influences', label: isRtl ? "المؤثرات والمدارس" : "Influences & Schools", icon: <Award size={18} /> }
  ];

  // Helper variants for animation
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 }
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } }
  };

  // 1. General Metrics
  const generalMetrics = [
    { label: isRtl ? "إجمالي الطلبة المستهدفين" : "Total Reached Students", value: "2,184", desc: isRtl ? "طلبة ثانوية مشاركين في الاستبيان" : "High school respondents in Benghazi" },
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

  // 3. General Professional Sectors (Confidentiality groupings)
  const majorSectors = [
    { name: isRtl ? "العلوم الهندسية والتقنية" : "Engineering & Technology Sciences", count: 795, pct: 41.2 },
    { name: isRtl ? "العلوم الطبية والصحية" : "Medical & Health Sciences", count: 648, pct: 33.6 },
    { name: isRtl ? "القانون والعلوم الإنسانية والاجتماعية" : "Law, Humanities & Social Sciences", count: 390, pct: 20.2 },
    { name: isRtl ? "العلوم الاقتصادية والإدارية" : "Economics & Administrative Sciences", count: 278, pct: 14.4 }
  ];

  // 4. Skills & Hobbies
  const demandedSkills = [
    { name: isRtl ? "اللغات الأجنبية (الإنجليزية)" : "Foreign Languages (English)", count: 626, color: "var(--color-navy)" },
    { name: isRtl ? "الإلقاء والتواصل والخطابة" : "Public Speaking & Communication", count: 251, color: "var(--color-royal)" },
    { name: isRtl ? "البرمجة والتطوير البرمجي" : "Programming & Development", count: 92, color: "var(--color-orange)" },
    { name: isRtl ? "تنظيم الوقت وإدارة المهام" : "Time Management", count: 84, color: "var(--color-red)" },
    { name: isRtl ? "مهارات الحاسوب الأساسية" : "Basic Computer Skills", count: 70, color: "#0ea5e9" },
    { name: isRtl ? "الذكاء الاصطناعي وعلوم البيانات" : "AI & Data Science", count: 52, color: "#10b981" },
    { name: isRtl ? "الإسعافات الأولية" : "First Aid", count: 48, color: "#f59e0b" }
  ];

  const favoriteHobbies = [
    { name: isRtl ? "الرسم والتلوين" : "Drawing & Painting", count: 215 },
    { name: isRtl ? "الأنشطة الرياضية والألعاب البدنية" : "Sports & Athletics", count: 89 },
    { name: isRtl ? "ركوب الخيل" : "Horseback Riding", count: 55 },
    { name: isRtl ? "التصوير الفوتوغرافي" : "Photography", count: 42 },
    { name: isRtl ? "الطبخ وصنع المأكولات" : "Cooking & Culinary Arts", count: 31 },
    { name: isRtl ? "الموسيقى والعزف" : "Music & Playing Instruments", count: 31 },
    { name: isRtl ? "الكتابة والتأليف" : "Creative Writing", count: 26 }
  ];

  // 5. Influences & Role Models
  const mainInfluences = [
    { source: isRtl ? "لا يوجد تأثير خارجي (قرار ذاتي)" : "No External Influence (Self-Driven)", count: 1077, pct: 66 },
    { source: isRtl ? "أفراد من العائلة" : "Family Members", count: 495, pct: 30 },
    { source: isRtl ? "الأصدقاء" : "Friends", count: 28, pct: 1.7 },
    { source: isRtl ? "شخصية عامة أو مشهورة" : "Public Figures", count: 18, pct: 1.1 },
    { source: isRtl ? "المعلمون" : "Teachers", count: 15, pct: 0.9 }
  ];

  const roleModels = [
    { group: isRtl ? "لا توجد قدوة محددة" : "No Specific Role Model", count: 1009, pct: 52.3 },
    { group: isRtl ? "أفراد من العائلة" : "Family Members", count: 637, pct: 33 },
    { group: isRtl ? "شخصية عامة أو مشهورة" : "Public/Famous Figures", count: 162, pct: 8.4 },
    { group: isRtl ? "المعلمون" : "Teachers", count: 43, pct: 2.2 },
    { group: isRtl ? "الأصدقاء" : "Friends", count: 38, pct: 2 }
  ];

  // 6. Target Schools General Breakdown (No names shown for confidentiality)
  const schoolTypes = [
    { type: isRtl ? "المدارس الثانوية المخصصة للبنات" : "Girls Secondary Schools", count: 17, pct: 63 },
    { type: isRtl ? "المدارس الثانوية المخصصة للبنين" : "Boys Secondary Schools", count: 8, pct: 30 },
    { type: isRtl ? "المدارس الثانوية المختلطة" : "Mixed/Co-ed Secondary Schools", count: 2, pct: 7 }
  ];

  // 7. Data Collection Timeline (Mayo 2026 weekly operational progress)
  const collectionTimeline = [
    { week: isRtl ? "الأسبوع الأول (1-7 مايو)" : "Week 1 (May 1-7)", count: 377, pct: 19.5 },
    { week: isRtl ? "الأسبوع الثاني (8-14 مايو)" : "Week 2 (May 8-14)", count: 827, pct: 42.9 },
    { week: isRtl ? "الأسبوع الثالث (15-21 مايو)" : "Week 3 (May 15-21)", count: 477, pct: 24.7 },
    { week: isRtl ? "الأسبوع الرابع (22-28 مايو)" : "Week 4 (May 22-28)", count: 247, pct: 12.9 }
  ];

  return (
    <div className="statistics-page">
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">{t('stats.title')}</h1>
        <p className="page-subtitle">{t('stats.subtitle')}</p>
      </header>

      {/* Tabs Menu */}
      <div className="stats-tabs-container glass-panel">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`stats-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="statsTabIndicator" className="stats-tab-indicator" />
            )}
          </button>
        ))}
      </div>

      {/* Tabs Panel */}
      <div className="stats-content-panel">
        <AnimatePresence mode="wait">
          {activeTab === 'general' && (
            <motion.div 
              key="general"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="tab-panel-content"
            >
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
              <motion.div variants={itemVariants} className="glass-panel academic-years-card">
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
            </motion.div>
          )}

          {activeTab === 'colleges' && (
            <motion.div 
              key="colleges"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="tab-panel-content"
            >
              {/* Major Career Sectors */}
              <motion.div variants={itemVariants} className="glass-panel colleges-overall-card">
                <h2>{isRtl ? "توزيع الاهتمامات حسب القطاعات المهنية الكبرى" : "Interests Distribution by Major Professional Sectors"}</h2>
                <div className="bar-chart-vertical">
                  {majorSectors.map((sector, idx) => (
                    <div key={idx} className="chart-row-bar">
                      <div className="row-bar-label">
                        <strong>{sector.name}</strong>
                        <span>{sector.count} {isRtl ? "طالب/ـة" : "students"}</span>
                      </div>
                      <div className="row-bar-track">
                        <motion.div 
                          className="row-bar-fill fill-orange"
                          initial={{ width: 0 }}
                          animate={{ width: `${sector.pct * 2}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                      <span className="row-bar-pct">{sector.pct}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* General Guidance Explanation Card */}
              <motion.div variants={itemVariants} className="glass-panel track-card" style={{ width: '100%' }}>
                <h3 className="track-title scientific" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
                  {isRtl ? "تحليل وتوجيه القطاعات المهنية" : "Career Sectors Orientation & Insights"}
                </h3>
                <div className="mini-bars-list" style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'start' }}>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    {isRtl 
                      ? "تظهر البيانات تطلعاً كبيراً لدى الشباب نحو تخصصات العلوم الهندسية والتكنولوجيا والاتصالات، يليها الاهتمام بالعلوم الطبية والرعاية الصحية. في المقابل، يمثل قطاع القانون والعلوم الإنسانية والاجتماعية الوجهة المفضلة لطلبة المسار الأدبي، بينما يميل طلبة الإدارة والاقتصاد إلى فهم ريادة الأعمال وتطوير المشاريع الخاصة."
                      : "The data shows high interest among youth in Engineering and IT/Communication sciences, followed by Medical and Health sciences. In contrast, Law and Humanities represent the preferred path for literary track students, while business and economics students show strong inclination towards understanding entrepreneurship and project management."}
                  </p>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    {isRtl 
                      ? "يتم توجيه هذه الإحصاءات العامة لتطوير حقائب تدريبية متخصصة تبني مهارات الطلاب المهنية دون الكشف عن تفضيلات الكليات التفصيلية احترماً لسرية البيانات المؤسسية الخاصة بفرع الهلال الأحمر الليبي ببنغازي."
                      : "These general insights guide the creation of specialized training tracks that build students' professional skills, while keeping detailed institutional college choices confidential as per Libyan Red Crescent policies."}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div 
              key="skills"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="tab-panel-content"
            >
              {/* Demanded Skills list */}
              <motion.div variants={itemVariants} className="glass-panel skills-full-card">
                <h2>{t('stats.demanded_skills')}</h2>
                <div className="skills-grid-visual">
                  {demandedSkills.map((skill, idx) => (
                    <div key={idx} className="skill-visual-item">
                      <div className="skill-visual-header">
                        <strong>{skill.name}</strong>
                        <span>{skill.count} {isRtl ? "طلب" : "requests"}</span>
                      </div>
                      <div className="skill-visual-track">
                        <motion.div 
                          className="skill-visual-fill"
                          style={{ backgroundColor: skill.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(skill.count / 626) * 100}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Hobbies list */}
              <motion.div variants={itemVariants} className="glass-panel hobbies-card">
                <h2>{t('stats.hobbies')}</h2>
                <div className="hobbies-tags-cloud">
                  {favoriteHobbies.map((hobby, idx) => {
                    // Size depends on count
                    const scaleFactor = 0.8 + (hobby.count / 215) * 0.8;
                    return (
                      <motion.span 
                        key={idx}
                        className="hobby-bubble-tag glass-panel"
                        style={{ fontSize: `${scaleFactor}rem`, padding: '10px 18px', display: 'inline-flex' }}
                        whileHover={{ scale: 1.1, backgroundColor: 'var(--color-orange)', color: 'white' }}
                      >
                        {hobby.name} ({hobby.count})
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'influences' && (
            <motion.div 
              key="influences"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="tab-panel-content"
            >
              {/* Influences and Role models */}
              <div className="tracks-grid">
                <motion.div variants={itemVariants} className="glass-panel track-card">
                  <h3 className="track-title">{isRtl ? "الجهة الأكثر تأثيراً في اختيار التخصص" : "Main Influences on Career Choices"}</h3>
                  <div className="mini-bars-list">
                    {mainInfluences.map((inf, idx) => (
                      <div key={idx} className="mini-bar-item">
                        <div className="mini-bar-header">
                          <span>{inf.source}</span>
                          <strong>{inf.pct}%</strong>
                        </div>
                        <div className="mini-bar-track">
                          <motion.div 
                            className="mini-bar-fill fill-royal"
                            initial={{ width: 0 }}
                            animate={{ width: `${inf.pct}%` }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-panel track-card">
                  <h3 className="track-title">{isRtl ? "القدوات التي حفزت الطلبة" : "Key Role Models"}</h3>
                  <div className="mini-bars-list">
                    {roleModels.map((rm, idx) => (
                      <div key={idx} className="mini-bar-item">
                        <div className="mini-bar-header">
                          <span>{rm.group}</span>
                          <strong>{rm.pct}%</strong>
                        </div>
                        <div className="mini-bar-track">
                          <motion.div 
                            className="mini-bar-fill fill-orange"
                            initial={{ width: 0 }}
                            animate={{ width: `${rm.pct}%` }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Target Schools Breakdown & Timeline */}
              <div className="tracks-grid">
                <motion.div variants={itemVariants} className="glass-panel track-card">
                  <h3 className="track-title">{isRtl ? "توزيع المدارس المغطاة حسب نوع التعليم" : "Participating Schools Gender Distribution"}</h3>
                  <div className="mini-bars-list">
                    {schoolTypes.map((sch, idx) => (
                      <div key={idx} className="mini-bar-item">
                        <div className="mini-bar-header">
                          <span>{sch.type}</span>
                          <strong>{sch.count} {isRtl ? "مدرسة" : "schools"} ({sch.pct}%)</strong>
                        </div>
                        <div className="mini-bar-track">
                          <motion.div 
                            className="mini-bar-fill fill-royal"
                            initial={{ width: 0 }}
                            animate={{ width: `${sch.pct}%` }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-panel track-card">
                  <h3 className="track-title">{isRtl ? "وتيرة أرشفة وجمع الاستمارات أسبوعياً" : "Weekly Survey Archiving Progress"}</h3>
                  <div className="mini-bars-list">
                    {collectionTimeline.map((time, idx) => (
                      <div key={idx} className="mini-bar-item">
                        <div className="mini-bar-header">
                          <span>{time.week}</span>
                          <strong>{time.count} {isRtl ? "استمارة" : "forms"} ({time.pct}%)</strong>
                        </div>
                        <div className="mini-bar-track">
                          <motion.div 
                            className="mini-bar-fill fill-orange"
                            initial={{ width: 0 }}
                            animate={{ width: `${time.pct * 2}%` }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
