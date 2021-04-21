<template>
  <div class="container">

    <div class="header">
      <button class="btn_header"
      :class="{'active': activeComponent == 'news'}"
      @click="activeComponent = 'news'">
      News App</button>
      
      <button class="btn_header"
      :class="{'active': activeComponent == 'tasks'}"
      @click="activeComponent = 'tasks'">
      Tasks App</button>

      <button class="btn_header"
      :class="{'active': activeComponent == 'notes'}"
      @click="activeComponent = 'notes'">
      Notes App</button>
    </div>

    <keep-alive>
      <component :is="componentName"></component>
    </keep-alive>

  </div>
</template>


<script>
import NewsApp from './components/NewsApp'
import TasksApp from './components/TasksApp'
import NotesApp from './components/NotesApp'

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
    'notes-app': NotesApp
  }
}
</script>


<style>
</style>
