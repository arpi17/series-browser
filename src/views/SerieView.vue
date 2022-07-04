<script setup lang="ts">
import { useSeries } from '@/composables/useSeries';

const props = defineProps({
  id: String,
});

const { serie } = useSeries(Number(props.id));
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Back to Home</RouterLink>
    </nav>
  </header>

  <main>
    <p v-if="!serie">Loading...</p>
    <template v-else>
      <div class="image-container">
        <img
          :src="serie.image.original"
          :alt="`Poster of ${serie.name}`"
          class="image"
        />
      </div>
      <section class="serie-info">
        <div class="title-container">
          <h1>{{ serie.name }}</h1>
          <div class="rating">{{ serie.rating.average || '-' }}</div>
        </div>

        <h2>Details</h2>
        <div class="details">
          <p class="detail-item">Genre:</p>
          <p class="detail-data">{{ serie.genres.join(', ') }}</p>
          <p class="detail-item">Language:</p>
          <p class="detail-data">{{ serie.language }}</p>
          <p class="detail-item">Runtime:</p>
          <p class="detail-data">{{ serie.runtime }} minutes</p>
          <p class="detail-item">Premiered:</p>
          <p class="detail-data">{{ serie.premiered }}</p>
        </div>

        <h2>Summary</h2>
        <div class="summary" v-html="serie.summary"></div>
      </section>
    </template>
  </main>
</template>

<style scoped>
nav {
  margin-bottom: 2rem;
}

nav > a {
  color: inherit;
  text-decoration: none;
}

h1 {
  text-align: center;
  font-weight: 500;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.image-container {
  margin: auto;
  background-color: rgb(50, 50, 50);
  border-radius: 1rem;
  overflow: hidden;
}

.image {
  display: block;
  width: 100%;
  height: auto;
  min-height: 480px;
}

.serie-info {
  margin-top: 2rem;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 7rem;
  margin-bottom: 2rem;
}

.rating {
  border: 1px solid white;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.details {
  margin-bottom: 1.5rem;
}

.details p {
  display: inline-block;
  margin-bottom: 0.5rem;
}

.detail-item {
  width: 25%;
  font-weight: 500;
}

.detail-data {
  width: 75%;
  text-align: right;
}

.summary {
  text-align: justify;
}

@media (min-width: 768px) {
  main {
    display: flex;
    align-items: flex-start;
  }

  h1 {
    text-align: left;
  }

  h2 {
    text-align: left;
  }

  .serie-info {
    width: 40%;
    margin: 0 auto;
  }

  .image-container {
    width: 40%;
    height: auto;
    margin: 0;
  }

  .title-container {
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    height: auto;
  }

  .summary {
    text-align: left;
  }
}
</style>
