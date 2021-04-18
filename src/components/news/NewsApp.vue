<template>
  <div class="card">
    <h2>Интересные новости на: {{dateNow}} </h2>
    <span>Просмотров новостей: {{viewsRate}} | Прочитано: {{readRate}}</span>

    <news-blocks v-for="item in news" :key="item.id"
    :id="item.id"
    :title="item.title"
    :text="item.text"
    :is-open="item.isOpen"
    :is-read="item.isRead"
    @open-news="openNews"
    @read-news="readNews"
    @unread-news="unReadNews"
    ></news-blocks>
  </div>
</template>


<script>
import NewsBlocks from './NewsBlocks'

export default {
  data() {
    return {
      dateNow: new Date().toLocaleDateString(),
      viewsRate: 0,
      readRate: 0,
      news: [
        {
          id: 1,
          title: 'SpaceX будет доставлять астронавтов на Луну.',
          text: 'Компания американского предпринимателя Илона Маска SpaceX выиграла контракт NASA по доставке астронавтов на Луну в рамках программы «Артемида». Об этом сообщается на сайте американского космического ведомства.',
          isOpen: false,
          isRead: false },
        {
          id: 2,
          title: 'Во Флориде стартовала ракета Falcon 9.',
          text: 'Ракета-носитель Falcon 9 стартовала во Флориде с очередной партией интернет-спутников Starlink, компания SpaceX ведет прямую трансляцию запуска.',
          isOpen: false,
          isRead: false },
        {
          id: 3,
          title: 'Взрыв прототипа корабля Starship.',
          text: 'SN11 взорвался в ходе испытаний в американском штате Техас 30 марта. Это уже третье неудачное испытание в этом году. Прототип SN10 взорвался спустя несколько минут после посадки в ходе испытаний в начале марта, до этого в феврале взорвался прототип корабля SN9 после тестового подъема на высоту 10 километров.',
          isOpen: false,
          isRead: false },
      ]
    }
  },

  methods: {
    openNews() {
      this.viewsRate++
    },

    readNews(id) {
      const index = this.news.findIndex(news => news.id === id)
      this.news[index].isRead = true
      this.readRate++
    },

    unReadNews(id) {
      const index = this.news.findIndex(news => news.id === id)
      this.news[index].isRead = false
      this.readRate--
    }
  },

  components: {
    'news-blocks': NewsBlocks
  }
}
</script>