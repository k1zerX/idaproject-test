<template>
  <div class="app">
    <ida-app-bar class="app__bar" v-model="showCart" />

    <ida-cart v-model="showCart" />

    <div class="app__page">
      <nuxt class="app__page-content" />
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        showCart: false,
      };
    },
  }
</script>

<style lang="scss">
  @import '~/assets/style/main.scss';

  :root {
    @media screen and (min-width: $screen-lg) {
      --ida-page_width: #{$screen-lg};
    }
  }

  h1 {
    font-weight: bold;
    font-size: 32px;
  }

  .app {
    font-family: "PT Sans";
    line-height: 1.295;

    &__page {
      width: 100%;
      display: flex;
      justify-content: center;

      &-content {
        width: var(--ida-page_width);
      }
    }
  }
</style>
