<template>
  <span class="ida-rating">
    <span
      class="ida-rating__stroke"
    >★</span>

    <span
      class="ida-rating__star"
    >★</span>

    <span
      class="ida-rating__filled"
      :style="`height: ${ratingPercentage}%`"
    >★</span>

    <span
      class="ida-rating__text"
    >{{ rating }}</span>
  </span>
</template>

<script>
  export default {
    props: {
      rating: {
        type: Number,
        required: true,
      },
    },
    computed: {
      ratingPercentage() {
        return this.rating * 20;
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/style/main.scss';

  .ida-rating {
    @include unselectable;
    display: grid;
    grid-template-areas: "star text";
    gap: 0.5em;
    align-items: baseline;
    color: $ida-rgb_yellow;
    position: relative;
    line-height: 1;

    &__stroke {
      grid-area: star;
      color: transparent;
      -webkit-text-stroke: 0.2em $ida-rgb_yellow;
    }

    &__star {
      grid-area: star;
      color: $ida-rgb_white;
    }

    &__filled {
      grid-area: star;
      overflow: hidden;
      bottom: 0;
      display: inline-flex;
      align-items: flex-end;
    }

    &__text {
      grid-area: text;
    }
  }
</style>
