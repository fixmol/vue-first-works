<template>
  <table class="task_list">

    <tr v-for="item in tasksList" :key="item.id">

      <td class="task_item" @click.prevent.right="$emit('change-task', item.id)">
        {{ item.taskValue }}
      </td>

      <td class="task_button">
        <button class="delete_task" :disabled="isChange"
          @click="$emit('delete-task', item.id)"> &#128465;
        </button>
      </td>

    </tr>

  </table>
</template>


<script>
export default {
  emits: ['delete-task', 'change-task'],
  props: ['tasksList', 'isChange']
}
</script>