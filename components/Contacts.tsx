
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, Phone, Mail, Loader2, Check } from 'lucide-react';

const VkIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12.8712 15.6599C12.8712 15.6599 15.2212 15.6199 16.5412 17.5199C16.9812 18.1599 16.6412 18.6199 16.6412 18.6199L13.8812 18.6599C13.8812 18.6599 11.8212 18.7899 10.4612 17.2299C10.4612 17.2299 10.4412 15.1199 9.94119 15.2199C9.33119 15.3499 9.17119 16.6699 9.17119 17.5999C9.17119 18.2899 8.61119 18.6699 8.61119 18.6699C8.61119 18.6699 6.27119 18.7999 4.39119 16.5999C2.45119 14.3199 0.441193 9.42993 0.441193 9.42993C0.441193 9.42993 0.731193 8.76993 1.98119 8.79993C1.98119 8.79993 3.69119 8.74993 3.79119 8.74993C4.21119 8.74993 4.41119 8.97993 4.50119 9.16993C4.50119 9.16993 5.37119 11.4599 6.54119 13.0699C7.65119 14.5999 8.12119 14.6599 8.35119 14.4899C8.94119 14.0799 8.84119 12.3399 8.84119 11.6699C8.84119 9.53993 9.17119 8.21993 10.0812 7.97993C10.3812 7.89993 10.8412 7.84993 11.4112 7.83993C12.1612 7.81993 13.0112 7.91993 13.1912 8.16993C13.2412 8.23993 12.5512 8.52993 12.4812 9.69993C12.4212 10.9799 12.8712 11.0899 12.8712 11.0899C12.8712 11.0899 14.3612 10.9999 15.9312 8.27993C15.9312 8.27993 16.2712 7.72993 17.0712 7.79993C17.9612 7.87993 18.9112 7.78993 18.9112 7.78993C18.9112 7.78993 19.3812 7.76993 19.7412 8.13993C20.0712 8.48993 19.9512 9.10993 19.9512 9.10993C19.9512 9.10993 19.5712 10.9399 17.7412 13.0199C15.8212 15.1999 15.0712 15.3499 15.0712 15.3499L12.8712 15.6599Z" />
  </svg>
);

export const Contacts: React.FC = () => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim() || !contact.trim()) return;

        setStatus('loading');
        
        const subject = `Новая заявка (Контакты): ${name}`;
        const html = `
          <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #18181b; border-bottom: 2px solid #18181b; padding-bottom: 10px;">Заявка из формы контактов PRIZMA</h2>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Контакт:</strong> ${contact}</p>
            <p><strong>Сообщение:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #18181b;">
              ${(message || 'Без сообщения').replace(/\n/g, '<br>')}
            </div>
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
                setName(''); setContact(''); setMessage('');
                setTimeout(() => setStatus('idle'), 5000);
            } else { 
                throw new Error(`Server responded with ${response.status}`);
            }
        } catch (error) { 
            console.error('Submission error:', error);
            setStatus('error'); 
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <div className="w-full max-w-7xl pb-12">
            <Helmet>
                <title>Контакты | PRIZMA Production</title>
                <meta name="description" content="Свяжитесь с нами для обсуждения вашего видеопроекта. Телефон: 8 910 281-49-81. Работаем в Воронеже и по всей России." />
            </Helmet>
            <h1 className="text-zinc-900 text-2xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-8 md:mb-12 select-none leading-none break-words">
                Контакты
            </h1>

            <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-24">
                <div className="flex-1 flex flex-col gap-10 md:gap-12">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">Телефон</span>
                        <a href="tel:89102814981" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black hover:text-zinc-600 transition-colors tracking-tighter leading-[0.85]">
                            8 910 281-49-81
                        </a>
                    </div>

                    <div className="flex flex-col gap-4 md:gap-6">
                        <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">Соцсети и почта</span>
                        <div className="flex flex-wrap items-start gap-6 md:gap-8 lg:gap-10">
                            <div className="flex flex-col items-center gap-2">
                                <a href="https://t.me/gnikw" target="_blank" className="w-12 h-12 border border-zinc-900 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all shadow-sm rounded-lg">
                                    <Send size={20} />
                                </a>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 font-mono">Telegram</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <a href="https://vk.com/prizmastudia" target="_blank" className="w-12 h-12 border border-zinc-900 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all shadow-sm rounded-lg">
                                    <VkIcon size={20} />
                                </a>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 font-mono">ВКонтакте</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <a href="mailto:gniks1@yandex.ru" className="w-12 h-12 border border-zinc-900 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all shadow-sm rounded-lg">
                                    <Mail size={20} />
                                </a>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 font-mono">Почта</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 border-l-2 border-zinc-900 pl-4 py-1">
                        <p className="text-zinc-700 leading-relaxed font-light text-base md:text-lg italic">
                            Мы находимся в Воронеже, но работаем по всей России. Обсудим ваш проект в любое время.
                        </p>
                    </div>
                </div>

                <div className="flex-1 bg-white p-6 md:p-8 border-2 border-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] rounded-2xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Honeypot field */}
                        <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                        
                        <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 font-mono">Ваше имя</label>
                            <input type="text" name="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" className="w-full border-b border-zinc-200 py-1 text-base focus:outline-none focus:border-zinc-900 transition-colors bg-transparent font-medium" disabled={status === 'loading' || status === 'success'} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 font-mono">Контакт для связи</label>
                            <input type="text" name="contact" required value={contact} onChange={(e) => setContact(e.target.value)} placeholder="@тг или +7..." className="w-full border-b border-zinc-200 py-1 text-base focus:outline-none focus:border-zinc-900 transition-colors bg-transparent font-medium" disabled={status === 'loading' || status === 'success'} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 font-mono">Ваш вопрос</label>
                            <textarea name="message" rows={2} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Опишите задачу..." className="w-full border-b border-zinc-200 py-1 text-sm focus:outline-none focus:border-zinc-900 transition-colors bg-transparent resize-none font-medium" disabled={status === 'loading' || status === 'success'} />
                        </div>
                        <button type="submit" disabled={status === 'loading' || status === 'success'} className={`mt-2 py-3 px-6 font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-zinc-900 rounded-lg ${status === 'success' ? 'bg-green-600 text-white border-green-600' : status === 'error' ? 'bg-red-600 text-white border-red-600' : 'bg-zinc-900 text-white hover:bg-transparent hover:text-zinc-900'}`}>
                            {status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : status === 'success' ? <Check size={16} /> : status === 'error' ? 'Ошибка' : 'Отправить заявку'}
                        </button>
                        {status === 'error' && (
                            <p className="text-[10px] text-red-600 font-mono uppercase tracking-widest text-center mt-2">
                                Ошибка при отправке. Попробуйте позже или напишите в Telegram.
                            </p>
                        )}
                        {status === 'success' && (
                            <p className="text-[10px] text-green-600 font-mono uppercase tracking-widest text-center mt-2">
                                Заявка успешно отправлена!
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};
