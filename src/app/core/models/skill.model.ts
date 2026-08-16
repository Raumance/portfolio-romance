export interface Skill {
  _id?: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Bases de données' | 'Mobile' | 'Outils';
  level: number; // 0 à 100
  icon: string;
}
