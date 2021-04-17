<template>
  <div class="card">
    <h2>Недавние новости.</h2>
    <span>Просмотров новостей: {{viewsRate}} | Прочитано: {{readRate}}</span>
  </div>
</template>


<script>
import NewsBlocks from './NewsBlocks'
import NewsButton from './NewsButton'

export default {
  data() {
    return {
      viewsRate: 0,
      readRate: 0,
      news: [
        {
          id: 1,
          title: 'SpaceX будет доставлять астронавтов на Луну.',
          text: 'Компания американского предпринимателя Илона Маска SpaceX выиграла контракт NASA по доставке астронавтов на Луну в рамках программы «Артемида». Об этом сообщается на сайте американского космического ведомства.',
          isOpen: false },
        {
          id: 2,
          title: 'Во Флориде стартовала ракета Falcon 9.',
          text: 'Ракета-носитель Falcon 9 стартовала во Флориде с очередной партией интернет-спутников Starlink, компания SpaceX ведет прямую трансляцию запуска.',
          isOpen: false },
        {
          id: 3,
          title: 'Взрыв прототипа корабля Starship.',
          text: 'SN11 взорвался в ходе испытаний в американском штате Техас 30 марта. Это уже третье неудачное испытание в этом году. Прототип SN10 взорвался спустя несколько минут после посадки в ходе испытаний в начале марта, до этого в феврале взорвался прототип корабля SN9 после тестового подъема на высоту 10 километров.',
          isOpen: false },
      ]
    }
  },

  components: {
    'news-blocks': NewsBlocks,
    'news-button': NewsButton
  }
}
</script>