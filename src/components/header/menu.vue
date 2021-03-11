<template>

  <div class="flex flex-row items-center" v-if="products.includes(product)">
      <router-link
        v-for="(i, k) in modules[product]"
        :key="k"
        :to="'/' + $route.params.locale + '/' + product + '/' + k"
        class="mr-8 hover:text-indigo-100 border-0 border-transparent flex flex-col items-center transition-all delay-100 duration-500"
        :class="{
          'text-white': $route.path.startsWith('/' + $route.params.locale + '/' + product + '/' + k)
        }"
        >
            <div class="py-3">{{i.label}}</div>
            <div class="h-1 w-full transform transition-all delay-100 duration-500 ease-in-out origin-center"
              :class="{
                'scale-x-0': !$route.path.startsWith('/' + $route.params.locale + '/' + product + '/' + k),
                'scale-x-90 bg-white': $route.path.startsWith('/' + $route.params.locale + '/' + product + '/' + k),
              }">
            </div>

        </router-link
      >
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
      products: ['crf', 'cpc'],
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
    },
    modules() {
      return {
        crf: {
          registrations: {
            label: this.$t('modules.crf.registrations')
          },
          consultations: {
            label: this.$store.state.settings.consultation_history_enabled ? this.$t('modules.crf.consultations') : this.$t('modules.crf.new_consultation')
          }
        },
        cpc: {
          consultations: {
            label: this.$t('modules.cpc.consultations')
          }
        }, 
      }
    }
  },  

  i18n: {
    messages: {
      en: {
        modules:{
          crf: {
            registrations: 'My Registrations',
            consultations: 'My Consultations',
            new_consultation: 'New consultation'
          },
          cpc: {
            consultations: 'My Consultations'
          }
        }
      },
      nl: {
        modules:{
          crf: {
            registrations: 'Mijn inschrijvingen',
            consultations: 'Mijn consultaties',
            new_consultation: 'Nieuwe consultatie'
          },
          cpc: {
            consultations: 'Mijn consultaties'
          }
        }
      },
      fr: {
        modules:{
          crf: {
            registrations: 'Mes enregistrements',
            consultations: 'Mes consultations',
            new_consultation: 'Nouvelle consultation'
          },
          cpc: {
            consultations: 'Mes consultations'
          }
        }
      }
    }
  }
}
</script>