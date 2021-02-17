<template>
  <div class="ida-app-bar">
    <div class="ida-app-bar__content">
      <span class="ida-app-bar__logo">TestList</span>

      <div class="ida-app-bar__spacer"></div>

      <div
        class="ida-app-bar__cart-button"
        @click="triggerCart()"
      >
        <ida-cart-icon class="ida-app-bar__cart-button-icon" />

        <div
          v-if="amount > 0"
          class="ida-app-bar__cart-button-counter"
        >{{ amount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'showCart',
      event: 'change',
    },
    props: {
      showCart: {
        type: Boolean,
        required: true,
      },
    },
    computed: {
      amount() {
        return this.$store.state.cart.totalAmount;
      },
    },
    methods: {
      triggerCart() {
        this.$emit('change', !this.showCart);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/style/main.scss';

  .ida-app-bar {
    width: 100%;
    height: 66px;
    display: flex;
    justify-content: center;
    background: rgba($ida-rgb_white, 1);
    box-shadow: $ida-bs_bottom;
    border-radius: 0px 0px 8px 8px;

    &__content {
      width: var(--ida-page_width);
      height: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }

    &__logo {
      font-weight: bold;
      font-size: 22px;
      color: $ida-rgb_grey;
    }

    &__spacer {
      width: 100%;
    }

    &__cart-button {
      position: relative;
      @include unselectable;
      cursor: pointer;

      &-icon {
        width: 24px;
        height: auto;
        fill: $ida-rgb_black;
      }

      &-counter {
        color: $ida-rgb_white;
        background: $ida-rgb_grey-light;
        font-size: 8px;
        $size: 1.5em;
        $horizontalPadding: 0.5em;
        position: absolute;
        height: $size;
        min-width: $size - $horizontalPadding * 2;
        top: 0;
        right: 0;
        margin-top: -$size / 2; 
        padding: 0 $horizontalPadding;
        transform: translateX(50%);
        border-radius: $size / 2;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
