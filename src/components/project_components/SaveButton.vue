<template>
  <div @click="toggleSave" class="flex items-center cursor-pointer">
    <i
      v-if="condition"
      class="pi pi-bookmark-fill text-white"
      style="font-size: 1.5rem"
       @click.stop="$emit('unsave')"
    ></i>
    <i
      v-if="!condition"
      class="pi pi-bookmark text-white"
      style="font-size: 1.5rem"
      @click.stop="$emit('save')"
    ></i>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  condition: Boolean
})

const emit = defineEmits(['save', 'unsave'])

const toggleSave = () => {
  if (props.condition) {
    emit('unsave')
  } else {
    emit('save')
}
}
</script>

