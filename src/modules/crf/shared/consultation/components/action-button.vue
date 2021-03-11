<template>
  
  <div>
    <div v-if="parseInt($store.state.settings.action_button_type) === 1">
      <div class="relative" v-click-outside="close">
    <div
          class=" font-semibold text-sm text-white bg-indigo-800 rounded shadow hover:bg-indigo-700 flex flex-row items-center flex flex-row items-center"
        >
        
          <div v-on:click="pdf()" class="py-2 pl-4 pr-2 cursor-pointer">{{$t('pdf')}}</div>
          <div class="border-l border-indigo-500 p-2 pr-4 ml-2 cursor-pointer" v-on:click="state.open = !state.open">
            <icon-down class="w-4 h-4"></icon-down>
          </div>
    </div>
    <div class="absolute right-0 bg-white rounded shadow overflow-hidden" v-if="state.open">
        <div v-on:click="repeat()" class="  py-2 px-4  font-semibold cursor-pointer hover:bg-gray-50 text-indigo-600"
          
        >{{$t('repeat')}}</div>
        
    </div>
    </div>
    </div>  
    <div v-else-if="parseInt($store.state.settings.action_button_type) === 2">

      <div class="relative" v-click-outside="close">
    <div
          class=" font-semibold text-sm text-white bg-indigo-800 rounded shadow hover:bg-indigo-700 flex flex-row items-center flex flex-row items-center"
        >
        
          <div class="py-2 pl-4 pr-2 cursor-pointer" v-on:click="state.open = !state.open">{{$t('actions')}}</div>
          <div class="border-l border-indigo-500 p-2 pr-4 ml-2 cursor-pointer" v-on:click="state.open = !state.open">
            <icon-down class="w-4 h-4"></icon-down>
          </div>
    </div>
    <div class="absolute right-0 bg-white rounded shadow overflow-hidden text-indigo-600" v-if="state.open">
        <div v-on:click="pdf()" class=" hover:bg-gray-50 py-2 px-4 cursor-pointer font-semibold flex flex-row items-center">
          <icon-pdf class="w-6 h-6 mr-4"></icon-pdf>
          <div>{{$t('pdf')}}</div>
        </div>
        <div v-on:click="repeat()" class="  py-2 px-4  font-semibold flex flex-row items-center cursor-pointer hover:bg-gray-50"
        >
          <icon-repeat class="w-6 h-6 mr-4"></icon-repeat>
          <div>{{$t('repeat')}}</div>
        </div>
      
    </div>
    </div>

    </div>
    <div v-else-if="parseInt($store.state.settings.action_button_type) === 3">

<div class="relative" v-click-outside="close">
    <div
          class=" font-semibold text-sm text-white bg-indigo-800 rounded shadow hover:bg-indigo-700 flex flex-row items-center flex flex-row items-center"
        >
        
          <div class="py-2 pl-2 pr-2 cursor-pointer" v-on:click="state.open = !state.open">
            <icon-gear class="w-6 h-6"></icon-gear>
         </div>
          
    </div>
    <div class="absolute right-0 bg-white rounded shadow overflow-hidden text-indigo-600" v-if="state.open">
       <div v-on:click="pdf()" class=" hover:bg-gray-50 py-2 px-4 cursor-pointer font-semibold flex flex-row items-center">
          <icon-pdf class="w-6 h-6 mr-4"></icon-pdf>
          <div>{{$t('pdf')}}</div>
        </div>
        <div v-on:click="repeat()" class="  py-2 px-4 font-semibold flex flex-row items-center cursor-pointer hover:bg-gray-50"
        >
          <icon-repeat class="w-6 h-6 mr-4"></icon-repeat>
          <div>{{$t('repeat')}}</div>
        </div>
        
    </div>
    </div>


    </div>
    <div v-else-if="parseInt($store.state.settings.action_button_type) === 4" class="flex flex-row items-center">

    <tooltip-component class="relative mr-4"  :tooltip="$t('pdf')" >
        <div v-on:click="pdf()"><icon-pdf class="w-6 h-6 cursor-pointer text-gray-400 hover:text-indigo-600 transition-all"></icon-pdf></div>
     </tooltip-component>

    <tooltip-component class="relative mr-4"  :tooltip="$t('repeat')" >
        <div v-on:click="repeat()"><icon-repeat class="w-6 h-6 transition-all cursor-pointer text-gray-400 hover:text-indigo-600"
          
        ></icon-repeat></div>
     </tooltip-component>


    </div>
  </div>  

  

