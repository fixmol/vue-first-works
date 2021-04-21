<template>
  <div class="template_notes">

    <div class="card_notes">
      <h3 style="text-align: center">Notes:</h3>
      <small style="margin: 30px"
        v-show="!notesList.length">
        There are no entries here yet
      </small>
      <ul>
        <li class="notesItem" v-for="item in notesList" :key="item"
          @click="textareaValue = item.text" @click.right="deleteNote">
          {{ item.date }} |
          {{ item.text.substring(0,7) }}{{ item.text.length > 6 ? '..' : '' }}
        </li>
      </ul>
    </div>

    <div class="card_textarea">
      <textarea class="textarea"
        v-model="textareaValue"
        @keypress.enter.prevent="addNote">
      </textarea>
      <br>
      <button class="add_note" @click="addNote">Add note</button>
      <button class="clear_allnotes" @click="clearAllNotes">Clear all</button>
    </div>

  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      textareaValue: '',
      notesList: []
    }
  },

  mounted() {
    this.loadNotesList()
  },

  methods: {
    // addNote() {
    //   if (this.textareaValue !== '') {
    //     let noteData = new Object()
    //     noteData.date = new Date().toLocaleTimeString()
    //     noteData.text = this.textareaValue

    //     this.notesList.push(noteData)
    //     this.textareaValue = ''
    //   }
    // },

    async addNote() {
      const response = await axios.post('https://vue-small-projects-default-rtdb.firebaseio.com/notes.json', {
        date: new Date().toLocaleTimeString(),
        text: this.textareaValue
      })
      console.log(response.data)
    },

    async loadNotesList() {
      const response = await axios.get('https://vue-small-projects-default-rtdb.firebaseio.com/notes.json')

      const resultParse = Object.keys(response.data).map(key => {
        return {
          id: key,
          date: response.data[key].date,
          text: response.data[key].text
        }
      })
      this.notesList = resultParse
    },

    deleteNote(event) {
      event.preventDefault()
      let textContent = event.target.textContent

      for (let i = 0; i < this.notesList.length; i++) {
        if (this.notesList[i].date.length == 10) {
          if (this.notesList[i].date == textContent.substring(0, 10)) {
            this.notesList.splice(i, 1)
            this.textareaValue = ''
          }
        }
        else if (this.notesList[i].date.length == 11) {
          if (this.notesList[i].date == textContent.substring(0, 11)) {
            this.notesList.splice(i, 1)
            this.textareaValue = ''
          }
        }
      }
    },

    clearAllNotes() {
      this.notesList = []
    }
  }
}
</script>