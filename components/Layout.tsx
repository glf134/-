import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Bell,
  Moon,
  User as UserIcon,
  Building2
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onNavigate: (view: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate }) => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Mini Sidebar */}
      <aside className="w-16 bg-brand-900 flex flex-col items-center py-6 space-y-8 z-30">
        <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">AN</div>
        <div className="flex-1 flex flex-col space-y-6">
          <button onClick={() => onNavigate('dashboard')} className={`p-2 rounded-lg transition-colors ${activeView === 'dashboard' ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white'}`}>
            <LayoutDashboard size={24} />
          </button>
          <button onClick={() => onNavigate('projects')} className={`p-2 rounded-lg transition-colors ${activeView === 'projects' ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white'}`}>
            <FileText size={24} />
          </button>
        </div>
        <div className="flex flex-col space-y-6 pb-4">
          <button className="text-slate-400 hover:text-white"><Settings size={22} /></button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-20">
          <div className="flex items-center space-x-3">
             <div className="p-1.5 bg-brand-600 text-white rounded-lg">
                <Building2 size={20} />
             </div>
             <div className="text-brand-700 font-bold text-lg">中国安能集团</div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-slate-500">
               <button className="p-1 hover:bg-slate-50 rounded-full"><Moon size={20} /></button>
               <button className="p-1 hover:bg-slate-50 rounded-full relative">
                 <Bell size={20} />
                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
               </button>
               <button className="p-1 hover:bg-slate-50 rounded-full"><Settings size={20} /></button>
            </div>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-100">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800 leading-none">Admin</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase">天津分公司</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-50 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="Admin" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
};