
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Category } from '../types';
import { Mail, Menu, X, Send } from 'lucide-react';

interface SidebarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const VkIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
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

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeCategory,
  onSelectCategory,
  isMobileMenuOpen,
  toggleMobileMenu
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const categories = Object.values(Category);

  const handleCategoryClick = (cat: Category) => {
    onSelectCategory(cat);
    if (location.pathname !== '/portfolio') {
      navigate('/portfolio');
    }
    if(window.innerWidth < 768) toggleMobileMenu();
  };

  const NavContent = () => (
    <div className="flex flex-col h-full justify-between p-6 md:p-8">
      <div className="flex flex-col items-start gap-8 md:gap-12">
        <NavLink 
          to="/"
          onClick={() => {
            if(window.innerWidth < 768) toggleMobileMenu();
          }}
          className="text-2xl font-black tracking-tighter text-zinc-900 uppercase select-none cursor-pointer font-sans"
        >
          PRIZMA
        </NavLink>

        <nav className="flex flex-col gap-1 w-full">
          <div className="text-[10px] font-mono text-zinc-400 mb-2 uppercase tracking-widest">Меню</div>
          
          <NavLink 
            to="/"
            className={({ isActive }) => `text-left text-sm transition-all duration-200 py-1 flex items-center gap-2 ${
              isActive ? 'text-zinc-900 font-bold translate-x-1' : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Главная
          </NavLink>

          <NavLink 
            to="/portfolio"
            onClick={() => onSelectCategory(Category.ALL)}
            className={({ isActive }) => `text-left text-sm transition-all duration-200 py-1 flex items-center gap-2 ${
              isActive && activeCategory === Category.ALL ? 'text-zinc-900 font-bold translate-x-1' : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Портфолио
          </NavLink>

          {(location.pathname === '/portfolio' || location.pathname.startsWith('/project')) && (
            <div className="mt-4 animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="text-[10px] font-mono text-zinc-400 mb-2 uppercase tracking-widest">Категории</div>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`text-left text-sm transition-all duration-200 py-1 ${
                      activeCategory === cat && location.pathname === '/portfolio'
                        ? 'text-zinc-900 font-bold translate-x-1' 
                        : 'text-zinc-500 hover:text-zinc-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>

      <div className="flex flex-col gap-6 mt-12 md:mt-0">
        <div className="flex flex-col gap-1 text-zinc-500">
          <div className="text-[10px] font-mono text-zinc-400 mb-2 uppercase tracking-widest">Инфо</div>
          
          <NavLink 
            to="/pricing"
            className={({ isActive }) => `text-left text-sm transition-all duration-200 py-1 flex items-center gap-2 ${
              isActive ? 'text-zinc-900 font-bold translate-x-1' : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Прайс
          </NavLink>

          <NavLink 
            to="/why-us"
            className={({ isActive }) => `text-left text-sm transition-all duration-200 py-1 flex items-center gap-2 ${
              isActive ? 'text-zinc-900 font-bold translate-x-1' : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Почему МЫ
          </NavLink>

          <NavLink 
            to="/team"
            className={({ isActive }) => `text-left text-sm transition-all duration-200 py-1 flex items-center gap-2 ${
              isActive ? 'text-zinc-900 font-bold translate-x-1' : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Команда
          </NavLink>
          
          <NavLink 
            to="/contacts"
            className={({ isActive }) => `text-left text-sm transition-all duration-200 py-1 flex items-center gap-2 ${
              isActive ? 'text-zinc-900 font-bold translate-x-1' : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Контакты
          </NavLink>
        </div>

        <div className="flex gap-4 text-zinc-600 items-center">
          <a href="https://t.me/gnikw" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">
            <Send size={18} />
          </a>
          <a href="https://vk.com/prizmastudia" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">
            <VkIcon size={18} />
          </a>
          <a href="mailto:gniks1@yandex.ru" className="hover:text-zinc-900 transition-colors">
            <Mail size={18} />
          </a>
        </div>
        
        <div className="text-zinc-400 text-[9px] font-mono uppercase tracking-widest">
          &copy; 2026 PRIZMA PROD.
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-[#F0EEE9] p-4 flex justify-between items-center border-b border-zinc-200">
        <NavLink to="/" className="text-xl font-black tracking-tighter text-zinc-900 uppercase">PRIZMA</NavLink>
        <button onClick={toggleMobileMenu} className="text-zinc-900">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside className="hidden md:block w-[240px] lg:w-[280px] xl:w-[320px] h-screen sticky top-0 border-r border-zinc-300/50 overflow-y-auto no-scrollbar shrink-0">
        <NavContent />
      </aside>

      <div className={`md:hidden fixed inset-0 z-40 bg-[#F0EEE9] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} pt-16 overflow-y-auto`}>
        <NavContent />
      </div>
    </>
  );
};
