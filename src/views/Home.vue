<template>
  <MainTemplate>
    <h1 class="home__headline">Countries API</h1>
    <div v-if="error">{{ error }}</div>
    <Suspense v-else>
      <template #default><Wrapper /></template>
      <template #fallback><loading-circle /></template>
    </Suspense>
  </MainTemplate>
</template>

<script>
import Wrapper from '@/components/Wrapper.vue';
import MainTemplate from '@/templates/MainTemplate.vue';
import { ref, onErrorCaptured } from 'vue';
import LoadingCircle from '../components/LoadingCircle.vue';

export default {
  name: 'Home',
  components: {
    Wrapper,
    MainTemplate,
    LoadingCircle,
  },

  setup() {
    const error = ref(null);

    onErrorCaptured((err) => {
      error.value = err;
    });

    return { error };
  },
};
</script>

<style lang="scss">
.fallback {
  width: fit-content;
  margin: 0 auto;
}

.home {
  &__headline {
    margin-bottom: 100px;
  }
}
</style>
