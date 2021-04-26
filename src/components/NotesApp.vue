<template>
  <div class="template_notes">
    <small class="help_to_delete">Right click to delete</small>

    <div class="card_notes">
      <h3 class="title_list">Notes:</h3>

      <small style="margin: 30px"
        v-if="!notesList.length && !loading">
        There are no entries here yet
      </small>

      <app-loader v-if="loading"></app-loader>

      <notes-list v-else
        @get-text-value="getTextValue"
        :notes-list="notesList"
        @remove="deleteNote">
      </notes-list>
    </div>

    <div class="card_textarea">
      <notes-alert-change
      :hideAlertChange="hideAlertChange"
      :textAlertChange="textAlertChange">
      </notes-alert-change>

      <textarea class="textarea"
        v-model="textareaValue"
        @keypress.enter.prevent="addNote">
      </textarea>
      <br>
      <button class="add_note" :disabled="!textareaValue"
        @click="addNote">
        Add note </button>
      <button class="clear_text_box" :disabled="!textareaValue"
        @click="clearTextBox">
        Clear box </button>
      <button class="save_change" :disabled="isChangeNote"
        @click="saveChange">
        Save Change </button>
      <button class="clear_allnotes" :disabled="!notesList.length"
        @click="clearAllNotes">
        Clear all notes </button>
    </div>

  </div>
</template>


<script>
import NotesList from './NotesList'
import NotesAlertChange from './NotesAlertChange'
import axios from 'axios'

export default {
  data() {
    return {
      loading: false,
      textareaValue: '',
      isChangeNote: true,
      idToChange: null,
      hideAlertChange: true,
      textAlertChange: '',
      activeNote: null,
      notesList: []
    }
  },

  mounted() {
    this.loadNotesList()
  },

  methods: {

    async addNote() {
      if (this.textareaValue === '') {
        return false
      }
      const response = await axios.post('https://vue-small-projects-default-rtdb.firebaseio.com/notes.json', {
        date: new Date().toLocaleTimeString(),
        text: this.textareaValue
      })
      this.notesList.push({
        id: response.data.name,
        date: new Date().toLocaleTimeString(),
        text: this.textareaValue
      })
      this.idToChange = null
      this.textareaValue = ''
      if (this.activeNote !== null) {
        this.activeNote.classList.remove('notes-item-active')
      }
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
      this.textareaValue = ''
    },

    async clearAllNotes() {
      await axios.delete(`https://vue-small-projects-default-rtdb.firebaseio.com/notes.json`)
      this.notesList = []
      this.textareaValue = ''
    },

    clearTextBox() {
      this.textareaValue = ''
    },

    getTextValue(id) {
      this.notesList.forEach(noteItem => {
        if (noteItem.id === id) this.textareaValue = noteItem.text
      })
      if (this.activeNote !== null) {
        this.activeNote.classList.remove('notes-item-active')
      }
      let noteIndex = this.notesList.findIndex(note => note.id === id)
      this.activeNote = document.querySelector('.notes-list').children[noteIndex]
      this.activeNote.classList.add('notes-item-active')

      this.isChangeNote = false
      this.idToChange = id
    },

    saveChange() {
      this.notesList.forEach(note => {
        if (note.id === this.idToChange) {
          if (this.textareaValue === note.text) {
            this.textAlertChange = 'Не было изменений'
            this.hideAlertChange = false
            setTimeout(() => this.hideAlertChange = true, 2000)
          }
          else if (this.textareaValue.length === 0) {
            this.textAlertChange = 'Не может быть пустым'
            this.hideAlertChange = false
            setTimeout(() => this.hideAlertChange = true, 2000)
          }
          else {
            axios.patch(`https://vue-small-projects-default-rtdb.firebaseio.com/notes/${this.idToChange}.json`, {
              text: this.textareaValue
            })
            this.notesList.forEach(note => {
              if (note.id === this.idToChange) {
                note.text = this.textareaValue
              }
            })
          }
        }
      })
    }
  },

  components: {
    'notes-list': NotesList,
    'notes-alert-change': NotesAlertChange
  }
}
</script>


<style scoped>

  .help_to_delete {
    position: absolute;
    opacity: .7;
  }

  .title_list {
    text-align: center;
    margin: 0;
    margin-top: 7px;
  }
</style>