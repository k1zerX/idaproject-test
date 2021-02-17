<template>
  <div :class="`ida-product-card ${mini ? 'ida-product-card_mini' : ''}`">
    <ida-rating
      class="ida-product-card__rating"
      :rating="rating"
    />

    <div class="ida-product-card__button"><slot></slot></div>

    <img
      class="ida-product-card__photo"
      :src="photo"
      alt="photo"
    />

    <span class="ida-product-card__name">{{ name }}</span>

    <span class="ida-product-card__price">{{ parsedPrice }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      photo: {
        type: String,
        required: true,
      },
      mini: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    computed: {
      parsedPrice() {
        let res = '';
        let rawPrice = this.price;
        let mod = rawPrice % 1000;
        rawPrice = Math.floor(rawPrice / 1000);
        while (rawPrice > 0) {
          res = ' ' + mod.toString().padStart(3, '0') + res;
          mod = rawPrice % 1000;
          rawPrice = Math.floor(rawPrice / 1000);
        }
        return  mod + res + ' ₽';
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/style/main.scss';

  .ida-product-card {
    $p: &;
    width: 264px;
    height: 272px;
    padding: 16px;
    box-sizing: border-box;
    background: $ida-rgb_white;
    box-shadow: $ida-bs_bottom;
    border-radius: 8px;
    display: grid;
    grid-template-areas: "rating  photo  button"
                         ".       photo  ."
                         "name    name   name"
                         "price   price  price";
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: auto 1fr auto auto;
    row-gap: 6px;
    align-items: center;

    &_mini {
      width: 364px;
      height: 120px;
      padding: 15 25px;
      grid-template-areas: "photo  name    button"
                           "photo  price   button"
                           "photo  rating  button";
      grid-template-columns: 1fr 170px 1fr;
      grid-template-rows: auto auto 1fr;
      row-gap: 6px;
      column-gap: 15px;
    }

    &__rating {
      grid-area: rating;
      justify-self: start;
      font-size: 10px;
      font-weight: bold;

      #{$p}_mini & {
        align-self: end;
      }
    }

    &__button {
      grid-area: button;
      justify-self: end;
      cursor: pointer;
      @include unselectable;
      fill: $ida-rgb_grey-light;

      &:hover {
        fill: $ida-rgb_black;
      }

      & > * {
        width: 12px;

        #{$p}_mini & {
          width: 20px;
        }
      }
    }

    &__photo {
      grid-area: photo;
      height: 180px;
      margin-top: 2px;
      margin-bottom: 10px;

      #{$p}_mini & {
        height: 90px;
        margin: 0;
      }
    }

    &__name {
      grid-area: name;
      color: $ida-rgb_grey;
      font-size: 14px;
    }

    &__price {
      grid-area: price;
      color: $ida-rgb_black;
      font-size: 14px;
      font-weight: bold;
    }
  }
</style>
