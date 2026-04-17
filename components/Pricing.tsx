
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface PriceItem {
  title: string;
  description: string;
  price: string;
}

export const Pricing: React.FC = () => {
  const priceList: PriceItem[] = [
    {
      title: 'Интерьерная съёмка до 60 м²',
      description: '1 объект, до 2 часов, базовый монтаж',
      price: '8 000 ₽'
    },
    {
      title: 'Интерьерная съёмка 60–150 м²',
      description: '1 объект, до 3 часов, базовый монтаж',
      price: '12 000 ₽'
    },
    {
      title: 'Вертикальный ролик до 30 c',
      description: 'Сценарий по ТЗ, съёмка, монтаж',
      price: '4 000 ₽'
    },
    {
      title: 'Контент‑день (8–12 роликов)',
      description: '3–4 часа съёмки, нарезка для соцсетей',
      price: '24 000 ₽'
    },
    {
      title: 'Мероприятие, 1 час',
      description: 'Съёмка 1 оператора, мин. заказ 2 часа',
      price: '4 000 ₽/час'
    },
    {
      title: 'Полный день мероприятия',
      description: 'До 10 часов, итоговый ролик 3–5 минут',
      price: '35 000 ₽'
    },
    {
      title: 'ИИ‑интро до 15 сек',
      description: 'Идея, генерация, монтаж, звук',
      price: 'от 5 000 ₽'
    }
  ];

  return (
    <section className="w-full max-w-7xl pb-20">
      <Helmet>
        <title>Цены на видеосъемку | PRIZMA Production</title>
        <meta name="description" content="Узнайте стоимость профессиональной видеосъемки в Воронеже. Прозрачные цены на интерьерную съемку, контент для соцсетей и мероприятия." />
      </Helmet>
      <h1 className="text-zinc-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter mb-10 md:mb-16 select-none leading-[0.85] break-words">
        Стоимость видеосъемки и монтажа видео
      </h1>

      <div className="flex flex-col border-t border-zinc-900" role="table">
        {priceList.map((item, index) => (
          <div 
            key={index} 
            className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-10 border-b border-zinc-900/10 hover:bg-white/30 transition-colors px-2 md:px-4"
            role="row"
          >
            <div className="flex flex-col gap-1 md:max-w-[65%] mb-4 md:mb-0">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-zinc-900 leading-tight" role="cell">
                {item.title}
              </h3>
              <p className="text-zinc-500 text-sm sm:text-base font-light">
                {item.description}
              </p>
            </div>
            
            <div className="flex items-center gap-2" role="cell">
              <span className="font-mono text-xl sm:text-2xl md:text-3xl font-medium tracking-tighter text-zinc-900 whitespace-nowrap">
                {item.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 md:mt-24 p-8 sm:p-12 md:p-16 bg-zinc-900 text-white rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col gap-2 relative z-10 max-w-2xl">
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] opacity-60">Расчет стоимости проекта</p>
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-black leading-[0.9] uppercase tracking-tight">Нужен индивидуальный продакшн под ключ?</h4>
        </div>
        <Link 
          to="/contacts"
          className="relative z-10 border-2 border-white hover:bg-white hover:text-zinc-900 px-8 py-4 md:px-10 md:py-5 font-black text-xs sm:text-sm uppercase tracking-widest transition-all text-center shrink-0 rounded-lg"
          aria-label="Заказать расчет стоимости видеопроекта"
        >
          Обсудить проект
        </Link>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      </div>
      
      <p className="mt-4 text-[10px] text-zinc-400 font-mono uppercase tracking-widest text-center md:text-right">
        * Цены актуальны на 2026 год и могут меняться в зависимости от технического задания.
      </p>
    </section>
  );
};
