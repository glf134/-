
export enum UserRole {
  ADMIN = '管理员',
  MANAGER = '项目经理',
  REVIEWER = '评审员'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  org: string;
  email: string;
  avatar: string;
}

export enum ProjectStatus {
  PROCESSING = '进行中',
  COMPLETED = '已完成',
  READY_FOR_REVIEW = '待评审',
  DRAFT = '草稿'
}

export interface Project {
  id: string;
  title: string;
  code: string;
  createDate: string;
  status: ProjectStatus;
  bidderCount: number;
  ruleCount: number;
  tenderDocName: string;
}

export interface EvaluationPoint {
  id: string;
  category: string;
  requirement: string;
  riskCount?: number;
  pageRef: number;
}

export enum ComplianceStatus {
  COMPLIANT = '合规',
  NON_COMPLIANT = '不合格',
  HIGH_RISK = '高风险',
  UNCERTAIN = '待确认',
  MISSING = '缺失'
}

export interface AnalysisItem {
  pointId: string;
  bidderId: string;
  status: ComplianceStatus;
  extractedText: string;
  aiReasoning: string;
  sourceText?: string;
  pageInfo?: string;
  pageRef: number;
  confidence: number;
}

export interface Bidder {
  id: string;
  name: string;
  docName: string;
  uploadDate: string;
  overallScore: number;
  taxId?: string;
  address?: string;
  phone?: string;
  bankAccount?: string;
  bankCode?: string;
  bidAmount?: string;
}
