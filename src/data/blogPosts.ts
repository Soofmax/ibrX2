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
    title: "First Steps in the City of Lights",
    excerpt: "Wandering through the cobblestone streets of Montmartre, I discovered that Paris is more than just a destination—it's a feeling that stays with you.",
    date: "March 15, 2025",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "City Guide"
  },
  {
    id: 2,
    title: "Hidden Cafés and Local Secrets",
    excerpt: "Beyond the tourist hotspots lies a network of charming cafés where locals gather. Today I found one that serves the best croissants I've ever tasted.",
    date: "March 18, 2025",
    image: "https://images.pexels.com/photos/1002740/pexels-photo-1002740.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Food & Culture"
  },
  {
    id: 3,
    title: "Sunset at the Seine",
    excerpt: "As golden hour painted the river in hues of amber and rose, I realized why artists have been drawn to this city for centuries. Pure magic.",
    date: "March 21, 2025",
    image: "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=800",
    category: "Photography"
  }
];