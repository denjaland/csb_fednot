<template>
  <model-viewer :model="deed">
    <div v-if="deed !== null">
      <div class="flex flex-row items-center text-gray-500 mb-2">
            
          <router-link :to="'/' + $route.params.locale + '/crf'"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="stroke-current w-4 h-4"><g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"><path d="M3.753,13.944v8.25h6v-6a1.5,1.5,0,0,1,1.5-1.5h1.5a1.5,1.5,0,0,1,1.5,1.5v6h6v-8.25" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M.753,12.444,10.942,2.255a1.5,1.5,0,0,1,2.122,0L23.253,12.444" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg> </router-link>     
          <div class="mx-3 text-gray-400">/</div>
          <router-link :to="'/' + $route.params.locale + '/crf/registrations'">{{$t('breadcrumb')}}</router-link>
          <div class="mx-3 text-gray-400">/</div>
          <router-link :to="'/' + $route.params.locale + '/crf/registrations/' + $route.params.id">{{deed.reference}}</router-link>
          <div class="mx-3 text-gray-400">/</div>
      </div>
      <div class="flex flex-row items-center justify-between mb-4">

      
        <div class="flex flex-row items-center">
          <h1 class="text-2xl text-indigo-800 font-semibold">{{$t('title')}} {{deed.reference}}</h1>
          <div :class="'text-' + r.color + '-600 bg-' + r.color + '-100 px-3 py-1 text-base ml-2 rounded-full text-gray-600 font-semibold shadow'" v-for="r in registers" :key="r.id">{{r.name[$i18n.locale]}}</div>
          
          <!--div class="bg-green-100 px-3 py-1 text-base ml-2 rounded-full text-green-600 font-semibold shadow">{{$t('status.registered')}}</div-->
        </div>
        
      </div>

      <div v-if="show_edit_warning" class="bg-red-100 text-red-600 font-semibold text-xs px-8 py-4 shadow mb-4 rounded">
        {{$t('edit_warning')}}
      </div>

      <deed-form v-model="staging" class="mb-12"></deed-form>

      <div class="flex flex-col">
        <h2 class="text-xl text-gray-800 font-semibold mb-2"
          :class="{'text-red-500': comment.length < 3}"
        >{{$t('comments')}}</h2>



        <div class="bg-white rounded shadow mb-12 flex-col p-8">
          <p class="mt-1 text-sm text-gray-500">
                  {{$t('comments_info')}}
                </p>
          <textarea v-model="comment" class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"></textarea>
        </div>
      </div>

        


      <div class="flex flex-col mt-4">
        <div class="flex flex-row items-stretch">
          <div
              
              class="font-semibold text-base text-white  rounded shadow  py-3 px-6 flex flex-row items-center cursor-pointer"
              :class="{
                'cursor-pointer bg-indigo-800 hover:bg-indigo-700': staging.admin.is_valid && staging.comment.length > 2,
                'cursor-not-allowed bg-indigo-400': !staging.admin.is_valid || staging.comment.length < 3
              }"
              v-on:click="storeDeed"
            >
              {{$tc(show_edit_warning ? 'btn' : 'btn_admin', deed.acts.length, { count: deed.acts.length })}}
            
          </div>
          <div v-if="show_warning" class="ml-6 flex flex-grow rounded bg-pink-100 py-3 px-6 rounded text-pink-700 font-semibold shadow">
              {{$t('warning_mc')}}
          </div>
        </div>
      </div>

  </div>
  </model-viewer>
    
</template>
<script>

import _ from 'lodash';
import DeedForm from "../shared/deed/components/crud";
import ModelViewer from "../../../components/base/model-viewer";


