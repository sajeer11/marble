// Shared admin data management using localStorage

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

const CATEGORIES_KEY = 'admin_categories';

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Marble',
    slug: 'marble',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=400&q=80',
    description: 'Premium marble slabs and tiles',
  },
  {
    id: '2',
    name: 'Natural Stone',
    slug: 'natural-stone',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695c952952?auto=format&fit=crop&w=400&q=80',
    description: 'Natural stone surfaces and finishes',
  },
  {
    id: '3',
    name: 'Tiles',
    slug: 'tiles',
    image: 'https://images.unsplash.com/photo-1577720643272-265af1850317?auto=format&fit=crop&w=400&q=80',
    description: 'Decorative and functional tiles',
  },
  {
    id: '4',
    name: 'Slabs',
    slug: 'slabs',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=400&q=80',
    description: 'Large marble and stone slabs',
  },
];

export function getCategories(): Category[] {
  if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
  
  try {
    const stored = localStorage.getItem(CATEGORIES_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

export function saveCategories(categories: Category[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Failed to save categories:', error);
  }
}

export function addCategory(category: Category): void {
  const categories = getCategories();
  categories.push(category);
  saveCategories(categories);
}

export function updateCategory(id: string, updates: Partial<Category>): void {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === id);
  if (index !== -1) {
    categories[index] = { ...categories[index], ...updates };
    saveCategories(categories);
  }
}

export function deleteCategory(id: string): void {
  const categories = getCategories();
  const filtered = categories.filter(c => c.id !== id);
  saveCategories(filtered);
}

export function getCategoryNames(): string[] {
  return getCategories().map(c => c.name);
}

export function getCategoryByName(name: string): Category | undefined {
  return getCategories().find(c => c.name === name);
}
