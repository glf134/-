
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ProjectDetail } from './pages/ProjectDetail';
import { AnalysisWorkspace } from './pages/AnalysisWorkspace';
import { UserManagement } from './pages/UserManagement';
import { MOCK_PROJECTS } from './services/mockService';
import { ProjectStatus, Project } from './types';

type ViewState = 'dashboard' | 'create' | 'projects' | 'users' | 'project_detail' | 'analysis_view';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  const handleOpenProject = (id: string) => {
    setCurrentProjectId(id);
    setActiveView('project_detail');
  };

  const handleCreateProject = () => {
    const newProject: Project = {
        id: `new_${Date.now()}`,
        title: '测试项目',
        code: `ZB-2024-${Math.floor(Math.random() * 100)}`,
        createDate: new Date().toISOString().split('T')[0].replace(/-/g, '-'),
        status: ProjectStatus.PROCESSING,
        bidderCount: 3,
        ruleCount: 0,
        tenderDocName: '' // Added missing required property
    };
    setProjects([newProject, ...projects]);
    setCurrentProjectId(newProject.id);
    setActiveView('project_detail');
  };

  const handleAnalysisComplete = () => {
     if (currentProjectId) {
         setProjects(prev => prev.map(p => 
            p.id === currentProjectId ? { ...p, status: ProjectStatus.COMPLETED, ruleCount: 34 } : p
         ));
         setActiveView('analysis_view');
     }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
      case 'projects':
        return <Dashboard projects={projects} onOpenProject={handleOpenProject} onCreateNew={handleCreateProject} />;
      case 'project_detail':
        const proj = projects.find(p => p.id === currentProjectId);
        if (!proj) return null;
        return (
            <ProjectDetail 
                project={proj} 
                onAnalysisComplete={handleAnalysisComplete}
                onViewAnalysis={() => setActiveView('analysis_view')}
                onBack={() => setActiveView('dashboard')}
            />
        );
      case 'analysis_view':
        const analysisProj = projects.find(p => p.id === currentProjectId);
        if (!analysisProj) return null;
        return (
            <AnalysisWorkspace 
                project={analysisProj}
                onBack={() => setActiveView('dashboard')}
            />
        );
      // Added case for users view
      case 'users':
        return <UserManagement />;
      default:
        return <div className="p-20 text-center text-slate-400">模块开发中...</div>;
    }
  };

  return (
    <Layout activeView={activeView === 'project_detail' || activeView === 'analysis_view' ? 'projects' : activeView} onNavigate={(v) => setActiveView(v as ViewState)}>
      {renderContent()}
    </Layout>
  );
};

export default App;
