import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, CheckCircle2, RefreshCw, BarChart2, Award } from 'lucide-react';
import '../styles/QuizPage.css';

export default function QuizPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [answers, setAnswers] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [results, setResults] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  // 30 Statements mapping to RIASEC (5 per dimension)
  const statements = [
    // Realistic (R)
    {
      id: 0,
      dimension: 'R',
      textAr: 'أحب العمل باستخدام الآلات أو الأدوات أو الأجهزة التقنية الملموسة.',
      textEn: 'I like working with machinery, tools, or physical devices.'
    },
    {
      id: 1,
      dimension: 'R',
      textAr: 'أفضل الأنشطة الميدانية والخارجية في الهواء الطلق على العمل المكتبي.',
      textEn: 'I prefer outdoor or field activities over office/desk work.'
    },
    {
      id: 2,
      dimension: 'R',
      textAr: 'أستمتع بفك وتركيب الأجهزة الكهربائية أو الميكانيكية وإصلاحها.',
      textEn: 'I enjoy assembling, disassembling, and repairing electrical or mechanical devices.'
    },
    {
      id: 3,
      dimension: 'R',
      textAr: 'يستهويني فهم كيفية عمل الآلات والمحركات وأنظمة التشغيل المختلفة.',
      textEn: 'I am interested in understanding how machines, engines, and different operating systems work.'
    },
    {
      id: 4,
      dimension: 'R',
      textAr: 'أفضل الأنشطة العملية التي تنتج عنها نتائج ملموسة وواضحة.',
      textEn: 'I prefer practical, hands-on activities that result in tangible and clear products.'
    },

    // Investigative (I)
    {
      id: 5,
      dimension: 'I',
      textAr: 'أستمتع بحل المسائل الرياضية أو البرمجية أو المشكلات العلمية المعقدة.',
      textEn: 'I enjoy solving complex mathematical, programming, or scientific problems.'
    },
    {
      id: 6,
      dimension: 'I',
      textAr: 'أحب إجراء البحوث العلمية والتحليلات للعثور على إجابات دقيقة للمشكلات.',
      textEn: 'I like performing research and analyzing data to find precise answers.'
    },
    {
      id: 7,
      dimension: 'I',
      textAr: 'يثير اهتمامي قراءة المقالات العلمية واستكشاف النظريات والاكتشافات الحديثة.',
      textEn: 'I am interested in reading scientific articles and exploring modern theories and discoveries.'
    },
    {
      id: 8,
      dimension: 'I',
      textAr: 'أحب تحليل البيانات وفك الشفرات والبحث عن الأسباب الخفية وراء الظواهر المختلفة.',
      textEn: 'I like analyzing data, decoding, and searching for hidden causes behind different phenomena.'
    },
    {
      id: 9,
      dimension: 'I',
      textAr: 'أستمتع بإجراء التجارب المختبرية أو دراسة الظواهر الطبيعية والطبية وكتابة التقارير عنها.',
      textEn: 'I enjoy conducting laboratory experiments or studying natural and medical phenomena and writing reports on them.'
    },

    // Artistic (A)
    {
      id: 10,
      dimension: 'A',
      textAr: 'أحب الرسم، الكتابة الأدبية، أو تصميم المشاريع الفنية والإبداعية.',
      textEn: 'I like drawing, creative writing, or designing artistic and creative projects.'
    },
    {
      id: 11,
      dimension: 'A',
      textAr: 'أستمتع بالتعبير عن نفسي وأفكاري بحرية من خلال الفن، التصميم، أو التمثيل.',
      textEn: 'I enjoy expressing myself and my ideas freely through art, design, or performance.'
    },
    {
      id: 12,
      dimension: 'A',
      textAr: 'أفضل العمل في بيئات مرنة تسمح لي بالابتكار والتجديد دون الالتزام بقواعد صارمة.',
      textEn: 'I prefer working in flexible environments that allow me to innovate without strict rules.'
    },
    {
      id: 13,
      dimension: 'A',
      textAr: 'أهتم بالفنون البصرية، الديكور، الهندسة المعمارية التعبيرية، أو التصميم الرقمي.',
      textEn: 'I am interested in visual arts, interior design, expressive architecture, or digital design.'
    },
    {
      id: 14,
      dimension: 'A',
      textAr: 'أحب كتابة القصص أو المدونات أو إعداد المحتوى الإبداعي والتأليف الموسيقي.',
      textEn: 'I like writing stories, blogs, or creating creative content and composing music.'
    },

    // Social (S)
    {
      id: 15,
      dimension: 'S',
      textAr: 'أحب تعليم الآخرين، تدريبهم، أو تقديم المساعدة لهم لحل مشكلاتهم الشخصية أو التعليمية.',
      textEn: 'I like teaching others, training them, or helping them solve their personal or educational problems.'
    },
    {
      id: 16,
      dimension: 'S',
      textAr: 'أفضل العمل في فرق والأنشطة التطوعية للمساهمة في خدمة وتطوير المجتمع.',
      textEn: 'I prefer team-oriented environments and volunteer activities to contribute to community development.'
    },
    {
      id: 17,
      dimension: 'S',
      textAr: 'أستمتع بالاستماع لمشاكل الناس ومحاولة تقديم الدعم النفسي والإرشاد المناسب لهم.',
      textEn: 'I enjoy listening to people\'s problems and trying to provide emotional support and guidance.'
    },
    {
      id: 18,
      dimension: 'S',
      textAr: 'أهتم بمناقشة القضايا الاجتماعية والإنسانية والمساهمة في نشر الوعي العام.',
      textEn: 'I am interested in discussing social and human issues and contributing to raising public awareness.'
    },
    {
      id: 19,
      dimension: 'S',
      textAr: 'أجد شغفي في رعاية المرضى أو العمل في المهن الطبية والتعليمية والخدمية.',
      textEn: 'I find my passion in patient care or working in medical, educational, and service occupations.'
    },

    // Enterprising (E)
    {
      id: 20,
      dimension: 'E',
      textAr: 'أستمتع بقيادة المجموعات، أو تنظيم الفعاليات الكبرى، أو إدارة المشاريع والفرق.',
      textEn: 'I enjoy leading groups, organizing major events, or managing projects and teams.'
    },
    {
      id: 21,
      dimension: 'E',
      textAr: 'أحب إقناع الآخرين بآرائي أو خططي، وأهتم بعالم ريادة الأعمال والاستثمار.',
      textEn: 'I like persuading others of my ideas or plans, and have interest in entrepreneurship and investment.'
    },
    {
      id: 22,
      dimension: 'E',
      textAr: 'لدي طموح كبير لبدء مشروعي الخاص وتحمل المخاطر المالية والتجارية المدروسة.',
      textEn: 'I have a strong ambition to start my own business and take calculated financial and commercial risks.'
    },
    {
      id: 23,
      dimension: 'E',
      textAr: 'أستمتع بالتفاوض والإقناع والبيع والشراء والتنافس لتحقيق الأهداف المالية أو المهنية.',
      textEn: 'I enjoy negotiating, persuading, buying, selling, and competing to achieve financial or career goals.'
    },
    {
      id: 24,
      dimension: 'E',
      textAr: 'أفضل الأدوار القيادية التي تتطلب اتخاذ قرارات سريعة ومسؤولة تحت الضغط.',
      textEn: 'I prefer leadership roles that require fast and responsible decision-making under pressure.'
    },

    // Conventional (C)
    {
      id: 25,
      dimension: 'C',
      textAr: 'أحب تنظيم البيانات، أو الاحتفاظ بالسجلات، وتصميم الجداول وقواعد البيانات المنظمة.',
      textEn: 'I like organizing data, keeping records, and designing structured spreadsheets and databases.'
    },
    {
      id: 26,
      dimension: 'C',
      textAr: 'أفضل المهام ذات التوجيهات المحددة والتعليمات الواضحة والخطوات المتتالية.',
      textEn: 'I prefer tasks with specific guidelines, clear instructions, and sequential steps.'
    },
    {
      id: 27,
      dimension: 'C',
      textAr: 'أهتم جداً بالتفاصيل الدقيقة وأستمتع بتدقيق الأوراق المالية أو المستندات الإدارية.',
      textEn: 'I pay great attention to precise details and enjoy auditing financial papers or administrative documents.'
    },
    {
      id: 28,
      dimension: 'C',
      textAr: 'أحب العمل في بيئة مكتبية منظمة ومستقرة وذات نظام عمل واضح وثابت.',
      textEn: 'I like working in an organized, stable office environment with a clear and consistent workflow.'
    },
    {
      id: 29,
      dimension: 'C',
      textAr: 'أستمتع بتصنيف المعلومات وفهرستها وكتابة التقارير الدورية المنظمة بدقة.',
      textEn: 'I enjoy classifying and indexing information and writing precise, well-organized periodic reports.'
    }
  ];

  // Initialize answers state with correct length when component mounts or statements exist
  React.useEffect(() => {
    if (answers.length !== statements.length) {
      setAnswers(Array(statements.length).fill(0));
    }
  }, [statements.length]);

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

    if (currentIdx < statements.length - 1) {
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
    // Keep track of score total and count of individual responses (5, 4, 3, 2)
    const scores = {
      R: { total: 0, 5: 0, 4: 0, 3: 0, 2: 0 },
      I: { total: 0, 5: 0, 4: 0, 3: 0, 2: 0 },
      A: { total: 0, 5: 0, 4: 0, 3: 0, 2: 0 },
      S: { total: 0, 5: 0, 4: 0, 3: 0, 2: 0 },
      E: { total: 0, 5: 0, 4: 0, 3: 0, 2: 0 },
      C: { total: 0, 5: 0, 4: 0, 3: 0, 2: 0 }
    };
    
    statements.forEach((st, idx) => {
      const val = finalAnswers[idx];
      scores[st.dimension].total += val;
      if (val === 5) scores[st.dimension][5]++;
      if (val === 4) scores[st.dimension][4]++;
      if (val === 3) scores[st.dimension][3]++;
      if (val === 2) scores[st.dimension][2]++;
    });

    // Max score for a dimension is 25 (5 statements * 5). Convert to pct out of 25.
    const dimensions = Object.keys(scores).map(dim => ({
      dim,
      labelAr: getDimensionLabel(dim, 'ar'),
      labelEn: getDimensionLabel(dim, 'en'),
      score: scores[dim].total,
      pct: (scores[dim].total / 25) * 100,
      count5: scores[dim][5],
      count4: scores[dim][4],
      count3: scores[dim][3],
      count2: scores[dim][2]
    }));

    // Sort to find the highest dimension with tie-breaking rules
    const sorted = [...dimensions].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.count5 !== a.count5) return b.count5 - a.count5;
      if (b.count4 !== a.count4) return b.count4 - a.count4;
      if (b.count3 !== a.count3) return b.count3 - a.count3;
      if (b.count2 !== a.count2) return b.count2 - a.count2;
      return 0;
    });

    // A helper to verify if two dimensions are completely equivalent in scores/profile
    const isEquivalent = (a, b) => {
      return a.score === b.score &&
             a.count5 === b.count5 &&
             a.count4 === b.count4 &&
             a.count3 === b.count3 &&
             a.count2 === b.count2;
    };

    const topDim = sorted[0];
    const topTied = sorted.filter(d => isEquivalent(d, topDim));

    let recommendedMajors = [];

    if (topTied.length > 1) {
      // Tie for first place: recommend paths between all tied top dimensions
      for (let i = 0; i < topTied.length; i++) {
        for (let j = i + 1; j < topTied.length; j++) {
          const major = getRecommendedMajor(topTied[i].dim, topTied[j].dim);
          if (major && !recommendedMajors.some(m => m.titleAr === major.titleAr)) {
            recommendedMajors.push(major);
          }
        }
      }
    } else {
      // Unique first place: pair with all second-place tied dimensions
      const secondDim = sorted[1];
      const secondTied = sorted.filter(d => isEquivalent(d, secondDim));
      
      secondTied.forEach(sec => {
        const major = getRecommendedMajor(topDim.dim, sec.dim);
        if (major && !recommendedMajors.some(m => m.titleAr === major.titleAr)) {
          recommendedMajors.push(major);
        }
      });
    }

    // Fallback if no combinations matched
    if (recommendedMajors.length === 0) {
      recommendedMajors.push(getRecommendedMajor(topDim.dim, sorted[1].dim));
    }

    setResults({
      scoresList: dimensions,
      topDimension: topDim,
      recommendedMajors: recommendedMajors
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
    setAnswers(Array(statements.length).fill(0));
    setCurrentIdx(0);
    setQuizFinished(false);
    setResults(null);
    setQuizStarted(false);
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
          {!quizStarted ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel quiz-intro-card"
            >
              <div className="intro-icon-wrapper">
                <Compass className="compass-intro-icon animate-spin-slow" size={48} />
              </div>
              <h2 className="intro-title">
                {isRtl ? "مرحباً بك في اختبار التوجيه الأكاديمي" : "Welcome to the Academic Orientation Quiz"}
              </h2>
              <p className="intro-subtitle">
                {isRtl
                  ? "يهدف هذا الاختبار إلى مساعدتك في اكتشاف مسارك الأكاديمي والمهني الأنسب بناءً على مقياس هولاند (RIASEC) العالمي للشخصية المهنية."
                  : "This quiz helps you discover your ideal academic and career path based on the global Holland Occupational Themes (RIASEC) model."}
              </p>
              
              <div className="intro-details-grid">
                <div className="intro-detail-item">
                  <span className="detail-number">30</span>
                  <span className="detail-label">{isRtl ? "عبارة تقييمية" : "Assessment Statements"}</span>
                </div>
                <div className="intro-detail-item">
                  <span className="detail-number">~5</span>
                  <span className="detail-label">{isRtl ? "دقائق للحل" : "Minutes to Complete"}</span>
                </div>
                <div className="intro-detail-item">
                  <span className="detail-number">6</span>
                  <span className="detail-label">{isRtl ? "جوانب شخصية يقاس عليها" : "Measured Dimensions"}</span>
                </div>
              </div>

              <div className="intro-guidelines">
                <h3>{isRtl ? "إرشادات هامة قبل البدء:" : "Important Guidelines Before You Start:"}</h3>
                <ul>
                  <li>{isRtl ? "لا توجد إجابات صحيحة أو خاطئة في هذا الاختبار." : "There are no right or wrong answers in this quiz."}</li>
                  <li>{isRtl ? "أجب بناءً على ما تحبه وتستمتع به فعلاً، وليس ما تراه مناسباً اجتماعياً." : "Answer based on what you actually like and enjoy, not what is socially expected."}</li>
                  <li>{isRtl ? "احرص على الإجابة بصدق وبدون تفكير مطول في العبارة." : "Be honest and avoid overthinking each statement."}</li>
                </ul>
              </div>

              <button onClick={() => setQuizStarted(true)} className="btn-accent start-exam-btn">
                <span>{isRtl ? "ابدأ الاختبار الآن" : "Start the Exam Now"}</span>
                <Compass size={18} className="animate-spin-slow" />
              </button>
            </motion.div>
          ) : !quizFinished ? (
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
                  <span>{isRtl ? `العبارة ${currentIdx + 1} من ${statements.length}` : `Statement ${currentIdx + 1} of ${statements.length}`}</span>
                  <span>{Math.round(((currentIdx) / statements.length) * 100)}%</span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${((currentIdx + 1) / statements.length) * 100}%` }}></div>
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
                <div className="recommendations-container">
                  {results.recommendedMajors.map((major, mIdx) => (
                    <div key={mIdx} className="glass-panel recommendation-panel" style={{ marginBottom: '20px' }}>
                      <div className="rec-header">
                        <CheckCircle2 size={36} className="text-success-icon" />
                        <div>
                          <h2>
                            {results.recommendedMajors.length > 1
                              ? (isRtl ? `الكلية المقترحة ${mIdx + 1}:` : `Recommended College Path ${mIdx + 1}:`)
                              : (isRtl ? "الكلية المقترحة لك:" : "Your Recommended College Path:")}
                          </h2>
                          <h1 className="rec-title">{isRtl ? major.titleAr : major.titleEn}</h1>
                        </div>
                      </div>
                      <p className="rec-description">
                        {isRtl ? major.descAr : major.descEn}
                      </p>
                    </div>
                  ))}
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
                            <span>{item.score} / 25</span>
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
