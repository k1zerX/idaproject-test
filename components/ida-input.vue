<template>
  <input
    :class="`ida-input ${touched ? 'ida-touched' : ''}`"
    :placeholder="placeholder"
    v-model.trim.lazy="val"
    @blur="touched = true"
  />
</template>

<script>
  export default {
    data() {
      return {
        val: this.value,
        touched: false,
      };
    },
    props: {
      placeholder: {
        type: String,
        required: false,
      },
      value: {
        type: String,
        required: false,
      },
      validators: {
        type: Object,
        required: false,
      },
    },
    watch: {
      val() {
        this.$emit('change', this.val);
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/style/main.scss';

  .ida-input {
    width: 100%;
    height: 50px;
    padding: 14px;
    box-sizing: border-box;
    background: $ida-rgb_grey-extra-light;
    border-radius: 8px;
    $border-width: 2px;
    border: $border-width solid transparent;

    font-size: 16px;
    color: $ida-rgb_black;
    outline: none;

    &:placeholder {
      color: $ida-rgb_grey_light;
    }

    &[class~="ida-touched"]:invalid {
      border-color: $ida-rgb_error;
    }
  }
</style>
