<template>
<b-modal v-model='show' :id="id">

  Добавление новой записи:

    <div class='row'>

      <b-form class='input-full' @submit="done">
        <b-form-group  id="middleNameFormGr"
          label="Фамилия"
          label-for="middleNameIn">
          <b-form-input
            required
            class='input-full'
            id="middleNameIn"
            :state="!$v.toEdit.middleName.$invalid"
            aria-describedby="input1LiveFeedback"
            type="text"
            v-model='toEdit.middleName'
            placeholder="Фамилия" />
          <b-form-invalid-feedback id="input1LiveFeedback">
            Фамилия обязательна.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="nameFormGr"
          label="Имя"
          label-for="middleNameIn">
          <b-form-input
            required
            class='input-full'
            id="middleNameIn"
            :state="!$v.toEdit.name.$invalid"
            aria-describedby="input2LiveFeedback"
            type="text" v-model='toEdit.name' placeholder="Имя" />
          <b-form-invalid-feedback id="input2LiveFeedback">
            Имя обязательно.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="lastNameFormGr"
          label="Отчество"
          label-for="lastNameIn">
          <b-form-input
            required
            class='input-full'
            id="lastNameIn"
            type="text" v-model='toEdit.lastName' placeholder="Отчество" />
        </b-form-group>
        <b-form-group id="phoneFormGr"
          label="Телефон"
          label-for="lastNameIn">
          <b-form-input
            required
            class='input-full'
            id="lastNameIn"
            aria-describedby="input4LiveFeedback"
            type="text" v-model='phoneMasked' placeholder="Телефон" />
          <b-form-invalid-feedback :force-show='phoneCheck' id="input4LiveFeedback">
            Телефон должен быть 11-и значным.
          </b-form-invalid-feedback>
        </b-form-group>

      </b-form>
    </div>

  <div slot="modal-footer" class="w-100">
    <b-btn type="submit"
      :disabled="$v.toEdit.$invalid"
      size="sm"
      @click.prevent='done'
      class="float-right"
      variant="primary">
      Принять
    </b-btn>
    <b-btn size="sm"
      class="float-right"
      variant="danger"
      @click="show = false">
      Отменить
    </b-btn>
  </div>

</b-modal>
</template>

<script>
import { createMask } from 'imask'
import { validationMixin } from 'vuelidate'
import { required, minLength, helpers } from 'vuelidate/lib/validators'
const alpha = helpers.regex('alpha', /^[а-яА-Яa-zA-Z]*$/)
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
      phone: '',
      toEdit: {
        name: '',
        middleName: '',
        lastName: '',
        phone: ''
      }
    }
  },
  mixins: [
    validationMixin
  ],
  validations: {
    toEdit: {
      middleName: {
        required,
        alpha,
        minLength: minLength(1)
      },
      name: {
        required,
        alpha,
        minLength: minLength(1)
      }
    }
  },
  computed: {
    phoneMasked: maskField('phone', {
      mask: '+{7}(000)000-00-00'
    }),
    phoneCheck () {
      return this.phone.length !== 11
    }
  },
  methods: {
    done () {
      this.toEdit.phone = this.phone
      this.$store.commit('newPerson', this.toEdit)
      this.show = false
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
.input-full {
  width: 100%
}
</style>
