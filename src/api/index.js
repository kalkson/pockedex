import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.eu/rest/v2/',
});

const endpoints = {
  allCountries: 'all',
  countryByName: (countryName) => `name/${countryName}`,
};

export const getCountries = () => {
  const countries = api
    .get(endpoints.allCountries)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });

  return countries;
};

export const getCountry = (name) => {
  const country = api
    .get(endpoints.countryByName(name))
    .then(({ data }) => data[0])
    .catch((error) => {
      throw error;
    });

  return country;
};

export const asd = 'asd';
