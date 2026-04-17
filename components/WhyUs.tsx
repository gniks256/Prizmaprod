
import React from 'react';
import { Helmet } from 'react-helmet-async';

export const WhyUs: React.FC = () => {
  const points = [
    {
      id: '01',
      title: 'Полный цикл производства — от идеи до готового видео',
      description: 'Мы берём на себя всё: разработку сценария, подготовку, съёмку, монтаж, цветокор, звук и адаптацию под разные платформы. Клиент получает результат «под ключ» без необходимости что-то контролировать или додумывать.'
    },
    {
      id: '02',
      title: 'Видео, которое решает бизнес-задачи',
      description: 'Мы создаём не просто красивые кадры — мы делаем контент, который влияет на продажи, восприятие бренда и доверие клиентов. Каждый ролик основан на логике бизнеса, а не на случайных креативных идеях.'
    },
    {
      id: '03',
      title: 'Гибкие условия и любые способы оплаты',
      description: 'Работаем официально, принимаем любые удобные способы оплаты: ИП, ООО, самозанятые, переводы, по договору — подстраиваемся под бизнес-процессы клиента. Никаких сложностей с бухгалтерами и закрывающими документами.'
    },
    {
      id: '04',
      title: 'Погружение в продукт и внимательность к деталям',
      description: 'Мы изучаем специфику компании, её аудиторию и ценность, чтобы ролик точно отражал суть бренда. Поэтому наши видео выглядят живыми, убедительными и профессиональными — их не хочется пролистывать.'
    }
  ];

  return (
    <section className="w-full max-w-7xl pb-12">
      <Helmet>
        <title>Почему выбирают нас | PRIZMA Production</title>
        <meta name="description" content="Преимущества работы с PRIZMA Production: полный цикл производства, решение бизнес-задач, гибкие условия и глубокое погружение в продукт." />
      </Helmet>
      <h1 className="text-zinc-900 text-2xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-10 md:mb-12 select-none leading-none break-words">
        Почему выбирают PRIZMA Production
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {points.map((point) => (
          <div key={point.id} className="flex flex-col gap-3 group">
            <div className="flex items-baseline justify-between border-b border-zinc-900 pb-2 mb-1">
                <span className="text-3xl md:text-5xl font-mono font-light text-zinc-200 group-hover:text-zinc-900 transition-colors duration-300 leading-none">
                    {point.id}
                </span>
            </div>
            
            <h3 className="text-lg md:text-xl font-black leading-tight">
              {point.title}
            </h3>
            
            <p className="text-zinc-600 leading-relaxed text-sm md:text-base font-light">
              {point.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
