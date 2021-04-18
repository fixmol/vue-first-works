<template>
  <div class="container">

    <div class="header">
      <button class="btn_header"
      :class="{'active': activeComponent == 'news'}"
      @click="activeComponent = 'news'">
      News Block</button>
      
      <button class="btn_header"
      :class="{'active': activeComponent == 'tasks'}"
      @click="activeComponent = 'tasks'">
      Tasks App</button>

      <button class="btn_header"
      :class="{'active': activeComponent == 'async'}"
      @click="activeComponent = 'async'">
      Async Block</button>
    </div>

    <keep-alive>
      <component :is="componentName"></component>
    </keep-alive>

  </div>
</template>


<script>
import NewsApp from './components/news/NewsApp'
import TasksApp from './components/task/TasksApp'
import AsyncApp from './components/dynamic/AsyncApp'

export default {
  data() {
    return {
      activeComponent: 'news'
    }
  },

  computed: {
    componentName() {
      return this.activeComponent + '-app'
    }
  },

  components: {
    'news-app': NewsApp,
    'tasks-app': TasksApp,
    'async-app': AsyncApp
  }
}
</script>


<style>
</style>
