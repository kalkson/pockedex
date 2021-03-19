<template>
  <main-template>
    <artricle class="country">
      <h1 class="country__name">{{ countryInfo.name }}</h1>
      <div class="country__info">
        <img :src="countryInfo.flag" :alt="`${countryInfo.name} flag`" class="country__flag" />
        <div class="country__details">
          <span>Population: {{ countryInfo.population }}</span>
          <span>Continent: {{ countryInfo.region }}</span>
          <span>Capital: {{ countryInfo.capital }}</span>
        </div>
      </div>
    </artricle>
  </main-template>
</template>

<script>
// console.log(this.props);
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { getCountry } from '../api';
import MainTemplate from '../templates/MainTemplate.vue';

export default {
  components: { MainTemplate },
  name: 'Country',
  async setup() {
    const countryInfo = ref({});

    const route = useRoute();
    const store = useStore();

    const { name } = route.params;

    // eslint-disable-next-line operator-linebreak
    countryInfo.value = store.getters.getFromState
      ? store.getters.getCountry(name)
      : await getCountry(name);

    console.log(countryInfo.value);

    return {
      countryInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.country {
  display: flex;
  flex-direction: column;

  &__name {
    text-align: left;
  }

  &__flag {
    max-width: 300px;
  }

  &__info {
    display: flex;
    flex-direction: column;

    @media (min-width: 572px) {
      justify-content: space-between;
      flex-direction: row;
    }
  }

  &__details {
    font-size: 2.5rem;
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    @media (min-width: 572px) {
      margin-top: 0;
    }

    & > span {
      margin-bottom: 20px;
      text-align: center;

      @media (min-width: 572px) {
        text-align: right;
      }
    }
  }
}
</style>
