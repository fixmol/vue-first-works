<template>
  <div class="card">
    <h2>Tasks List
      <small class="small_help" v-show="isHelpEdit">Right click on the entry to edit</small>
    </h2>

    <div v-if="!isChange">
      <input type="text" placeholder="Add task" class="input_task"
      v-model="addTaskValue"
      @keypress.enter="addTask">

      <button class="add_task"
        @click="addTask"> Add
      </button>

      <button class="delete_task_all"
        @click="deleteAllTasks"> Delete All
      </button>
    </div>

    <div v-else>
      <input type="text" placeholder="ToChange" class="input_task" style="width: 630px"
      v-model="changeTaskValue" @keypress.enter="toSaveChange">
      <button class="add_task" @click="toSaveChange">Save changes</button>
    </div>


    <h4 v-show="!tasksList.length">
    No entries, add the first.</h4>

    <tasks-list
    :tasksList="tasksList"
    :isChange="isChange"
    @delete-task="deleteTask"
    @change-task="changeTask">
    </tasks-list>

  </div>
</template>


<script>
import axios from 'axios'
import TasksList from './TasksList'

export default {
  data() {
    return {
      addTaskValue: '',
      changeTaskValue: '',
      tasksList: [],
      isChange: false,
      changeId: '',
      changeIndex: null
    }
  },

  mounted() {
    this.loadTasksList()
  },

  methods: {

    async addTask() {
      const response = await axios.post('https://vue-small-projects-default-rtdb.firebaseio.com/tasks.json', {
        taskValue: this.addTaskValue
      })
      this.tasksList.push({
        id: response.data.name,
        taskValue: this.addTaskValue
      })
      this.addTaskValue = ''
    },

    async loadTasksList() {
      const response = await axios.get('https://vue-small-projects-default-rtdb.firebaseio.com/tasks.json')

      if (response.data === null) {
        return this.tasksList = []
      }
      const resultParse = Object.keys(response.data).map(keyData => {
        return {
          id: keyData,
          taskValue: response.data[keyData].taskValue
        }
      })
      this.tasksList = resultParse
    },

    async deleteTask(id) {
      await axios.delete(`https://vue-small-projects-default-rtdb.firebaseio.com/tasks/${id}.json`)
      this.tasksList = this.tasksList.filter(taskItem => taskItem.id !== id)
    },

    async deleteAllTasks() {
      await axios.delete('https://vue-small-projects-default-rtdb.firebaseio.com/tasks.json')
      this.tasksList = []
    },

    async changeTask(id) {
      if (this.isChange === false) this.isChange = !this.isChange

        this.tasksList.forEach(taskItem => {
          if (taskItem.id === id) {
            this.changeTaskValue = taskItem.taskValue
            this.changeIndex = this.tasksList.indexOf(taskItem)
          }
        })
        this.changeId = id
    },

    // LOL ... Probably, it can be done in a shorter way, but I got this idea.
    // === >>>
    async toSaveChange() {
      await axios.delete(`https://vue-small-projects-default-rtdb.firebaseio.com/tasks/${this.changeId}.json`)
      this.tasksList.splice(this.changeIndex, 1)

      await axios.post('https://vue-small-projects-default-rtdb.firebaseio.com/tasks.json', {
        taskValue: this.changeTaskValue
      })
      const response = await axios.get('https://vue-small-projects-default-rtdb.firebaseio.com/tasks.json')

      let resultParse = Object.keys(response.data).map(keyData => {
        return {
          id: keyData,
          taskValue: response.data[keyData].taskValue
        }
      })
      resultParse = resultParse.filter(taskItem => {
        return taskItem.taskValue === this.changeTaskValue
      })
      this.tasksList.splice(this.changeIndex, 0, resultParse[0])
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
    'tasks-list': TasksList
  }
}
</script>