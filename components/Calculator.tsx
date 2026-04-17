import React, { useState, useEffect } from 'react';
import { ChevronRight, Loader2, Check } from 'lucide-react';

const ORIENTATIONS = ['Горизонтальное', 'Вертикальное'];

export const Calculator: React.FC = () => {
  // State
  const [duration, setDuration] = useState(60); // in seconds
  const [deadline, setDeadline] = useState(2); // 0: week, 1: 2 weeks, 2: month, 3: > month
  const [orientation, setOrientation] = useState('Горизонтальное');
  
  // Toggles
  const [hasActors, setHasActors] = useState(false);
  const [hasNarrator, setHasNarrator] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [totalPrice, setTotalPrice] = useState(10000);

  // Submission State
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Calculate Price
  useEffect(() => {
    let base = 10000;
    
    // Duration rules
    if (duration <= 60) {
        base += 0;
    } else if (duration <= 300) { // 1-5 min
        base += 15000;
    } else if (duration <= 600) { // 5-10 min
        base += 20000;
    } else { // > 10 min
        base += 30000;
    }

    // Orientation multiplier
    if (orientation === 'Вертикальное') {
        base *= 1.2;
    }

    // Deadline (Urgency)
    // 0: Urgent (x1.5), 3: Relaxed (x1.0)
    const deadlineMap = [1.5, 1.3, 1.1, 1.0];
    base *= deadlineMap[deadline];

    // Extras
    if (hasActors) base += 10000;
    if (hasNarrator) base += 10000;

    setTotalPrice(Math.round(base / 1000) * 1000); // Round to nearest thousand
  }, [duration, deadline, orientation, hasActors, hasNarrator]);

  const getDeadlineLabel = (val: number) => {
    const labels = ['Неделя', '2 недели', 'Месяц', 'Больше месяца'];
    return labels[val];
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds} секунд`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (remainingSeconds === 0) return `${minutes} мин`;
    return `${minutes} мин ${remainingSeconds} сек`;
  };

  const handleSubmit = async () => {
    if (!name.trim() || !contact.trim()) {
        alert("Пожалуйста, укажите имя и контакты для связи.");
        return;
    }

    setStatus('loading');

    // Data for Email
    const subject = `Новая заявка: ${totalPrice.toLocaleString()}₽ (PRIZMA)`;
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #18181b; border-bottom: 2px solid #18181b; padding-bottom: 10px;">Заявка с калькулятора PRIZMA</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr><td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Имя:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Контакт:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${contact}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Стоимость:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${totalPrice.toLocaleString()}₽</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Хронометраж:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formatDuration(duration)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Срок:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${getDeadlineLabel(deadline)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Формат:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${orientation}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #eee;">Опции:</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${[
            hasActors ? 'Актеры/Модели' : null,
            hasNarrator ? 'Диктор' : null
          ].filter(Boolean).join(', ') || 'Нет'}</td></tr>
        </table>
      </div>
    `.trim();

    try {
        const response = await fetch("/api/send-email", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subject, html })
        });

        if (response.ok) {
            setStatus('success');
            // Clear sensitive fields
            setName('');
            setContact('');
        } else {
            setStatus('error');
        }
    } catch (error) {
        console.error(error);
        setStatus('error');
    }
  };

  const Toggle = ({ active, onChange }: { active: boolean, onChange: () => void }) => (
    <div 
      onClick={onChange}
      className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ${active ? 'bg-zinc-900' : 'bg-zinc-300'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${active ? 'translate-x-6' : 'translate-x-0'}`} />
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto animate-in fade-in duration-500 pt-8 lg:pt-0">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* LEFT COLUMN - CONTROLS */}
        <div className="flex-1 flex flex-col gap-10">
          
          {/* Chronometry */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-baseline">
              <label className="font-bold text-lg">Хронометраж</label>
              <span className="font-mono text-sm tracking-wider uppercase">{formatDuration(duration)}</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="900" // 15 minutes
              step="10"
              value={duration} 
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full h-1 bg-black rounded-lg appearance-none cursor-pointer accent-black"
            />
            <div className="flex justify-between text-xs text-zinc-400 font-mono">
                <span>10 сек</span>
                <span>15 мин</span>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-baseline">
              <label className="font-bold text-lg">Срок</label>
              <span className="font-mono text-sm tracking-wider uppercase">{getDeadlineLabel(deadline)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="3" 
              step="1"
              value={deadline} 
              onChange={(e) => setDeadline(Number(e.target.value))}
              className="w-full h-1 bg-black rounded-lg appearance-none cursor-pointer accent-black"
            />
          </div>

          {/* Video Orientation */}
          <div className="flex flex-col gap-4">
            <label className="font-bold text-lg">Формат видео</label>
            <div className="flex flex-wrap gap-2">
              {ORIENTATIONS.map(type => (
                <button
                  key={type}
                  onClick={() => setOrientation(type)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all ${
                    orientation === type 
                      ? 'bg-zinc-900 text-white' 
                      : 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-wide uppercase w-32">Актеры, модели</span>
              <Toggle active={hasActors} onChange={() => setHasActors(!hasActors)} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-wide uppercase w-32">Диктор</span>
              <Toggle active={hasNarrator} onChange={() => setHasNarrator(!hasNarrator)} />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - SUMMARY FORM */}
        <div className="w-full lg:w-[450px] shrink-0">
          <div className="border-[3px] border-zinc-900 p-8 md:p-10 flex flex-col justify-between min-h-[500px] h-full bg-[#F0EEE9] relative rounded-2xl">
            
            <div className="flex flex-col gap-8">
              <h2 className="text-3xl font-bold leading-tight">
                Закажите видео за {totalPrice.toLocaleString('ru-RU')}₽
              </h2>

              <div className="flex flex-col gap-6 mt-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">Имя</label>
                  <input 
                    type="text" 
                    value={name}
                    disabled={status === 'loading' || status === 'success'}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b-2 border-zinc-400 py-2 focus:outline-none focus:border-zinc-900 transition-colors bg-transparent disabled:opacity-50"
                    placeholder="Ваше имя"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">Телефон или почта</label>
                  <input 
                    type="text" 
                    value={contact}
                    disabled={status === 'loading' || status === 'success'}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full border-b-2 border-zinc-400 py-2 focus:outline-none focus:border-zinc-900 transition-colors bg-transparent disabled:opacity-50"
                    placeholder="+7 999 000-00-00"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-12 md:mt-20">
              <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                <button 
                  onClick={handleSubmit}
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full md:w-auto border-[3px] border-zinc-900 px-10 py-3 font-bold text-lg transition-all flex items-center justify-center gap-2 rounded-xl
                    ${status === 'success' 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'hover:bg-zinc-900 hover:text-white'
                    }
                    ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}
                  `}
                >
                  {status === 'loading' && <Loader2 className="animate-spin" size={20} />}
                  {status === 'success' && <Check size={20} />}
                  {status === 'idle' && 'Отправить'}
                  {status === 'loading' && 'Отправка...'}
                  {status === 'success' && 'Готово!'}
                  {status === 'error' && 'Ошибка'}
                </button>

                {status !== 'success' && (
                    <button className="flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all">
                    Обратный звонок <ChevronRight size={16} />
                    </button>
                )}
              </div>
              
              {status === 'error' && (
                 <p className="text-red-500 text-xs font-bold mt-[-10px]">Не удалось отправить. Попробуйте позже или напишите нам в Telegram.</p>
              )}
            </div>

          </div>
          <p className="mt-4 text-xs text-zinc-300 text-center md:text-right">Предложение не является публичной офертой.</p>
        </div>

      </div>
    </div>
  );
};