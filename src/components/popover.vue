<template>
  <b-popover :target="target"
    triggers="click"
    :show.sync="popoverShow"
    placement="auto"
    container="myContainer"
    ref="popover">
      <template slot="title">
        <b-btn @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-btn>
        Предупреждение
      </template>
      <div>
        <div>Данные записи #{{this.id+1}} будут полностью утеряны. Вы действительно хотите удалить ее?</div> 
        <div style='margin: 0 auto; display: table'>
          <b-btn style='margin:2.5px' @click="onOk" size="sm" variant="danger">Удалить</b-btn>
          <b-btn style='margin:2.5px' @click="onClose" size="sm" variant="primary">Отмена</b-btn>
        </div>
      </div>
    </b-popover>
</template>

<script>
export default {
  name: 'popup',
  props: ['id', 'target', 'popoverShow'],
  methods: {
    onOk() {
      this.$emit('remove')
    },
    onClose() {
      this.popoverShow = false
    }
  }
};
</script>

<style>
</style>
