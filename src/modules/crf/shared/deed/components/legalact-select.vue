<template>
  <div class="relative">
    <button
      class="outline-none hover:outline-none font-semibold text-sm text-white bg-indigo-800 rounded shadow hover:bg-indigo-700 py-2 px-4 flex flex-row items-center"
      v-on:click="state.open = !state.open"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:svgjs="http://svgjs.com/svgjs"
        viewBox="0 0 140 140"
        class="w-4 h-4 stroke-current mr-2"
      >
        <g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
          <path
            d="M0.75 12L23.25 12"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          ></path>
          <path
            d="M12 0.75L12 23.25"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          ></path>
        </g>
      </svg>
      <div>{{$t('title')}}</div>
    </button>

    <div class="fixed z-10 inset-0 overflow-y-auto" v-if="state.open">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-400 opacity-50"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white">
            <div class="flex flex-col">
              <div class="mt-3 text-center sm:mt-0 sm:text-left">
                <div class="flex flex-row items-center justify-between px-6">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 py-4"
                    id="modal-headline"
                  >
                    {{$t('title')}}
                  </h3>
                  <div
                    class="flex flex-row items-center border focus-within:border-indigo-800 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xmlns:svgjs="http://svgjs.com/svgjs"
                      viewBox="0 0 140 140"
                      class="w-4 h-4 mx-2 stroke-current"
                    >
                      <g
                        transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"
                      >
                        <path
                          d="M0.750 9.812 A9.063 9.063 0 1 0 18.876 9.812 A9.063 9.063 0 1 0 0.750 9.812 Z"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          transform="translate(-3.056 4.62) rotate(-23.025)"
                        ></path>
                        <path
                          d="M16.221 16.22L23.25 23.25"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        ></path>
                      </g>
                    </svg>
                    <input
                      type="text"
                      v-model="filters.search"
                      class="px-3 py-1 rounded outline-none w-96"
                      :placeholder="$t('search_ph')"
                    />
                  </div>
                </div>

                <div class="flex flex-row items-center px-6 border-b">
                  <div
                    class="text-sm font-semibold uppercase text-center flex-grow py-4 border-b-4 cursor-pointer hover:text-green-500 transition-all"
                    v-on:click.prevent="filters.register = null"
                    :class="{
                      'border-gray-500 bg-gradient-to-b from-white via-white to-gray-100': filters.register === null,
                      'border-white': filters.register !== null,
                    }"
                  >
                    {{$t('all')}}
                  </div>
                  <div
                    class="text-sm font-semibold uppercase text-center flex-grow py-4 border-b-4 cursor-pointer  transition-all"
                    :class="{
                      'border-green-500 bg-gradient-to-b from-white via-white to-green-100 hover:text-green-500': filters.register === r && r.color === 'green',
                      'border-blue-500 bg-gradient-to-b from-white via-white to-blue-100 hover:text-blue-500': filters.register === r && r.color === 'blue',
                      'border-red-500 bg-gradient-to-b from-white via-white to-red-100 hover:text-red-500': filters.register === r && r.color === 'red',
                      'border-yellow-500 bg-gradient-to-b from-white via-white to-yellow-100 hover:text-yellow-500': filters.register === r && r.color === 'yellow',
                      'border-purple-500 bg-gradient-to-b from-white via-white to-purple-100 hover:text-purple-500' : filters.register === r && r.color === 'purple',
                      'border-white': filters.register !== r,
                    }"
                    v-for="r in $store.state.meta.register_types"
                    :key="r.id"
                    v-on:click.prevent="filters.register = r"
                  >
                    {{ r.name[$i18n.locale] }}
                  </div>
                </div>

                <div class="h-96 overflow-y-auto flex flex-col">
                  <div
                    v-for="type in types"
                    class="px-6 py-2 border-b hover:bg-gray-100 flex flex-row items-center cursor-pointer transition-all"
                    :key="type.id"
                    v-on:click="
                      $emit('selected', type.id);
                      state.open = false;
                    "
                  >
                    <div :class="'mr-4 text-xs rounded-full flex flex-row items-center  bg-' + $store.getters.meta('register_types', type.register).color + '-100 overflow-hidden text-' + $store.getters.meta('register_types', type.register).color + '-800'">
                      <div
                        :class="'bg-' + $store.getters.meta('register_types', type.register).color + '-800 text-white px-2 py-1 text-center w-10 h-full'"
                      >
                        {{$store.getters.meta('register_types', type.register).name[$i18n.locale]}}
                      </div>
                      <div
                        :class="'   py-1  text-center w-10'"
                      >
                        {{ type.code || type.id }}
                      </div>
                    </div>
                    <div class="text-sm font-semibold">{{ type.label[$i18n.locale] }}</div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row items-center justify-between">
            <div ><div v-if="filters.register !== null" :class="'font-semibold text-xs text-' + filters.register.color + '-800'">{{filters.register.label[$i18n.locale]}}</div></div>
            <button
              type="button"
              v-on:click.prevent="state.open = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{$t('btn_cancel')}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";

export default {
  props: {
    acts: {
      required: true,
    },
  },
  data() {
    return {
      state: {
        open: false,
      },
      filters: {
        register: null,
        search: "",
      },
    };
  },
  watch: {
    'state.open': function (n, o) {
      if (n) {
        this.filters.register = null;
        this.filters.search = "";
      }
    },
  },
  computed: {
    types: function () {
      let self = this;
      let types = this.$store.state.meta.registration_types;

      if (this.filters.register !== null) {
        types = _.filter(types, function (el) {
          return el.register === self.filters.register.id;
        });
      }

      if (this.filters.search.length > 0) {
        types = _.filter(types, function (el) {
          if(parseInt(self.filters.search) === parseInt(el.code || el.id)) return true;

          return el.label[self.$i18n.locale]
            .toLowerCase()
            .includes(self.filters.search.toLowerCase());
        });
      }

      
      /*if (
        _.filter(this.acts, function (a) {
          return a.id === 14;
        }).length > 0
      ) {
        // there is a marriage contract.  Let's filter to only allow
        types = _.filter(types, function (el) {
          return el.id === 6;
        });
      }*/


      if(this.acts.length > 0) {
        let combinations = [];
        _.each(this.acts, function(a) {
          combinations.push(...self.$store.getters.meta('registration_types', a.id).limits.combinations);
        })
        types = _.filter(types, function(el) {
          return combinations.includes(el.id);
        })
      }



      return _.orderBy(types, function (el) {
        return el.label[self.$i18n.locale];
      });
    },
  },
  i18n: {
    messages: {
      en: {
        title: 'Add legal act',
        all: 'All registers',
        search_ph: 'Search by string or id',
        btn_cancel: 'Cancel'
      },
      nl: {
        title: 'Voeg rechtshandeling toe',
        all: 'Alle registers',
        search_ph: 'Zoek op tekst of nummer',
        btn_cancel: 'Annuleren'
      }, 
      fr: {
        title: 'Ajouter un acte juridique',
        all: 'Tous registres',
        search_ph: 'Recherche par texte ou par numéro',
        btn_cancel: 'Annuler'
      }
    }
  }
};
</script>