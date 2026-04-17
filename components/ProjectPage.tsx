import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PROJECTS } from '../constants';
import { ArrowLeft, Play, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Markdown from 'react-markdown';

export const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500">
        <Helmet>
          <title>Проект не найден | PRIZMA Production</title>
        </Helmet>
        <p className="mb-4">Проект не найден</p>
        <Link to="/" className="text-zinc-900 font-bold underline">Вернуться в портфолио</Link>
      </div>
    );
  }

  const getEmbedUrl = (url: string | undefined) => {
    if (!url) return '';
    if (url.includes('kinescope.io') && !url.includes('/embed/')) {
      return url.replace('kinescope.io/', 'kinescope.io/embed/');
    }
    return url;
  };

  const videoSrc = getEmbedUrl(project.videoUrl || project.vkIframeSrc);

  return (
    <div className="w-full max-w-7xl pb-20">
      <Helmet>
        <title>{`${project.title} | ${project.client} | PRIZMA Production`}</title>
        <meta name="description" content={`Видео проект ${project.title} для клиента ${project.client}. Категория: ${Array.isArray(project.category) ? project.category.join(', ') : project.category}.`} />
        <meta property="og:title" content={`${project.title} | PRIZMA Production`} />
        <meta property="og:image" content={project.imageUrl} />
      </Helmet>
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-mono uppercase tracking-widest">Назад</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-24">
        <div className="lg:col-span-8">
          <div className={`relative overflow-hidden bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 ${project.isVertical ? 'aspect-[9/16] max-w-md mx-auto' : 'aspect-video'}`}>
            {videoSrc ? (
              <iframe 
                src={`${videoSrc}?autoplay=false&dnt=true`} 
                className="absolute inset-0 w-full h-full"
                title={project.title}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
              />
            ) : (
              <img 
                src={project.imageUrl || 'https://via.placeholder.com/1920x1080?text=PRIZMA'} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {project.description && (
            <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-zinc-300/50">
              <p className="text-zinc-400 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] mb-6">О проекте</p>
              <div className="text-zinc-800 text-base sm:text-lg lg:text-xl leading-relaxed font-light markdown-body">
                <Markdown>{project.description}</Markdown>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="flex flex-col gap-8 md:gap-10">
            <div>
              <p className="text-zinc-400 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] mb-2">Проект</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.85] text-zinc-900 break-words">
                {project.title}
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-8 py-8 md:py-10 border-y border-zinc-300/50">
              <div>
                <p className="text-zinc-400 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mb-1">Клиент</p>
                <p className="text-sm sm:text-base font-bold text-zinc-900 uppercase">{project.client}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mb-1">Год</p>
                <p className="text-sm sm:text-base font-bold text-zinc-900 font-mono">{project.year}</p>
              </div>
              <div className="col-span-2">
                <p className="text-zinc-400 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest mb-1">Категория</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(Array.isArray(project.category) ? project.category : [project.category]).map((cat, i) => (
                    <span key={i} className="text-[10px] sm:text-xs bg-zinc-200 px-3 py-1 rounded-full font-medium text-zinc-600">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
               <Link 
                to="/contacts"
                className="flex items-center justify-center gap-2 bg-zinc-900 text-white py-3 px-6 font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/20 rounded-lg"
               >
                 <Mail size={14} />
                 Связаться
               </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-300/50">
              <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-4">Другие проекты</p>
              <div className="grid grid-cols-2 gap-4">
                {PROJECTS.filter(p => p.id !== project.id).slice(0, 4).map(p => {
                  const otherVideoSrc = getEmbedUrl(p.videoUrl || p.vkIframeSrc);
                  return (
                    <Link 
                      key={p.id} 
                      to={`/project/${p.id}`}
                      className="group flex flex-col gap-2"
                    >
                      <div className="aspect-video bg-zinc-200 rounded-lg overflow-hidden relative border border-zinc-300/30 shadow-sm">
                        {otherVideoSrc ? (
                          <div className="w-full h-full relative pointer-events-none">
                            <iframe 
                              src={`${otherVideoSrc}?controls=false&muted=true&autoplay=false`} 
                              className="absolute inset-0 w-full h-full object-cover"
                              title={p.title}
                              frameBorder="0"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/10 transition-colors" />
                          </div>
                        ) : (
                          <img 
                            src={p.imageUrl || `https://picsum.photos/seed/${p.id}/400/225`} 
                            alt={p.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </div>
                      <h4 className="text-[10px] font-bold uppercase tracking-tight text-zinc-900 line-clamp-1 group-hover:text-zinc-500 transition-colors">
                        {p.title}
                      </h4>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
