// src/pages/admin/faqStore.ts
export interface FAQ {
  q: string;
  a: string;
  type: 'employer' | 'jobseeker';
}

const FAQ_STORAGE_KEY = 'admin_faqs';

export function getFAQs(type: 'employer' | 'jobseeker'): FAQ[] {
  if (typeof window === 'undefined') return [];
  const faqs = JSON.parse(localStorage.getItem(FAQ_STORAGE_KEY) || '[]');
  return faqs.filter((faq: FAQ) => faq.type === type);
}

export function setFAQs(faqs: FAQ[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify(faqs));
  }
}