</template>
<script>
import IconGear from '../../../../../components/icons/gear';

import IconDown from '../../../../../components/icons/down';
import IconRepeat from '../../../../../components/icons/repeat';
import IconPdf from '../../../../../components/icons/pdf';

import { jsPDF } from "jspdf";
import _ from 'lodash';
import moment from 'moment/min/moment-with-locales';
import TooltipComponent from '../../../../../components/base/tooltip';

export default {
  components: {
    IconGear,
    IconDown,
    IconRepeat,
    IconPdf,
    TooltipComponent
  },
  data() {
    return {
      state: {
        open: false,
        action: null,
      }
    }
  },
  props: {
    consultation: {
      required: true
    }
  },
  methods: {
    close: function() {
      this.state.open = false;
    },
    repeat() {
      this.$router.push({
        path: '/' + this.$route.params.locale + '/crf/consultations/create',
        query: {
          from: this.consultation.consultation_id
        }
      });
    },
    pdf() {
      let pdf = new jsPDF();

      let page_footered = 1;

      let deed = this.deed;
      let self = this;

      pdf.addImage('data:image/png;base64,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', 
          'png', 80, 10, 50, 24, 'logo', 'SLOW', 0)

      pdf.setFontSize(14);
      pdf.setTextColor('#999999');
      pdf.text(this.$t('cert.title'), 105, 40, {align: 'center'})
     
      pdf.setTextColor('#666666');
      pdf.setFontSize(18);
      pdf.text(this.$t('cert.summary'), 105, 50, {align: 'center'});
    
      pdf.line(40,43,170,43);
      pdf.line(40,52,170,52);
      pdf.line(40,43,40,52);
      pdf.line(170,43,170,52);

      // Registration information
      pdf.setFontSize(12);
      pdf.setTextColor('#333333');
      pdf.text(this.$t('cert.dossier'), 10, 65, {align: 'left'});


      pdf.setFontSize(8);
      pdf.setTextColor('#999999');
      pdf.text(this.$t('cert.act.request_date').toUpperCase(), 10, 75, {align: 'left'});
      pdf.text(this.$t('cert.act.registration_date').toUpperCase(), 75, 75, {align: 'left'});
      pdf.text(this.$t('cert.act.reference').toUpperCase(), 140, 75, {align: 'left'});

      pdf.setFontSize(12);
      pdf.setTextColor('#666666');
      pdf.text(moment(deed.registration_date).locale(self.$route.params.locale).format('LL'), 10, 80, {align: 'left'});
      pdf.text(moment(deed.registration_date).locale(self.$route.params.locale).format('LL'), 75, 80, {align: 'left'});
      pdf.text(deed.reference, 140, 80, {align: 'left'});

      // Legal act information
      pdf.setTextColor('#666666');
      pdf.setFontSize(14);
      pdf.text(this.$t('cert.registrations'), 105, 105, {align: 'center'});
    
      pdf.setDrawColor('#999999');
      pdf.line(40,100,170,100);
      pdf.line(40,107,170,107);
      pdf.line(40,100,40,107);
      pdf.line(170,100,170,107);

      let registers =_.uniq(_.map(deed.acts, function(a) {
        return self.$store.getters.meta('register_types', a.register);
      }));

      let pos = 120;
      registers.forEach(function(r) {

          let register_pos = pos;

          // title:
          pdf.setTextColor('#333333');
          pdf.setFontSize(12);
          pdf.text(r.label[self.$route.params.locale], 10, pos, {align: 'left'});
          pos = pos + 10;

          pdf.setTextColor('#666666');
          pdf.setFontSize(10);
          deed.acts.forEach(function(act) {
            if(act.register === r.id) {
              pdf.text(act.reference, 15, pos, {align: 'left'});
              if(act.cancelled_at === null) {
                 pdf.setTextColor('#10B981');
                 pdf.text(self.$t('cert.act.active'), 200, pos, {align: 'right'});
              } else {
                pdf.setTextColor('#EF4444');
                 pdf.text(self.$t('cert.act.cancelled'), 200, pos, {align: 'right'});
              }
              pdf.setTextColor('#666666');
              
              let lines = pdf.splitTextToSize('[' + (self.$store.getters.meta('registration_types', act.id).code || act.id) + '] ' + self.$store.getters.meta('registration_types', act.id).label[self.$route.params.locale], 100);
              pdf.text(lines , 75, pos, {align:'left', maxWidth: 100});
              pos = pos + 7 + 4 * (lines.length - 1);
            }
          })

          pdf.setFillColor('#efefef');
          pdf.roundedRect(10, register_pos + 5, 190, pos - register_pos - 10, 1, 1, 'F');

          pdf.setTextColor('#666666');
          pdf.setFontSize(10);
          pos = register_pos + 10;
          deed.acts.forEach(function(act) {
            if(act.register === r.id) {
              pdf.text(act.reference, 15, pos, {align: 'left'});
              if(act.cancelled_at === null) {
                 pdf.setTextColor('#10B981');
                 pdf.text(self.$t('cert.act.active'), 195, pos, {align: 'right'});
              } else {
                pdf.setTextColor('#EF4444');
                 pdf.text(self.$t('cert.act.cancelled'), 195, pos, {align: 'right'});
              }
              pdf.setTextColor('#666666');
              
              let lines = pdf.splitTextToSize('[' + (self.$store.getters.meta('registration_types', act.id).code || act.id) + '] ' + self.$store.getters.meta('registration_types', act.id).label[self.$route.params.locale], 100);
              pdf.text(lines , 75, pos, {align:'left', maxWidth: 100});
              pos = pos + 7 + 4 * (lines.length - 1);
            }
          })
          
          pdf.setFontSize(12);
          pdf.setTextColor('#333333');

          pos = pos + 15;
        })



      //pdf.text(this.$t('cert.reference').toUpperCase(), 10, 100, {align: 'left'});
      //pdf.text(this.$t('cert.register').toUpperCase(), 75, 100, {align: 'left'});
      //pdf.text(this.$t('cert.registration').toUpperCase(), 140, 100, {align: 'left'});


      for(let i = 0; i < deed.acts.length; i++) {
        pdf.addPage();

        let act = deed.acts[i];
        
        pdf.addImage('data:image/png;base64,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', 
          'png', 80, 10, 50, 24, 'logo', 'SLOW', 0)

        pdf.setFontSize(14);
        pdf.setTextColor('#999999');
        pdf.text(this.$t('cert.act.title', {register: this.$store.getters.meta('register_types', act.register).label[this.$route.params.locale]}), 105, 40, {align: 'center'})
     
        pdf.setTextColor('#666666');
        pdf.setFontSize(18);
        pdf.text(this.$store.getters.meta('register_types', act.register).name[this.$route.params.locale] + '-' + act.reference, 105, 50, {align: 'center'});
     
        pdf.line(40,43,170,43);
        pdf.line(40,52,170,52);
        pdf.line(40,43,40,52);
        pdf.line(170,43,170,52);


        // Registration information
        pdf.setFontSize(12);
        pdf.setTextColor('#333333');
        pdf.text(this.$t('cert.act.registration'), 10, 65, {align: 'left'});
        if(act.cancelled_at !== null) {
            pdf.setTextColor('#EF4444');
            pdf.text(self.$t('cert.act.cancelled_information', {date: moment(act.cancelled_at).locale(self.$route.params.locale).format('LL')}), 75, 65, {align: 'left'});
        }

        pdf.setTextColor('#333333');


        pdf.setFontSize(8);
        pdf.setTextColor('#999999');
        pdf.text(this.$t('cert.act.request_date').toUpperCase(), 10, 75, {align: 'left'});
        pdf.text(this.$t('cert.act.registration_date').toUpperCase(), 75, 75, {align: 'left'});
        pdf.text(this.$t('cert.act.reference').toUpperCase(), 140, 75, {align: 'left'});

        pdf.setFontSize(12);
        pdf.setTextColor('#666666');
        pdf.text(moment(deed.registration_date).locale(self.$route.params.locale).format('LL'), 10, 80, {align: 'left'});
        pdf.text(moment(deed.registration_date).locale(self.$route.params.locale).format('LL'), 75, 80, {align: 'left'});
        pdf.text(deed.reference, 140, 80, {align: 'left'});

        // Legal act information
        pdf.setFontSize(12);
        pdf.setTextColor('#333333');
        pdf.text(this.$t('cert.act.deed'), 10, 95, {align: 'left'});

        let registration_name = pdf.splitTextToSize(
          '[' + (this.$store.getters.meta('registration_types', act.id).code || act.id) + '] ' + this.$store.getters.meta('registration_types', act.id).label[this.$route.params.locale], 
          110);

        pdf.setFontSize(12);
        pdf.setTextColor('#999999');
        pdf.text(this.$t('cert.act.type'), 10, 105, {align: 'left'});
        pdf.text(this.$t('cert.act.deed_date'), 10, 112 + (registration_name.length - 1) * 4, {align: 'left'});
        pdf.text(this.$t('cert.act.notary'), 10, 119 + (registration_name.length - 1) * 4, {align: 'left'});
        pdf.text(this.$t('cert.act.study'), 10, 126 + (registration_name.length - 1) * 4, {align: 'left'});
        pdf.text(this.$t('cert.act.repertorium'), 10, 133 + (registration_name.length - 1) * 4, {align: 'left'});

        pdf.setFontSize(12);
        pdf.setTextColor('#666666');

        
        pdf.text(registration_name , 75, 105, {align:'left', maxWidth: 110});

        pdf.text(deed.deed_date, 75, 112 + (registration_name.length - 1) * 4, {align: 'left'});

        switch(deed.study.type) {
          case 'be':
            pdf.text(deed.notary.be.last_name + ' ' + deed.notary.be.first_name, 75, 119 + (registration_name.length - 1) * 4, {align: 'left'});
            pdf.text(deed.study.be.name, 75, 126 + (registration_name.length - 1) * 4, {align: 'left'});
            break;
          case 'foreign':
            pdf.text(deed.notary.foreign.name, 75, 119 + (registration_name.length - 1) * 4, {align: 'left'});
            pdf.text(deed.study.foreign.name, 75, 126 + (registration_name.length - 1) * 4, {align: 'left'});
            break;
          default:
            pdf.text('to_be_implemented', 75, 119 + (registration_name.length - 1) * 4, {align: 'left'});
            pdf.text('to_be_implemented', 75, 126 + (registration_name.length - 1) * 4, {align: 'left'});
        }

        pdf.text(deed.repertorium, 75, 133 + (registration_name.length - 1) * 4, {align: 'left'});

        pdf.setFontSize(12);
        pdf.setTextColor('#333333');
        pdf.text(this.$t('cert.act.declarers'), 10, 148 + (registration_name.length - 1) * 4, {align: 'left'});

        let pos = 158 + (registration_name.length - 1) * 4;

        act.data.declarers.forEach(function(d) {

          pdf.setFillColor('#efefef');
          pdf.roundedRect(10, pos-5, 190, 25, 1, 1, 'F');

          pdf.setFontSize(12);

          pdf.setTextColor('#999999');
          pdf.text(self.$t('cert.declarer.rrn'), 15, pos+2, {align: 'left'});
          pdf.text(self.$t('cert.declarer.last_name'), 15, pos+ 9, {align: 'left'});
          pdf.text(self.$t('cert.declarer.first_name'), 15, pos + 16, {align: 'left'});

          pdf.setTextColor('#666666');
          pdf.text(d.rrn, 75, pos+2, {align: 'left'});
          pdf.text(d.last_name, 75, pos+ 9, {align: 'left'});
          pdf.text(d.first_name, 75, pos + 16, {align: 'left'});

          pos = pos + 28;
        })

        for(let p = page_footered; p <= pdf.getNumberOfPages(); p++) {
          pdf.setPage(p);
          pdf.setFontSize(8);
          pdf.setTextColor('#666666');

          pdf.text(this.$t('cert.validity', {date: moment().locale(self.$route.params.locale).format('LL')}), 105, 270, {align: 'center'});
          pdf.setTextColor('#999999');
          pdf.text(this.$t('fednot.name'), 105, 276, {align: 'center'});
          pdf.text(this.$t('fednot.address', {register: this.$store.getters.meta('register_types', act.register).name[this.$route.params.locale].toLowerCase()}), 105, 280, {align: 'center'});
          pdf.text(this.$t('fednot.company_number') + ' BE0409.357.321', 105, 284, {align: 'center'});
          
          page_footered += 1;
          //Koninklijke Federatie van het Belgisch Notariaat vzw
          //Bergstraat 30-34 - B-1000 BRUSSEL Tel. 02 505 08 11 Fax 02 505 08 56 e-mail crt@fednot.be
          //Ondernemingsnummer 0409.357.321

        }


        for(let j = 0; j < 290; j+=10) {
          //pdf.line(0,j,1,j);
        }
        
     
     }

     for(let p = 1; p <= pdf.getNumberOfPages(); p++) {
          pdf.setPage(p);
          pdf.setFontSize(8);
          pdf.setTextColor('#666666');

          pdf.text(this.$t('page', {page: p, total: pdf.getNumberOfPages()}), 105, 290, {align: 'center'});
          
          
          page_footered += 1;
          //Koninklijke Federatie van het Belgisch Notariaat vzw
          //Bergstraat 30-34 - B-1000 BRUSSEL Tel. 02 505 08 11 Fax 02 505 08 56 e-mail crt@fednot.be
          //Ondernemingsnummer 0409.357.321

        }



      pdf.save(this.$t('cert.document_title', {reference: this.deed.reference}) + ".pdf");
      

    }
  },
  i18n: {
    messages: {
      en: {
        page: 'Page {page} of {total}',
        fednot: {
          name: 'Koninklijke Federatie van het Belgisch Notariaat vzw',
          address: 'Bergstraat 30-34 - B-1000 BRUSSEL - Tel 02 505 08 11 - Fax 02 505 08 56 - email {register}@fednot.be',
          company_number: 'Company number'
        },
        actions: 'Actions',
        repeat: 'Repeat consultation',
        pdf: 'Certificate',
        cert: {
          validity: 'This certificate confirms the registration status as known on {date} and loses its validity in case of future corrections or cancellations.',
          summary: 'Summary of your registration',
          document_title: 'Certificate of registration for {reference}',
          title: 'Certificate of registration',
          dossier: 'Dossier',
          registrations: 'Registrations',
          act: {
            title: 'Certificate of registration in {register}',
            registration_date: 'Date of registration',
            request_date: 'Date of request',
            reference: 'Your reference',
            registration: 'Registration',
            deed: 'Deed information',
            type: 'Type of the deed',
            deed_date: 'Date of the deed',
            notary: 'Notary',
            study: 'Study',
            repertorium: 'Repertorium',
            declarers: 'Declarers',
            active: 'Registered',
            cancelled: 'Cancelled',
            cancelled_information: 'This registration was cancelled on {date}'
          },
          declarer: {
            rrn: 'Identification Number',
            last_name: 'Last Name',
            first_name: 'First Name(s)'
          }
        }
      },
      nl: {
        page: 'Pagina {page} van {total}',
        fednot: {
          name: 'Koninklijke Federatie van het Belgisch Notariaat vzw',
          address: 'Bergstraat 30-34 - B-1000 BRUSSEL - Tel 02 505 08 11 - Fax 02 505 08 56 - email {register}@fednot.be',
          company_number: 'Ondernemingsnummer'
        },
        actions: 'Acties',
        repeat: 'Herhaal consultatie',
        pdf: 'Certificaat',
        cert: {
          validity: 'Dit certificaat bevestigt de inschrijvingsstatus zoals bekend op {date} en verliest haar geldigheid bij toekomstige correcties of annuleringen.',
          summary: 'Samenvatting van uw inschrijving',
          document_title: 'Certificaat van inschrijving voor {reference}',
          title: 'Certificaat van inschrijving',
          dossier: 'Dossier',
          registrations: 'Inschrijvingen',
          act: {
            title: 'Certificaat van inschrijving in {register}',
            registration_date: 'Inschrijvingsdatum',
            request_date: 'Aanvraagdatum',
            reference: 'Uw kenmerk',
            registration: 'Inschrijving',
            deed: 'Informatie over de akte',
            type: 'Type van de akte',
            deed_date: 'Datum van de akte',
            notary: 'Instrumenterende notaris',
            study: 'Notariskantoor',
            repertorium: 'Repertoriumnummer',
            declarers: 'Declaranten',
            active: 'Ingeschreven',
            cancelled: 'Geannuleerd',
            cancelled_information: 'Deze inschrijving werd op {date} geannuleerd'
          },
          declarer: {
            rrn: 'Identificatienummer',
            last_name: 'Familienaam',
            first_name: 'Voorna(a)m(en)'
          }
        }
      },
      fr: {
        page: 'Page {page} de {total}',
        fednot: {
          name: 'Fédération Royale du Notariat belge asbl',
          address: 'Rue de la Montagne 30-34 - B-1000 BRUXELLES - Tel 02 505 08 11 - Fax 02 505 08 56 - email {register}@fednot.be',
          company_number: 'Numéro d\'entreprise'
        },
        actions: 'Actions',
        repeat: 'Répéter la consultation',
        pdf: 'Certificat',
        cert: {
          validity: 'Ce certificat confirme le statut d\'inscription connu au {date} et perd sa validité en cas de futures corrections ou annulations.',
          dossier: 'Dossier',
          registrations: 'Inscriptions',
          summary: 'Résumé de votre inscription',
          document_title: 'Certificat d\'inscription pour {reference}',
          title: 'Certificat d\'inscription',
          act: {
            title: 'Certificat d\'inscription dans {register}',
            registration_date: 'Date d\'inscription',
            request_date: 'Date de la demande',
            reference: 'Votre référence',
            registration: 'Inscription',
            deed: 'Données de l\'acte',
            type: 'Type de l\'acte',
            deed_date: 'Date de l\'acte',
            notary: 'Notaire',
            study: 'Nom de l\'étude',
            repertorium: 'Numéro de répertoire',
            declarers: 'Déclarants',
            active: 'Inscrit',
            cancelled: 'Annulé',
            cancelled_information: 'Cette inscription a été annulée le {date}'
          },
          declarer: {
            rrn: 'Numéro d\'identification',
            last_name: 'Nom',
            first_name: 'Prénom(s)'
          }
        }
      }
    }
  }

}
</script>