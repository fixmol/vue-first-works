<template>
  <div class="container">

    <header class="header">
      <button class="btn active">News Block</button>
      <button class="btn">Slots Block</button>
      <button class="btn">Compon Block</button>
    </header>

    <news-app>
    </news-app>

  </div>
</template>


<script>
import NewsApp from './components/news/NewsApp'

export default {
  data() {
    return {

    }
  },

  components: {
    'news-app': NewsApp
  }
}
</script>


<style>
</style>
