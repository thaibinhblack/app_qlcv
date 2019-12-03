<template>
  <div>
    <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
      <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
    </draggable>
  </div>
</template>

<script>
 import draggable from 'vuedraggable'
export default {
    components: {
        draggable,
    }
}
</script>