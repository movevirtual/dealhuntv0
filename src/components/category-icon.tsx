import React from 'react';
import { 
  Home,
  Sparkles,
  Rocket,
  Brain,
  Timer,
  Cloud,
  Code,
  Palette,
  Globe,
  Megaphone,
  Clock,
  Building2,
  GraduationCap,
  Blocks,
  Database,
  BarChart,
  Tag,
  FileCode
} from 'lucide-react';

const iconMap = {
  // Browse section
  'all': Home,
  'featured': Sparkles,
  'new': Rocket,
  'ai': Brain,
  'blackfriday': Tag,
  'ending': Timer,
  
  // Categories section
  'saas': Cloud,
  'dev': Code,
  'design': Palette,
  'hosting': Globe,
  'marketing': Megaphone,
  'productivity': Clock,
  'business': Building2,
  'education': GraduationCap,
  'boilerplate': FileCode,
  
  // Technology section
  'nocode': Blocks,
  'database': Database,
  'analytics': BarChart
};

type IconId = keyof typeof iconMap;

interface CategoryIconProps {
  id: IconId;
  className?: string;
  isDark?: boolean;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ id, isDark }) => {
  const Icon = iconMap[id];
  const colors = {
    // Browse section
    all: isDark ? 'text-blue-400' : 'text-blue-500',
    featured: isDark ? 'text-yellow-400' : 'text-yellow-500',
    new: isDark ? 'text-green-400' : 'text-green-500',
    ai: isDark ? 'text-cyan-400' : 'text-cyan-500',
    blackfriday: isDark ? 'text-purple-400' : 'text-purple-500',
    ending: isDark ? 'text-red-400' : 'text-red-500',
    
    // Categories section
    saas: isDark ? 'text-purple-400' : 'text-purple-500',
    dev: isDark ? 'text-indigo-400' : 'text-indigo-500',
    design: isDark ? 'text-pink-400' : 'text-pink-500',
    hosting: isDark ? 'text-sky-400' : 'text-sky-500',
    marketing: isDark ? 'text-orange-400' : 'text-orange-500',
    productivity: isDark ? 'text-emerald-400' : 'text-emerald-500',
    business: isDark ? 'text-slate-400' : 'text-slate-500',
    education: isDark ? 'text-violet-400' : 'text-violet-500',
    boilerplate: isDark ? 'text-teal-400' : 'text-teal-500',
    
    // Technology section
    nocode: isDark ? 'text-amber-400' : 'text-amber-500',
    database: isDark ? 'text-rose-400' : 'text-rose-500',
    analytics: isDark ? 'text-lime-400' : 'text-lime-500'
  }[id];

  return <Icon className={`w-4 h-4 ${colors}`} />;
};