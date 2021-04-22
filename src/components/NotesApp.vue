<template>
  <div class="template_notes">

    <div class="card_notes">
      <h3 style="text-align: center">Notes:</h3>

      <small style="margin: 30px"
        v-show="!notesList.length && !loading">
        There are no entries here yet
      </small>

      <app-loader v-if="loading"></app-loader>

      <notes-list
        @get-text-value="getTextValue"
        :notes-list="notesList"
        @remove="deleteNote">
      </notes-list>
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
import NotesList from './NotesList'
import axios from 'axios'

export default {
  data() {
    return {
      loading: false,
      textareaValue: '',
      notesList: []
    }
  },

  mounted() {
    this.loadNotesList()
  },

  methods: {

    async addNote() {
      const response = await axios.post('https://vue-small-projects-default-rtdb.firebaseio.com/notes.json', {
        date: new Date().toLocaleTimeString(),
        text: this.textareaValue
      })
      this.notesList.push({
        id: response.data.name,
        date: new Date().toLocaleTimeString(),
        text: this.textareaValue
      })
      this.textareaValue = ''
    },


    async loadNotesList() {
      this.loading = true
      const response = await axios.get('https://vue-small-projects-default-rtdb.firebaseio.com/notes.json')

      if (response.data == null) {
        this.loading = false
        return this.notesList = []
      }

      let resultParse = Object.keys(response.data).map(key => {
        return {
          id: key,
          date: response.data[key].date,
          text: response.data[key].text
        }
      })
      this.notesList = resultParse
      this.loading = false
    },

    async deleteNote(id) {
      await axios.delete(`https://vue-small-projects-default-rtdb.firebaseio.com/notes/${id}.json`)
      this.notesList = this.notesList.filter(noteItem => noteItem.id !== id)
    },

    async clearAllNotes() {
      await axios.delete(`https://vue-small-projects-default-rtdb.firebaseio.com/notes.json`)
      this.notesList = ''
    },

    getTextValue(id) {
      this.notesList.forEach(noteItem => {
        if (noteItem.id === id) this.textareaValue = noteItem.text
      })
    },
  },

  components: {
    'notes-list': NotesList
  }
}
</script>