
import React from 'react';
import { Helmet } from 'react-helmet-async';

export const Team: React.FC = () => {
  return (
    <section className="w-full max-w-7xl pb-12">
      <Helmet>
        <title>Наша команда | PRIZMA Production</title>
        <meta name="description" content="Познакомьтесь с командой PRIZMA Production. Никита и Игорь — сооснователи и ведущие специалисты студии видеопроизводства." />
      </Helmet>
      <h1 className="text-zinc-900 text-2xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-8 md:mb-12 select-none leading-none break-words">
        Наша Команда
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1 flex flex-col gap-6 text-zinc-700 leading-relaxed text-sm md:text-base font-light">
            <div className="border-l-2 border-zinc-900 pl-4 py-1">
                <blockquote className="font-medium text-zinc-900 italic text-base md:text-lg lg:text-xl">
                «В основе студии — два специалиста, которые формируют креатив, продумывают сценарии и лично отвечают за качество каждого проекта».
                </blockquote>
            </div>
            
            <p>
                Мы работаем в формате «бутик-продакшена»: меньше людей, больше внимания, лучший результат. Специализируемся на видеопроизводстве в Воронеже и по всей России.
            </p>

            <p>
                Под конкретные задачи мы привлекаем специалистов из нашей профессиональной сети — операторов, цветокорректоров, аниматоров, звукорежиссёров. Такой подход позволяет собирать оптимальную команду под каждый проект.
            </p>

            <div className="bg-zinc-200/50 p-6 rounded-2xl mt-4 border-l-4 border-zinc-900">
                <p className="font-black text-zinc-900 text-sm md:text-base uppercase tracking-tight">
                    Наша цель — создавать видео, которое помогает бизнесу выделяться, продавать и расти.
                </p>
            </div>
        </div>

        <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                <div className="flex flex-col gap-2" itemScope itemType="https://schema.org/Person">
                    <div className="aspect-[3/4] w-full bg-zinc-300 relative overflow-hidden rounded-2xl group shadow-md">
                        <img 
                            src="https://sun9-79.userapi.com/s/v1/ig2/49TfrQ5b2Fp0dM19a6Kh_5hfugreg0VRlTQ8veq8PPgWuZ3RVpLyj3e_y3t11QzIKT9A31aecgVMMV029QGesK5u.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&cs=960x0" 
                            alt="Никита - Сооснователь и Продюсер PRIZMA Production" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            itemProp="image"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-zinc-900 uppercase" itemProp="name">Никита</h3>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest" itemProp="jobTitle">Co-Founder / Producer</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 md:mt-8" itemScope itemType="https://schema.org/Person">
                    <div className="aspect-[3/4] w-full bg-zinc-300 relative overflow-hidden rounded-2xl group shadow-md">
                        <img 
                            src="https://sun9-65.userapi.com/s/v1/ig2/9V8vyxHZVNBc1p8OK28ziORMpml4ALMDS4Ff8m90iTZ-DUtjcN9tcx2DL96EycWgKVLEZ_uBNpcnNmtDGCEZYpE8.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,960x1280&from=bu&cs=960x0" 
                            alt="Игорь - Сооснователь и Оператор-постановщик PRIZMA Production" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            itemProp="image"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-zinc-900 uppercase" itemProp="name">Игорь</h3>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest" itemProp="jobTitle">Co-Founder / DOP</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
