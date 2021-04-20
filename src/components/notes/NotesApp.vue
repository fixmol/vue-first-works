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
export default {
  data() {
    return {
      textareaValue: '',
      notesList: []
    }
  },

  methods: {
    addNote() {
      if (this.textareaValue !== '') {
        let noteData = new Object()
        noteData.date = new Date().toLocaleTimeString()
        noteData.text = this.textareaValue

        this.notesList.push(noteData)
        this.textareaValue = ''
      }
    },

    deleteNote(event) {
      event.preventDefault()
      let textContent = event.target.textContent

      for (let i = 0; i < this.notesList.length; i++) {
        if (this.notesList[i].date.length == 10) {
          if (this.notesList[i].date == textContent.substring(0, 10)) {
            this.notesList.splice(i, 1)
          }
        }
        else if (this.notesList[i].date.length == 11) {
          if (this.notesList[i].date == textContent.substring(0, 11)) {
            this.notesList.splice(i, 1)
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