<template>
  <div class="relative text-gray-900">
    <button
      class="font-semibold text-sm text-indigo-300 hover:text-white transition-all outline-none"
      v-on:click="state.open = !state.open"
    >
      <tooltip-component :tooltip="$t('title')" :inverse="true">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="stroke-current w-4 h-4"><g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"><path d="M10.546,2.438a1.957,1.957,0,0,0,2.908,0L14.4,1.4a1.959,1.959,0,0,1,3.41,1.413l-.071,1.4A1.958,1.958,0,0,0,19.79,6.267l1.4-.071A1.959,1.959,0,0,1,22.6,9.606l-1.042.94a1.96,1.96,0,0,0,0,2.909l1.042.94a1.959,1.959,0,0,1-1.413,3.41l-1.4-.071a1.958,1.958,0,0,0-2.056,2.056l.071,1.4A1.959,1.959,0,0,1,14.4,22.6l-.941-1.041a1.959,1.959,0,0,0-2.908,0L9.606,22.6A1.959,1.959,0,0,1,6.2,21.192l.072-1.4a1.958,1.958,0,0,0-2.056-2.056l-1.4.071A1.958,1.958,0,0,1,1.4,14.4l1.041-.94a1.96,1.96,0,0,0,0-2.909L1.4,9.606A1.958,1.958,0,0,1,2.809,6.2l1.4.071A1.958,1.958,0,0,0,6.267,4.211L6.2,2.81A1.959,1.959,0,0,1,9.606,1.4Z" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M7.500 12.001 A4.500 4.500 0 1 0 16.500 12.001 A4.500 4.500 0 1 0 7.500 12.001 Z" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg>
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

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white">
            <div class="flex flex-col h-96 overflow-y-auto">
              <div class="mt-3 text-center sm:mt-0 sm:text-left px-6">
                
                <div class="flex flex-col">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 pt-4"
                    id="modal-headline"
                  >
                    {{$t('title')}}
                  </h3>
                  <div class=" text-gray-400  text-sm mr-6 transition-all pb-4" >{{$t('intro')}}</div>
                </div>
               

                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{$t('rpp')}}
                    </label>
                    <div class="mt-1">
                      <input
                        v-model="settings.rpp"
                        type="number"
                        v-on:input="$store.commit('setting', { rpp: settings.rpp})"
                        class="text-gray-700 border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                      />
                    
                    </div>
                  </div>
                  <div class="sm:col-span-3 row-span-3">

                    <label
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{$t('features')}}
                    </label>
                    <div class="mt-1">
                      <check-box-input v-model="settings.enable_additional_registration" v-on:input="$store.commit('setting', { enable_additional_registration: settings.enable_additional_registration})">
                        {{$t('enable_additional_registration')}}
                      </check-box-input>
                      <check-box-input class="mt-1" v-model="settings.allow_all_notaries_for_support" v-on:input="$store.commit('setting', { allow_all_notaries_for_support: settings.allow_all_notaries_for_support})">
                        {{$t('allow_all_notaries_for_support')}}
                      </check-box-input>
                      <check-box-input class="mt-1" v-model="settings.allow_multiple_registrations" v-on:input="$store.commit('setting', { allow_multiple_registrations: settings.allow_multiple_registrations})">
                        {{$t('allow_multiple_registrations')}}
                      </check-box-input>
                    
                      <check-box-input class="mt-1" v-model="settings.consultation_history_enabled" v-on:input="$store.commit('setting', { consultation_history_enabled: settings.consultation_history_enabled})">
                        {{$t('consultation_history_enabled')}}
                      </check-box-input>
                    
                      <check-box-input class="mt-1" v-model="settings.consultation_register_checkboxes" v-on:input="$store.commit('setting', { consultation_register_checkboxes: settings.consultation_register_checkboxes})">
                        {{$t('consultation_register_checkboxes')}}
                      </check-box-input>

                      <check-box-input class="mt-1" v-model="settings.enable_versioning_of_registrations" v-on:input="$store.commit('setting', { enable_versioning_of_registrations: settings.enable_versioning_of_registrations})">
                        {{$t('enable_versioning_of_registrations')}}
                      </check-box-input>

                      
                    
                    
                    </div>
                  </div>

                <!--/div>

                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"-->
                  <div class="sm:col-span-3">
                    <label
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{$t('action_button')}}
                    </label>
                    <div class="mt-1">
                      
                      <select
                        class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                        v-model="settings.action_button_type"
                        v-on:change="$store.commit('setting', { action_button_type: settings.action_button_type})"
                      >
                        <option value="1">{{$t('action_button_type.one')}}</option>
                        <option value="2">{{$t('action_button_type.two')}}</option>
                        <option value="3">{{$t('action_button_type.three')}}</option>
                        <option value="4">{{$t('action_button_type.four')}}</option>
                      </select>
                    
                    </div>
                  </div>

                <!--/div>

                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"-->
                  <div class="sm:col-span-3">
                    <label
                      class="block text-sm font-medium text-gray-700"
                    >
                      {{$t('search_info_position')}}
                    </label>
                    <div class="mt-1">
                      
                      <select
                        class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                        v-model="settings.select_search_info_position"
                        v-on:change="$store.commit('setting', { select_search_info_position: settings.select_search_info_position})"
                      >
                        <option value="1">{{$t('search_info_position_type.one')}}</option>
                        <option value="2">{{$t('search_info_position_type.two')}}</option>
                        <option value="3">{{$t('search_info_position_type.three')}}</option>
                      </select>
                    
                    </div>
                  </div>

                </div>






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
import CheckBoxInput from '../inputs/checkbox';
import TooltipComponent from '../base/tooltip';

