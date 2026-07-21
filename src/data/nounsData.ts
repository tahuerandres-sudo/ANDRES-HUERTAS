import { NounItem, QuizQuestion } from '../types';
import invoiceImg from '../assets/images/invoice_document_1784660283701.jpg';
import equipmentImg from '../assets/images/accounting_equipment_1784660302794.jpg';
import capitalImg from '../assets/images/capital_revenue_1784660314533.jpg';
import auditImg from '../assets/images/audit_ledger_1784660327790.jpg';
import calculatorImg from '../assets/images/tax_calculator_1784660339939.jpg';

export const NOUNS_DATABASE: NounItem[] = [
  // --- COUNTABLE NOUNS ---
  {
    id: 'invoice',
    word: 'Invoice',
    type: 'countable',
    pluralForm: 'Invoices',
    category: 'financial_docs',
    imageUrl: invoiceImg,
    quantifiers: ['an', 'two / three', 'many', 'a few', 'several', 'number of'],
    definition: 'An itemized commercial document that records a transaction between a buyer and a seller.',
    example: 'There are five unpaid invoices pending client approval for Q3.',
    commonMistake: {
      incorrect: 'How much invoices did we issue this month?',
      correct: 'How many invoices did we issue this month?',
      explanation: 'Use "many" or "number of" with countable nouns like invoice.'
    },
    iconName: 'FileText'
  },
  {
    id: 'receipt',
    word: 'Receipt',
    type: 'countable',
    pluralForm: 'Receipts',
    category: 'financial_docs',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['a', 'several', 'many', 'a few'],
    definition: 'A written acknowledgement that a specified sum of money or goods has been received.',
    example: 'Please submit all travel expense receipts to the accounting manager.',
    commonMistake: {
      incorrect: 'I need to check how much receipts are in the envelope.',
      correct: 'I need to check how many receipts are in the envelope.',
      explanation: 'Receipts can be individual items, so they are countable.'
    },
    iconName: 'Receipt'
  },
  {
    id: 'calculator',
    word: 'Calculator',
    type: 'countable',
    pluralForm: 'Calculators',
    category: 'tools_systems',
    imageUrl: calculatorImg,
    quantifiers: ['a', 'two', 'several', 'a few'],
    definition: 'A device or software program used for performing financial and mathematical calculations.',
    example: 'Each financial analyst was issued a new financial calculator.',
    iconName: 'Calculator'
  },
  {
    id: 'employee',
    word: 'Employee',
    type: 'countable',
    pluralForm: 'Employees',
    category: 'people_entities',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['an', 'many', 'a few', 'several', 'hundreds of'],
    definition: 'An individual hired by a company to perform specific job duties in exchange for wages.',
    example: 'The firm hired three new junior accountants this quarter.',
    iconName: 'Users'
  },
  {
    id: 'customer',
    word: 'Customer',
    type: 'countable',
    pluralForm: 'Customers',
    category: 'people_entities',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e8a32a66?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['a', 'many', 'several', 'a number of'],
    definition: 'A person or organization that buys goods or services from a store or business.',
    example: 'Many key customers requested extended payment terms during the audit.',
    iconName: 'UserCheck'
  },
  {
    id: 'document',
    word: 'Document',
    type: 'countable',
    pluralForm: 'Documents',
    category: 'financial_docs',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['a', 'several', 'many', 'a few'],
    definition: 'A piece of written, printed, or electronic matter that provides information or evidence.',
    example: 'The senior auditor signed four compliance documents before market close.',
    iconName: 'FolderArchive'
  },
  {
    id: 'audit',
    word: 'Audit',
    type: 'countable',
    pluralForm: 'Audits',
    category: 'metrics_data',
    imageUrl: auditImg,
    quantifiers: ['an', 'annual', 'several', 'a few'],
    definition: 'An official inspection of an organization’s accounts, typically by an independent body.',
    example: 'External auditors conduct two comprehensive audits every financial year.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'asset',
    word: 'Asset',
    type: 'countable',
    pluralForm: 'Assets',
    category: 'assets_capital',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['an', 'many', 'various', 'a number of'],
    definition: 'A resource with economic value that a company owns or controls with the expectation that it will provide a future benefit.',
    example: 'Fixed assets include land, buildings, and machinery listed on the balance sheet.',
    commonMistake: {
      incorrect: 'The company has much liquid assets.',
      correct: 'The company has many liquid assets.',
      explanation: 'Asset is a countable accounting item.'
    },
    iconName: 'TrendingUp'
  },
  {
    id: 'liability',
    word: 'Liability',
    type: 'countable',
    pluralForm: 'Liabilities',
    category: 'assets_capital',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['a', 'current', 'long-term', 'several', 'many'],
    definition: 'A company’s financial debts or obligations that arise during business operations.',
    example: 'The balance sheet compares total assets against total liabilities.',
    iconName: 'Scale'
  },
  {
    id: 'ledger',
    word: 'Ledger',
    type: 'countable',
    pluralForm: 'Ledgers',
    category: 'financial_docs',
    imageUrl: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['a', 'general', 'subsidiary', 'several'],
    definition: 'A book or collection of financial accounts in which transactions are recorded.',
    example: 'All journal entries must be posted to the general ledger by month-end.',
    iconName: 'BookOpen'
  },

  // --- UNCOUNTABLE NOUNS ---
  {
    id: 'revenue',
    word: 'Revenue',
    type: 'uncountable',
    category: 'metrics_data',
    imageUrl: capitalImg,
    quantifiers: ['some', 'much', 'a lot of', 'a significant amount of'],
    definition: 'The total amount of money brought in by a company through the sale of goods or services.',
    example: 'The firm generated a significant amount of revenue from subscription sales.',
    commonMistake: {
      incorrect: 'We generated three revenues this quarter.',
      correct: 'We generated three revenue streams / a lot of revenue this quarter.',
      explanation: 'Revenue is uncountable. Use "amount of revenue" or "revenue streams".'
    },
    partitive: 'a stream of revenue / an amount of revenue',
    iconName: 'DollarSign'
  },
  {
    id: 'equipment',
    word: 'Equipment',
    type: 'uncountable',
    category: 'tools_systems',
    imageUrl: equipmentImg,
    quantifiers: ['some', 'much', 'a piece of', 'an item of', 'a lot of'],
    definition: 'The necessary tools, machines, or hardware required for operating an accounting firm or business.',
    example: 'New office equipment was purchased and categorized as capital expenditure.',
    commonMistake: {
      incorrect: 'We ordered four equipments for the office.',
      correct: 'We ordered four pieces of equipment for the office.',
      explanation: 'Equipment is uncountable in English. Use "piece of" or "item of".'
    },
    partitive: 'a piece of equipment / an item of equipment',
    iconName: 'Monitor'
  },
  {
    id: 'information',
    word: 'Information',
    type: 'uncountable',
    category: 'metrics_data',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['some', 'much', 'a piece of', 'a lot of', 'detailed'],
    definition: 'Facts or data provided or learned about something or someone.',
    example: 'The auditor requested further financial information regarding tax deductions.',
    commonMistake: {
      incorrect: 'Can you send me three informations about the budget?',
      correct: 'Can you send me three pieces of information about the budget?',
      explanation: 'Information cannot be pluralized as "informations". Use "pieces of information".'
    },
    partitive: 'a piece of information / a detailed report of information',
    iconName: 'Info'
  },
  {
    id: 'capital',
    word: 'Capital',
    type: 'uncountable',
    category: 'assets_capital',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['some', 'much', 'a great deal of', 'sufficient', 'working'],
    definition: 'Financial assets or the financial value of assets such as cash and funds held in deposit accounts.',
    example: 'The startup required a great deal of venture capital to fund R&D.',
    partitive: 'an injection of capital / an amount of capital',
    iconName: 'Landmark'
  },
  {
    id: 'software',
    word: 'Software',
    type: 'uncountable',
    category: 'tools_systems',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['some', 'a suite of', 'a program of', 'accounting'],
    definition: 'Programs and operating information used by computers for accounting management.',
    example: 'Our team installed new cloud accounting software to automate billing.',
    commonMistake: {
      incorrect: 'We bought two accounting softwares.',
      correct: 'We bought two accounting software packages / programs.',
      explanation: 'Software is uncountable. Use "software packages" or "programs".'
    },
    partitive: 'a license of software / a software package',
    iconName: 'Cpu'
  },
  {
    id: 'cash-flow',
    word: 'Cash Flow',
    type: 'uncountable',
    category: 'metrics_data',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['positive', 'negative', 'steady', 'much', 'a lot of'],
    definition: 'The net amount of cash and cash-equivalents moving into and out of a business.',
    example: 'Maintaining positive cash flow is critical for meeting short-term payroll.',
    partitive: 'a statement of cash flow / a volume of cash flow',
    iconName: 'ArrowRightLeft'
  },
  {
    id: 'goodwill',
    word: 'Goodwill',
    type: 'uncountable',
    category: 'assets_capital',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['an amount of', 'valuable', 'recorded'],
    definition: 'An intangible asset associated with the purchase of one company by another (reputation, brand loyalty).',
    example: 'Impairment testing showed that company goodwill declined after the merger.',
    partitive: 'an amount of goodwill',
    iconName: 'HeartHandshake'
  },
  {
    id: 'depreciation',
    word: 'Depreciation',
    type: 'uncountable',
    category: 'metrics_data',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['accumulated', 'annual', 'much', 'some'],
    definition: 'The reduction in the recorded cost of a fixed asset in a systematic manner over its useful life.',
    example: 'Straight-line depreciation was calculated for all computer hardware.',
    partitive: 'an amount of depreciation / a rate of depreciation',
    iconName: 'TrendingDown'
  },
  {
    id: 'overhead',
    word: 'Overhead',
    type: 'uncountable',
    category: 'metrics_data',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['high', 'low', 'much', 'a lot of', 'fixed'],
    definition: 'Ongoing business expenses not directly attributed to creating a product or service.',
    example: 'Reducing administrative overhead helped increase net profit margins.',
    partitive: 'an element of overhead / a cost of overhead',
    iconName: 'PieChart'
  },
  {
    id: 'advice',
    word: 'Advice',
    type: 'uncountable',
    category: 'people_entities',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['some', 'a piece of', 'expert', 'financial'],
    definition: 'Guidance or recommendations offered by financial consultants or tax experts.',
    example: 'The CFO gave us valuable financial advice on tax optimization.',
    commonMistake: {
      incorrect: 'He gave me three advices on accounting.',
      correct: 'He gave me three pieces of advice on accounting.',
      explanation: 'Advice is always uncountable in English.'
    },
    partitive: 'a piece of advice / a word of advice',
    iconName: 'MessageSquareText'
  },

  // --- DUAL-USE / CONTEXT DEPENDENT NOUNS ---
  {
    id: 'tax',
    word: 'Tax / Taxes',
    type: 'dual',
    pluralForm: 'Taxes',
    category: 'metrics_data',
    imageUrl: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['some tax (general)', 'many taxes (specific types)', 'income tax'],
    definition: 'Uncountable when referring to the concept or system of taxation; Countable when referring to specific types or levies of tax.',
    example: 'Countable: "Corporate tax and sales tax are two different taxes." Uncountable: "How much tax do we owe?"',
    commonMistake: {
      incorrect: 'How many tax do I pay on this profit?',
      correct: 'How much tax do I pay on this profit?',
      explanation: 'When asking about the sum of money, "tax" acts as uncountable.'
    },
    partitive: 'a type of tax / an amount of tax',
    iconName: 'Coins'
  },
  {
    id: 'profit',
    word: 'Profit / Profits',
    type: 'dual',
    pluralForm: 'Profits',
    category: 'metrics_data',
    imageUrl: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['much profit (concept)', 'high profits (monetary earnings)'],
    definition: 'Uncountable for general financial gain; Countable when referring to earnings over specific periods or units.',
    example: 'The company made a lot of profit (uncountable). Quarterly profits exceeded expectations (countable).',
    iconName: 'BarChart3'
  },
  {
    id: 'paper',
    word: 'Paper / Papers',
    type: 'dual',
    pluralForm: 'Papers',
    category: 'financial_docs',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80',
    quantifiers: ['some paper (material)', 'important papers (documents/reports)'],
    definition: 'Uncountable as raw material; Countable when referring to official documents, contracts, or news publications.',
    example: 'Uncountable: We need a ream of printer paper. Countable: The legal team reviewed the contract papers.',
    partitive: 'a sheet of paper / a set of papers',
    iconName: 'FileSpreadsheet'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    sentence: 'The external auditor requested ___ invoices for the Q2 revenue review.',
    options: ['much', 'several', 'a little', 'an amount of'],
    correctAnswer: 'several',
    explanation: '"Invoice" is a countable noun, so we use quantifiers like "several", "many", or "a few".',
    nounInvolved: 'Invoice',
    type: 'countable'
  },
  {
    id: 'q2',
    sentence: 'Our department needs to purchase new office ___ before hiring new staff.',
    options: ['equipments', 'equipment', 'pieces of equipments', 'many equipment'],
    correctAnswer: 'equipment',
    explanation: '"Equipment" is an uncountable noun. It never takes an "-s" plural ending.',
    nounInvolved: 'Equipment',
    type: 'uncountable'
  },
  {
    id: 'q3',
    sentence: 'How ___ tax did the company pay on international sales this year?',
    options: ['many', 'much', 'few', 'number of'],
    correctAnswer: 'much',
    explanation: 'When asking about the overall monetary amount of tax owed or paid, "tax" functions as uncountable, so we use "much".',
    nounInvolved: 'Tax',
    type: 'dual'
  },
  {
    id: 'q4',
    sentence: 'The senior tax consultant provided three valuable ___ during the meeting.',
    options: ['advices', 'pieces of advice', 'piece of advices', 'much advice'],
    correctAnswer: 'pieces of advice',
    explanation: '"Advice" is uncountable. To count individual instances of advice, use partitives like "pieces of advice".',
    nounInvolved: 'Advice',
    type: 'uncountable'
  },
  {
    id: 'q5',
    sentence: 'We found an error in one of the balance sheet ___.',
    options: ['document', 'documents', 'information', 'informations'],
    correctAnswer: 'documents',
    explanation: '"Document" is countable and follows "one of the..." which requires a plural countable noun.',
    nounInvolved: 'Document',
    type: 'countable'
  },
  {
    id: 'q6',
    sentence: 'The CFO was impressed by the large ___ of capital raised during Series B funding.',
    options: ['number', 'amount', 'many', 'few'],
    correctAnswer: 'amount',
    explanation: '"Capital" is uncountable, so we use "amount of capital" rather than "number of capital".',
    nounInvolved: 'Capital',
    type: 'uncountable'
  },
  {
    id: 'q7',
    sentence: 'Could you please send me a ___ of paper for printing the balance sheet?',
    options: ['piece', 'sheet', 'slice', 'item'],
    correctAnswer: 'sheet',
    explanation: 'The natural partitive for paper is "a sheet of paper" (or "a ream of paper").',
    nounInvolved: 'Paper',
    type: 'dual'
  },
  {
    id: 'q8',
    sentence: 'The firm has ___ employees working in the auditing department.',
    options: ['much', 'a great deal of', 'over fifty', 'a large amount of'],
    correctAnswer: 'over fifty',
    explanation: '"Employees" is a plural countable noun, requiring numerical or countable quantifiers.',
    nounInvolved: 'Employee',
    type: 'countable'
  }
];
