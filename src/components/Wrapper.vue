<template>
  <keep-alive
    ><label for="search" class="search-bar"
      >Search countries: <input type="text" @input="updateSearch" name="search" id="search"/></label
  ></keep-alive>
  <main class="wrapper">
    <button
      type="button"
      class="wrapper__button wrapper__left-button"
      @click="decrementCurrentOffset"
    >
      &lt;
    </button>
    <router-link
      tag="div"
      :to="`/country/${country.name}`"
      :key="country.name"
      class="wrapper__country"
      v-for="country in currentCountries"
    >
      <h4 class="wrapper__country-name">{{ country.name }}</h4>
      <img :src="country.flag" alt="country-flag" class="wrapper__country-flag" loading="lazy" />
    </router-link>
    <button
      type="button"
      class="wrapper__button wrapper__right-button"
      @click="incrementCurrentOffset"
    >
      &gt;
    </button>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { getCountries } from '../api/index';

const paginationCount = 20;

export default {
  name: 'Wrapper',

  async setup() {
    const store = useStore();

    const countries = ref([]);
    const currentCountries = ref(null);
    const currentOffset = ref(store.getters.getOffset);

    console.log(store.getters.getOffset);

    if (store.getters.getFromStore) {
      countries.value = store.getters.getFromStore;
    } else {
      countries.value = await getCountries();
      store.commit('fetchCountries', { countries: countries.value });
    }

    const getNewCountries = () => {
      store.commit('updatePaginationOffset', { offset: currentOffset.value });

      currentCountries.value = countries.value.slice(
        currentOffset.value,
        // eslint-disable-next-line comma-dangle
        currentOffset.value + paginationCount
      );
    };

    const updateSearch = (e) => {
      if (currentOffset.value !== 0) currentOffset.value = 0;
      currentCountries.value = countries.value.filter(
        ({ name }) =>
          // eslint-disable-next-line comma-dangle
          name.toLowerCase().includes(e.target.value.toLowerCase())
        // eslint-disable-next-line comma-dangle
      );
    };

    const incrementCurrentOffset = () => {
      if (countries.value.length < currentOffset.value + paginationCount) return;
      currentOffset.value += paginationCount;
      getNewCountries();
    };

    const decrementCurrentOffset = () => {
      if (currentOffset.value - paginationCount < 0) return;
      currentOffset.value -= paginationCount;
      getNewCountries();
    };

    currentCountries.value = countries.value.slice(
      currentOffset.value,
      // eslint-disable-next-line comma-dangle
      currentOffset.value + paginationCount
    );

    return {
      currentCountries,
      incrementCurrentOffset,
      decrementCurrentOffset,
      updateSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 50px;

  & input {
    margin-top: 10px;
    width: 200px;
    font-size: 2.6rem;
  }
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 425px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 572px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 762px) {
    grid-template-columns: repeat(4, 1fr);
  }

  grid-gap: 20px;
  position: relative;

  &__button {
    position: absolute;
    font-size: 6rem;
    background: transparent;
    border: none;
    outline: none;
    display: block;
    cursor: pointer;
  }

  &__left-button {
    top: -100px;
    left: 0;

    @media (min-width: 572px) {
      left: 50px;
    }
  }

  &__right-button {
    right: 0;
    top: -100px;

    @media (min-width: 572px) {
      right: 50px;
    }
  }

  &__country {
    color: rgba($color: #252323a8, $alpha: 1);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px;
    box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.1);

    transition: transform 100ms linear;
    cursor: pointer;

    &:hover {
      transform: translateY(-10px);
    }
  }

  &__country-flag {
    max-width: 100%;
    object-fit: fill;
    justify-self: center;
  }
}
</style>
