export interface Experience {
  _id?: string;
  title: string;
  institution: string;
  type: 'Formation' | 'Expérience' | 'Projet';
  startDate: string;
  endDate?: string;
  description: string;
}
