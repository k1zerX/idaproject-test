<template>
  <main
    class="ida-catalog-category">
    <div class="ida-catalog-category__product-list">
      <ida-product-card
        v-for="product in productList"
        :key="`product-${categoryId}-${product.id}`"
        class="ida-catalog-category__product-list-item"
        v-bind="product"
      >
        <ida-cart-icon
          @click.native="addToCart(product)"
        />
      </ida-product-card>
    </div>
  </main>
</template>

<script>
  export default {
    props: {
      compareFunc: {
        type: Function,
        required: false,
      },
    },
    async asyncData({ params, store }) {
      const id = parseInt(params.id);
      await store.dispatch('UPDATE_PRODUCT_LIST', { id });
      store.commit('SET_SELECTED_CATEGORY_ID', { id });
    },
    methods: {
      addToCart(product) {
        this.$store.commit('cart/ADD_PRODUCT', { product });
      },
    },
    computed: {
      productList() {
        const { categoryId, compareFunc, $store: { state: { productLists } } } = this;
        return [...productLists[categoryId]].sort(compareFunc);
      },
      categoryId() {
        return this.$store.state.selectedCategoryId;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ida-catalog-category {

      &__product-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
      }
  }
</style>