export default {
  components: {DeedForm, ModelViewer},
  data: function() {
    return {
      state: {
        selected_act: null,
        actid: 1,
        study_type_open: false,
        register_multiple: false 
      }, 
      staging: null,
      comment: ''
    }
  },
  methods: {
    storeDeed() {
      let self = this;
      if (!this.staging.admin.is_valid) return false;

      let requires_review = !_.isEqual(this.deed.acts, this.staging.acts);
      
      this.$store.commit('stageDeed', _.merge(this.staging, {comment: this.comment}));

      if(this.$store.state.state.user.role_id === 3 || !requires_review) {
        
        
        this.$store.commit('promote', this.deed);
        this.$store.commit('addNotification', {message: this.$t('confirm_admin', this.deed), type: 'success'});
        
        
        // notify all users that have made changes before
        let notifies = [];
        _.each(this.deed.staging, function(s) {
          if(s.deed.user.role_id !== 3) {
            notifies.push(s.deed.user)
          }
        });

        _.each(_.uniqBy(notifies, function(n) { return n.id }), function(n) {
          self.$store.commit('sendEmail', {
            to: n,
            type: self.$store.state.state.user.role_id === 3 ? 'crf_deed_edited_by_support' : 'crf_deed_minor_changes',
            payload: self.$store.getters.deed(self.deed.deed_id),
            subject: {
              reference: self.deed.reference
            }
          });
        });
        

      } else {
        this.$store.commit('addNotification', {message: this.$t('confirm', this.deed), type: 'success'});
        
        self.$store.commit('sendEmail', {
            to: self.$store.state.state.user,
            type: 'crf_deed_pending_validation',
            payload: self.$store.getters.deed(self.deed.deed_id),
            subject: {
              reference: self.deed.reference
            }
          });

      }

      
      this.$router.push('/' + this.$route.params.locale + '/crf/registrations/' + this.$route.params.id);
      
    }
  },
 computed: {
   show_edit_warning() {
     return this.$store.state.state.user.role_id !== 3 && !_.isEqual(this.deed.acts, this.staging.acts);
   },
   show_warning() {
      let mc = _.first(_.filter(this.deed.acts, function(a) {
        return a.id === 14
      }));
      if(typeof mc === 'undefined') {
        return false;
      }

      // check items for 
      let crt6_1 = _.filter(this.deed.acts, function(a) { return a.id === 6 && a.data.declarers[0].id === mc.data.declarers[0].id}).length > 0;
      let crt6_2 = _.filter(_.filter(this.deed.acts, function(a) { return a.id === 6 && a.data.declarers[0].id === mc.data.declarers[1].id})).length > 0;
      let crt10_1 = _.filter(_.filter(this.deed.acts, function(a) { return a.id === 10 && a.data.declarers[0].id === mc.data.declarers[0].id})).length > 0;
      let crt10_2 = _.filter(_.filter(this.deed.acts, function(a) { return a.id === 10 && a.data.declarers[0].id === mc.data.declarers[1].id})).length > 0;

      return (crt6_1 !== crt6_2 || crt10_1 !== crt10_2)


    },
    deed: function() {
      return this.$store.getters.deed(this.$route.params.id);
    },
    registers: function() {
      let registers = [];
      let self = this;
      _.each(this.deed.acts, function(a) {
          registers.push(_.filter(self.$store.state.meta.register_types, function(el) {
            return el.id === a.register;
          })[0]);
        });
        registers = _.uniqBy(registers, 'id');

        return registers;
    }
  },
  beforeMount() {
    this.staging = this.deed;
  },
  i18n: {
    messages: {
      en: {
        title: 'Modify',
        breadcrumb: 'My registrations',
        edit_warning: 'Your modifications will be submitted to our support center for review and will not immediately be registered.',
        warning_mc: 'You are submitting a wedding contract registration with additional (usually mutual) CRT registrations for only one of the two partners',
        btn_admin: 'Apply correction',
        btn: 'Send correction for review to FedNot Support',
        confirm: 'Corrections have been sent to FedNot Support for review',
        confirm_admin: 'Corrections have been registered',
        comments: 'Justification and other comments',
        comments_info: 'Please provide any information required to justify the corrections made to this registration'
      },
      nl: {
        title: 'Wijzigen',
        breadcrumb: 'Mijn inschrijvingen',
        edit_warning: 'Jouw aanpassingen worden verstuurd naar de steundienst voor review en worden niet onmiddellijk ingeschreven',
        coming: 'Deze pagina is nog in opbouw. Kom snel terug!',
        warning_mc: 'Je schrijft een huwelijkscontract met bijkomende (gewoonlijk wederzijdse) CRT inschrijvingen in voor slechts één van beide partners',
        btn_admin: 'Correctie doorvoeren',
        btn: 'Verstuur correctie ter review naar FedNot Support',
        confirm: 'Corrections werden naar FedNot Support gestuurd voor review',
        confirm_admin: 'De inschrijving werd bijgewerkt',
        comments: 'Rechtvaardiging en andere opmerkingen',
        comments_info: 'Gelieve onderstaand de reden op te geven die de verbetering van deze inschrijving rechtvaardigt'
      },
      fr: {
        title: 'Modifier',
        breadcrumb: 'Mes inscriptions',
        edit_warning: 'Vos modifications seront envoyées au service d\'assistance et ne seront pas inscrites immédiatement',
        coming: 'Cette page est encore en cours de construction. Reviens bientôt!',
        warning_mc: 'Vous inscrivez un contrat de mariage avec des inscriptions CRT supplémentaires pour qu\'une des deux partenaires',
        btn_admin: 'Appliquer corrections',
        btn: 'Envoyer corrections vers FedNot Support pour validation',
        confirm: 'Corrections ont été envoyées vers FedNot pour validation',
        confirm_admin: 'Les corrections ont été appliquées',
        comments: 'Justification et autres remarques',
        comments_info: 'Veuillez décrire les raisons justifiants la correction de cette inscription.'
      }
    }
  }
}
</script>