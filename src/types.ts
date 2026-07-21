export type NounType = 'countable' | 'uncountable' | 'dual';

export interface NounItem {
  id: string;
  word: string;
  type: NounType;
  pluralForm?: string;
  category: 'financial_docs' | 'people_entities' | 'assets_capital' | 'metrics_data' | 'tools_systems';
  quantifiers: string[];
  definition: string;
  example: string;
  commonMistake?: {
    incorrect: string;
    correct: string;
    explanation: string;
  };
  partitive?: string; // e.g., "a piece of equipment", "a line of credit"
  iconName: string;
  imageUrl?: string;
}

export interface QuizQuestion {
  id: string;
  sentence: string; // contains '___' for blank
  options: string[];
  correctAnswer: string;
  explanation: string;
  nounInvolved: string;
  type: NounType;
}

export interface UserStats {
  score: number;
  quizzesCompleted: number;
  sortingHighStreak: number;
  bookmarkedIds: string[];
}
