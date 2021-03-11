<template>
  <input
    :value="v"
    v-on:input="$emit('input', v)"
    type="text"
    readonly
    class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
  />
</template>
<script>
export default {
  props: {
    value: {
      required: true
    }
  },
  data() {
    return {
      v: this.value
    }
  }
}
</script>