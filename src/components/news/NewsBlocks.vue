<template>
  <div class="card">

    {{title}}

    <div>
      <news-button @action="newsOpenClose"
      :classcolor="{'btn_close': isOpenThis}">
      {{isOpenThis ? 'Закрыть' : 'Открыть'}}
      </news-button>
    </div>

    <div v-if="isOpenThis">
      <p> {{text}} </p>

      <button class="btn_read"
      v-if="!isRead"
      @click="toReadNews">
      Прочитать</button>

      <button class="btn_read unread"
      v-if="isRead"
      @click="toUnReadNews">
      Отметить не прочитанным</button>
    </div>

  </div>
</template>


<script>
import NewsButton from './NewsButton'

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
      validator(value) {
        return value == true || value == false
      }
    },
  },

  emits: {
    'open-news': null,
    'read-news'(id) {
      if (id) return true
      console.warn('Не задан параметр id для emit "read-news"')
    },
    'unread-news'(id) {
      if (id) return true
      console.warn('Не задан параметр id для emit "unread-news"')
    }
  },

  data() {
    return {
      isOpenThis: this.isOpen
    }
  },

  methods: {
    newsOpenClose() {
      this.isOpenThis = !this.isOpenThis
      if(this.isOpenThis) this.$emit('open-news')
    },

    toReadNews() {
      this.isOpenThis = false
      this.$emit('read-news', this.id)
    },

    toUnReadNews() {
      this.isOpenThis = false
      this.$emit('unread-news', this.id)
    }
  },

  components: {
    'news-button': NewsButton
  }
}
</script>