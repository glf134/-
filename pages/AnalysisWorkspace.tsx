import React, { useState } from 'react';
import { Project, Bidder, EvaluationPoint, AnalysisItem, ComplianceStatus } from '../types';
import { MOCK_EVAL_POINTS, MOCK_ANALYSIS, MOCK_BIDDERS } from '../services/mockService';
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  BarChart3,
  Search,
  Quote,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  Bot,
  Check,
  Fingerprint,
  Zap,
  Layers,
  FileSearch,
  Sparkles,
  User as UserIcon,
  Calendar,
  Clock,
  ArrowRightLeft,
  Building2,
  CreditCard,
  Phone,
  MapPin,
  Coins,
  Info
} from 'lucide-react';

interface AnalysisWorkspaceProps {
  project: Project;
  onBack: () => void;
}

type ViewMode = 'detail' | 'global';

export const AnalysisWorkspace: React.FC<AnalysisWorkspaceProps> = ({ project, onBack }) => {
  const [selectedPointId, setSelectedPointId] = useState<string>(MOCK_EVAL_POINTS[0].id);
  const [showReport, setShowReport] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('detail');

  const currentPoint = MOCK_EVAL_POINTS.find(p => p.id === selectedPointId) || MOCK_EVAL_POINTS[0];
  
  const getStatusBadge = (status: ComplianceStatus) => {
    switch (status) {
      case ComplianceStatus.COMPLIANT: 
        return (
          <div className="flex items-center space-x-1.5 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 shadow-sm animate-in fade-in zoom-in-95">
            <ShieldCheck size={14} className="stroke-[2.5px]" />
            <span className="text-xs font-black uppercase tracking-wider">审查合格</span>
          </div>
        );
      case ComplianceStatus.NON_COMPLIANT:
        return (
          <div className="flex items-center space-x-1.5 text-rose-600 bg-rose-50 px-3 py-1 rounded-lg border border-rose-100 shadow-sm animate-in fade-in zoom-in-95">
            <ShieldAlert size={14} className="stroke-[2.5px]" />
            <span className="text-xs font-black uppercase tracking-wider">审查不合格</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-1.5 text-amber-600 bg-amber-50 px-3 py-1 rounded-lg border border-amber-100 shadow-sm animate-in fade-in zoom-in-95">
            <AlertTriangle size={14} className="stroke-[2.5px]" />
            <span className="text-xs font-black uppercase tracking-wider">待复核风险</span>
          </div>
        );
    }
  };

  const GlobalSummaryHeader = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-2 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Similarity Analysis Widget */}
      <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col group hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-5">
           <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                 <Fingerprint size={20} />
              </div>
              <div>
                 <h4 className="text-sm font-black text-slate-900 tracking-tight">相似度分析</h4>
                 <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5">Similarity Comparison</p>
              </div>
           </div>
           <div className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border border-rose-100 flex items-center">
              <AlertTriangle size={10} className="mr-1" /> 串标风险预警
           </div>
        </div>
        <div className="flex flex-col space-y-4">
           <div className="space-y-2.5">
              <div className="flex justify-between items-center mb-1">
                 <div className="flex items-center text-[10px] font-black text-slate-600 truncate max-w-[200px]">
                    <span className="truncate">{MOCK_BIDDERS[1].name.substring(0,6)}</span>
                    <ArrowRightLeft size={10} className="mx-2 text-slate-300" />
                    <span className="truncate">{MOCK_BIDDERS[2].name.substring(0,6)}</span>
                 </div>
                 <span className="text-lg font-black text-rose-600">84%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-rose-500 w-[84%] rounded-full shadow-[0_0_8px_rgba(244,63,94,0.3)]"></div>
              </div>
           </div>
           <div className="space-y-2.5">
              <div className="flex justify-between items-center mb-1">
                 <div className="flex items-center text-[10px] font-black text-slate-600 truncate max-w-[200px]">
                    <span className="truncate">{MOCK_BIDDERS[0].name.substring(0,6)}</span>
                    <ArrowRightLeft size={10} className="mx-2 text-slate-300" />
                    <span className="truncate">{MOCK_BIDDERS[1].name.substring(0,6)}</span>
                 </div>
                 <span className="text-lg font-black text-emerald-500">32%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-[32%] rounded-full"></div>
              </div>
           </div>
        </div>
      </div>

      {/* Bidder Document Attribute Analysis Widget */}
      <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm group hover:shadow-md transition-all overflow-hidden">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl">
                 <Zap size={20} />
              </div>
              <div>
                 <h4 className="text-sm font-black text-slate-900 tracking-tight">标书属性分析</h4>
                 <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5">Metadata Insights</p>
              </div>
           </div>
           <div className="flex items-center text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">
              数据一致性核查已通过
           </div>
        </div>
        
        {/* Table Header */}
        <div className="flex items-center px-2.5 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
           <div className="w-[160px] shrink-0">投标人名称</div>
           <div className="flex-1 flex justify-around">
              <div className="min-w-[80px] text-center">创建人</div>
              <div className="min-w-[100px] text-center">修改时间</div>
              <div className="min-w-[80px] text-center">修改人</div>
           </div>
           <div className="w-[60px] text-right shrink-0">版本</div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {MOCK_BIDDERS.slice(0, 3).map((b, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-50/40 hover:bg-slate-50 p-2.5 rounded-xl border border-slate-100 transition-colors group/item">
               <div className="flex items-center space-x-3 w-[160px] shrink-0">
                  <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-brand-600 shadow-sm group-hover/item:border-brand-200">
                    {i + 1}
                  </div>
                  <span className="text-[11px] font-black text-slate-700 truncate">{b.name}</span>
               </div>
               
               <div className="flex-1 flex items-center justify-around text-[10px] text-slate-500">
                  <div className="flex items-center space-x-1.5 min-w-[80px] justify-center">
                     <span className="text-slate-800 font-bold">系统同步</span>
                  </div>
                  <div className="flex items-center space-x-1.5 min-w-[100px] justify-center">
                     <span className="text-slate-800 font-bold">2024-11-{18 + i}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 min-w-[80px] justify-center">
                     <span className="text-slate-800 font-bold">Admin</span>
                  </div>
               </div>

               <div className="w-[60px] flex justify-end shrink-0">
                  <span className="text-[9px] font-black px-2 py-0.5 bg-white border border-slate-200 text-slate-500 rounded-md">REV:0{i+1}</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SimilarityMatrix = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
           <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg">
              <Fingerprint size={24} />
           </div>
           <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">相似度分析</h3>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-0.5">Collusion Risk & Content Overlap Detection</p>
           </div>
        </div>
        <div className="flex items-center space-x-3 bg-rose-50 border border-rose-100 px-4 py-2 rounded-xl text-rose-600">
           <AlertTriangle size={18} />
           <span className="text-sm font-black">发现 1 处高相似风险点</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { p1: MOCK_BIDDERS[0].name, p2: MOCK_BIDDERS[1].name, score: 32, status: 'safe' },
          { p1: MOCK_BIDDERS[0].name, p2: MOCK_BIDDERS[2].name, score: 15, status: 'safe' },
          { p1: MOCK_BIDDERS[1].name, p2: MOCK_BIDDERS[2].name, score: 84, status: 'danger' },
        ].map((pair, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
             {pair.status === 'danger' && (
               <div className="absolute top-0 right-0 px-4 py-1.5 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl shadow-md">
                 High Risk
               </div>
             )}
             <div className="flex justify-between items-end mb-6">
                <div className="space-y-4">
                   <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">A</div>
                      <span className="text-sm font-black text-slate-700">{pair.p1}</span>
                   </div>
                   <div className="h-4 w-px bg-slate-100 ml-4"></div>
                   <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">B</div>
                      <span className="text-sm font-black text-slate-700">{pair.p2}</span>
                   </div>
                </div>
                <div className="text-right">
                   <p className={`text-4xl font-black ${pair.status === 'danger' ? 'text-rose-600' : 'text-emerald-500'}`}>{pair.score}%</p>
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Similarity Score</p>
                </div>
             </div>
             <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${pair.status === 'danger' ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]' : 'bg-emerald-500'}`} 
                  style={{ width: `${pair.score}%` }}
                ></div>
             </div>
             <p className="mt-4 text-[11px] text-slate-400 font-bold leading-relaxed italic">
                {pair.status === 'danger' 
                  ? '检测到该两份标书在技术路线描述和语法结构上存在 80% 以上重合，建议复核是否存在围标风险。' 
                  : '两份标书内容差异性正常，未发现内容抄袭或串标嫌疑。'}
             </p>
          </div>
        ))}
      </div>
    </div>
  );

  const BidderInfoComparison = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
      <div className="flex items-center space-x-4">
         <div className="p-3 bg-brand-600 text-white rounded-2xl shadow-lg">
            <Building2 size={24} />
         </div>
         <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">投标方基本信息对比</h3>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-0.5">Bidder Basic Information Comparison</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {MOCK_BIDDERS.map((bidder, idx) => (
          <div key={bidder.id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all">
            <div className="bg-slate-50 p-6 border-b border-slate-100">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center text-xs font-black shadow-md">
                  {idx + 1}
                </div>
                <h4 className="text-base font-black text-slate-900 truncate">{bidder.name}</h4>
              </div>
              <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <Info size={10} className="mr-1" /> 基础信息核验已完成
              </div>
            </div>
            
            <div className="p-6 space-y-4 flex-1">
              <div className="space-y-1">
                <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  <CreditCard size={12} className="mr-1.5" /> 税号
                </div>
                <p className="text-sm font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">{bidder.taxId || '未提取'}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  <MapPin size={12} className="mr-1.5" /> 地址
                </div>
                <p className="text-sm font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 leading-relaxed">{bidder.address || '未提取'}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  <Phone size={12} className="mr-1.5" /> 电话
                </div>
                <p className="text-sm font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">{bidder.phone || '未提取'}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  <Building2 size={12} className="mr-1.5" /> 开户银行账号
                </div>
                <p className="text-sm font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 leading-relaxed">{bidder.bankAccount || '未提取'}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  <Fingerprint size={12} className="mr-1.5" /> 行号
                </div>
                <p className="text-sm font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">{bidder.bankCode || '未提取'}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Coins size={14} className="mr-1.5 text-amber-500" /> 投标金额
                  </div>
                  <span className="text-xl font-black text-brand-600">{bidder.bidAmount || '0w'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AttributeAnalysis = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
      <div className="flex items-center space-x-4">
         <div className="p-3 bg-brand-600 text-white rounded-2xl shadow-lg">
            <Zap size={24} />
         </div>
         <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">标书属性分析</h3>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-0.5">Bidder Document Attribute Analysis</p>
         </div>
      </div>

      <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em] border-b border-slate-100">
              <th className="px-6 py-6 text-left">投标人名称</th>
              <th className="px-6 py-6 text-center">创建人</th>
              <th className="px-6 py-6 text-center">创建日期</th>
              <th className="px-6 py-6 text-center">修改人</th>
              <th className="px-6 py-6 text-center">修改时间</th>
              <th className="px-6 py-6 text-center">综合风险评定</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MOCK_BIDDERS.map((bidder, idx) => (
              <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-8">
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-black text-sm">
                         {bidder.name.charAt(0)}
                      </div>
                      <span className="text-base font-black text-slate-900 group-hover:text-brand-600 transition-colors">{bidder.name}</span>
                   </div>
                </td>
                <td className="px-6 py-8 text-center text-sm font-medium text-slate-600 italic">系统采集</td>
                <td className="px-6 py-8 text-center text-sm font-medium text-slate-600">2024-11-{15 + idx}</td>
                <td className="px-6 py-8 text-center text-sm font-medium text-slate-600 font-bold">Admin</td>
                <td className="px-6 py-8 text-center text-sm font-medium text-slate-600">2024-11-{18 + idx} 14:30</td>
                <td className="px-6 py-8">
                  <div className="flex justify-center">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${
                      idx === 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      idx === 1 ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {idx === 0 ? '极低风险' : idx === 1 ? '中等风险' : '废标风险'}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      {/* Refined Header */}
      <div className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-200 shadow-sm z-20">
         <div className="flex items-center space-x-6">
            <button 
              onClick={onBack} 
              className="flex items-center space-x-2 text-slate-500 hover:text-brand-600 bg-slate-50 hover:bg-brand-50 px-4 py-2.5 rounded-xl border border-slate-200 transition-all group font-bold text-sm"
            >
               <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
               <span>返回</span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            
            {/* View Mode Toggle */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center">
               <button 
                onClick={() => setViewMode('detail')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center space-x-2 ${
                  viewMode === 'detail' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
               >
                  <Layers size={14} />
                  <span>分项审查</span>
               </button>
               <button 
                onClick={() => setViewMode('global')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center space-x-2 ${
                  viewMode === 'global' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
               >
                  <BarChart3 size={14} />
                  <span>全局相似分析</span>
               </button>
            </div>
         </div>

         <div className="flex items-center space-x-4">
           <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100">
              <Sparkles size={12} />
              <span>AI 引擎已核查 100% 关键条款</span>
           </div>
           <button 
            onClick={() => setShowReport(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-brand-100 flex items-center space-x-2 transition-all transform active:scale-95"
           >
             <Download size={18} />
             <span>导出评估报告</span>
           </button>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
         {viewMode === 'detail' ? (
           <>
             {/* Sidebar: Clause Selector */}
             <aside className="w-80 bg-white border-r border-slate-200 flex flex-col z-10">
                <div className="p-6 border-b border-slate-50 bg-slate-50/20">
                   <div className="flex items-center justify-between mb-2">
                      <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-widest">审查指标目录</h3>
                      <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded shadow-sm">
                        3 风险
                      </span>
                   </div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">共提取 {MOCK_EVAL_POINTS.length} 项关键合规要求</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                   {MOCK_EVAL_POINTS.map(point => {
                     const isSelected = selectedPointId === point.id;
                     const hasRisk = point.id === 'ep1' || point.id === 'ep4';
                     return (
                       <button 
                        key={point.id}
                        onClick={() => setSelectedPointId(point.id)}
                        className={`w-full text-left p-4 rounded-2xl transition-all border relative group ${
                          isSelected 
                          ? 'bg-brand-600 border-brand-700 shadow-xl shadow-brand-100' 
                          : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                        }`}
                       >
                          <div className={`text-[9px] font-black mb-1.5 tracking-wider uppercase ${isSelected ? 'text-brand-100/80' : 'text-slate-400'}`}>
                            {point.category}
                          </div>
                          <div className={`text-xs font-bold leading-relaxed line-clamp-2 ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                            {point.requirement}
                          </div>
                          
                          <div className="absolute top-4 right-4">
                             {isSelected ? (
                               <ChevronRight size={14} className="text-white/60" />
                             ) : hasRisk ? (
                               <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                             ) : (
                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                             )}
                          </div>
                       </button>
                     );
                   })}
                </div>
             </aside>

             {/* Main Content Area */}
             <main className="flex-1 overflow-hidden bg-slate-50/30 flex flex-col">
                <div className="p-8 max-w-[1400px] w-full mx-auto space-y-6 overflow-y-auto h-full scroll-smooth">
                   
                   <GlobalSummaryHeader />

                   {/* Baseline Requirement Section */}
                   <section className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
                      <div className="absolute right-0 top-0 w-32 h-32 bg-brand-50 rounded-full opacity-20 -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-1000"></div>
                      <div className="relative z-10 flex items-start space-x-6">
                        <div className="p-3.5 bg-brand-600 text-white rounded-2xl shadow-xl shadow-brand-100 shrink-0">
                           <FileSearch size={24} className="stroke-[2.5px]" />
                        </div>
                        <div className="space-y-4 flex-1">
                           <div className="flex items-center justify-between">
                              <h4 className="text-[11px] font-black text-brand-900 uppercase tracking-[0.2em]">招标文件基准合规要求</h4>
                              <div className="flex items-center text-[10px] text-slate-400 font-black uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-md">
                                {project.tenderDocName} • 第 {currentPoint.pageRef} 页
                              </div>
                           </div>
                           <p className="text-xl md:text-2xl font-black text-slate-800 leading-snug tracking-tight">
                              {currentPoint.requirement}
                           </p>
                        </div>
                      </div>
                   </section>

                   {/* Bidder Comparison Grid */}
                   <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8 items-stretch">
                      {MOCK_BIDDERS.map(bidder => {
                        const analysis = MOCK_ANALYSIS.find(a => a.bidderId === bidder.id && a.pointId === selectedPointId);
                        const isPass = analysis?.status === ComplianceStatus.COMPLIANT;
                        const isFail = analysis?.status === ComplianceStatus.NON_COMPLIANT;

                        return (
                          <div key={bidder.id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 group/card">
                             <div className={`px-6 py-5 border-b flex justify-between items-center ${
                               isPass ? 'bg-emerald-50/20 border-emerald-50' : isFail ? 'bg-rose-50/20 border-rose-50' : 'bg-slate-50/50 border-slate-100'
                             }`}>
                                <div>
                                   <h4 className="font-black text-slate-900 text-base tracking-tight truncate max-w-[140px] group-hover/card:text-brand-600 transition-colors">{bidder.name}</h4>
                                   <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5 tracking-widest">投标人: {bidder.id}</p>
                                </div>
                                {analysis && getStatusBadge(analysis.status)}
                             </div>
                             
                             <div className="p-6 space-y-5 flex-1 flex flex-col">
                                {isPass ? (
                                  <div className="flex-1 flex flex-col items-center justify-center py-10 space-y-5 bg-emerald-50/10 rounded-[2rem] border border-dashed border-emerald-100 transition-all animate-in zoom-in-95">
                                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-100 ring-4 ring-emerald-50">
                                       <Check size={36} className="stroke-[4px]" />
                                    </div>
                                    <div className="text-center">
                                       <h5 className="text-lg font-black text-emerald-900 tracking-tight">内容通过核查</h5>
                                       <p className="text-[10px] text-emerald-600 font-bold mt-1 uppercase tracking-widest leading-none">AI 判定完全符合招标文件要求</p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex-1 space-y-4">
                                    <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100/50 transition-all animate-in slide-in-from-top-2">
                                      <div className="flex items-center space-x-1.5 text-rose-600 font-black text-[10px] uppercase tracking-widest mb-2.5">
                                        <AlertTriangle size={14} />
                                        <span>异常说明</span>
                                      </div>
                                      <p className="text-sm text-rose-900 font-bold leading-relaxed">
                                        {analysis?.aiReasoning || "内容未响应或存在关键性缺失，详情请核查原文。"}
                                      </p>
                                    </div>

                                    <div className="bg-indigo-50/40 p-5 rounded-2xl border border-indigo-100/50 transition-all animate-in slide-in-from-top-3">
                                       <div className="flex items-center space-x-1.5 text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-2.5">
                                          <Bot size={14} />
                                          <span>AI 处置建议</span>
                                       </div>
                                       <p className="text-sm text-indigo-900 font-bold leading-relaxed">
                                          {isFail 
                                          ? "该项属于废标项，建议专家核实标书中是否提供有效补充文件，或直接判定为不合格。" 
                                          : "建议人工核查投标文件中具体的技术参数响应表，确认其详细度。"}
                                       </p>
                                    </div>
                                  </div>
                                )}
                             </div>
                          </div>
                        );
                      })}
                   </section>
                </div>
             </main>
           </>
         ) : (
           /* Global View Mode */
           <main className="flex-1 overflow-y-auto bg-white p-10">
              <div className="max-w-[1200px] mx-auto space-y-16 py-8">
                 <SimilarityMatrix />
                 <BidderInfoComparison />
                 <AttributeAnalysis />
                 
                 <div className="bg-[#0f172a] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                       <ShieldCheck size={240} />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-10">
                       <div className="p-5 bg-emerald-500 text-white rounded-3xl shadow-xl shadow-emerald-500/20">
                          <CheckCircle2 size={40} />
                       </div>
                       <div className="flex-1 space-y-4">
                          <h4 className="text-2xl font-black tracking-tight">AI 智能评标综合结论</h4>
                          <p className="text-slate-400 text-base font-medium leading-relaxed max-w-2xl">
                             综合 5 项核心指标扫描，<span className="text-emerald-400 font-black italic">"{MOCK_BIDDERS[0].name}"</span> 响应完整度极高且未发现串标风险。<br/>
                             <span className="text-rose-400 font-bold italic">特别提示：</span> {MOCK_BIDDERS[1].name} 与 {MOCK_BIDDERS[2].name} 在技术描述章节存在显著雷同，建议提请监督办深度核查。
                          </p>
                          <div className="flex items-center space-x-4 pt-2">
                             <div className="bg-slate-800 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-700">推荐中标人: 1家</div>
                             <div className="bg-rose-500/10 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-rose-500/20 text-rose-400">预警提示: 2处</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </main>
         )}
      </div>

      {/* Report Modal */}
      {showReport && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col transform animate-in zoom-in-95 duration-400">
              <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center">
                 <div className="flex items-center space-x-4">
                    <div className="p-3 bg-brand-600 text-white rounded-2xl shadow-lg">
                       <BarChart3 size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-900 tracking-tight">智能评标评估快报</h3>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Automated Risk Assessment Report</p>
                    </div>
                 </div>
                 <button onClick={() => setShowReport(false)} className="p-2 text-slate-300 hover:text-slate-900 transition-all">
                    <XCircle size={28} />
                 </button>
              </div>
              
              <div className="flex-1 p-10 overflow-y-auto space-y-12">
                 <div className="text-center space-y-4">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">合规性审查决策核心看板</h1>
                    <p className="text-sm text-slate-400 font-bold">{project.title}</p>
                 </div>
                 
                 <div className="grid grid-cols-3 gap-6">
                    {[
                      { label: '核心条款', value: '5', suffix: '项', icon: FileText, color: 'text-brand-600', bg: 'bg-brand-50' },
                      { label: '风险预警', value: '3', suffix: '处', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
                      { label: '合格入围', value: '1', suffix: '家', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    ].map((s, i) => (
                      <div key={i} className={`${s.bg} p-6 rounded-3xl border border-slate-100 text-center flex flex-col items-center group`}>
                        <s.icon size={24} className={`${s.color} mb-3`} />
                        <div className="flex items-baseline space-x-1">
                           <p className="text-2xl font-black text-slate-900">{s.value}</p>
                           <p className="text-[10px] font-black text-slate-400">{s.suffix}</p>
                        </div>
                        <p className="text-[9px] text-slate-500 font-black uppercase mt-2 tracking-widest">{s.label}</p>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex justify-end items-center space-x-4">
                 <button onClick={() => setShowReport(false)} className="text-slate-400 font-black text-[11px] uppercase tracking-widest hover:text-slate-900 px-4 py-2">取消</button>
                 <button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-brand-100 transform active:scale-95 transition-all">确认导出最终版报告</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
