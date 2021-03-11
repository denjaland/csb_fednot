<template>
  <div class="relative">
    <button
      class="font-semibold text-sm hover:text-white transition-all outline-none"
      v-on:click="state.open = !state.open"
    >
      <tooltip-component :tooltip="$t('title')" :inverse="true">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="stroke-current w-4 h-4"><g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"><path d="M0.750 5.251 A11.25 4.5 0 1 0 23.250 5.251 A11.25 4.5 0 1 0 0.750 5.251 Z" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M.75,5.251V12c0,2.485,5.037,4.5,11.25,4.5S23.25,14.486,23.25,12V5.251" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M.75,12v6.75c0,2.485,5.037,4.5,11.25,4.5s11.25-2.015,11.25-4.5V12" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg>
      </tooltip-component>

    </button>

    <div class="fixed z-10 inset-0 overflow-y-auto" v-if="state.open">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        
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
                  <div class="cursor-pointer text-gray-400 hover:text-red-500 font-semibold text-xs mr-6 transition-all" v-on:click="$store.commit('removeTestData'); state.open = false">{{$t('clear')}}</div>
                </div>
                <ul class="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3 mx-6">
                  <li v-on:click="copy(p.rrn)" class="cursor-pointer col-span-1 flex flex-col" v-for="p in $store.state.meta.people" :key="p.id">
                    <person-view :person="p" :deletable="false" ></person-view>
                    
                    
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row items-center justify-between">
            <div class="text-gray-600 text-xs font-semibold">{{$t('instruction')}}</div>
            <button
              type="button"
              v-on:click.prevent="state.open = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {{$t('close')}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import PersonView from '../view/person';
import TooltipComponent from '../base/tooltip';

export default {
  components: {PersonView, TooltipComponent},
  data() {
    return {
      state: {
        open: false,
        tooltip: false
      },
    };
  },
  methods: {
    copy: function(data) {
        let el = document.createElement('textarea');
        el.value = data;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.state.open = false;
    }
  },
  i18n: {
    messages: {
      en: {
        title: 'Test Data',
        instruction: 'Click on a person to copy its NRN.',
        close: 'Close',
        clear: 'Clear all test data'
      },
      nl: {
        title: 'Testdata',
        instruction: 'Klik op een persoon om het NRN te kopiëren',
        close: 'Sluiten',
        clear: 'Verwijder alle testdata'
      },
      fr: {
        title: 'Données de test',
        instruction: 'Clicquer une personne pour copier le NRN',
        close: 'Fermer',
        clear: 'Supprimer toutes les données test'
      }
    }
  }
};
</script>