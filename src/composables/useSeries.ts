import { ref } from 'vue';
import type { Ref } from 'vue';
import type { SerieData } from '@/types';

// Singleton stateful values
const series = ref<Map<number, SerieData>>(new Map());
const seriesByGenre = ref<Map<string, SerieData[]>>(new Map());

// Function overloads for the composable
export function useSeries(): {
  series: Ref<Map<number, SerieData>>;
  seriesByGenre: Ref<Map<string, SerieData[]>>;
};
export function useSeries(id: number): { serie: Ref<SerieData | undefined> };
export function useSeries(id?: number):
  | {
      series: Ref<Map<number, SerieData>>;
      seriesByGenre: Ref<Map<string, SerieData[]>>;
    }
  | { serie: Ref<SerieData | undefined> } {
  // If a serie is picked return its data
  if (id !== undefined) {
    const serie = ref(series.value.get(id));

    if (!serie.value) {
      fetch(`https://api.tvmaze.com/shows/${id}`)
        .then((res) => res.json())
        .then((data) => (serie.value = data))
        .catch((e) => console.error(e));
    }

    return { serie };
  }

  // Else return all series data
  if (!series.value.size) {
    fetch('https://api.tvmaze.com/shows')
      .then((res) => res.json())
      .then((data) => {
        for (const { id, ...movie } of data) {
          series.value.set(id, { id, ...movie });

          for (const genre of movie.genres) {
            const entries = seriesByGenre.value.get(genre) || [];
            entries.push({ id, ...movie });
            seriesByGenre.value.set(genre, entries);
          }
        }
      })
      .catch((e) => console.error(e));
  }

  return { series, seriesByGenre };
}
