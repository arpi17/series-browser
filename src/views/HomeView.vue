<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSeries } from '@/composables/useSeries';
import SerieCard from '@/components/SerieCard.vue';

const { series, seriesByGenre } = useSeries();

// Sort the genres alphabetically
const genres = computed(() => [...seriesByGenre.value.keys()].sort());
const searchQuery = ref('');
const searchResults = computed(() =>
  [...series.value.values()].filter((serie) =>
    serie.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
</script>

<template>
  <main>
    <h1>TV Show Browser</h1>
    <input
      name="search-series"
      type="search"
      v-model="searchQuery"
      placeholder="Search TV show"
    />
    <template v-if="searchQuery">
      <h2>Search results</h2>
      <section class="search__section">
        <div class="container">
          <SerieCard
            v-for="serie in searchResults"
            :key="serie.name"
            :serie="serie"
          />
        </div>
      </section>
    </template>
    <template v-else>
      <section v-for="genre of genres" :key="genre" class="genre__section">
        <h2 class="movie__genre">{{ genre }}</h2>
        <div class="container">
          <SerieCard
            v-for="serie in seriesByGenre.get(genre)"
            :key="serie.id"
            :serie="serie"
          />
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
  font-weight: 700;
  margin-bottom: 2rem;
}

input {
  background-color: inherit;
  color: inherit;
  border: 1px solid var(--color-text);
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
.genre__section {
  margin-bottom: 2rem;
}

.movie__genre {
  margin-bottom: 1rem;
  font-weight: 500;
}

.container {
  display: flex;
  flex: auto;
  overflow-y: scroll;
  scroll-snap-type: x mandatory;
  position: relative;
}
</style>
