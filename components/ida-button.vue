<template>
  <button
    class="ida-button"
  >
    <slot></slot>
  </button>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/style/main.scss';

  .ida-button {
    font-size: 16px;
    color: $ida-rgb_white;
    background: $ida-rgb_black;
    border-radius: 8px;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    cursor: pointer;
    @include unselectable;

    &:hover {
      background: grey;
    }
  }
</style>
