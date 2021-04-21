<template>
  <div class="template_notes">

    <div class="card_notes">
      <h3 style="text-align: center">Notes:</h3>

      <small style="margin: 30px"
        v-show="!notesList.length">
        There are no entries here yet
      </small>

      <notes-app-list
        :notes-list="notesList"
        @remove="deleteNote">
      </notes-app-list>
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
import NotesAppList from './NotesAppList'
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
      const response = await axios.get('https://vue-small-projects-default-rtdb.firebaseio.com/notes.json')

      let resultParse = Object.keys(response.data).map(key => {
        return {
          id: key,
          date: response.data[key].date,
          text: response.data[key].text
        }
      })
      this.notesList = resultParse
    },


    async deleteNote(id) {
      await axios.delete(`https://vue-small-projects-default-rtdb.firebaseio.com/notes/${id}.json`)
      this.notesList = this.notesList.filter(noteItem => noteItem.id !== id)
    },


    async clearAllNotes() {
      await axios.delete(`https://vue-small-projects-default-rtdb.firebaseio.com/notes.json`)
      this.notesList = ''
    }
  },

  components: {
    'notes-app-list': NotesAppList
  }
}
</script>