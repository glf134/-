import React, { useState, useRef } from 'react';
import { Project, ProjectStatus } from '../types';
import { Upload, FileText, CheckCircle2, ArrowLeft, Loader2, X, FilePlus } from 'lucide-react';
import { simulateProcess } from '../services/mockService';

interface ProjectDetailProps {
  project: Project;
  onAnalysisComplete: () => void;
  onViewAnalysis: () => void;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onAnalysisComplete, onViewAnalysis, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // File Upload States
  const [tenderFile, setTenderFile] = useState<File | null>(null);
  const [bidderFiles, setBidderFiles] = useState<File[]>([]);
  
  const tenderInputRef = useRef<HTMLInputElement>(null);
  const bidderInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { title: '解析招标文件内容', desc: '提取关键条款和废标项规则' },
    { title: '解析投标文件内容', desc: '分析投标文件结构和内容' },
    { title: '进行条款匹配', desc: '将投标文件内容与招标文件要求进行匹配' },
    { title: '废标项检查', desc: '检查投标文件是否满足所有硬性要求' },
    { title: 'AI分析修改建议', desc: '为发现的问题生成优化建议' },
    { title: '完成检查', desc: '废标项核查已完成，准备展示结果' },
  ];

  const handleTenderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTenderFile(e.target.files[0]);
    }
  };

  const handleBidderFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setBidderFiles(prev => [...prev, ...filesArray].slice(0, 3)); // Max 3 as per UI hint
    }
  };

  const removeBidderFile = (index: number) => {
    setBidderFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartAnalysis = async () => {
    if (!tenderFile || bidderFiles.length === 0) return;
    
    setIsProcessing(true);
    setProgress(0);
    setCompletedSteps([]);
    
    for (let i = 0; i < steps.length; i++) {
       await simulateProcess(800 + Math.random() * 500);
       setCompletedSteps(prev => [...prev, i]);
       setProgress(Math.round(((i + 1) / steps.length) * 100));
    }
    
    setIsProcessing(false);
    onAnalysisComplete();
  };

  if (isProcessing) {
    return (
      <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-md z-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-3xl p-12 relative overflow-hidden">
           <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <span className="w-1.5 h-6 bg-brand-600 rounded-full mr-3"></span>
                废标项检查中...
              </h2>
              <span className="text-4xl font-bold text-slate-800">{progress}%</span>
           </div>

           <div className="h-2 bg-slate-100 rounded-full mb-12 overflow-hidden">
              <div className="h-full bg-brand-600 transition-all duration-500 rounded-full" style={{ width: `${progress}%` }}></div>
           </div>

           <div className="grid grid-cols-2 gap-y-8 gap-x-12">
              {steps.map((step, idx) => {
                const isDone = completedSteps.includes(idx);
                const isCurrent = completedSteps.length === idx;
                return (
                  <div key={idx} className={`flex items-start space-x-4 transition-opacity ${!isDone && !isCurrent ? 'opacity-30' : 'opacity-100'}`}>
                    <div className={`mt-1 p-1 rounded-full ${isDone ? 'bg-green-100 text-green-600' : isCurrent ? 'bg-brand-50 text-brand-600' : 'bg-slate-100 text-slate-300'}`}>
                       {isDone ? <CheckCircle2 size={20} /> : <div className={`w-5 h-5 border-2 rounded-full border-current ${isCurrent ? 'border-t-transparent animate-spin' : ''}`}></div>}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isDone ? 'text-slate-900' : isCurrent ? 'text-brand-700' : 'text-slate-400'}`}>{step.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
           </div>
        </div>
      </div>
    );
  }

  const isReadyToAnalyze = tenderFile && bidderFiles.length > 0;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Workflow Stepper */}
      <div className="border-b border-slate-100 py-6 flex justify-center">
         <div className="flex items-center space-x-12">
            <div className="flex flex-col items-center">
               <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-lg mb-2 ring-4 ring-brand-100">1</div>
               <span className="text-sm font-bold text-brand-700">上传文件</span>
            </div>
            <div className="w-24 h-0.5 bg-slate-100 mt-[-24px]"></div>
            <div className="flex flex-col items-center opacity-40">
               <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-lg mb-2">2</div>
               <span className="text-sm font-bold text-slate-500">智能审查中</span>
            </div>
            <div className="w-24 h-0.5 bg-slate-100 mt-[-24px]"></div>
            <div className="flex flex-col items-center opacity-40">
               <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-lg mb-2">3</div>
               <span className="text-sm font-bold text-slate-500">查看结果</span>
            </div>
         </div>
      </div>

      <div className="flex-1 overflow-auto p-12">
         <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex items-center space-x-4">
              <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"><ArrowLeft size={24} /></button>
              <h1 className="text-3xl font-bold text-slate-900">中国安能集团 - 废标项检查</h1>
            </div>

            <div className="grid grid-cols-2 gap-12">
               <div className="space-y-3">
                  <label className="text-sm font-bold text-brand-900 flex items-center">
                    <span className="w-1 h-4 bg-brand-600 mr-2 rounded-full"></span>
                    项目名称 <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input type="text" placeholder="请输入项目名称" defaultValue={project.title} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-brand-500 outline-none text-slate-700 font-medium" />
               </div>
               <div className="space-y-3">
                  <label className="text-sm font-bold text-brand-900 flex items-center">
                    <span className="w-1 h-4 bg-brand-600 mr-2 rounded-full"></span>
                    审查人
                  </label>
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-700 font-medium flex justify-between items-center cursor-not-allowed">
                     <span>Admin</span>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               <label className="text-sm font-bold text-brand-900 flex items-center">
                 <span className="w-1 h-4 bg-brand-600 mr-2 rounded-full"></span>
                 上传文件
               </label>
               <div className="grid grid-cols-2 gap-8">
                  {/* Tender Upload */}
                  <div className="bg-slate-50 rounded-[24px] border border-slate-100 overflow-hidden shadow-sm flex flex-col">
                     <div className="bg-white/50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                        <div className="flex items-center space-x-2 text-brand-700 font-bold">
                           <FileText size={18} />
                           <span>招标文件</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">PDF/DOCX</span>
                     </div>
                     <div className="p-10 flex-1 flex flex-col">
                        <input 
                           type="file" 
                           ref={tenderInputRef} 
                           className="hidden" 
                           accept=".docx,.pdf"
                           onChange={handleTenderFileChange}
                        />
                        {tenderFile ? (
                           <div className="bg-white rounded-2xl p-6 border border-brand-200 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-bottom-2">
                              <div className="flex items-center space-x-3 truncate">
                                 <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                                    <FileText size={24} />
                                 </div>
                                 <div className="truncate">
                                    <p className="text-sm font-bold text-slate-900 truncate">{tenderFile.name}</p>
                                    <p className="text-[10px] text-slate-400 font-medium">{(tenderFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                 </div>
                              </div>
                              <button 
                                 onClick={() => setTenderFile(null)}
                                 className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                              >
                                 <X size={18} />
                              </button>
                           </div>
                        ) : (
                           <div 
                              onClick={() => tenderInputRef.current?.click()}
                              className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-brand-400 hover:bg-white transition-all cursor-pointer group h-full"
                           >
                              <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                 <Upload size={24} />
                              </div>
                              <p className="text-brand-700 font-bold mb-1">点击或拖拽到此处上传</p>
                              <p className="text-xs text-slate-400">支持 .docx 类型的文件，单个文件不超过 100MB</p>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Bidder Upload */}
                  <div className="bg-slate-50 rounded-[24px] border border-slate-100 overflow-hidden shadow-sm flex flex-col">
                     <div className="bg-white/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-brand-700 font-bold">
                           <Upload size={18} />
                           <span>投标文件</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">最多 3 个</span>
                     </div>
                     <div className="p-10 flex-1 flex flex-col">
                        <input 
                           type="file" 
                           ref={bidderInputRef} 
                           className="hidden" 
                           accept=".docx,.pdf"
                           multiple
                           onChange={handleBidderFilesChange}
                        />
                        {bidderFiles.length > 0 ? (
                           <div className="space-y-3 flex-1">
                              <div className="grid grid-cols-1 gap-2">
                                 {bidderFiles.map((file, idx) => (
                                    <div key={idx} className="bg-white rounded-xl p-3 border border-slate-100 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-right-2">
                                       <div className="flex items-center space-x-3 truncate">
                                          <div className="p-1.5 bg-brand-50 text-brand-600 rounded-md">
                                             <FileText size={16} />
                                          </div>
                                          <p className="text-xs font-bold text-slate-700 truncate">{file.name}</p>
                                       </div>
                                       <button 
                                          onClick={() => removeBidderFile(idx)}
                                          className="text-slate-300 hover:text-red-500"
                                       >
                                          <X size={14} />
                                       </button>
                                    </div>
                                 ))}
                              </div>
                              {bidderFiles.length < 3 && (
                                 <button 
                                    onClick={() => bidderInputRef.current?.click()}
                                    className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-brand-600 hover:border-brand-200 hover:bg-white flex items-center justify-center space-x-2 transition-all"
                                 >
                                    <FilePlus size={16} />
                                    <span className="text-xs font-bold">继续添加文件</span>
                                 </button>
                              )}
                           </div>
                        ) : (
                           <div 
                              onClick={() => bidderInputRef.current?.click()}
                              className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-brand-400 hover:bg-white transition-all cursor-pointer group h-full"
                           >
                              <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                 <Upload size={24} />
                              </div>
                              <p className="text-brand-700 font-bold mb-1">点击或拖拽到此处上传</p>
                              <p className="text-xs text-slate-400">支持 .docx 类型的文件，单个文件不超过 100MB，最多上传 3 个文件</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex justify-center pt-8 pb-12">
               <button 
                onClick={handleStartAnalysis}
                disabled={!isReadyToAnalyze}
                className={`px-16 py-4 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center space-x-3
                  ${isReadyToAnalyze 
                    ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-200 hover:scale-105' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
               >
                 <span>开始废标项检查</span>
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
