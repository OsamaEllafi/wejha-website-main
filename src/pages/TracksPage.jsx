import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Compass, Cpu, BookOpen, Users, CheckCircle, UserPlus, GraduationCap, ChevronRight, ChevronLeft } from 'lucide-react';
import '../styles/TracksPage.css';

export default function TracksPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [activeStage, setActiveStage] = useState(0);

  // Student journey timeline stages
  const stages = [
    {
      id: 'registration',
      num: '01',
      icon: <UserPlus size={24} />,
      titleAr: 'التسجيل وتحديد الميول',
      titleEn: 'Registration & Assessment',
      descAr: 'يسجل الطالب في منصة وجهة الرقمية ويخوض اختبار تحديد التوافق الأكاديمي المبتكر لتحديد فئته وميوله وتطلعاته المبدئية وسلوكه المهني.',
      descEn: 'Students register on our digital platform and take our interactive academic compatibility quiz to analyze their initial desires, strengths, and goals.',
      takeawaysAr: ['إنشاء ملف الطالب الشخصي', 'تقرير التوافق الأكاديمي المبدئي', 'تحديد المسار الأنسب لقدراته'],
      takeawaysEn: ['Create a student profile', 'Obtain initial compatibility report', 'Select the most suitable training track']
    },
    {
      id: 'workshops',
      num: '02',
      icon: <Cpu size={24} />,
      titleAr: 'ورش بناء القدرات',
      titleEn: 'Hands-on Workshops',
      descAr: 'يخوض الطلبة ورش عمل تفاعلية مكثفة لبناء المهارات الشخصية الحيوية وتنمية التوعية الرقمية والذكاء الاصطناعي ومهارات العمل الجماعي.',
      descEn: 'Students participate in active, group-based workshops focused on personal soft skills, digital literacy, self-learning, and modern technology.',
      takeawaysAr: ['تطبيقات الذكاء الاصطناعي في التعليم', 'ورش عمل الاتصال الفعال ولغة الجسد', 'تمارين جماعية لبناء فرق العمل'],
      takeawaysEn: ['AI applications in secondary learning', 'Effective communication & body language workshops', 'Team building & collaboration practical games']
    },
    {
      id: 'mentorship',
      num: '03',
      icon: <Compass size={24} />,
      titleAr: 'الإرشاد والمحاكاة',
      titleEn: 'Mentorship & Simulation',
      descAr: 'جلسات إرشاد وتوجيه مباشرة مع مستشارين وأخصائيين، ولقاء قدوات ملهمة من مختلف التخصصات لمحاكاة البيئة الأكاديمية وسوق العمل.',
      descEn: 'Direct guidance and advisory rounds with experts, hosting inspiring mentors from various sectors, and simulating university environments.',
      takeawaysAr: ['زيارات علمية وميدانية للجامعات والمعامل', 'حوارات مفتوحة مع خبراء وأكاديميين قدوات', 'فهم شروط القبول والتسجيل الجامعي'],
      takeawaysEn: ['Field trips & site visits to university campuses', 'Open dialogues with academic experts & role models', 'Understanding admission criteria & career markets']
    },
    {
      id: 'graduation',
      num: '04',
      icon: <GraduationCap size={24} />,
      titleAr: 'التخرج والانطلاق',
      titleEn: 'Graduation & Launch',
      descAr: 'إتمام كافة متطلبات البرامج بنجاح، والحصول على شهادات مشاركة معتمدة، والانطلاق نحو المرحلة الجامعية بوعي وثقة تامة.',
      descEn: 'Successfully completing all programs, obtaining accredited certificates of participation, and embarking on higher education with full clarity.',
      takeawaysAr: ['شهادة مشاركة معتمدة من الهلال الأحمر', 'تقرير تقييم ختامي لمستوى مهارات الطالب', 'الانضمام لشبكة خريجي وجهة الفعالة'],
      takeawaysEn: ['Accredited certificate from Libyan Red Crescent', 'Final skill-level assessment report', 'Join the active Wejha alumni network']
    }
  ];

  // Training Tracks Detailed Data
  const trainingTracks = [
    {
      id: 'soft_skills',
      titleAr: 'مسار المهارات الشخصية (Soft Skills)',
      titleEn: 'Personal & Soft Skills Track',
      icon: <Award size={32} className="track-card-icon" />,
      descAr: 'بناء المهارات الأساسية للنجاح الشخصي والمهني، مثل الاتصال، القيادة، والعمل الجماعي.',
      descEn: 'Building fundamental skills for personal and professional success, including communication, leadership, and teamwork.',
      beneficiariesAr: 'جميع طلبة المرحلة الثانوية',
      beneficiariesEn: 'All High School Students',
      topicsAr: ['الاتصال الفعال ولغة الجسد', 'العمل الجماعي وبناء فرق العمل', 'إدارة الوقت والتخطيط الشخصي', 'حل المشكلات واتخاذ القرار'],
      topicsEn: ['Effective Communication & Body Language', 'Teamwork & Collaboration', 'Time Management & Planning', 'Problem Solving & Decision Making'],
      image: '/assets/images/tracks/track_soft_skills.png'
    },
    {
      id: 'academic',
      titleAr: 'مسار التوجيه الأكاديمي (Academic Guidance)',
      titleEn: 'Academic & Career Guidance Track',
      icon: <Compass size={32} className="track-card-icon" />,
      descAr: 'توجيه وإرشاد الطلبة لاختيار التخصصات الجامعية المناسبة لميولهم وقدراتهم وسوق العمل.',
      descEn: 'Guiding students to select suitable university majors matching their inclinations, abilities, and the job market.',
      beneficiariesAr: 'طلبة الصف الثالث ثانوي خاصة',
      beneficiariesEn: 'Mainly 3rd-year High School Students',
      topicsAr: ['فهم التخصصات والخيارات الأكاديمية', 'ربط الشغف والميول بالمهنة', 'معايير القبول والتنسيق الجامعي', 'رحلات ميدانية وزيارات علمية للجامعات'],
      topicsEn: ['Understanding Majors & Academic Options', 'Mapping Passion & Inclinations to Careers', 'Admission Standards & College Requirements', 'Field Trips & Scientific Visits to Universities'],
      image: '/assets/images/tracks/track_academic_guidance.png'
    },
    {
      id: 'digital',
      titleAr: 'مسار التوعية الرقمية (Digital Literacy)',
      titleEn: 'Digital Literacy & Technology Track',
      icon: <Cpu size={32} className="track-card-icon" />,
      descAr: 'تمكين الطلبة تقنياً وتعريفهم بأسس التكنولوجيا الحديثة وأدوات التعلم الذاتي الرقمية.',
      descEn: 'Empowering students technically, introducing them to modern technology pillars and digital self-learning tools.',
      beneficiariesAr: 'جميع المشاركين في مشروع وجهة',
      beneficiariesEn: 'All Wejha Project Participants',
      topicsAr: ['أساسيات تكنولوجيا المعلومات والإنترنت', 'الوعي بالأمن السيبراني وحماية البيانات', 'استخدام أدوات الذكاء الاصطناعي في التعليم', 'أسس التعلم الرقمي الذاتي والمنصات التعليمية'],
      topicsEn: ['Information Technology & Internet Basics', 'Cybersecurity Awareness & Data Protection', 'Utilizing AI Tools in Learning', 'Digital Self-Learning Foundations & Platforms'],
      image: '/assets/images/tracks/track_digital_literacy.png'
    }
  ];

  return (
    <div className="tracks-page">
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">{t('tracks.title')}</h1>
        <p className="page-subtitle">{t('tracks.subtitle')}</p>
      </header>

      {/* Student Journey Timeline Overview */}
      <section className="tracks-overview-section glass-panel">
        <h2>{isRtl ? "رحلة الطالب في مشروع وجهة" : "Student Journey in Wejha Project"}</h2>
        <p className="overview-text">
          {isRtl 
            ? "نحن نؤمن بأن التوجيه الفعال هو رحلة متكاملة تبدأ بالوعي الذاتي وتنتهي بالتمكين العملي. إليك المحطات الأربع التي يمر بها الطالب في موسمنا:" 
            : "We believe that effective guidance is a complete journey starting with self-awareness and ending with practical empowerment. Here are the four phases our students experience:"}
        </p>
        
        {/* Timeline Navigation */}
        <div className="journey-timeline-nav">
          <div className="timeline-connector-line">
            <div 
              className="timeline-connector-progress" 
              style={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }}
            />
          </div>
          
          {stages.map((stage, index) => {
            const isActive = activeStage === index;
            const isCompleted = activeStage > index;
            return (
              <button
                key={stage.id}
                className={`timeline-nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => setActiveStage(index)}
                aria-label={`Stage ${index + 1}`}
              >
                <div className="nav-item-circle">
                  {stage.icon}
                </div>
                <span className="nav-item-label">
                  {isRtl ? stage.titleAr : stage.titleEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Timeline Card */}
        <div className="journey-stage-content-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="journey-stage-card glass-panel"
            >
              <div className="stage-card-badge">
                <span className="stage-num-glow">{stages[activeStage].num}</span>
                <span>{isRtl ? "المرحلة" : "Phase"}</span>
              </div>
              
              <div className="stage-card-details">
                <div className="stage-card-main-icon">
                  {stages[activeStage].icon}
                </div>
                <div className="stage-card-text">
                  <h3>{isRtl ? stages[activeStage].titleAr : stages[activeStage].titleEn}</h3>
                  <p>{isRtl ? stages[activeStage].descAr : stages[activeStage].descEn}</p>
                </div>
              </div>

              <div className="stage-card-takeaways">
                <h4>{isRtl ? "أبرز مخرجات هذه المرحلة:" : "Key Phase Deliverables:"}</h4>
                <div className="takeaways-list">
                  {(isRtl ? stages[activeStage].takeawaysAr : stages[activeStage].takeawaysEn).map((item, idx) => (
                    <span key={idx} className="takeaway-pill">
                      <CheckCircle size={14} className="takeaway-pill-icon" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev/Next buttons for mobile or easy control */}
          <div className="timeline-controls">
            <button 
              className="timeline-control-btn"
              disabled={activeStage === 0}
              onClick={() => setActiveStage(prev => Math.max(0, prev - 1))}
              aria-label="Previous Stage"
            >
              {isRtl ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <span className="timeline-controls-indicator">
              {activeStage + 1} / {stages.length}
            </span>
            <button 
              className="timeline-control-btn"
              disabled={activeStage === stages.length - 1}
              onClick={() => setActiveStage(prev => Math.min(stages.length - 1, prev + 1))}
              aria-label="Next Stage"
            >
              {isRtl ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </section>


      {/* Training Tracks Details Grid */}
      <section className="tracks-details-section">
        <h2>{isRtl ? "المسارات التدريبية بالتفصيل" : "Training Tracks in Detail"}</h2>
        <div className="tracks-detailed-grid">
          {trainingTracks.map((track, idx) => (
            <motion.div 
              key={idx}
              className="glass-panel track-card-detailed"
              whileHover={{ y: -5 }}
            >
              <div className="track-card-header">
                <div className="track-header-icon-box">{track.icon}</div>
                <h3>{isRtl ? track.titleAr : track.titleEn}</h3>
              </div>
              <div className="track-card-body">
                <p className="track-desc">{isRtl ? track.descAr : track.descEn}</p>
                
                <div className="track-meta-row">
                  <div className="meta-item">
                    <Users size={16} className="meta-icon" />
                    <span><strong>{isRtl ? "الفئة المستهدفة: " : "Target Audience: "}</strong>{isRtl ? track.beneficiariesAr : track.beneficiariesEn}</span>
                  </div>
                </div>

                <div className="topics-list-container">
                  <h4>{isRtl ? "المحاور الأساسية للمسار:" : "Core Track Topics:"}</h4>
                  <ul className="topics-bullet-list">
                    {(isRtl ? track.topicsAr : track.topicsEn).map((topic, i) => (
                      <li key={i}>
                        <CheckCircle size={14} className="bullet-check-icon" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Session Structure Info */}
      <section className="sessions-structure-section glass-panel">
        <div className="section-header-row">
          <BookOpen className="sec-header-icon" size={28} />
          <h2>{isRtl ? "هيكل الجلسات وأساليب التدريب" : "Sessions Structure & Curriculum Methods"}</h2>
        </div>

        <div className="structure-showcase-grid">
          <div className="structure-spec-card">
            <h3>{isRtl ? "التعليم التفاعلي العملي" : "Practical Interactive Learning"}</h3>
            <p className="structure-spec-desc">
              {isRtl 
                ? "تعتمد مسارات وجهة على الأسلوب التفاعلي العملي بعيداً عن التلقين التقليدي، حيث يشارك الطلاب في ورش العمل والتمارين الجماعية."
                : "Wejha's tracks rely on practical interactive learning, avoiding passive instruction. Students participate in active workshops and group exercises."
              }
            </p>
            <div className="structure-steps-list">
              <span className="step-badge">1. محاضرات تمهيدية تفاعلية (Interactive Lectures)</span>
              <span className="step-badge">2. تمارين عملية جماعية وفردية (Practical Exercises)</span>
              <span className="step-badge">3. حلقات نقاش وإرشاد مباشر (Mentorship Dialogues)</span>
              <span className="step-badge">4. تقييم المخرجات وتوزيع الشهادات (Final Evaluations)</span>
            </div>
          </div>

          <div className="structure-outcomes-card">
            <h4>{isRtl ? "المخرجات والنتائج المتوقعة" : "Expected Learning Outcomes"}</h4>
            <div className="outcomes-hierarchy">
              <div className="outcome-row">
                <span className="outcome-label">{isRtl ? "التوجيه الأكاديمي" : "Academic Orientation"}</span>
                <p>{isRtl ? "تمكين الطالب من صياغة قرار واعي واختيار التخصص المناسب بناءً على بيانات وتوجيهات الخبراء." : "Enabling students to formulate informed decisions and choose their major based on expert guidelines."}</p>
              </div>
              <div className="outcome-row">
                <span className="outcome-label">{isRtl ? "المهارات الحياتية" : "Life Skills"}</span>
                <p>{isRtl ? "تطوير مهارات التقديم والتواصل الشخصي وحل المشكلات لزيادة التكيف والإنتاجية." : "Cultivating personal presentation, communication, and problem-solving skills for enhanced adaptation."}</p>
              </div>
              <div className="outcome-row">
                <span className="outcome-label">{isRtl ? "الوعي التكنولوجي" : "Technical Literacy"}</span>
                <p>{isRtl ? "فهم الاستخدام الآمن للتكنولوجيا والمنصات التعليمية والاستفادة من الذكاء الاصطناعي." : "Understanding safe technology use, online educational platforms, and AI tool integrations."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
