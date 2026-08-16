export interface Profile {
  _id?: string;
  headline: string;
  introduction: string;
  bio: string;
  softSkills: string[];
  interests: string[];
  cvUrl: string;
}

export const DEFAULT_PROFILE: Profile = {
  headline: 'Étudiant développeur, curieux et rigoureux',
  introduction:
    "Actuellement en formation en développement informatique, je conçois des applications web et mobiles de bout en bout — de la base de données à l'interface.",
  bio: "Je m'appelle Romance Nguema, développeur web, mobile et logiciel. Passionné par le développement d'applications web et mobiles ainsi que par la conception de bases de données, je suis actuellement en Licence professionnelle à l'Institut National de la Poste des Technologies de l'Information et de la Communication, après un Diplôme de Technicien Supérieur dans le même établissement.\n\nJe recherche des opportunités me permettant de mettre en œuvre mes compétences techniques dans un environnement innovant.",
  softSkills: ['Curiosité', 'Rigueur', 'Autonomie', 'Travail en équipe', 'Communication'],
  interests: ['Développement mobile', 'Open source', 'Infrastructures Linux', 'Stack MEAN'],
  cvUrl: 'assets/cv-romance-nguema.pdf'
};
