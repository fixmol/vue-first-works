<template>
  <ul>
    <li class="notesItem" v-for="item in notesList" :key="item.id"
      @click="$emit('get-text-value', item.id)"
      @click.prevent.right="$emit('remove', item.id)">
      {{ item.date }} |
      {{ item.text.substring(0,7) }}{{ item.text.length > 6 ? '..' : '' }}
    </li>
  </ul>
</template>


<script>
export default {
  emits: ['remove', 'get-text-value'],
  props: ['notesList']
}
</script>