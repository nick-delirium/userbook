<template>
  <div class="animated fadeIn">

    <b-card>
      <div class="row">
        <div class="col">
        </div>
        <div class="col">
          <input class="form-control" type="text" v-model='searchQuery' placeholder="Поиск">
        </div>
      </div>
      
      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Фамилия</th>
            <th scope="col">Имя</th>
            <th scope="col">Отчество</th>
            <th scope="col">Телефон</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr class='tableRow' v-for='(person, key) in shownPersons' :key='key'>
            <th scope="row">{{key+1}}</th>
            <td>{{person.middleName}}</td>
            <td>{{person.name}}</td>
            <td>{{person.lastName}}</td>
            <td>{{formatPhone(person.phone)}}</td>
            <td class='actions'>
              <b-button id='edit' 
                variant="link"
                ref="button"
                class='customDeleteBtn'
                
                v-b-modal="'modal'+key"
                >
                <i v-b-tooltip.hover title="Редактировать"
                class="cui-pencil"></i> 
              <Modal :id='"modal"+key' :editId='key' :person='person'/>
              
              </b-button>
              
              
              <b-button :id='"delete"+key' :disabled="popoverShow" 
                variant="link"
                ref="button"
                class='customDeleteBtn'
                >
                <i v-b-tooltip.hover title="Удалить"
                class="cui-circle-x" ></i> 
              <Popover :target='"delete"+key' :popoverShow='popoverShow' :id='key' v-on:remove='rmConf(key)' v-on:onClose='popoverShow = false'/>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col">
          <ul>
            <li :class='{active: isActive(shownPage)}' v-for='(shownPage, key) in pages' @click='activePage = shownPage'>{{shownPage}}</li>
          </ul>
        </div>
        <div class="col">
          <b-button v-b-tooltip.hover title="Добавить новую запись" @click='editing = true' class='customButton'>
                +
          </b-button>
        </div>
      </div>
    </b-card>

  </div>
</template>

<script>
import Popover from '@/components/popover.vue';
import Modal from '@/components/Modal.vue'
export default {
  name: "dashboard",
  components: { Popover, Modal },
  data() {
    return {
      searchQuery: "",
      popoverShow: false,
      editing: null,
      persons: [
        {
          id: 1,
          middleName: "Мельников",
          name: "Никита",
          lastName: "Сергеевич",
          phone: "+79522351147"
        }, {
          id: 2,
          middleName: "Мельников",
          name: "Никита",
          lastName: "Сергеевич",
          phone: "+79522351147"
        }, {
          id: 3,
          middleName: "Мельников",
          name: "Никита",
          lastName: "Сергеевич",
          phone: "+79522351147"
        }, {
          id: 4,
          middleName: "Мельников",
          name: "Никита",
          lastName: "Сергеевич",
          phone: "+79522351147"
        }, {
          id: 5,
          middleName: "Смирнов",
          name: "Никита",
          lastName: "Сергеевич",
          phone: "+79522351147"
        }, {
          id: 6,
          middleName: "Мельников",
          name: "Никита",
          lastName: "Сергеевич",
          phone: "+79522351147"
        }, 
      ],
      activePage: 1,
      limit: 5
    };
  },
  computed: {
    shownPersons() {
      if (this.searchQuery == '') return  this.persons.slice(this.activePage*this.limit-this.limit, this.activePage*this.limit);
      else {
        let query = this.searchQuery.toString().toLowerCase()
        return this.persons.filter(item => Object.values(item).find(i => i.toString().toLowerCase().includes(query)))
      }
    },
    pages() {
      let n = this.persons.length/this.limit;
      return [...this.range(1, Math.ceil(n))]
    }
  },
  methods: {
    edit(mode, key) {
      this.editing = {
        status: true,
        mode: mode,
        ind: key
      }
    },
    rmConf(k) {
      this.persons.splice(k, 1);
      this.editing = {
        status: false,
        mode: null,
        ind: null
      }
    },
    isActive(page) {
      return this.activePage === page ? true : false
    },
    range(start, end) {
      return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
    },
    formatPhone(phone) {
      phone = `${phone.slice(0,2)}(${phone.slice(2,5)})${phone.slice(5,8)}-${phone.slice(8, 10)}-${phone.slice(10,12)}`
      return phone;
    }
  }
};
</script>

<style scoped>
.tableRow:hover {
  background-color:rgba(0,0,0,0.05)
}
.customButton {
  float:right;
  font-size: 1.5em; padding: 0px 9px; border-radius:80px;
}
ul li {
  display: inline;
  margin: 0 5px;
  cursor: pointer;
  color:rgba(0,0,255, 0.6);
}
li:hover {
  text-decoration: underline;
}
li.active {
  color: rgba(0,0,255, 1);
}
ul {
  list-style: none
}
.actions i {
  margin: 0 5px;
  cursor: pointer;
}
.customButton:hover {
  border-radius: 5px;
  transition: all 0.125s ease-in-out
}
.customDeleteBtn {
  color: black;
  padding: 0 2.5px;
}
.customDeleteBtn:hover{
  text-decoration: none;
}
</style>
