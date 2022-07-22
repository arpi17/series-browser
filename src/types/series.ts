export interface SerieData {
  // The fields we care about
  id: number;
  name: string;
  summary: string;
  image: {
    medium: string;
    original: string;
  };
  genres: string[];
  rating: {
    average?: number;
  };

  // The rest of the fields
  [key: string]: unknown;
}
