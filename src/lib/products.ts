export type Product = {
  id: string;
  title: string;
  desc: string;
  price: number;
  tag?: string;
  cat: string;
  longDesc?: string;
  features?: string[];
  duration?: string;
  deliverables?: string[];
};

export const categories = [
  { slug: "all", name: "全部" },
  { slug: "pentest", name: "渗透测试" },
  { slug: "training", name: "安全培训" },
  { slug: "audit", name: "代码审计" },
  { slug: "ir", name: "应急响应" },
  { slug: "compliance", name: "合规咨询" },
];

export const catNameToSlug: Record<string, string> = {
  渗透测试: "pentest",
  安全培训: "training",
  代码审计: "audit",
  应急响应: "ir",
  合规咨询: "compliance",
};

export const products: Product[] = [
  {
    id: "web-pentest",
    title: "Web 应用渗透测试服务",
    desc: "基于 OWASP Top 10 与业务逻辑场景的系统化测试，输出可复现 PoC 报告。",
    price: 4980,
    tag: "热销",
    cat: "渗透测试",
    longDesc:
      "由持证白帽工程师执行，覆盖认证授权、注入、XSS、CSRF、文件上传、业务逻辑等全维度风险点。每个漏洞均提供可复现 PoC、修复建议与回归测试，并提供为期 30 天的复测服务。",
    features: ["OWASP Top 10 全覆盖", "业务逻辑深度测试", "可复现 PoC + 修复建议", "30 天免费复测"],
    duration: "5-7 工作日",
    deliverables: ["渗透测试报告 (PDF)", "漏洞 Excel 清单", "修复方案文档", "复测确认函"],
  },
  {
    id: "asset-mapping",
    title: "外网资产测绘报告",
    desc: "自动化扫描子域、端口、证书与指纹，一图掌握攻击面。",
    price: 1280,
    tag: "新品",
    cat: "渗透测试",
    longDesc:
      "通过被动 DNS、证书透明度日志、主动扫描等多源情报对企业暴露面进行全方位测绘，输出可视化资产地图与高危端口清单。",
    features: ["子域/端口/指纹扫描", "证书与 CDN 识别", "高危服务告警", "可视化资产地图"],
    duration: "2-3 工作日",
    deliverables: ["资产测绘报告", "Excel 资产清单", "高危项整改建议"],
  },
  {
    id: "red-team",
    title: "红队对抗演练（基础版）",
    desc: "模拟真实攻击者 TTPs，5 天周期，检验蓝队检测响应能力。",
    price: 12800,
    tag: "推荐",
    cat: "渗透测试",
    longDesc:
      "完全模拟真实 APT 攻击链路，包含信息收集、初始访问、横向移动、权限维持等环节，全过程不影响生产业务，并配套提供蓝队响应评估。",
    features: ["MITRE ATT&CK 映射", "C2 隐蔽通信", "钓鱼 + 物理 + 网络多向量", "蓝队检测评分"],
    duration: "5-10 工作日",
    deliverables: ["红队报告", "攻击链时间线", "蓝队改进建议"],
  },
  {
    id: "code-audit",
    title: "源代码安全审计",
    desc: "SAST + 人工审计，覆盖依赖链、逻辑漏洞与硬编码密钥。",
    price: 6800,
    cat: "代码审计",
    longDesc:
      "结合 SAST 工具与资深安全工程师人工复核，针对 Java / Go / Python / Node.js 等主流栈进行细颗粒度审计。",
    features: ["SAST 自动扫描", "资深工程师复核", "依赖漏洞检查", "硬编码密钥识别"],
    duration: "7-15 工作日",
    deliverables: ["代码审计报告", "高危问题清单", "修复参考代码"],
  },
  {
    id: "training-camp",
    title: "白帽实战训练营（30课时）",
    desc: "从信息收集到权限提升，全程靶场实操，颁发结业证书。",
    price: 1980,
    tag: "限时",
    cat: "安全培训",
    longDesc:
      "30 课时系统课程 + 在线靶场，由一线红队讲师授课，从基础到提权全链路打通，结业可参与 CTF 选拔。",
    features: ["30 课时直播 + 回放", "在线 CTF 靶场", "导师 1v1 答疑", "结业证书"],
    duration: "6 周",
    deliverables: ["课程视频", "实战靶场账号", "结业证书"],
  },
  {
    id: "ir-package",
    title: "应急响应 IR 服务包",
    desc: "7×24 小时入侵响应，包含取证、溯源、样本分析与修复建议。",
    price: 9800,
    cat: "应急响应",
    longDesc:
      "全年 7×24 待命的应急响应服务，30 分钟内电话响应，2 小时内现场或远程介入，专业团队完成取证与溯源。",
    features: ["7×24 电话响应", "现场/远程取证", "样本逆向分析", "溯源与归因"],
    duration: "全年订阅",
    deliverables: ["应急响应手册", "事件分析报告", "加固建议"],
  },
  {
    id: "compliance-2",
    title: "等保 2.0 合规咨询",
    desc: "差距分析到整改闭环，全流程辅导通过测评。",
    price: 15800,
    cat: "合规咨询",
    longDesc:
      "覆盖定级备案、差距分析、整改加固、测评辅导全流程，专业团队保障一次性通过等保测评。",
    features: ["定级与备案辅导", "差距分析", "整改方案落地", "测评机构对接"],
    duration: "2-4 个月",
    deliverables: ["差距分析报告", "整改方案", "测评对接服务"],
  },
  {
    id: "phishing",
    title: "钓鱼演练平台（年订阅）",
    desc: "面向员工的钓鱼模拟与安全意识培训，含数据看板。",
    price: 8800,
    tag: "订阅",
    cat: "安全培训",
    longDesc:
      "SaaS 化钓鱼演练平台，支持邮件 / 短信 / 二维码多场景模拟，配套微课与意识测评，可视化看板助力管理层决策。",
    features: ["多场景钓鱼模板", "微课 + 测评", "部门维度看板", "API 集成"],
    duration: "1 年",
    deliverables: ["平台账号", "演练模板库", "数据看板"],
  },
  {
    id: "api-test",
    title: "API 安全专项测试",
    desc: "针对 REST/GraphQL 接口的鉴权、越权、注入与限流测试。",
    price: 3680,
    cat: "渗透测试",
    longDesc:
      "覆盖 OWASP API Top 10 与业务逻辑越权场景，输出可执行的修复建议，尤其适合微服务与对外开放 API。",
    features: ["REST + GraphQL", "鉴权 / 越权专项", "限流与配额", "Postman 复现脚本"],
    duration: "3-5 工作日",
    deliverables: ["API 测试报告", "Postman 集合", "修复建议"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const getProductsByCategory = (slug: string) => {
  if (slug === "all") return products;
  const catName = categories.find((c) => c.slug === slug)?.name;
  return products.filter((p) => p.cat === catName);
};
