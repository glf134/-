import React from 'react';
import { Project, ProjectStatus } from '../types';
import { Plus, Users, BarChart3, Clock, CheckCircle2, MoreVertical, Trash2, Eye, Download } from 'lucide-react';

interface DashboardProps {
  projects: Project[];
  onOpenProject: (id: string) => void;
  onCreateNew: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ projects, onOpenProject, onCreateNew }) => {
  const stats = [
    { label: '进行中', value: '1', icon: Clock, color: 'text-brand-500', bg: 'bg-brand-50' },
    { label: '已完成', value: '3', icon: CheckCircle2, color: 'text-success', bg: 'bg-green-50' },
    { label: '审查供应商数量', value: '18', icon: Users, color: 'text-brand-900', bg: 'bg-indigo-50' },
    { label: '平均合规率', value: '92%', icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  return (
    <div className="p-10 max-w-[1600px] mx-auto space-y-10 overflow-auto h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI智能标书审查</h1>
          <p className="text-slate-400 mt-1">基于AI大模型的自动标书审查，精准识别不合规项，降低人为疏漏，提升审查效率</p>
        </div>
        <button 
          onClick={onCreateNew}
          className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-brand-200 font-bold transition-all flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>新建审查</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center space-x-5 relative overflow-hidden group">
            <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-50/50 rounded-full opacity-50"></div>
          </div>
        ))}
      </div>

      {/* Recent Projects Grid */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-slate-800 font-bold">
           <FileText className="text-brand-600" size={20} />
           <span>近期项目</span>
        </div>
        
        <div className="grid grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                 <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                    project.status === ProjectStatus.COMPLETED 
                    ? 'bg-green-50 text-green-600 border-green-100' 
                    : 'bg-indigo-50 text-brand-600 border-indigo-100'
                 }`}>
                   <span className="mr-1.5 opacity-60">●</span>
                   {project.status}
                 </span>
                 <button className="text-slate-300 hover:text-red-500 transition-colors p-1"><Trash2 size={18}/></button>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight group-hover:text-brand-600 transition-colors">{project.title}</h3>
              
              <div className="space-y-2 mt-auto">
                 <div className="flex items-center text-xs text-slate-400 font-medium">
                    <Users size={14} className="mr-2" />
                    <span>{project.bidderCount} 家供应商参与</span>
                 </div>
                 {project.ruleCount > 0 && (
                   <div className="flex items-center text-xs text-brand-500 font-medium">
                      <CheckCircle2 size={14} className="mr-2" />
                      <span>{project.ruleCount} 条审查规则</span>
                   </div>
                 )}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center text-slate-400 text-xs">
                   <Clock size={14} className="mr-1.5" />
                   <span>{project.createDate}</span>
                </div>
                <div className="flex items-center space-x-4">
                   {project.status === ProjectStatus.COMPLETED && (
                     <button className="text-slate-400 hover:text-brand-600 transition-colors"><Download size={18}/></button>
                   )}
                   <button 
                    onClick={() => onOpenProject(project.id)}
                    className="flex items-center space-x-1.5 text-slate-700 hover:text-brand-600 font-bold text-sm transition-colors"
                   >
                     <Eye size={18} />
                     <span>查看</span>
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
import { FileText } from 'lucide-react';