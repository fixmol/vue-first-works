<template>
  <div :class="{'alert_change': true, 'hide': hideAlertChange}">
    <p>{{ textAlertChange }}</p>
  </div>
</template>


<script>
export default {
  props: ['textAlertChange', 'hideAlertChange']
}
</script>