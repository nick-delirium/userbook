<template>
<b-modal v-model='show' :id="id">

  Добавление новой записи:

  <div class='row'>
    <div class="col">
      <input class="form-control name"
        type="text" v-model='toEdit.middleName' placeholder="Фамилия">
    </div>
    <div class="col">
      <input class="form-control name"
        type="text" v-model='toEdit.name' placeholder="Имя">
    </div>
    <div class="col">
      <input class="form-control name"
        type="text" v-model="toEdit.lastName"
        placeholder="Отчество">
    </div>
  </div>
  <div class='phone'>
    <input class="form-control"
      type="text"
      v-model="phoneMasked"
      placeholder="Телефон">
  </div>
  <p v-if="errors.length">
    <b>Пожалуйста исправьте указанные ошибки:</b>
    <ul>
      <li v-for="(error, key) in errors" :key='key'>{{ error }}</li>
    </ul>
  </p>
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
import { createMask } from 'imask'

const maskField = (field, maskOptions) => {
  const mask = createMask(maskOptions)

  return {
    get: function () {
      return mask.resolve(this[field])
    },
    set: function (value) {
      mask.resolve(value)
      this[field] = mask.unmaskedValue
    }
  }
}

export default {
  name: 'newEntry',
  props: ['id'],
  data () {
    return {
      show: false,
      errors: [],
      phone: '',
      toEdit: {
        name: '',
        middleName: '',
        lastName: '',
        phone: ''
      }
    }
  },
  computed: {
    phoneMasked: maskField('phone', {
      mask: '+{7}(000)000-00-00'
    })
  },
  methods: {
    checkForm () {
      if (this.toEdit.name !== '' && this.toEdit.middleName !== '' && this.phone.length === 11) {
        return true
      }
      this.errors = []
      if (this.toEdit.name === '') this.errors.push('Требуется указать имя.')
      if (this.toEdit.middleName === '') this.errors.push('Требуется указать фамилию.')
      if (this.toEdit.phone.length !== 11) this.errors.push('Неверный формат номера.')
    },
    done () {
      if (this.checkForm()) {
        this.toEdit.phone = this.phone
        this.$store.commit('newPerson', this.toEdit)
        this.show = false
      }
    },
    addPlus () {
      this.toEdit.phone = this.toEdit.phone === '' ? '+' : this.toEdit.phone
    }
  }
}
</script>

<style scoped>
.phone {
  margin-top:10px
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
.error {
  border: 1px solid red;
}
</style>
