<template>
  <button class="btn_open"
  :class="classcolor"
  @click="$emit('action')">
  <slot></slot>
  </button>
</template>


<script>
export default {
  emits: ['action'],

  props: {
    classcolor: {
      default: ''
    }
  }
}
</script>