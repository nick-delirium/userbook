<template>
<b-modal v-model='show' :id="id">

  Запись под номером: #{{ editId+1 }}

  <div class='row'>
    <div class="col">
      <input class="form-control name" type="text" v-model='toEdit.middleName' placeholder="Поиск">
    </div>
    <div class="col">
      <input class="form-control name" type="text" v-model='toEdit.name' placeholder="Поиск">
    </div>
    <div class="col">
      <input class="form-control name" type="text" v-model='toEdit.lastName' placeholder="Поиск">
    </div>
  </div>
  <div class='phone'>
    <input class="form-control" type="text" v-model='toEdit.phone' placeholder="Поиск">
  </div>
  <div slot="modal-footer" class="w-100">
    <b-btn size="sm" class="float-right" variant="primary" @click="done">
      Принять
    </b-btn>
    <b-btn size="sm" class="float-right" variant="danger" @click="show = false">
      Отменить
    </b-btn>
  </div>

</b-modal>
</template>

<script>
export default {
  name: 'modal',
  props: ['id', 'editId', 'person'],
  data () {
    return {
      show: false,
      toEdit: null
    }
  },
  beforeMount () {
    let person = Object.assign({}, this.$store.state.persons[this.editId])
    this.toEdit = person
    console.log(this.toEdit)
  },
  methods: {
    done () {
      let query = {
        index: this.editId,
        person: this.toEdit
      }
      this.$store.commit('edit', query)
      this.show = false
    }
  }
}
</script>

<style scoped>
.phone {
  margin-top:10px
}
.name {
  /* margin: 1px 2.5px */
}
.row {
  margin: 0 0px;
}
.col {
  padding: 0 0px;
}
.float-right {
  margin: 5px
}
</style>
