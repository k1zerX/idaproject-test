<template>
  <div class="ida-select">
    <div
      class="ida-select__main"
      @click="openOptions($event)"
    >
      <span
        v-if="prefixLabel !== null"
        class="ida-select__prefix-label"
      >{{ prefixLabel }}</span>

      <div class="ida-select__select">
        {{ selected ? selected[bindSelectedName || bindName] : placeholder }}
        <span :class="`ida-select__select-arrow ida-select__select-arrow_${ showOptions ? 'up' : 'down' }`"></span>
      </div>

      <span
        v-if="postfixLabel !== null"
        class="ida-select__postfix-label"
      >{{ postfixLabel }}</span>
    </div>

    <ul
      :class="`ida-select__option-list ${ showOptions ? '' : 'ida-select__option-list_hidden' }`"
      @click="$event.preventDefault()"
    >
      <li
        v-for="(option, index) in options"
        :class="`ida-select__option-list-item ${ option == selected ? 'ida-select__option-list-item_selected' : '' }`"
        @click="selectOption($event, index)"
      >{{ option[bindName] }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showOptions: false,
      };
    },
    model: {
      prop: 'selected',
      event: 'change',
    },
    props: {
      selected: {
        type: Object,
        required: false,
        default: null,
      },
      options: {
        type: Array,
        required: true,
      },
      bindName: {
        type: String,
        required: true,
      },
      bindSelectedName: {
        type: String,
        required: false,
      },
      placeholder: {
        type: String,
        required: false,
        default: '',
      },
      prefixLabel: {
        type: String,
        required: false,
        default: null,
      },
      postfixLabel: {
        type: String,
        required: false,
        default: null,
      },
    },
    methods: {
      openOptions($event) {
        if (this.showOptions === true)
          return;
        $event.preventDefault();

        this.showOptions = true;
      },
      selectOption($event, index) {
        this.$emit('change', this.options[index]);
        this.showOptions = false;
      },
    },
    mounted() {
      document.addEventListener("click", ($event) => {
        if ($event.defaultPrevented)
          return;

        this.showOptions = false;
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import '~/assets/style/main.scss';

  .ida-select {
    position: relative;

    &__main {
      @include unselectable;
      display: flex;
      align-items: baseline;
      cursor: pointer;
    }

    %label {
      font-size: 16px;
      color: $ida-rgb_black;
    }

    $space: 6px;
    &__prefix-label {
      @extend %label;
      margin-right: $space;
    }

    &__postfix-label {
      @extend %label;
      margin-left: $space;
    }

    &__select {
      font-size: 16px;
      color: $ida-rgb_grey;
      display: flex;
      align-items: center;

      &-arrow {
        $arrow-size: 0.3125em;
        width: 0;
        height: 0;
        margin-left: 4px;
        border: ($arrow-size / 2) solid transparent;

        $dir-side-map: (
          "up": "bottom",
          "down": "top",
        );
        @each $dir, $side in $dir-side-map {
          &_#{$dir} {
            border-#{$side}-color: $ida-rgb_grey;
            margin-#{$side}: $arrow-size / 2;
          }
        }
      }
    }

    &__option-list {
      position: absolute;
      width: 100%;
      padding: 8px 0px;
      margin-top: 6px;
      background: $ida-rgb_white;
      border-radius: 8px;
      box-shadow: $ida-bs_bottom;

      &_hidden {
        display: none;
      }

      &-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0px 12px;
        height: 26px;
        color: $ida-rgb_grey-light;

        &:hover {
          background: $ida-rgb_grey-extra-light;
          color: $ida-rgb_black;
        }
      }
    }
  }
</style>
