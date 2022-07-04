<script setup lang="ts">
import type { SerieData } from '@/types';

defineProps<{
  serie: SerieData;
}>();
</script>

<template>
  <div class="card">
    <RouterLink
      :to="{
        name: 'serie-details',
        params: { id: serie.id },
      }"
      class="link"
    >
      <img :src="serie.image.medium" :alt="serie.name" class="card-img" />
    </RouterLink>
    <div class="card-content">
      <p class="title">{{ serie.name }}</p>
      <p class="rating">{{ serie.rating.average || '-' }}</p>
    </div>
  </div>
</template>

<style scoped>
.link {
  display: block;
}

.card {
  min-width: 12rem;
  max-width: 12rem;
  margin: 0 1rem;
  border-radius: 1rem;
  scroll-snap-align: start;
  overflow: hidden;
}

.card:first-child {
  margin-left: 0;
}

.card:last-child {
  margin-right: 0;
}

.card-img {
  display: block;
  height: auto;
  width: 100%;
}

.card-content {
  width: 100%;
  /* height: 100%; */
  padding: 0.5rem;
  background-image: radial-gradient(
    circle farthest-corner at -4% -12.9%,
    rgb(15, 31, 39) 0.3%,
    rgba(30, 33, 48, 1) 90.2%
  );
}

.title {
  font-weight: 700;
  font-size: 1.2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
