import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, X, Film, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/MediaPage.css';

export default function MediaPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeSeason, setActiveSeason] = useState('Season1');

  // Video references for hover preview
  const videoRefs = useRef({});

  const base = import.meta.env.BASE_URL;

  // 1. Videos Data
  const videos = [
    {
      id: 'video-1',
      titleAr: 'د. آلاء هاني',
      titleEn: 'Dr. Alaa Hani',
      roleAr: 'طب بشري — إلهام طبي وإنساني',
      roleEn: 'Human Medicine — Medical & Humanitarian Inspiration',
      src: `${base}assets/personal interview videos/د. الاء هاني.mp4`,
    },
    {
      id: 'video-2',
      titleAr: 'د. هنيدة نجيب عبيدة',
      titleEn: 'Dr. Hunaida Najeeb Obaida',
      roleAr: 'أكاديمية وتوجيه علمي متكامل',
      roleEn: 'Academic & Integrated Scientific Guidance',
      src: `${base}assets/personal interview videos/د. هنيدة نجيب عبيدة.mp4`,
    },
    {
      id: 'video-3',
      titleAr: 'م. مصطفى البرغثي',
      titleEn: 'Eng. Mustafa Al-Barghathi',
      roleAr: 'كلية الهندسة',
      roleEn: 'College of Engineering',
      src: `${base}assets/personal interview videos/مصطفى البرغثي Final.mp4`,
    },
    {
      id: 'video-4',
      titleAr: 'العربي نجيب الورفلي',
      titleEn: 'Al-Arabi Najeeb Al-Warfali',
      roleAr: 'كلية الإعلام',
      roleEn: 'College of Media',
      src: `${base}assets/personal interview videos/IMG_3292.MP4`,
    }
  ];

  // 2. Seasons Photo Albums
  const seasonsData = {
    Season1: {
      titleAr: "الموسم الأول (2023)",
      titleEn: "Season 1 (2023)",
      images: [
        `${base}assets/images/Wejha_Seasons/Season1/3.JPG`,
        `${base}assets/images/Wejha_Seasons/Season1/5.JPG`,
        `${base}assets/images/Wejha_Seasons/Season1/9.JPG`,
        `${base}assets/images/Wejha_Seasons/Season1/11.JPG`,
        `${base}assets/images/Wejha_Seasons/Season1/13.JPG`,
        `${base}assets/images/Wejha_Seasons/Season1/20240720_122902.jpg`,
        `${base}assets/images/Wejha_Seasons/Season1/20240720_125035.jpg`,
        `${base}assets/images/Wejha_Seasons/Season1/IMG_2591.JPG`,
        `${base}assets/images/Wejha_Seasons/Season1/IMG_2593.JPG`
      ]
    },
    Season2: {
      titleAr: "الموسم الثاني (2024)",
      titleEn: "Season 2 (2024)",
      images: [
        `${base}assets/images/Wejha_Seasons/Season2/IMG_1007.jpg`,
        `${base}assets/images/Wejha_Seasons/Season2/IMG_4450.jpg`,
        `${base}assets/images/Wejha_Seasons/Season2/IMG_4512.jpg`,
        `${base}assets/images/Wejha_Seasons/Season2/IMG_4514.jpg`,
        `${base}assets/images/Wejha_Seasons/Season2/IMG_4529.jpg`,
        `${base}assets/images/Wejha_Seasons/Season2/IMG_4536.jpg`,
        `${base}assets/images/Wejha_Seasons/Season2/IMG_4553.jpg`,
        `${base}assets/images/Wejha_Seasons/Season2/IMG_4555.jpg`
      ]
    },
    Season3: {
      titleAr: "الموسم الثالث (2025)",
      titleEn: "Season 3 (2025)",
      images: [
        `${base}assets/images/Wejha_Seasons/Season3/photo_2025-09-13_20-58-11.jpg`,
        `${base}assets/images/Wejha_Seasons/Season3/photo_2025-09-13_20-58-19.jpg`,
        `${base}assets/images/Wejha_Seasons/Season3/photo_2025-09-13_20-58-23.jpg`,
        `${base}assets/images/Wejha_Seasons/Season3/photo_2025-09-13_20-58-25.jpg`,
        `${base}assets/images/Wejha_Seasons/Season3/photo_2025-09-13_20-59-00.jpg`,
        `${base}assets/images/Wejha_Seasons/Season3/photo_2025-09-13_20-59-13.jpg`,
        `${base}assets/images/Wejha_Seasons/Season3/photo_2025-09-13_20-59-29.jpg`,
        `${base}assets/images/Wejha_Seasons/Season3/photo_2025-09-13_20-59-34.jpg`
      ]
    },
    Season4: {
      titleAr: "تجهيزات الموسم الرابع (2026)",
      titleEn: "Season 4 Preparations (2026)",
      images: [
        `${base}assets/images/Wejha_Seasons/Season4 preparation/photo_2026-06-20_21-45-07.jpg`,
        `${base}assets/images/Wejha_Seasons/Season4 preparation/photo_2026-06-20_21-45-07 (2).jpg`,
        `${base}assets/images/Wejha_Seasons/Season4 preparation/photo_2026-06-20_21-45-07 (3).jpg`,
        `${base}assets/images/Wejha_Seasons/Season4 preparation/photo_2026-06-20_21-45-07 (4).jpg`,
        `${base}assets/images/Wejha_Seasons/Season4 preparation/photo_2026-06-20_21-45-07 (5).jpg`,
        `${base}assets/images/Wejha_Seasons/Season4 preparation/photo_2026-06-20_21-45-07 (6).jpg`,
        `${base}assets/images/Wejha_Seasons/Season4 preparation/photo_2026-06-20_21-45-07 (7).jpg`
      ]
    }
  };

  // Hover video controls
  const handleMouseEnter = (id) => {
    if (videoRefs.current[id]) {
      videoRefs.current[id].play().catch(() => {});
    }
  };

  const handleMouseLeave = (id) => {
    if (videoRefs.current[id]) {
      videoRefs.current[id].pause();
      videoRefs.current[id].currentTime = 0;
    }
  };

  return (
    <div className="media-page">
      {/* Page Header */}
      <header className="page-header">
        <h1 className="page-title">{t('media.title')}</h1>
        <p className="page-subtitle">{t('media.subtitle')}</p>
      </header>

      {/* Tabs Selection */}
      <div className="media-tabs glass-panel">
        <button 
          className={`media-tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          <Film size={18} />
          <span>{t('media.videos_title')}</span>
        </button>
        <button 
          className={`media-tab-btn ${activeTab === 'seasons' ? 'active' : ''}`}
          onClick={() => setActiveTab('seasons')}
        >
          <ImageIcon size={18} />
          <span>{t('media.seasons_title')}</span>
        </button>
      </div>

      {/* Media Content */}
      <div className="media-content-container">
        {activeTab === 'videos' ? (
          <div className="videos-layout-grid">
            {videos.map((vid) => (
              <div 
                key={vid.id}
                className="glass-panel video-preview-card"
                onMouseEnter={() => handleMouseEnter(vid.id)}
                onMouseLeave={() => handleMouseLeave(vid.id)}
                onClick={() => setSelectedVideo(vid)}
              >
                <div className="video-card-viewer">
                  <video 
                    ref={(el) => (videoRefs.current[vid.id] = el)}
                    src={vid.src}
                    muted
                    loop
                    playsInline
                    className="video-element-preview"
                  />
                  <div className="video-overlay-play">
                    <div className="play-icon-glow">
                      <Play size={28} fill="white" color="white" />
                    </div>
                  </div>
                </div>
                <div className="video-card-body">
                  <h3>{isRtl ? vid.titleAr : vid.titleEn}</h3>
                  <p>{isRtl ? vid.roleAr : vid.roleEn}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="seasons-album-layout">
            {/* Season Selector */}
            <div className="seasons-sub-menu">
              {Object.keys(seasonsData).map((key) => (
                <button
                  key={key}
                  className={`season-sub-btn glass-panel ${activeSeason === key ? 'active' : ''}`}
                  onClick={() => setActiveSeason(key)}
                >
                  {isRtl ? seasonsData[key].titleAr : seasonsData[key].titleEn}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="photos-masonry-grid">
              {seasonsData[activeSeason].images.map((imgUrl, idx) => (
                <div 
                  key={idx} 
                  className="photo-grid-item glass-panel"
                  onClick={() => setSelectedImage(imgUrl)}
                >
                  <img src={imgUrl} alt={`Season content ${idx + 1}`} className="album-image" loading="lazy" />
                  <div className="photo-item-zoom">
                    <Play size={20} style={{ transform: 'rotate(90deg)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Video Cinematic Player Modal */}
      {selectedVideo && (
        <div className="cinematic-video-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="cinematic-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-cinematic-btn" onClick={() => setSelectedVideo(null)}>
              <X size={24} />
            </button>
            <div className="cinematic-player-wrapper">
              <video 
                src={selectedVideo.src} 
                controls 
                autoPlay 
                className="cinematic-video-tag" 
              />
            </div>
            <div className="cinematic-modal-info">
              <h2>{isRtl ? selectedVideo.titleAr : selectedVideo.titleEn}</h2>
              <p>{isRtl ? selectedVideo.roleAr : selectedVideo.roleEn}</p>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Image Lightbox */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <button className="close-lightbox-btn" onClick={() => setSelectedImage(null)}>
            <X size={28} />
          </button>
          <div className="lightbox-image-wrapper" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Lightbox expanded view" className="lightbox-expanded-img" />
          </div>
        </div>
      )}
    </div>
  );
}
