export interface SerieData {
  // The fields we care about
  name: string;
  summary: string;
  image: {
    medium: string;
    original: string;
  };
  rating: {
    average?: number;
  };

  // The rest of the fields
  [key: string]: any;
}
