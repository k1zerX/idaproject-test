export const state = () => ({
  categoryList: [],
  productLists: {},
  selectedCategoryId: null,
});

export const mutations = {
  SET_CATEGORY_LIST(state, { categoryList }) {
    state.categoryList = categoryList;
  },

  SET_SELECTED_CATEGORY_ID(state, { id }) {
    state.selectedCategoryId = id;
  },

  SET_PRODUCT_LIST(state, { id, productList }) {
    state.productLists[id] = productList;
  },
};

export const actions = {
  async UPDATE_CATEGORY_LIST({ commit }) {
    const categoryList = await this.$axios.$get('/api/product-category');

    commit('SET_CATEGORY_LIST', { categoryList });
  },

  async UPDATE_PRODUCT_LIST({ state, commit }, { id }) {
    const productList = await this.$axios.$get('/api/product', { params: { category: id } });
    commit('SET_PRODUCT_LIST', { id, productList });
  },

  async SELECT_PRODUCT_LIST({ state, commit, dispatch }, { id }) {
    if (state.selectedCategoryId === id)
      return;
    await dispatch('UPDATE_PRODUCT-LIST', { id });
    commit('SET_SELECTED_CATEGORY_ID', { id });
  },
};
