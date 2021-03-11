<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" v-if="open">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">      
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-400 opacity-50"></div>
        </div>
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:container"
          role="dialog"
          aria-modal="true"
        >
          <slot></slot>
          
        </div>
      </div>
  </div>
</template>
<script>
import _ from 'lodash';


export default {
  props: {
    open: {
      required: true
    }
  }
}
</script>