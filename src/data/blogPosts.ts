export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Restaurer un DAF 1113 : De Pompier à Nomade",
    excerpt: "Transformer un camion de pompiers en camper robuste : découvrez les coulisses de notre restauration, du moteur Cummins aux pneus Michelin XZL.",
    date: "01 novembre 2025",
    image: "https://images.pexels.com/photos/532002/pexels-photo-532002.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Restauration"
  },
  {
    id: 2,
    title: "60 000 km : Planifier l’Impossible",
    excerpt: "De Londres au Cap via le Gobi, notre itinéraire défie les frontières et les terrains. Suivez notre planification !",
    date: "15 novembre 2025",
    image: "https://images.pexels.com/photos/346714/pexels-photo-346714.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Itinéraire"
  },
  {
    id: 3,
    title: "Pourquoi DAF et Mercedes ? Une Histoire de Robustesse",
    excerpt: "Héritage des DAF et fiabilité moderne d’un camion logistique : découvrez pourquoi ces véhicules sont nos compagnons.",
    date: "01 décembre 2025",
    image: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Flotte"
  }
];