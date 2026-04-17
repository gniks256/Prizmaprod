
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { Play } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getEmbedUrl = (url: string | undefined) => {
    if (!url) return '';
    if (url.includes('kinescope.io') && !url.includes('/embed/')) {
      return url.replace('kinescope.io/', 'kinescope.io/embed/');
    }
    return url;
  };

  const videoSrc = getEmbedUrl(project.videoUrl || project.vkIframeSrc);

  return (
    <Link 
      to={`/project/${project.id}`}
      className="group cursor-pointer flex flex-col gap-3 w-full mb-6"
      itemScope 
      itemType="https://schema.org/CreativeWork"
    >
      <div className="relative overflow-hidden bg-zinc-200 w-full aspect-video rounded-xl shadow-sm border border-zinc-300/30">
        <div className="absolute inset-0 z-20 bg-transparent group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-white/80 flex items-center justify-center backdrop-blur-sm transform scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 bg-black/20">
              <Play fill="white" className="text-white ml-0.5" size={20} />
            </div>
        </div>

        {videoSrc ? (
          <div className="w-full h-full relative">
            <iframe 
              src={`${videoSrc}?controls=false&muted=true&autoplay=false&loop=false`} 
              className="absolute inset-0 w-full h-full pointer-events-none object-cover"
              title={`Видео проект: ${project.title} для ${project.client}`}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              loading="lazy"
            />
            <div className="absolute inset-0 z-10"></div>
          </div>
        ) : (
          <img 
            src={project.imageUrl || 'https://via.placeholder.com/1280x720?text=PRIZMA'} 
            alt={`${project.title} - ${project.client} (${project.year})`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
            itemProp="image"
          />
        )}
      </div>

      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-zinc-900 text-base md:text-lg font-bold tracking-tight group-hover:text-zinc-600 transition-colors leading-tight min-h-[2.5rem] flex items-start" itemProp="name">
          <span className="line-clamp-2">{project.title}</span>
        </h3>
        <div className="flex items-center justify-between border-t border-zinc-200 pt-2">
           <p className="text-zinc-500 text-[11px] font-medium uppercase tracking-tight truncate max-w-[70%]" itemProp="creator">
             {project.client}
           </p>
           <p className="font-mono text-[10px] text-zinc-400 font-medium">
             <span itemProp="dateCreated">{project.year}</span>
           </p>
        </div>
      </div>
    </Link>
  );
};
