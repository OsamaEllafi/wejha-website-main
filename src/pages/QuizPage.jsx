import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, CheckCircle2, RefreshCw, BarChart2, Award } from 'lucide-react';
import '../styles/QuizPage.css';

export default function QuizPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [answers, setAnswers] = useState(Array(12).fill(0));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [results, setResults] = useState(null);

  // 12 Statements mapping to RIASEC
  // 0, 1: R | 2, 3: I | 4, 5: A | 6, 7: S | 8, 9: E | 10, 11: C
  const statements = [
    {
      id: 0,
      dimension: 'R',
      textAr: 'أحب العمل باستخدام الآلات أو الأدوات أو الأشياء المادية الملموسة.',
      textEn: 'I like working with machinery, tools, or physical objects.'
    },
    {
      id: 1,
      dimension: 'R',
      textAr: 'أفضل الأنشطة الميدانية والخارجية في الهواء الطلق على العمل المكتبي.',
      textEn: 'I prefer outdoor or field activities over office/desk work.'
    },
    {
      id: 2,
      dimension: 'I',
      textAr: 'أستمتع بحل المسائل الرياضية أو العلمية المعقدة.',
      textEn: 'I enjoy solving complex mathematical or scientific problems.'
    },
    {
      id: 3,
      dimension: 'I',
      textAr: 'أحب إجراء البحوث العلمية والتحليلات للعثور على إجابات للمشكلات.',
      textEn: 'I like performing research and analyzing data to find answers.'
    },
    {
      id: 4,
      dimension: 'A',
      textAr: 'أحب الرسم، الكتابة، أو تصميم المشاريع الفنية والإبداعية.',
      textEn: 'I like drawing, writing, or designing creative/artistic projects.'
    },
    {
      id: 5,
      dimension: 'A',
      textAr: 'أستمتع بالتعبير عن نفسي وأفكاري من خلال الفن، التصميم، أو الموسيقى.',
      textEn: 'I enjoy expressing myself and my ideas through art, design, or music.'
    },
    {
      id: 6,
      dimension: 'S',
      textAr: 'أحب تعليم الآخرين، تدريبهم، أو تقديم المساعدة لهم لحل مشكلاتهم.',
      textEn: 'I like teaching others, training them, or helping them solve their problems.'
    },
    {
      id: 7,
      dimension: 'S',
      textAr: 'أفضل العمل في فرق والأنشطة التطوعية للمساهمة في خدمة المجتمع.',
      textEn: 'I prefer team-oriented environments and volunteer services to help the community.'
    },
    {
      id: 8,
      dimension: 'E',
      textAr: 'أستمتع بقيادة المجموعات، أو تنظيم الفعاليات، أو إدارة المشاريع.',
      textEn: 'I enjoy leading groups, organizing events, or managing projects.'
    },
    {
      id: 9,
      dimension: 'E',
      textAr: 'أحب إقناع الآخرين بآرائي أو مشاريعي، وأهتم بعالم الأعمال والريادة.',
      textEn: 'I like persuading others of my ideas/projects, and have interest in business.'
    },
    {
      id: 10,
      dimension: 'C',
      textAr: 'أحب تنظيم البيانات، أو الاحتفاظ بالسجلات، وتصميم جداول البيانات المنظمة.',
      textEn: 'I like organizing data, keeping records, or creating structured spreadsheets.'
    },
    {
      id: 11,
      dimension: 'C',
      textAr: 'أفضل المهام ذات التوجيهات الواضحة والتفاصيل الدقيقة والمنظمة جداً.',
      textEn: 'I prefer tasks with clear instructions, high structure, and precise details.'
    }
  ];

  // Agreement levels
  const options = [
    { value: 1, labelAr: 'أعارض بشدة', labelEn: 'Strongly Disagree', color: '#ef4444' },
    { value: 2, labelAr: 'أعارض', labelEn: 'Disagree', color: '#f87171' },
    { value: 3, labelAr: 'محايد', labelEn: 'Neutral', color: '#94a3b8' },
    { value: 4, labelAr: 'أوافق', labelEn: 'Agree', color: '#60a5fa' },
    { value: 5, labelAr: 'أوافق بشدة', labelEn: 'Strongly Agree', color: '#3b82f6' }
  ];

  const handleSelectAnswer = (val) => {
    const updated = [...answers];
    updated[currentIdx] = val;
    setAnswers(updated);

    if (currentIdx < 11) {
      setCurrentIdx(currentIdx + 1);
    } else {
      calculateResults(updated);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const calculateResults = (finalAnswers) => {
    // Score dimensions: R, I, A, S, E, C
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    
    statements.forEach((st, idx) => {
      scores[st.dimension] += finalAnswers[idx];
    });

    // Max score for a dimension is 10 (2 statements * 5). Convert to pct out of 10.
    const dimensions = Object.keys(scores).map(dim => ({
      dim,
      labelAr: getDimensionLabel(dim, 'ar'),
      labelEn: getDimensionLabel(dim, 'en'),
      score: scores[dim],
      pct: (scores[dim] / 10) * 100
    }));

    // Sort to find the highest dimension
    const sorted = [...dimensions].sort((a, b) => b.score - a.score);
    const topDim = sorted[0].dim;
    const secondDim = sorted[1].dim;

    const major = getRecommendedMajor(topDim, secondDim);

    setResults({
      scoresList: dimensions,
      topDimension: sorted[0],
      recommendedMajor: major
    });
    setQuizFinished(true);
  };

  const getDimensionLabel = (dim, lang) => {
    const labels = {
      R: { ar: 'الواقعي الملموس (R)', en: 'Realistic (R)' },
      I: { ar: 'الاستقصائي العلمي (I)', en: 'Investigative (I)' },
      A: { ar: 'الفني الإبداعي (A)', en: 'Artistic (A)' },
      S: { ar: 'الاجتماعي التعاوني (S)', en: 'Social (S)' },
      E: { ar: 'المبادر القيادي (E)', en: 'Enterprising (E)' },
      C: { ar: 'المنظم الدقيق (C)', en: 'Conventional (C)' }
    };
    return labels[dim][lang];
  };

  const getRecommendedMajor = (top, second) => {
    // Recommend colleges based on combination
    const primary = top + second;

    const recommendations = {
      RI: {
        titleAr: 'كلية الهندسة / كلية تقنية المعلومات',
        titleEn: 'College of Engineering / College of IT',
        descAr: 'تميل شخصيتك للعمل التقني الاستكشافي وحل المشكلات الهندسية أو البرمجية الملموسة والذكية.',
        descEn: 'You are well-suited for engineering and IT fields, where practical problem-solving and logic merge.'
      },
      IS: {
        titleAr: 'كلية الطب البشري / كلية طب الأسنان / كلية الصيدلة',
        titleEn: 'College of Human Medicine / Dentistry / Pharmacy',
        descAr: 'لديك دافع علمي قوي ممزوج برغبة عميقة في مساعدة الآخرين وعلاجهم والتعاطف مع قضاياهم.',
        descEn: 'A strong scientific motivation paired with a deep drive to help and heal others makes medical tracks ideal.'
      },
      ES: {
        titleAr: 'كلية القانون / كلية الإعلام',
        titleEn: 'College of Law / College of Media',
        descAr: 'تناسبك مجالات الدفاع عن الحقوق، القيادة، الإقناع، الخطابة والتأثير العام في البيئات الاجتماعية.',
        descEn: 'Advocacy, public relations, leadership, communication, and social influence paths fit you best.'
      },
      CE: {
        titleAr: 'كلية الاقتصاد والعلوم السياسية (إدارة / محاسبة)',
        titleEn: 'College of Economics / Business Administration',
        descAr: 'تتميز بالدقة العالية، التنظيم، وفي نفس الوقت تحب بيئة المبادرات والقيادة وإدارة الموارد المالية والمشاريع.',
        descEn: 'Highly detail-oriented, organized, and interested in leading projects or managing economic/financial structures.'
      },
      AS: {
        titleAr: 'كلية اللغات / كلية الآداب',
        titleEn: 'College of Languages / Arts & Humanities',
        descAr: 'أنت تعبر عن هويتك وإبداعك بمرونة عالية، وتحب التفاعل الثقافي وبناء جسور التواصل الاجتماعي.',
        descEn: 'You express ideas with high creativity, values communication, cultural studies, and writing.'
      },
      RE: {
        titleAr: 'كلية الطيران / الهندسة الصناعية',
        titleEn: 'College of Aviation / Industrial Engineering',
        descAr: 'تحب المجالات العملية التي تتطلب شجاعة، قيادة، تحملاً للمسؤولية، والعمل على مركبات أو أنظمة تشغيلية.',
        descEn: 'Practical careers demanding courage, operational leadership, and running complex systems are great for you.'
      }
    };

    // Default return logic if specific key not matched
    const key = recommendations[primary] ? primary : (recommendations[second + top] ? second + top : null);
    
    if (key) return recommendations[key];

    // Fallbacks based on top dimension
    if (top === 'I' || top === 'R') {
      return {
        titleAr: 'كلية الهندسة أو تقنية المعلومات',
        titleEn: 'College of Engineering / College of IT',
        descAr: 'اهتماماتك العلمية والواقعية تجعلك مناسباً للمسارات الهندسية والتكنولوجية التطبيقية.',
        descEn: 'Your scientific and realistic interests fit best in engineering and applied tech paths.'
      };
    } else if (top === 'A') {
      return {
        titleAr: 'كلية اللغات أو كلية الآداب والفنون',
        titleEn: 'College of Languages / Arts & Humanities',
        descAr: 'تميل للفن واللغات والكتابة الإبداعية والتواصل الإنساني.',
        descEn: 'You naturally lean towards arts, language, literature, and creative expressions.'
      };
    } else if (top === 'S') {
      return {
        titleAr: 'كلية الطب البشري أو العلوم الاجتماعية والإنسانية',
        titleEn: 'College of Medicine / Nursing / Humanities',
        descAr: 'شخصيتك تركز على رعاية المجتمع وتعليم وتأهيل وبناء الطاقات البشرية.',
        descEn: 'Your personality focuses on health service, educational support, and community development.'
      };
    } else {
      return {
        titleAr: 'كلية الاقتصاد أو كلية القانون',
        titleEn: 'College of Economics / College of Law',
        descAr: 'مجالات الإدارة، التخطيط، القانون، والأنظمة التنظيمية تتطابق مع صفاتك القيادية والدقيقة.',
        descEn: 'Fields of administration, law, trade, and organizational systems align with your profile.'
      };
    }
  };

  const handleRestart = () => {
    setAnswers(Array(12).fill(0));
    setCurrentIdx(0);
    setQuizFinished(false);
    setResults(null);
  };

  return (
    <div className="quiz-page">
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">{isRtl ? "اختبار التوجيه الأكاديمي" : "Academic Orientation Quiz"}</h1>
        <p className="page-subtitle">{isRtl ? "اكتشف الكلية المناسبة لشخصيتك بناءً على مقياس هولاند المهني" : "Find your ideal college track based on the Holland Code RIASEC model"}</p>
      </header>

      <div className="quiz-container-inner">
        <AnimatePresence mode="wait">
          {!quizFinished ? (
            <motion.div 
              key={currentIdx}
              initial={{ x: isRtl ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isRtl ? 50 : -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-panel quiz-question-card"
            >
              {/* Progress Bar */}
              <div className="quiz-progress-wrapper">
                <div className="progress-header">
                  <span>{isRtl ? `العبارة ${currentIdx + 1} من 12` : `Statement ${currentIdx + 1} of 12`}</span>
                  <span>{Math.round(((currentIdx) / 12) * 100)}%</span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${((currentIdx + 1) / 12) * 100}%` }}></div>
                </div>
              </div>

              {/* Question Text */}
              <div className="question-statement-box">
                <Compass className="compass-q-icon animate-spin-slow" size={32} />
                <h2 className="statement-text">
                  {isRtl ? statements[currentIdx].textAr : statements[currentIdx].textEn}
                </h2>
              </div>

              {/* Selection Options */}
              <div className="agreement-choices-grid">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectAnswer(opt.value)}
                    className="choice-btn glass-panel"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="choice-dot" style={{ backgroundColor: opt.color }}></span>
                    <span className="choice-label">{isRtl ? opt.labelAr : opt.labelEn}</span>
                  </button>
                ))}
              </div>

              {/* Back button */}
              {currentIdx > 0 && (
                <div className="back-btn-container">
                  <button onClick={handleBack} className="btn-secondary">
                    {isRtl ? "السابق" : "Back"}
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            results && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="quiz-results-container"
              >
                {/* Result recommendation */}
                <div className="glass-panel recommendation-panel">
                  <div className="rec-header">
                    <CheckCircle2 size={36} className="text-success-icon" />
                    <div>
                      <h2>{isRtl ? "الكلية المقترحة لك:" : "Your Recommended College Path:"}</h2>
                      <h1 className="rec-title">{isRtl ? results.recommendedMajor.titleAr : results.recommendedMajor.titleEn}</h1>
                    </div>
                  </div>
                  <p className="rec-description">
                    {isRtl ? results.recommendedMajor.descAr : results.recommendedMajor.descEn}
                  </p>
                </div>

                <div className="results-breakdown-grid">
                  {/* Scores breakdown chart */}
                  <div className="glass-panel results-chart-card">
                    <h3>
                      <BarChart2 size={20} className="stats-header-icon" />
                      {isRtl ? "تحليل نمط شخصيتك المهنية (RIASEC)" : "Your RIASEC Personality Breakdown"}
                    </h3>
                    <div className="riasec-results-bars">
                      {results.scoresList.map((item, idx) => (
                        <div key={idx} className="riasec-bar-row">
                          <div className="riasec-bar-label">
                            <strong>{isRtl ? item.labelAr : item.labelEn}</strong>
                            <span>{item.score} / 10</span>
                          </div>
                          <div className="riasec-bar-track">
                            <motion.div 
                              className="riasec-bar-fill"
                              style={{ 
                                backgroundColor: item.dim === results.topDimension.dim ? 'var(--color-orange)' : 'var(--color-royal)' 
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${item.pct}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dimension description */}
                  <div className="glass-panel dominant-trait-card">
                    <h3>
                      <Award size={20} className="stats-header-icon" />
                      {isRtl ? "السمة المهنية المهيمنة" : "Your Dominant Vocational Trait"}
                    </h3>
                    <div className="dominant-badge">
                      {isRtl ? results.topDimension.labelAr : results.topDimension.labelEn}
                    </div>
                    <p className="trait-explanation">
                      {results.topDimension.dim === 'R' && (
                        isRtl 
                          ? "تتميز بميول عملية وتفضل العمل باليد وحل المشكلات الفيزيائية والميكانيكية."
                          : "You prefer practical, hands-on, and mechanical tasks, resolving concrete engineering challenges."
                      )}
                      {results.topDimension.dim === 'I' && (
                        isRtl 
                          ? "أنت شخص محلل وفضولي، تحب فهم النظريات والبحث العلمي وحل المشكلات المعقدة بالمنطق."
                          : "You are highly analytical, curious, and logical, favoring scientific research and problem-solving."
                      )}
                      {results.topDimension.dim === 'A' && (
                        isRtl 
                          ? "تميل للتعبير الفني والأعمال الإبداعية وتحب التميز والتجديد بعيداً عن القوالب الجامدة."
                          : "You favor artistic expression, creative projects, originality, and out-of-the-box styling."
                      )}
                      {results.topDimension.dim === 'S' && (
                        isRtl 
                          ? "محور اهتمامك هو الإنسان، وتفضل مساعدة وتوجيه الآخرين وتعليمهم وتقديم الرعاية والخدمات."
                          : "You focus on human interactions, teaching, training, advising, and community care services."
                      )}
                      {results.topDimension.dim === 'E' && (
                        isRtl 
                          ? "شخصية قيادية ومبادرة، تمتلك مهارة الإقناع وتحب البيئات التنافسية وإطلاق المشاريع والخطابة."
                          : "You lean towards leadership, public pitching, entrepreneurship, and organizing competitive projects."
                      )}
                      {results.topDimension.dim === 'C' && (
                        isRtl 
                          ? "تفضل البيئات عالية التنظيم والترتيب وتنسيق السجلات وتحليل الأرقام والتفاصيل المحاسبية والإدارية."
                          : "You excel in highly structured environments, keeping precise archives, sorting data, and auditing."
                      )}
                    </p>

                    <button onClick={handleRestart} className="btn-accent restart-quiz-btn">
                      <RefreshCw size={16} />
                      {isRtl ? "إعادة الاختبار" : "Restart Quiz"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
