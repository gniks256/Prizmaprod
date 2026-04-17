import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap, Shield, Clock } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Helmet } from 'react-helmet-async';

const COLLAGE_IMAGES = PROJECTS.map(p => p.imageUrl).filter(Boolean);

export const Home: React.FC = () => {
  const featuredProjects = PROJECTS.slice(0, 3);

  const getEmbedUrl = (url: string | undefined) => {
    if (!url) return '';
    if (url.includes('kinescope.io') && !url.includes('/embed/')) {
      return url.replace('kinescope.io/', 'kinescope.io/embed/');
    }
    return url;
  };

  return (
    <div className="w-full max-w-7xl pb-20">
      <Helmet>
        <title>PRIZMA Video Production | Главная</title>
        <meta name="description" content="PRIZMA Production — студия видеопроизводства полного цикла. Создаем видео, которое решает бизнес-задачи." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex flex-col justify-center items-start mb-16 md:mb-24 lg:mb-32 overflow-hidden px-4 sm:px-6">
        {/* Collage Background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none select-none overflow-hidden">
          <div className="relative w-full h-full">
            {COLLAGE_IMAGES.map((img, i) => {
              const positions = [
                { top: '5%', left: '55%', size: 'w-48 h-64 md:w-64 md:h-80', delay: 0, rotate: -5 },
                { top: '30%', left: '70%', size: 'w-64 h-48 md:w-80 md:h-60', delay: 0.2, rotate: 8 },
                { top: '60%', left: '50%', size: 'w-56 h-72 md:w-72 md:h-96', delay: 0.4, rotate: -12 },
                { top: '10%', left: '80%', size: 'w-40 h-40 md:w-56 md:h-56', delay: 0.6, rotate: 15 },
                { top: '45%', left: '40%', size: 'w-72 h-56 md:w-96 md:h-72', delay: 0.8, rotate: -3 },
                { top: '70%', left: '75%', size: 'w-48 h-48 md:w-64 md:h-64', delay: 1.0, rotate: 10 },
                { top: '2%', left: '35%', size: 'w-32 h-48 md:w-48 md:h-64', delay: 1.2, rotate: -8 },
                { top: '55%', left: '85%', size: 'w-56 h-40 md:w-72 md:h-56', delay: 1.4, rotate: 5 },
                { top: '15%', left: '45%', size: 'w-40 h-56 md:w-56 md:h-72', delay: 0.3, rotate: 12 },
                { top: '40%', left: '60%', size: 'w-48 h-32 md:w-64 md:h-48', delay: 0.7, rotate: -15 },
                { top: '80%', left: '30%', size: 'w-56 h-40 md:w-72 md:h-56', delay: 1.1, rotate: 7 },
                { top: '25%', left: '90%', size: 'w-32 h-48 md:w-48 md:h-64', delay: 1.5, rotate: -10 },
                { top: '5%', left: '70%', size: 'w-40 h-40 md:w-56 md:h-56', delay: 0.5, rotate: 5 },
                { top: '85%', left: '60%', size: 'w-48 h-64 md:w-64 md:h-80', delay: 0.9, rotate: -5 },
              ];
              const pos = positions[i % positions.length];
              
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: [0, -25, 0],
                    rotate: pos.rotate
                  }}
                  transition={{ 
                    opacity: { duration: 1, delay: pos.delay },
                    scale: { duration: 1, delay: pos.delay },
                    y: { 
                      duration: 6 + Math.random() * 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: pos.delay 
                    },
                    rotate: { duration: 1, delay: pos.delay }
                  }}
                  className={`absolute ${pos.size} bg-zinc-200 rounded-lg overflow-hidden shadow-2xl border border-white/20`}
                  style={{ top: pos.top, left: pos.left }}
                >
                  <img 
                    src={img} 
                    alt="" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                </motion.div>
              );
            })}
          </div>
          {/* Gradient Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F0EEE9] via-[#F0EEE9]/70 to-transparent"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-5xl"
        >
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.5em] text-zinc-400 mb-4 md:mb-6">PRIZMA - Video Production Studio</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-zinc-900 mb-8 md:mb-12 break-words">
            Производство <br />
            <span className="text-transparent stroke-zinc-900 stroke-1" style={{ WebkitTextStroke: '1px #18181b' }}>видео</span> <br />
            полного цикла
          </h1>
          <p className="text-zinc-600 text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed mb-10 md:mb-14 max-w-2xl">
            Создаем качественный визуальный контент, который работает на имидж и цели вашего бизнеса.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6">
            <Link 
              to="/portfolio" 
              className="bg-zinc-900 text-white px-6 py-3 md:px-8 md:py-4 font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-2 rounded-lg"
            >
              Смотреть работы <ArrowRight size={16} />
            </Link>
            <Link 
              to="/contacts" 
              className="border border-zinc-900 text-zinc-900 px-6 py-3 md:px-8 md:py-4 font-black text-xs uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all rounded-lg"
            >
              Обсудить проект
            </Link>
          </div>
        </motion.div>

        {/* Decorative element */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
           <div className="w-full h-full border-[40px] border-zinc-900 rounded-full scale-150 translate-x-1/2"></div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mb-24 md:mb-32 lg:mb-40">
        <div className="flex justify-between items-end mb-10 md:mb-16">
          <div>
            <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-zinc-400 mb-2">Избранное</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-zinc-900">Любимые проекты</h2>
          </div>
          <Link to="/portfolio" className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors border-b border-zinc-300 pb-1 hidden sm:block">
            Портфолио
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {featuredProjects.map((project, index) => {
            const videoSrc = getEmbedUrl(project.videoUrl || project.vkIframeSrc);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/project/${project.id}`} className="group block">
                  <div className="aspect-video bg-zinc-200 rounded-sm overflow-hidden mb-4 relative border border-zinc-300/30">
                    {videoSrc ? (
                      <div className="w-full h-full relative pointer-events-none">
                        <iframe 
                          src={`${videoSrc}?controls=false&muted=true&autoplay=false`} 
                          className="absolute inset-0 w-full h-full object-cover"
                          title={project.title}
                          frameBorder="0"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play fill="white" className="text-white ml-1" size={20} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full relative">
                        <img 
                          src={project.imageUrl || `https://picsum.photos/seed/${project.id}/800/450`} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play fill="white" className="text-white ml-1" size={20} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-tight mb-1">{project.title}</h3>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{project.client}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Services / Why Us Mini */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mb-24 md:mb-32 lg:mb-40 bg-white p-8 sm:p-12 md:p-16 lg:p-20 border-2 border-zinc-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] rounded-2xl">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-zinc-900 text-white flex items-center justify-center rounded-xl">
            <Zap size={24} className="lg:w-8 lg:h-8" />
          </div>
          <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight">Скорость</h3>
          <p className="text-zinc-500 text-sm lg:text-base leading-relaxed">
            Мы ценим ваше время. От идеи до первого драфта — в кратчайшие сроки без потери качества.
          </p>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-zinc-900 text-white flex items-center justify-center rounded-xl">
            <Shield size={24} className="lg:w-8 lg:h-8" />
          </div>
          <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight">Качество</h3>
          <p className="text-zinc-500 text-sm lg:text-base leading-relaxed">
            Используем современное оборудование и ИИ-технологии для достижения кинематографичного результата.
          </p>
        </div>
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-zinc-900 text-white flex items-center justify-center rounded-xl">
            <Clock size={24} className="lg:w-8 lg:h-8" />
          </div>
          <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight">Опыт</h3>
          <p className="text-zinc-500 text-sm lg:text-base leading-relaxed">
            Множество реализованных проектов в различных нишах: от архитектуры до мероприятий.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 sm:py-24 md:py-32 bg-zinc-900 text-white rounded-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter mb-8 md:mb-12 break-words">Готовы создать что-то <br /> <span className="text-zinc-400">особенное?</span></h2>
          <p className="text-zinc-400 mb-10 md:mb-14 text-base sm:text-lg md:text-xl font-light">
            Оставьте заявку, и мы свяжемся с вами для обсуждения деталей вашего будущего проекта.
          </p>
          <Link 
            to="/contacts" 
            className="inline-block bg-white text-zinc-900 px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all rounded-lg"
          >
            Начать проект
          </Link>
        </div>
        {/* Background decorative text */}
        <div className="absolute -bottom-10 -left-10 text-[15vw] font-black text-white/5 select-none pointer-events-none leading-none uppercase tracking-tighter">
          PRIZMA
        </div>
      </section>
    </div>
  );
};
