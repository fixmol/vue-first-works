<template>
  <div class="container">

    <div class="header">
      <button class="btn_header"
      :class="{'active': selectedNews}"
      @click="toSelectNews">
      News Block</button>

      <button class="btn_header"
      :class="{'active': selectedSlots}"
      @click="toSelectSlots">
      Slots Block</button>

      <button class="btn_header"
      :class="{'active': selectedDynamic}"
      @click="toSelectDynamic">
      Dynamic Block</button>
    </div>

    <news-app v-if="selectedNews"></news-app>
    <slots-app v-if="selectedSlots"></slots-app>
    <async-comp v-if="selectedDynamic"></async-comp>

  </div>
</template>


<script>
import NewsApp from './components/news/NewsApp'
import SlotsApp from './components/slots/SlotsApp'
import AsyncComp from './components/dynamic/AsyncComp'

export default {
  data() {
    return {
      selectedNews: true,
      selectedSlots: false,
      selectedDynamic: false
    }
  },

  methods: {
    toSelectNews() {
      this.selectedNews = !this.selectedNews
    },

    toSelectSlots() {
      this.selectedSlots = !this.selectedSlots
    },

    toSelectDynamic() {
      this.selectedDynamic = !this.selectedDynamic
    }
  },

  components: {
    'news-app': NewsApp,
    'slots-app': SlotsApp,
    'async-comp': AsyncComp
  }
}
</script>


<style>
</style>
