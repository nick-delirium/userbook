<template>
  <div class="row">
    <div class="col">
    </div>
    <div class="col">
      <input class="form-control" type="text" :value='searchQuery' @input="$emit('input', $event.target.value)" placeholder="Поиск">
    </div>
  </div>
</template>

<script>
export default {
  name: "searchField",
  props: ['searchQuery']
}
</script>

<style>

</style>
