<template>
  <div class="animated fadeIn">

    <b-card>
      
      <searchField v-model="searchQuery"/>

      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" @click="sort('middleName')">Фамилия</th>
            <th scope="col" @click="sort('name')">Имя</th>
            <th scope="col" @click="sort('lastName')">Отчество</th>
            <th scope="col" @click="sort('phone')">Телефон</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr class='tableRow' v-for='(person, key) in shownPersons' :key='key'>
            <th scope="row">{{persons.findIndex(i => i.id === person.id)+1}}</th>
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
              <Modal v-on:done='savePerson' :id='"modal"+key' 
                :editId='persons.findIndex(i => i.id === person.id)'/>
              
              </b-button>
              
              
              <b-button :id='"delete"+key' :disabled="popoverShow" 
                variant="link"
                ref="button"
                class="customDeleteBtn"
              >
                <i v-b-tooltip.hover title="Удалить"
                class="cui-circle-x" ></i> 
              <Popover :target='"delete"+key' :popoverShow='popoverShow' :id='persons.findIndex(i => i.id === person.id)' 
                v-on:remove='rmConf(persons.findIndex(i => i.id === person.id))' 
                v-on:onClose='popoverShow = false'/>
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col">
          <ul>
            <li :class='{active: isActive(page)}' v-for='(page, key) in pages' @click='activePage = page'>{{page}}</li>
          </ul>
        </div>
        <div class="col">
          <b-button v-b-modal="'newEntry'" v-b-tooltip.hover title="Добавить новую запись" @click='editing = true' class='customButton'>
                +
          <newEntry :id="'newEntry'"/>
          </b-button>

        </div>
      </div>
    </b-card>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'; 
import Popover from '@/components/popover.vue';
import Modal from '@/components/Modal.vue';
import newEntry from '@/components/newEntry.vue';
import searchField from '@/components/searchField.vue'
import { access } from 'fs';

export default {
  name: "dashboard",
  components: { Popover, Modal, newEntry, searchField },
  data() {
    return {
      currentSort: "middleName",
      sortDir: 'asc',
      searchQuery: "",
      popoverShow: false,
      editing: null,
      activePage: 1,
      limit: 5
    };
  },
  computed: {
    ...mapGetters([
      'persons'
    ]),
    shownPersons() {
      if (this.searchQuery == '') return this.sortedPersons.slice(this.activePage*this.limit-this.limit, this.activePage*this.limit);
      else {
        let query = this.searchQuery.toString().toLowerCase()
        return this.persons.filter(item => Object.values(item).find(i => i.toString().toLowerCase().includes(query)))
      }
    },
    pages() {
      let n = (this.searchQuery == '' ? this.persons.length : this.shownPersons.length)/this.limit;
      return [...this.range(1, Math.ceil(n))]
    },
    sortedPersons() {
      return this.persons.sort((a,b) => {
        let modifier = 1;
        if(this.sortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      })
    }
  },
  methods: {
    sort(s) {
      console.log(s)
      if (s === this.currentSort) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },
    savePerson() {
      return false;
    },
    rmConf(k) {
      this.$store.commit('delete', k)
    },
    isActive(page) {
      return this.shownPage === page ? true : false
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