export default {
  components: {
    CheckBoxInput,
    TooltipComponent
  },
  data() {
    return {
      state: {
        open: false,
        tooltip: false
      },
      settings: this.$store.state.settings
    };
  },
  i18n: {
    messages: {
      en: {
        features: 'Features',
        title: 'Preferences',
        intro: 'This page allows you to change the application\'s behaviour to your preferences.  We also use it to experiment with different versions of components so you can test them to see what you prefer.',
        instruction: 'Changes are saved and applied immediately',
        close: 'Close',
        rpp: 'Number of rows per page in a datagrid / list',
        action_button: 'How to display actions on the view subscription page?',
        action_button_type: {
          one: 'Dropdown with default action',
          two: 'Dropdown without default action (textual)',
          three: 'Dropdown without default action (icon)',
          four: 'Individual icons per action (FedNot standard)'
        },
        search_info_position: 'Where to display the detailed information on a list search?',
        search_info_position_type: {
          one: 'Within the dropdown items',
          two: 'Underneath the dropdown for the selected item',
          three: 'Both locations',
        },
        enable_additional_registration: 'Enable CRT registration for a marriage contract',
        allow_all_notaries_for_support: 'Allow a support user to select a notary outside of the selected study',
        allow_multiple_registrations: 'Enable multiple registrations support',
        consultation_history_enabled: 'Enable consultation history',
        consultation_register_checkboxes: 'Use checkboxes to choose registers to consult',
        enable_versioning_of_registrations: 'Enable versioning of deeds'
      },
      nl: {
        features: 'Functionaliteiten',
        title: 'Voorkeuren',
        intro: 'Deze pagina laat je toe het gedrag van de applicatie naar jouw wensen in te stellen.  We gebruiken het ook om met verschillende versies van componenten te experimenteren, zodat je ze kan testen om te bepalen welke je verkiest.',
        instruction: 'Wijzigingen worden onmiddellijk bewaard en toegepast',
        close: 'Sluiten',
        rpp: 'Aantal rijen per pagina in een datagrid / lijst',
        action_button: 'Hoe de acties tonen op de detailpagina van een inschrijving',
        action_button_type: {
          one: 'Dropdown met een standaard actie',
          two: 'Dropdown zonder standaard actie (textueel)',
          three: 'Dropdown zonder standaard actie (icoon)',
          four: 'Individuele iconen per actie (FedNot standaard)'
        },
        search_info_position: 'Waar de gedetailleerde informatie op een dropdown tonen?',
        search_info_position_type: {
          one: 'In de individuele dropdown items',
          two: 'Onder de dropdown voor het geselecteerde item',
          three: 'Op beide plaatsen',
        },
        enable_additional_registration: 'Activeer CRT registraties voor een huwelijkscontract',
        allow_all_notaries_for_support: 'Laat een steundienstmedewerker toe een notaris buiten het geselecteerde kantoor te kiezen',
        allow_multiple_registrations: 'Activeer optie om meerdere registraties uit te voeren',
        consultation_history_enabled: 'Activeer geschiedenis van consultaties',
        consultation_register_checkboxes: 'Gebruik checkboxes om te consulteren registers te selecteren',
        enable_versioning_of_registrations: 'Activeer versionering van inschrijvingen'
      },
      fr: {
        features: 'Fonctionnalités',
        title: 'Préférences',
        intro: 'Cette page vous permet de paramétrer le comportement de l\'application selon vos préférences. Nous l\'utilisons également pour expérimenter avec différentes versions de composants afin que vous puissiez les tester pour déterminer laquelle vous préférez.',
        instruction: 'Modifications sont immédiatement sauvegardées et appliquées',
        close: 'Fermer',
        rpp: 'Nombre de lignes par page dans un datagrid / une liste',
        action_button: 'Comment visualiser les actions sur la page détail d\'une inscription?',
        action_button_type: {
          one: 'Dropdown avec une action défaut',
          two: 'Dropdown sans action défault (textuel)',
          three: 'Dropdown sans action défault (icône)',
          four: 'Des icônes individuelles par action (standard FedNot)'
        },
        search_info_position: 'Où montrer les details dans un dropdown?',
        search_info_position_type: {
          one: 'Dans les items individuels',
          two: 'Sous le dropdown pour l\'item sélectionné',
          three: 'Les deux places',
        },
        enable_additional_registration: 'Activer l\'enregistrements RCT pour un contrat de marriage',
        allow_all_notaries_for_support: 'Permettre à un agent de choisir un notaire en dehors de l\'étude sélectionnée',
        allow_multiple_registrations: 'Activer l\'enregistrement de plusieurs dossiers',
        consultation_history_enabled: 'Activer historique des consultations',
        consultation_register_checkboxes: 'Utilisez les cases à cocher pour choisir les registres à consulter',
        enable_versioning_of_registrations: 'Activer le versioning des inscriptions'
      }
    }
  }
}
</script>