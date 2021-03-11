<template>
  <div class="flex flex-row items-center" :class="{'cursor-pointer': !readonly}"
    v-on:click="em()"
  >
         
    <icon-check-no 
      v-if="!value"
      class="w-5 h-5 text-gray-600 mr-2"
      
      ></icon-check-no>
    <icon-check-yes
      v-else
      class="text-green-600 w-5 h-5 mr-2"
    >
    </icon-check-yes>
  
    <slot></slot>
    
  </div>
</template>
<script>
import IconCheckNo from '../icons/check_no';
import IconCheckYes from '../icons/check_yes';

export default {
  components: {IconCheckNo, IconCheckYes},
  props: {
    value: {
      required: true
    },
    readonly: {
      required: false,
      default: false
    }
  },
  methods: {
    em() {
      if(!this.readonly) { this.$emit('input', !this.value) }
    }
  }
}
</script>