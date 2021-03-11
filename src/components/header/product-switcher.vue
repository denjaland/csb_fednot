<template>

  <div class="relative" v-click-outside="close">
    <div class="text-indigo-300 flex flex-row items-center rounded-full bg-indigo-900 px-4 py-1 cursor-pointer" v-if="products.includes(product)" v-on:click="state.open = !state.open">
      <div>{{$t('products.' + product + '.label')}}</div>
      <div><icon-down class="w-4 h-4 ml-4"></icon-down></div>
    </div>
    <div class="z-10 absolute right-0 bg-white rounded shadow overflow-hidden text-indigo-600 transform transition-all duration-150 ease-in-out origin-top" 
:class="{
  
'scale-y-0': !state.open,
'scale-y-100': state.open
}"
    >
        <div class="hover:bg-gray-50 py-2 px-4 cursor-pointer font-semibold flex flex-col text-base" v-for="p in products" :key="p" v-on:click="nav(p)">
          <div>{{$t('products.' + p + '.label')}}</div>
          <div class="text-xs text-gray-500 whitespace-nowrap">{{$t('products.' + p + '.name')}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import IconDown from '../icons/down';

export default {
  components: {IconDown},
  data() {
    return {
      state: {
        open: false
      },
      products: ['crf', 'cpc']
    }
  },
  methods: {
    close() { this.state.open = false; },
    nav(p) {
      if(p !== this.product) {
        this.$router.push('/' +this.$route.params.locale + '/' + p); 
      }
      this.state.open = false;
    }
  },

  computed: {
    product(){
      return this.$route.path.substring(4,7).toLowerCase();
    }
  },  

  i18n: {
    messages: {
      en: {
        products: {
          crf: {
            label: 'CRF',
            name: 'Central Register of FedNot'
          },
          cpc: {
            label: 'CPC',
            name: 'Central Point of Contact (NBB)'
          }
        }
      },
      nl: {
        products: {
          crf: {
            label: 'CRF',
            name: 'Centraal Register van FedNot'
          },
          cpc: {
            label: 'CAP',
            name: 'Centraal AanspreekPunt (NBB)'
          }
        }
      },
      fr: {
        products: {
          crf: {
            label: 'RCF',
            name: 'Registre Central de FedNot'
          },
          cpc: {
            label: 'PCC',
            name: 'Point de Contact Central (BNB)'
          }
        }
      }
    }
  }
}
</script>