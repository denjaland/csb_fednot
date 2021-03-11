<template>

  <div class="relative" v-click-outside="close">
    <div :class="{
'text-indigo-200 hover:text-white ': messages.length > 0,
'text-indigo-400': messages.length === 0
    }" class=" flex flex-row items-center rounded cursor-pointer" v-on:click="state.open = !state.open">
        <alarm-icon class="w-6 h-6"></alarm-icon>
        <span class="flex h-4 w-4 absolute top-0 right-0 -mr-2 -mt-2" v-if="messages.length > 0">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-4 w-4 bg-green-500 flex flex-col items-center justify-center ring-1 ring-white text-white font-semibold text-xs">{{messages.length}}</span>
        </span>
        <!--div class="bg-green-400 rounded-full absolute top-0 right-0 -mr-3 -mt-3" >
          <div class="animate-ping absolute inline-flex"></div>
          <div class="  text-xs font-semibold flex flex-col items-center justify-center text-white h-5 w-5 rounded-full ring-2 ring-white bg-green-400">{{messages.length}}</div>
        </div-->
      
    </div>
    <div class="z-10 absolute right-0 bg-white rounded shadow overflow-hidden min-w-96 transform transition-all duration-150 ease-in-out origin-top-right" 
      :class="{
        'scale-0': !state.open,
        'scale-100': state.open
      }"
    >
        
        <div class="text-gray-600 transition-all py-3 px-6 flex flex-row items-center" v-if="messages.length === 0">
          <icon-thumb class="text-green-600 w-4 h-4 mr-4"></icon-thumb>
          <div class="whitespace-nowrap">{{$t('no_messages')}}</div>
        </div>
        <div :class="'text-gray-600 hover:text-' + m.color + '-600 transition-all hover:bg-' + m.color + '-100 py-3 px-6 cursor-pointer font-semibold flex flex-row items-center'" v-for="(m, i) in messages" :key="i" v-on:click="m.callback(); state.open = false">
          <component :is="m.icon + '-icon'" :class="'w-4 h-4 mr-4 text-' + m.color + '-600'"></component>
          <div class="whitespace-nowrap">{{m.message}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import AlarmIcon from '../icons/alarm';
import WorkIcon from '../icons/work';
import AlertIcon from '../icons/alert';
import IconThumb from '../icons/thumbsup';
import _ from 'lodash';

export default {
  components: {AlarmIcon, WorkIcon, AlertIcon, IconThumb},
  data(){
    return {
      state: {
        open: false,
      },
      colors: {
        crt_after_consultation_of_deceased: 'red'
      },
      icons: {
        crt_after_consultation_of_deceased: 'alert'
      }
    }
  },
  
  computed: {
    basemessages() {
      let self = this;
      return _.filter(self.$store.state.data.messages, function(m) { return !m.read && m.user.id === self.$store.state.state.user.id; })
    },

    messages() {
      let self = this;
      let messages = [];

      if(this.workitemcount > 0) {
        messages.push({
          color: 'blue',
          icon: 'work',
          message: this.$tc('workitems', this.workitemcount, {count: this.workitemcount}),
          callback() {
            if(!self.$route.path.startsWith('/' + self.$route.params.locale + '/crf/registrations') || self.$route.params.lens !== 'work') {
              self.$router.push('/' + self.$route.params.locale + '/crf/registrations?lens=work');
            }
          
          }     
        });
      } 

      _.each(this.basemessages, function(m) {

        messages.push({
          color: self.colors[m.message] || 'gray',
          icon: self.icons[m.message] || 'work',
          message: self.$t('messages.' + m.message, {deceased: m.payload.deceased.last_name + ' ' + m.payload.deceased.first_name}),
          callback() {
            switch(m.message) {
              case 'crt_after_consultation_of_deceased':
                if(!self.$route.path.startsWith('/' + self.$route.params.locale + '/crf/consultations/' + m.payload.consultation.consultation_id)) {
                  self.$router.push('/' + self.$route.params.locale + '/crf/consultations/' + m.payload.consultation.consultation_id);
                }
              default:
                // do nothing

            }
            self.$store.commit('markRead', m);

          }     
        });
      });

      return messages;
    },
    workitemcount() {
      if(this.$store.state.state.user === null || this.$store.state.state.user.role_id !== 3) return 0;
      return _.filter(this.$store.state.data.deeds, function(d) {
        return _.filter(d.staging, function(s) { return s.status === 'pending'; }).length > 0;
      }).length;
    },
  }
,
methods: {
  close() {this.state.open = false;}
},
i18n: {
  messages: {
    en: {
      workitems: 'You have a modification pending validation | You have {count} modifications pending validation',
      messages: {
        crt_after_consultation_of_deceased: 'There are new CRT registrations for {deceased}'
      },
      no_messages: 'You have no new messages.'
    },
    nl: {
      workitems: 'Je hebt een wijziging in afwachting van validatie | je hebt {count} wijzigingen in afwachting van validatie',
      messages: {
        crt_after_consultation_of_deceased: 'Er zijn nieuwe CRT inschrijvingen for {deceased}'
      },
      no_messages: 'Je hebt geen nieuwe berichten.'
    },
    fr: {
      workitems: 'Vous avez une modification à valider | Vous avez {count} modifications à valider',
      messages: {
        crt_after_consultation_of_deceased: 'Il y a de nouveaux inscriptions RCT pour {deceased}'
      },
      no_messages: 'Il n\'y a pas de nouveaux messages'
    }
  }
}

}
</script>