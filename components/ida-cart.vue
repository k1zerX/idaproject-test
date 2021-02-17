<template>
  <div
    :class="`ida-cart ${ showCart ? '' : 'ida-cart_hide' }`"
  >
    <div
      class="ida-cart__overlay"
      @click="close($event)"
    ></div>

    <div :class="`ida-cart__panel ${ isEmpty ? 'ida-cart__panel_empty': '' }`">
      <header class="ida-cart__panel-header">
        <h1 class="ida-cart__panel-header-title">Корзина</h1>
      </header>

      <ida-close-icon
        class="ida-cart__panel-close"
        @click.native="close($event)"
      />

      <span
        v-if="isEmpty"
        class="ida-cart__panel-placeholder"
      >Пока что вы ничего не добавили в коризну.</span>

      <ida-button
        v-if="isEmpty"
        class="ida-cart__panel-go-to-selection"
        @click.native="close($event)"
      >Перейти к выбору</ida-button>

      <div
        v-if="isFilled"
        class="ida-cart__panel-product-list"
      >
        <span class="ida-cart__panel-product-list-title">
          Товары в корзине
        </span>

        <template
          v-for="productInfo in productInfoList"
        >
          <ida-product-card
            v-for="index in range(productInfo.amount)"
            :key="`product-${productInfo.product.id}-${index}`"
            class="ida-cart__panel-product-list-item"
            v-bind="productInfo.product"
            mini
          >
            <ida-delete-icon
              @click.native="removeProduct(productInfo.product);"
            />
          </ida-product-card>
        </template>
      </div>

      <form
        v-if="isFilled"
        class="ida-cart__panel-checkout"
        @submit="checkForm($event)"
      >
        <span
          class="ida-cart__panel-checkout-title"
        >Оформить заказ</span>

        <ida-input
          placeholder="Ваше имя"
          required
          :pattern="name.pattern"
          v-model="name.value"
        />

        <ida-input
          placeholder="Телефон"
          required
          :pattern="phone.pattern"
          v-model="phone.value"
        />

        <ida-input
          placeholder="Адрес"
          required
          :pattern="address.pattern"
          v-model="address.value"
        />

        <ida-button
          class="ida-cart__panel-product-list-submit"
        >Отправить</ida-button>

      </form>
      
      <div
        v-if="isSubmitted"
        class="ida-cart__panel-submitted"
      >
        <img
          class="ida-cart__panel-submitted-ok-emoji"
          src="~/assets/image/ok-emoji.png"
          alt="ok"
        />

        <span
          class="ida-cart__panel-submitted-title"
        >Заявка успешно отправлена</span>

        <span
          class="ida-cart__panel-submitted-info"
        >Вскоре наш менеджер свяжется с Вами</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: {
          value: '',
          pattern: '^\\s*([А-ЯЁ][а-яё]*)( [А-ЯЁ][а-яё]*){0,2}\\s*$',
        },
        phone: {
          value: '',
          pattern: '^\\s*(8|(\\+7)) ?((\\(\\d{3}\\))|(\\d{3})) ?\\d{3}(( |-)?\\d{2}){2}\\s*$',
        },
        address: {
          value: '',
          pattern: '^\\s*г\\. ?[А-ЯЁ][a-яё]*, ?ул\\. ?[А-ЯЁ][a-яё]*, ?д\\. ?\\d+[а-яёА-ЯЁ]?(, ?кв\\. ?\\d+)?\\s*$',
        },
        submitted: false,
      };
    },
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
    methods: {
      close($event) {
        this.submitted = false;
        this.$emit('change', false);
        
        $event.preventDefault;
      },
      range(length) {
        let res = Array.from({ length }, (_, i) => i);
        return res;
      },
      removeProduct(product) {
        this.$store.commit('cart/REMOVE_PRODUCT', { product });
      },
      checkForm($event) {
        this.submitted = true;

        this.$store.commit('cart/CLEAR');

        $event.preventDefault();
      },
    },
    computed: {
      isEmpty() {
        return !this.submitted && this.$store.state.cart.totalAmount === 0;
      },
      isFilled() {
        return !this.submitted && this.$store.state.cart.totalAmount > 0;
      },
      isSubmitted() {
        return this.submitted;
      },
      productInfoList() {
        return this.$store.state.cart.productInfoList;
      },
    },
  }
</script>

<style lang="scss">
  @import '~/assets/style/main.scss';

  $row-gap: 24px;

  %vertical-padding {
    content: "";
    display: block;
    height: 52px - $row-gap;
  }

  .ida-cart {
    $p: &;

    &__overlay {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      background: $ida-rgb_white;

      #{$p}_hide & {
        opacity: 0;
        display: none;
      }

      #{$p}:not(#{$p}_hide) & {
        opacity: 0.8;
        display: block;
      }
    }

    &__panel {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-auto-rows: max-content;
      row-gap: $row-gap;
      align-items: center;
      background: $ida-rgb_white;
      position: fixed;
      height: 100%;
      $width: 460px;
      width: $width;
      top: 0;
      right: 0;
      padding: 0 48px;
      box-sizing: border-box;
      z-index: 1;
      overflow-y: scroll;
      overscroll-behavior: none;
      box-shadow: $ida-bs_left;
      border-radius: 8px 0 0 8px;

      &:after {
        grid-area: padding-bottom;
        @extend %vertical-padding;
      }

      &:before {
        grid-area: padding-top;
        @extend %vertical-padding;
      }

      &_empty {
        grid-template-areas: "padding-top      padding-top"
                             "header           close"
                             "placeholder      placeholder"
                             "go-to-selection  go-to-selection"
                             "padding-bottom   padding-bottom";
      }

      &:not(&_empty) {
        grid-template-areas: "padding-top     padding-top"
                             "header          close"
                             "product-list    product-list"
                             "checkout        checkout"
                             "padding-bottom  padding-bottom";
      }

      #{$p}_hide & {
        margin-right: -$width;
      }

      #{$p}:not(#{$p}_hide) & {
        margin-right: 0;
      }

      &-header {
        grid-area: header;

        &-title {
          margin: 0;
        }
      }

      &-close {
        grid-area: close;
        width: 14px;
      }

      &-placeholder {
        grid-area: placeholder;
        font-size: 22px;
      }

      &-go-to-selection {
        grid-area: go-to-selection;
      }

      %section-title {
        font-size: 18px;
        color: $ida-rgb_grey;
      }

      &-product-list {
        grid-area: product-list;
        display: grid;
        row-gap: 12px;

        &-title {
          @extend %section-title;
        }

        &-item {
        }
      }

      &-checkout {
        grid-area: checkout;
        margin-top: 8px;
        display: grid;
        row-gap: 16px;

        &-title {
          @extend %section-title;
        }

        &-submit {
          margin-top: 8px;
          margin-bottom: 52px;
        }
      }

      &-submitted {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: absolute;

        &-ok-emoji {
          height: 80px;
        }

        &-title {
          font-size: 24px;
          font-weight: bold;
          color: $ida-rgb_black;
        }

        &-info {
          font-size: 16px;
          color: $ida-rgb_grey;
        }
      }
    }
  }
</style>
