<template>
  <div class="relative">
    <button
      class="font-semibold text-sm hover:text-white transition-all outline-none"
      v-on:click="state.open = !state.open"
    >
      <tooltip-component :tooltip="$t('title')" :inverse="true">
        <icon-email class="stroke-current w-4 h-4"></icon-email>
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
                
                <div class="flex flex-row items-center justify-between px-6 border-b">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 py-4"
                    id="modal-headline"
                  >
                    {{$t('title')}}
                  </h3>
                </div>
                <div class="flex flex-row text-gray-700 h-96">
                  <div class="flex flex-col w-96 bg-gray-50 border-r">
                    <div class="bg-gray-700 flex flex-row items-center justify-between px-6 py-2 text-xs border-b">
                      <div class=" rounded px-2 py-1 transition-all duration-150"
                        :class="{
                          'cursor-pointer bg-gray-50': state.page > 1,
                          'cursor-not-allowed bg-gray-900': state.page === 1
                        }" v-on:click="state.page = (state.page - (state.page > 1 ? 1 : 0))"
                      >{{$t('prev')}}</div>
                      <div class="text-gray-50">{{$t('page', {page: state.page, total: emails.length })}}</div>
                      <div class=" rounded px-2 py-1 transition-all duration-150"
                        :class="{
                          'cursor-pointer bg-gray-50 ': state.page < emails.length,
                          'cursor-not-allowed bg-gray-900': state.page >= emails.length
                        }" v-on:click="state.page = (state.page + (state.page < emails.length ? 1 : 0))"
                      >{{$t('next')}}</div>
                    </div>
                    <div class="flex flex-col overflow-y-scroll">
                      <div v-for="email in emails[state.page - 1]" :key="email.id" class="flex flex-row">
      
                        <div class="w-1 transform transition-all duration-300 ease-in-out origin-center"
                          :class="{
                            'scale-y-0': state.selected === null || email.id !== state.selected.id,
                            'scale-y-100 bg-indigo-800': state.selected !== null && email.id === state.selected.id,
                          }">
                        </div>
                        <div  class="transition-all duration-300 flex-grow pl-5 pr-6 py-2 hover:bg-white flex flex-col cursor-pointer" v-on:click="state.selected = email"
                        
                        >
                          <div class="flex flex-row items-center justify-between">
                            <div class="text-xs font-semibold">{{email.to.first_name}} {{email.to.last_name}}</div>
                            <div class="text-xs font-semibold">{{moment(email.sent).format('LLL')}}</div>
                          </div>
                          <div>{{$t('email.subjects.' + email.type, email.subject)}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col flex-grow">
                  
                    <div
                      v-if="state.selected === null"
                      class="bg-white flex flex-col items-center py-24"
                    >
                      <icon-email class="w-16 h-16 text-gray-400"></icon-email>
                      <div class="text-gray-500 text-xl mt-6">{{ $t("no_data") }}</div>
                    </div>
                    <div v-else class="flex flex-col">
                        <div class="flex flex-row justify-between border-b bg-gray-50">

                          <div class=" px-6 py-4  flex flex-col">
                            <div class="font-semibold flex flex-row items-center ">
                              <div class="border rounded-full text-xs uppercase text-gray-500 px-2 py-1 mr-4">{{$t('subject')}}</div>
                              <div>{{$t('email.subjects.' + state.selected.type, state.selected.subject)}} </div>
                            </div>                      
                          </div>
                          <div class=" px-6 py-4  flex flex-col">
                            <div class="font-semibold flex flex-row items-center ">
                              <div class="border rounded-full text-xs uppercase text-gray-500 px-2 py-1 mr-4">{{$t('to')}}</div>
                              <div>{{state.selected.to.first_name}} {{state.selected.to.last_name}}</div>
                            </div>
                          </div>
                          <div class=" px-6 py-4 flex flex-col">
                            <div class="font-semibold flex flex-row items-center ">
                              <div class="border rounded-full text-xs uppercase text-gray-500 px-2 py-1 mr-4">{{$t('sent')}}</div>
                              <div>{{moment(state.selected.sent).format('LLL')}}</div>
                            </div>
                                                  
                          </div>
                        </div>
                        <div class="text-center text-xs text-gray-500 mt-2">{{$t('email.reasons.' + state.selected.type, state.selected.subject)}} </div>                      
                        <email-details :email="state.selected"></email-details>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row items-center justify-between">
            <div></div>
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
import moment from "moment";

import TooltipComponent from '../base/tooltip';
import IconEmail from '../icons/email';
import EmailDetails from './email/index';

export default {
  components: {IconEmail, TooltipComponent, EmailDetails},
  data() {
    return {
      state: {
        open: false,
        tooltip: false,
        selected: null,
        page: 1
      },
    };
  },
  computed: {
    myemails() {
      return this.$store.state.data.emails;    
    },
    emails() {
      return _.chunk(_.map(this.myemails, function(email) {
        return email;
      }), 10);
    }
  },
  methods: {
    moment(date) {
      return moment(date).locale(this.$route.params.locale);
    },
  },
  i18n: {
    messages: {
      en: {
        title: 'Email history', 
        subject: 'Subject',
        to: 'To',
        sent: 'Sent',
        close: 'Close',
        email: {
          subjects: {
            crf_deed_created: 'Registration confirmation deed {reference}',
            crf_deed_edited_by_support: 'Registration {reference} has been updated',
            crf_deed_minor_changes: 'Registration {reference} has been updated',
            crf_deed_pending_validation: 'Your changes for dossier {reference} are pending validation',
            crf_deed_staging_approved: 'Registration {reference} has been updated',
            crf_deed_staging_rejected: 'Your changes for dossier {reference} have been rejected',
            crt_after_consultation: 'There is a new CRT registration for dossier {reference}'
          },
          reasons: {
            crf_deed_created: 'This email is sent to the study user creating a new registration',
            crf_deed_edited_by_support: 'This email is sent to all study users that have created and/or modified the deed when Fednot Support modifies the registration',
            crf_deed_minor_changes: 'This email is sent to all study users that have created and/or modified the deed when a minor change without legal implication is published by a study user',
            crf_deed_pending_validation: 'This email is sent to the study user that sent modifications for validation to Fednot Support',
            crf_deed_staging_approved: 'This email is sent to all study users that have created and/or modified the deed when modifications that needed validations have been accepted',
            crf_deed_staging_rejected: 'This email is sent to the study user that sent modifications for validation to Fednot Support when the changes were rejected',
            crt_after_consultation: 'This email is sent to all study users having made a consultation for a person for which a new CRT registration has been done afterwards'
          }
        },
        page: 'Page {page} of {total}',
        prev: 'Previous',
        next: 'Next',
        no_data: 'Select an email to view its details'
      },
      nl: {
        subject: 'Onderwerp',
        to: 'Aan',
        sent: 'Verzonden',
        title: 'Emailhistoriek',
        close: 'Sluiten',
        email: {
          subjects: {
            test: 'Test email',
            crf_deed_created: 'Bevestiging inschrijving deed {reference}',
            crf_deed_edited_by_support: 'Inschrijving {reference} werd gewijzigd',
            crf_deed_minor_changes: 'Inschrijving {reference} werd gewijzigd',
            crf_deed_pending_validation: 'Jouw wijzigingen voor dossier {reference} zijn in afwachting van goedkeuring',
            crf_deed_staging_approved: 'Inschrijving {reference} werd gewijzigd',
            crf_deed_staging_rejected: 'Jouw wijzigingen voor dossier {reference} werden afgewezen',
            crt_after_consultation: 'Er is een nieuwe CRT inschrijving voor dossier {reference}'
          },
          reasons: {
            crf_deed_created: 'Deze email wordt verzonden naar de studiemedewerker die een nieuwe inschrijving heeft gedaan',
            crf_deed_edited_by_support: 'Deze email wordt verzonden naar alle studiemedewerkers die op de inschrijving hebben gewerkt wanneer Fednot Steundienst een wijziging inschrijft',
            crf_deed_minor_changes: 'Deze email wordt verzonden naar alle studiemedewerkers die op de inschrijving hebben gewerkt wanneer een kleine wijziging zonder wettelijke impact door een studiemedewerker wordt doorgevoerd',
            crf_deed_pending_validation: 'Deze email wordt verzonden naar de studiemedewerker die wijzigingen ter validatie naar Fednot Steundienst heeft verstuurd.',
            crf_deed_staging_approved: 'Deze email wordt verzonden naar alle studiemedewerkers die op de inschrijving hebben gewerkt wanneer wijzigingen door Fednot Steundienst werden aanvaard voor inschrijving',
            crf_deed_staging_rejected: 'Deze email wordt verzonden naar de studiemedewerker die wijzigingen ter validatie instuurde wanneer deze door Fednot Steundienst worden geweigerd',
          crt_after_consultation: 'Deze email wordt verzonden naar de studiemedewerkers die een CRT consultatie hebben verricht voor een persoon waarvoor nadien nieuwe inschrijvingen in CRT werden doorgevoerd.'
          
         }
        },
         page: 'Pagina {page} van {total}',
         prev: 'Vorige',
        next: 'Volgende',
        no_data: 'Selecteer een email voor meer details'
      },
      fr: {
        subject: 'Sujet',
        to: 'À',
        sent: 'Envoyé',
        title: 'Historique des courriels',
        close: 'Fermer',
        email: {
          subjects: {
            test: 'Courriel test',
            crf_deed_created: 'Confirmation inscription deed {reference}',
            crf_deed_edited_by_support: 'Inscription {reference} a été modifiée',
            crf_deed_minor_changes: 'Inscription {reference} a été modifiée',
            crf_deed_pending_validation: 'Vos modifications pour dossier {reference} sont en attente d\'approbation',
            crf_deed_staging_approved: 'Inscription {reference} a été modifiée',
            crf_deed_staging_rejected: 'Vos modifications pour dossier {reference} ont été rejettées',
            crt_after_consultation: 'Il y a une nouvelle inscription RCT pour dossier {reference}'
          },
          reasons: {
            crf_deed_created: 'Ce courriel sera envoyé à l\'employé de l\'étude qui a effectué une nouvelle inscription',
            crf_deed_edited_by_support: 'Ce courriel sera envoyé à tous les employés de l\'étude qui ont travaillé sur l\'inscription lorsque Fednot Support enregistre un changement',
            crf_deed_minor_changes: 'Ce courriel sera envoyé à tous les employés de l\'étude qui ont travaillé sur l\'inscription lorsqu\'un changement mineur est effectué par un employé de l\'étude sans impact juridique',
            crf_deed_pending_validation: 'Ce courriel sera envoyé à l\'employé de l\'étude qui a envoyé les modifications au Fednot Support pour validation',
            crf_deed_staging_approved: 'Ce courriel sera envoyé à tous les employés de l\'étude qui ont travaillé sur l\'inscription lorsque les modifications ont été acceptées par Fednot Support',
            crf_deed_staging_rejected: 'Ce courriel sera envoyé à l\'employé de l\'étude qui a soumis les modifications pour validation lorsqu\'elles sont refusées par Fednot Support',
          }
        },
         page: 'Page {page} de {total}',
         prev: 'Précédents',
         next: 'Suivants',
         no_data: 'Sélectionnez un courriel pour plus de détails'
      }
    }
  }
};
</script>