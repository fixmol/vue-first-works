<template>
  <div class="card">
    <div class="card_tasks">
      <h2>Tasks List
        <small class="small_help" v-show="isHelpEdit">Right click on the entry to edit</small>
      </h2>

      <div v-if="!isChange">
        <input type="text" placeholder="Add task" class="input_task"
        v-model="addTaskValue"
        @keypress.enter="addTask">

        <button class="add_task"
        @click="addTask">Add</button>
        <button class="delete_task_all"
        @click="deleteAllTasks">Delete All</button>
      </div>

      <div v-else>
        <input type="text" placeholder="ToChange" class="input_task" style="width: 630px"
        v-model="changeTaskValue">
        <button class="add_task" @click="toSaveChange">Save changes</button>
      </div>


      <h4 v-show="!tasksList.length">
      No entries, add the first.</h4>


      <table class="task_list">
        <tr v-for="(item, index) in tasksList" :key="item">

          <td class="task_item" @click.right="changeTask">
            {{item}} </td>

          <td class="task_button">
            <button class="delete_task" :disabled="isChange"
            @click="tasksList.splice(index, 1)">
            &#128465;</button>
          </td>

        </tr>
      </table>

    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      addTaskValue: '',
      changeTaskValue: '',
      tasksList: [],
      isChange: false,
      targetItem: null,
      targetItemIndex: null
    }
  },

  methods: {
    addTask() {
      if (this.addTaskValue !== '') this.tasksList.push(this.addTaskValue)
      this.addTaskValue = ''
    },

    deleteAllTasks() {
      this.tasksList = []
    },

    changeTask(event) {
      event.preventDefault()
      
      if (!this.changeTaskValue) {
        this.isChange = !this.isChange

        this.targetItem = event.target
        this.changeTaskValue = this.targetItem.innerHTML
        this.targetItemIndex = this.tasksList.indexOf(event.target.innerHTML)
      }
    },

    toSaveChange() {
      this.tasksList[this.targetItemIndex] = this.changeTaskValue
      this.changeTaskValue = ''
      this.isChange = false
    }
  },

  computed: {
    isHelpEdit() {
      return this.tasksList.length !== 0 && this.isChange == false
    }
  },

  components: {
  }
}
</script>