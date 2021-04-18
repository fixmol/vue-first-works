<template>
  <div class="card">
    <div class="card_tasks">
      <h2>Список задач</h2>

      <div>
        <input type="text"
        placeholder="Введите заметку"
        class="input_tasks"
        v-model="taskValue">
        <button class="button_tasks" @click="addTask">+</button>
      </div>

      <h4 v-show="!tasksList.length">
        Нет записей, добавьте первую.
      </h4>

      <div class="tasks_list" v-show="tasksList.length">
        <p class="task_item"
        v-for="(item, index) in tasksList" :key="item">
        {{ index + 1 }}. {{ item }}
        </p>
      </div>


    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      taskValue: '',
      tasksList: []
    }
  },

  methods: {
    addTask() {
      this.tasksList.push(this.taskValue)
      this.taskValue = ''
    }
  },

  components: {
  }
}
</script>