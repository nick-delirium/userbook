<template>
<b-modal :id="id">
    {{editId}}, {{person}}
</b-modal>
</template>

<script>
export default {
  name: "modal",
  props: ['id', "editId", "person"]
}
</script>

<style>

</style>