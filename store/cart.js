export const state = () => ({
  productInfoList: {},
  totalAmount: 0,
});

export const mutations = {
  ADD_PRODUCT(state, { product }) {
    state.productInfoList[product.id] = { product, amount: (state.productInfoList[product.id]?.amount || 0) + 1 }
    ++state.totalAmount;
  },

  REMOVE_PRODUCT(state, { product }) {
    if (--state.productInfoList[product.id].amount === 0) {
      delete state.productInfoList[product.id];
    }
    --state.totalAmount;
  },

  CLEAR(state) {
    state.productInfoList = {};
    state.totalAmount = 0;
  },
};
