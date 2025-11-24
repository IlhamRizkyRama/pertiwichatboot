export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Academic' | 'Facilities' | 'Admission';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  ADMIN = 'ADMIN'
}

export enum AIModel {
  FLASH_LITE = 'gemini-flash-lite-latest',
  PRO = 'gemini-3-pro-preview'
}