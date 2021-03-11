<template>
  <div
      class="flex flex-row items-center justify-between border focus-within:border-indigo-800 rounded bg-white"
    >
      <div class="flex flex-row items-center flex-grow">
        <icon-search class="w-4 h-4 mx-2 stroke-current"></icon-search>
        <input
          type="text"
          v-model="v"
          class="px-3 py-1 rounded outline-none flex-grow"
          :placeholder="placeholder || $t('ph')"
        />
      </div>
      <div class="flex items-center cursor-pointer text-gray-400 hover:text-red-600 transition-all outline-none" v-on:click="v = ''">
        <icon-delete  
          class="cursor-pointer w-3 h-3 mx-2 " 
          ></icon-delete>
      </div>
    </div>
</template>
<script>
  import IconSearch from '../icons/search';
  import IconDelete from '../icons/delete';
  export default {
    components: { IconSearch, IconDelete },
    props: {
      value: {
        required: true
      },
      placeholder: {
        required: false,
      }
    },
    data() {
      return {
        v: this.value
      }
    },
  
    watch: {
      v: function(n, o) {
        this.$emit('input', n.trim());
      }
    },
    i18n: {
      messages: {
        en: {
          ph: 'Search...'
        },
        nl: {
          ph: 'Zoeken...'
        },
        fr: {
          ph: 'Rechercher'
        }
      }
    }

  }
</script>