<template>
  <div class="container"><slot></slot></div>
</template>

<script>
export default {
  name: 'MainTemplate',
};
</script>

<style lang="scss" scoped>
@import './../style/global.css';

.container {
  max-width: 992px;
  margin: 0 auto;
  padding: 40px;
}
</style>
