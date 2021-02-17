<template>
  <div class="ida-catalog">
    <header class="ida-catalog__header">
      <h1 class="ida-catalog__header-title">Каталог</h1>
    </header>

    <nav class="ida-catalog__nav">
      <ul>
        <li
          v-for="(category, index) in categoryList"
          :key="`category-${index}`"
        >
          <nuxt-link
            :class="`ida-catalog__nav-category ${category.id == selectedId ? 'ida-catalog__nav-category_selected' : ''}`"
            :to="`${category.id}`"
          >{{ category.name }}</nuxt-link>
        </li>
      </ul>
    </nav>

    <ida-select
      class="ida-catalog__sort-by"
      :options="sortingOptions"
      prefixLabel="Сортировать по:"
      bindName="name"
      bindSelectedName="selectedName"
      v-model="selectedSorting"
    />

    <nuxt-child
      class="ida-catalog__category"
      :compareFunc="selectedSorting.func"
    />
  </div>
</template>

<script>
  export default {
    data() {
      const sortingOptions = [
        {
          name: 'По цене',
          selectedName: 'цене',
          func: (a, b) => a.price - b.price,
        },
        {
          name: 'По популярности',
          selectedName: 'популярности',
          func: (a, b) => b.rating - a.rating,
        },
      ];
      return {
        sortingOptions,
        selectedSorting: sortingOptions[0],
      };
    },
    computed: {
      categoryList() {
        return this.$store.state.categoryList;
      },
      selectedId() {
        return this.$store.state.selectedCategoryId;
      },
    },
    async asyncData({ params, store, route, redirect }) {
      await store.dispatch('UPDATE_CATEGORY_LIST');

      if (params.id === undefined && store.state.categoryList.length > 0) {
        redirect(`${route.path.replace(/\/$/, '')}/${store.state.categoryList[0].id}`);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/style/main.scss';

  .ida-catalog {
    display: grid;
    grid-template-areas: "header  .         sort-by"
                         "nav     category  category"
                         ".       category  category";
    grid-template-columns: 1fr auto auto;
    grid-template-rows: auto auto 1fr;
    align-items: center;

    &__header {
      grid-area: header;

      &-title {
        margin-top: 32px;
        margin-bottom: 24px;
      }
    }

    &__nav {
      grid-area: nav;

      & > ul {
        list-style: none;
        padding-left: 0px;
        margin-block-start: 0;
        margin-block-end: 0;

        & > li {
          margin-top: 16px;

          &:first-child {
            margin-top: 0px;
          }
        }
      }

      &-category {
        font-size: 16px;
        color: $ida-rgb_grey-light;
        text-decoration: none;
        cursor: pointer;

        &:not(&_selected) {
          &:hover {
            color: $ida-rgb_grey;
          }

          &:active {
            color: $ida-rgb_black;
          }
        }

        &_selected {
          color: $ida-rgb_black; 
          text-decoration: underline;
        }
      }
    }

    &__sort-by {
      grid-area: sort-by;
    }

    &__category {
      grid-area: category;
    }
  }

</style>
