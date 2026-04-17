
import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Sidebar } from './components/Sidebar';
import { ProjectCard } from './components/ProjectCard';
import { WhyUs } from './components/WhyUs';
import { Team } from './components/Team';
import { Contacts } from './components/Contacts';
import { Pricing } from './components/Pricing';
import { ProjectPage } from './components/ProjectPage';
import { Home } from './components/Home';
import { Category } from './types';
import { PROJECTS } from './constants';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const Portfolio: React.FC<{ 
  activeCategory: Category 
}> = ({ activeCategory }) => {
  const filteredProjects = useMemo(() => {
    if (activeCategory === Category.ALL) return PROJECTS;
    return PROJECTS.filter(p => Array.isArray(p.category) ? p.category.includes(activeCategory) : p.category === activeCategory);
  }, [activeCategory]);

  const seoTitle = activeCategory === Category.ALL 
    ? 'Портфолио | PRIZMA Video Production' 
    : `${activeCategory} | PRIZMA Production`;

  return (
    <PageWrapper>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={`Посмотрите наши работы в категории ${activeCategory}. Профессиональный видеопродакшн PRIZMA.`} />
      </Helmet>
      <div className="md:hidden mb-6">
        <h1 className="text-2xl font-black text-zinc-900 mb-0.5 uppercase tracking-tighter leading-none">{activeCategory}</h1>
        <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">{filteredProjects.length} Проектов</p>
      </div>
      <div className="hidden md:block mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
          {activeCategory === Category.ALL ? 'Портфолио' : activeCategory}
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 lg:gap-x-10">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {filteredProjects.length === 0 && <div className="flex flex-col items-center justify-center h-[50vh] text-zinc-500 text-sm font-light">Проекты не найдены.</div>}
    </PageWrapper>
  );
};

const AppRoutes: React.FC<{ 
  activeCategory: Category
}> = ({ activeCategory }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/portfolio" element={<Portfolio activeCategory={activeCategory} />} />
          <Route path="/project/:id" element={<PageWrapper><ProjectPage /></PageWrapper>} />
          <Route path="/pricing" element={<PageWrapper><Pricing /></PageWrapper>} />
          <Route path="/why-us" element={<PageWrapper><WhyUs /></PageWrapper>} />
          <Route path="/team" element={<PageWrapper><Team /></PageWrapper>} />
          <Route path="/contacts" element={<PageWrapper><Contacts /></PageWrapper>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F0EEE9] text-zinc-900 flex flex-col md:flex-row">
      <Helmet>
        <title>PRIZMA Video Production | Видеопроизводство полного цикла</title>
        <meta name="description" content="Профессиональный видеопродакшн PRIZMA в Воронеже. Архитектурная съемка, контент для соцсетей, ИИ-генерация и освещение мероприятий." />
        <meta property="og:title" content="PRIZMA Video Production" />
        <meta property="og:description" content="Создаем видеоконтент, который решает задачи бизнеса." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Sidebar 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
        isMobileMenuOpen={isMobileMenuOpen} 
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />

      <main className="flex-1 w-full min-h-screen p-5 sm:p-8 md:p-10 lg:p-16 xl:p-20 mt-16 md:mt-0 max-w-[1600px] mx-auto">
        <AppRoutes activeCategory={activeCategory} />

        <div className="mt-16 pt-8 border-t border-zinc-300 md:hidden">
          <p className="text-center text-zinc-500 text-[9px] font-mono uppercase tracking-widest font-bold">PRIZMA Video Production</p>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
};

export default App;
