
import { Project, ProjectStatus, User, UserRole, Bidder, EvaluationPoint, AnalysisItem, ComplianceStatus } from '../types';

// Mock Users
// Added missing 'org', 'email', and 'avatar' as per updated User interface.
export const MOCK_USERS: User[] = [
  { id: '1', name: '张伟', email: 'zhangwei@company.com', role: UserRole.ADMIN, avatar: 'https://picsum.photos/seed/alex/100/100', org: '天津分公司' },
  { id: '2', name: '李娜', email: 'lina@company.com', role: UserRole.MANAGER, avatar: 'https://picsum.photos/seed/sarah/100/100', org: '北京总部' },
  { id: '3', name: '王强', email: 'wangqiang@company.com', role: UserRole.REVIEWER, avatar: 'https://picsum.photos/seed/mike/100/100', org: '上海分公司' },
];

// Mock Projects
// Added missing 'tenderDocName', 'ruleCount', and supported enum statuses.
export const MOCK_PROJECTS: Project[] = [
  { id: '101', title: '2024年第四季度高性能服务器采购项目', code: 'ZB-2024-001', createDate: '2024-11-15', status: ProjectStatus.READY_FOR_REVIEW, tenderDocName: '招标文件_技术规范_v1.pdf', bidderCount: 3, ruleCount: 5 },
  { id: '102', title: '办公园区二期装修工程', code: 'ZB-2024-005', createDate: '2024-11-20', status: ProjectStatus.PROCESSING, tenderDocName: '施工要求说明书.pdf', bidderCount: 2, ruleCount: 0 },
  { id: '103', title: '企业CRM系统授权续费', code: 'ZB-2024-012', createDate: '2024-12-01', status: ProjectStatus.DRAFT, tenderDocName: '', bidderCount: 0, ruleCount: 0 },
];

// Mock Bidders for Project 101
// Added missing 'docName', 'uploadDate', and 'overallScore'.
export const MOCK_BIDDERS: Bidder[] = [
  { 
    id: 'b1', 
    name: '北京天丰建筑工程有限公司A', 
    docName: '投标文件_天丰A.pdf', 
    uploadDate: '2024-11-18', 
    overallScore: 92,
    taxId: '91110114MA0092DL65',
    address: '北京市昌平区东小口镇天通西苑一区 22号楼-1至3层 108',
    phone: '010-53689393',
    bankAccount: '中国农业银行股份有限公司北京天通东苑支行账号: 11021901040008306',
    bankCode: '103100002193',
    bidAmount: '100w'
  },
  { 
    id: 'b2', 
    name: '北京天丰建筑工程有限公司B', 
    docName: '投标文件_天丰B.pdf', 
    uploadDate: '2024-11-19', 
    overallScore: 78,
    taxId: '91110114MA0092DL65',
    address: '北京市昌平区东小口镇天通西苑一区 22号楼-1至3层 108',
    phone: '010-53689393',
    bankAccount: '中国农业银行股份有限公司北京天通东苑支行账号: 11021901040008306',
    bankCode: '103100002193',
    bidAmount: '110w'
  },
  { 
    id: 'b3', 
    name: '北京天丰建筑工程有限公司C', 
    docName: '标书_天丰C.pdf', 
    uploadDate: '2024-11-18', 
    overallScore: 65,
    taxId: '91110114MA0092DL65',
    address: '北京市昌平区东小口镇天通西苑一区 22号楼-1至3层 108',
    phone: '010-53689393',
    bankAccount: '中国农业银行股份有限公司北京天通东苑支行账号: 11021901040008306',
    bankCode: '103100002193',
    bidAmount: '120w'
  },
];

// Mock Evaluation Points (Extracted from Tender)
// Added missing 'pageRef'.
export const MOCK_EVAL_POINTS: EvaluationPoint[] = [
  { id: 'ep1', category: '资质', requirement: '投标人必须持有有效的 ISO 27001 信息安全管理体系认证。', pageRef: 4 },
  { id: 'ep2', category: '技术', requirement: '服务器须配置双路 Intel Xeon Gold 6xxx 系列或同等性能处理器。', pageRef: 12 },
  { id: 'ep3', category: '技术', requirement: '单节点内存配置不低于 512GB DDR4 ECC RAM。', pageRef: 12 },
  { id: 'ep4', category: '商务', requirement: '质保期要求：提供至少 5 年原厂现场服务（NBD）。', pageRef: 25 },
  { id: 'ep5', category: '商务', requirement: '交货期：必须在合同签订后 45 个自然日内完成供货及安装。', pageRef: 26 },
];

// Mock Analysis Results
// Added missing 'pageRef', 'aiReasoning', 'confidence', and supported enum statuses.
export const MOCK_ANALYSIS: AnalysisItem[] = [
  // TechGiant (Good)
  { pointId: 'ep1', bidderId: 'b1', status: ComplianceStatus.COMPLIANT, extractedText: '...我司严格遵守安全标准，并持有有效的 ISO 27001:2013 认证证书（证书编号：12345），有效期至2026年...', pageRef: 8, aiReasoning: '明确提及持有有效的 ISO 27001 认证，且在有效期内。', confidence: 98 },
  { pointId: 'ep2', bidderId: 'b1', status: ComplianceStatus.COMPLIANT, extractedText: '推荐机型：PowerServer X9，搭载 2颗 Intel Xeon Gold 6430 处理器。', pageRef: 15, aiReasoning: '处理器型号符合招标文件的代次和系列要求。', confidence: 95 },
  { pointId: 'ep4', bidderId: 'b1', status: ComplianceStatus.COMPLIANT, extractedText: '标准保修期为3年，但本项目已包含"白金服务包"，升级至 5年现场下一工作日(NBD)服务。', pageRef: 40, aiReasoning: '通过包含升级服务包，满足了5年现场服务的要求。', confidence: 90 },
  
  // InnoServe (Mixed)
  { pointId: 'ep1', bidderId: 'b2', status: ComplianceStatus.COMPLIANT, extractedText: '具备 ISO 9001 及 ISO 27001 认证体系。', pageRef: 3, aiReasoning: '已确认具备相关认证。', confidence: 99 },
  { pointId: 'ep2', bidderId: 'b2', status: ComplianceStatus.UNCERTAIN, extractedText: '处理器方案：AMD EPYC 7763 高性能处理器。', pageRef: 10, aiReasoning: '投标人提议使用 AMD 方案。建议专家复核其性能是否等同于 Xeon Gold 系列。', confidence: 60 },
  { pointId: 'ep4', bidderId: 'b2', status: ComplianceStatus.NON_COMPLIANT, extractedText: '售后服务：3年标准送修服务。', pageRef: 33, aiReasoning: '承诺的3年质保少于要求的5年，且"送修"不符合"现场服务"要求。', confidence: 95 },

  // Legacy (Bad)
  { pointId: 'ep1', bidderId: 'b3', status: ComplianceStatus.MISSING, extractedText: '无相关描述', pageRef: 0, aiReasoning: '在资质证明章节未找到 ISO 27001 相关描述。', confidence: 85 },
];

export const simulateProcess = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
