<template>
  <div>
    <div class="flex flex-row items-center text-gray-500 mb-2">
      <router-link :to="'/' + $route.params.locale  + '/crf'"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="stroke-current w-4 h-4"><g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"><path d="M3.753,13.944v8.25h6v-6a1.5,1.5,0,0,1,1.5-1.5h1.5a1.5,1.5,0,0,1,1.5,1.5v6h6v-8.25" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M.753,12.444,10.942,2.255a1.5,1.5,0,0,1,2.122,0L23.253,12.444" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg> </router-link>     
      <div class="mx-3 text-gray-400">/</div>
     
      <router-link :to="'/' + $route.params.locale  + '/crf/registrations'">{{ $t("breadcrumb") }}</router-link>
      <div class="mx-3 text-gray-400">/</div>
    </div>
    <div class="flex flex-row items-center justify-between mb-4">
      <h1 class="text-2xl text-indigo-800 font-semibold">
        {{ $t("title") }}
      </h1>
    </div>

    <deed-form v-model="deed"></deed-form>

    <div class="flex flex-col mt-4">
      <div class="flex flex-row items-stretch">
        <div
          class="font-semibold text-base text-white rounded shadow py-3 px-6 flex flex-row items-center cursor-pointer"
          :class="{
            'cursor-pointer bg-indigo-800 hover:bg-indigo-700':
              deed.admin.is_valid,
            'cursor-not-allowed bg-indigo-400': !deed.admin.is_valid,
          }"
          v-on:click="storeDeed"
        >
          {{ $tc("register", deed.acts.length, { count: deed.acts.length }) }}
        </div>
        <div
          v-if="show_warning"
          class="ml-6 flex flex-grow rounded bg-pink-100 py-3 px-6 rounded text-pink-700 font-semibold shadow"
        >
          {{ $t("warning_mc") }}
        </div>
      </div>
      <div
        class="mt-2 pl-6 font-semibold text-xs"
        v-if="$store.state.settings.allow_multiple_registrations"
      >
        <check-box-input v-model="state.register_multiple">{{
          $t("register_multiple")
        }}</check-box-input>
      </div>
    </div>
  </div>
</template>
<script>

import _ from "lodash";
import moment from "moment";
import CheckBoxInput from "../../../components/inputs/checkbox";

import DeedForm from "../shared/deed/components/crud";



export default {
  components: {

    CheckBoxInput,
    DeedForm,
  },
  data() {
    return {
      state: {
        selected_act: null,
        actid: 1,
        study_type_open: false,
        register_multiple: false,
      },
      deed: {
        deed_id: null,
        admin: {
          allow_all_notaries: false,
          is_valid: false,
        },
        comment: '',
        study: {
          type: "be",
          be: null,
          foreign: {
            name: "",
            address: {
              street: "",
              postal_code: "",
              city: "",
              country: "",
            },
          },
        },
        billable: true,
        notary: {
          be: null,
          foreign: {
            name: "",
          },
        },
        reference: "",
        deed_date: moment().format("YYYY-MM-DD"),
        registration_date: moment().format("YYYY-MM-DD"),
        repertorium: "",
        acts: [],
      },
    };
  },
  computed: {
    show_warning() {
      let mc = _.first(
        _.filter(this.deed.acts, function (a) {
          return a.id === 14;
        })
      );
      if (typeof mc === "undefined") {
        return false;
      }

      // check items for
      let crt6_1 =
        _.filter(this.deed.acts, function (a) {
          return (
            a.id === 6 && a.data.declarers[0].id === mc.data.declarers[0].id
          );
        }).length > 0;
      let crt6_2 =
        _.filter(
          _.filter(this.deed.acts, function (a) {
            return (
              a.id === 6 && a.data.declarers[0].id === mc.data.declarers[1].id
            );
          })
        ).length > 0;
      let crt10_1 =
        _.filter(
          _.filter(this.deed.acts, function (a) {
            return (
              a.id === 10 && a.data.declarers[0].id === mc.data.declarers[0].id
            );
          })
        ).length > 0;
      let crt10_2 =
        _.filter(
          _.filter(this.deed.acts, function (a) {
            return (
              a.id === 10 && a.data.declarers[0].id === mc.data.declarers[1].id
            );
          })
        ).length > 0;

      return crt6_1 !== crt6_2 || crt10_1 !== crt10_2;
    },
    today() {
      return moment().format("YYYY-MM-DD");
    },
    is_valid: function () {
      if (this.deed.acts.length < 1) {
        return false;
      }

      if (
        _.filter(this.deed.acts, function (el) {
          return !el.is_valid;
        }).length > 0
      ) {
        return false;
      }

      return true;
    },

   
    
  },
  methods: {
    

    

    storeDeed() {
      if (!this.deed.admin.is_valid) return false;

      this.$store.commit("addDeed", this.deed);
      this.$store.commit("addNotification", {
        message: this.$t("confirm", this.deed),
        type: "success",
      });

      this.$store.commit('sendEmail', {
        to: this.$store.state.state.user,
        type: 'crf_deed_created',
        payload: _.cloneDeep(this.deed),
        subject: {
          reference: this.deed.reference
        }
      });

      if (
        this.state.register_multiple &&
        this.$store.state.settings.allow_multiple_registrations
      ) {
        let study = this.deed.study;
        let notary = this.deed.notary;
        let deed_date = this.deed.deed_date;
        let admin = this.deed.admin;
        let billable = this.deed.billable;

        Object.assign(this.$data, this.$options.data());

        this.deed.study = _.merge({}, study);
        this.deed.notary = _.merge({}, notary);
        this.deed.admin = _.merge({}, admin);
        this.deed.deed_date = deed_date;
        this.state.register_multiple = true;
        this.deed.billable = billable;
      } else {
        this.$router.push(
          "/" +
            this.$route.params.locale +
            "/crf/registrations/" +
            _.last(this.$store.state.data.deeds).deed_id
        );
      }
    },
  },
  i18n: {
    messages: {
      en: {
        study_types: {
          be: "Belgian study",
          foreign: "Foreign study",
          other: "Other declarer",
        },
        title: "New registration",
        breadcrumb: "My registrations",
        master_data: "Master Data",
        study_title: "Study Data",
        study_info: "Data related to the study making the registration",
        study_name: "Study Name",
        study_address: "Address",
        notary: "Notary",
        dossier_title: "Dossier Data",
        dossier_info: "Data related to the dossier / deed",
        reference: "Reference",
        repertorium: "Repertorium",
        deed_date: "Deed date",
        registration_date: "Registration date",
        legal_acts: "Legal Acts",
        add_act_info:
          "To continue, add at least one legal act to the registration",
        add_act_info_reference: "To continue, enter the dossier reference",
        register:
          "Submit the registration with 1 legal act | Submit the registration with {count} legal acts",
        billable: "Invoice registration",
        warning_mc:
          "You are submitting a wedding contract registration with additional (usually mutual) CRT registrations for only one of the two partners",
        allow_all_notaries: "All notaries",
        inactive: "Inactive",
        register_multiple: "Register multiple dossiers",
        confirm: "Dossier {reference} has successfully been registered",
      },
      nl: {
        study_types: {
          be: "Belgische studie",
          foreign: "Buitenlandse studie",
          other: "Andere aangever",
        },
        title: "Nieuwe inschrijving",
        breadcrumb: "Mijn inschrijvingen",
        master_data: "Kerngegevens",
        study_title: "Studiegegevens",
        study_info:
          "Gegevens met betrekking tot het kantoor dat de registratie verricht",
        study_name: "Naam van de studie",
        study_address: "Adres",
        notary: "Notaris",
        dossier_title: "Dossiergegevens",
        dossier_info: "Gegevens met betrekking tot het dossier / de akte",
        reference: "Referentie",
        repertorium: "Repertorium",
        deed_date: "Aktedatum",
        registration_date: "Inschrijvingsdatum",
        legal_acts: "Rechtshandelingen",
        add_act_info: "Voeg minstens één rechtshandeling toe om verder te gaan",
        add_act_info_reference:
          "Voer de dossierreferentie in alvorens verder te gaan",
        register:
          "Inschrijven met 1 rechtshandeling | Inschrijven met {count} rechtshandelingen",
        billable: "Inschrijving factureren",
        warning_mc:
          "Je schrijft een huwelijkscontract met bijkomende (gewoonlijk wederzijdse) CRT inschrijvingen in voor slechts één van beide partners",
        allow_all_notaries: "Alle notarissen",
        inactive: "Inactief",
        register_multiple: "Schrijf meerdere dossiers in",
        confirm: "Dossier {reference} werd succesvol ingeschreven",
      },
      fr: {
        study_types: {
          be: "Etude belgique",
          foreign: "Etude étrangère",
          other: "Autre déclarant",
        },
        title: "Nouvelle inscription",
        breadcrumb: "Mes inscriptions",
        master_data: "Données de base",
        study_title: "Données de l'étude",
        study_info: "Données relatives à l'étude qui fait l'inscription",
        study_name: "Nom de l'étude",
        study_address: "Adresse",
        notary: "Notaire",
        dossier_title: "Données du dossier",
        dossier_info: "Données relative au dossier / à l'acte",
        reference: "Référence",
        repertorium: "Repertorium",
        deed_date: "Date de l'acte",
        registration_date: "Date d'inscription",
        legal_acts: "Actes juridiques",
        add_act_info:
          "Veuillez ajouter au moins un acte juridique pour continuer",
        add_act_info_reference:
          "Remplissez la référence du dossier pour continuer",
        register:
          "Inscrire avec 1 acte juridique | Inscrire avec {count} actes juridiques",
        billable: "Facturer l'inscription",
        warning_mc:
          "Vous inscrivez un contrat de mariage avec des inscriptions CRT supplémentaires pour qu'une des deux partenaires",
        allow_all_notaries: "Tous notaires",
        inactive: "Inactif",
        register_multiple: "Inscrire plusieurs dossiers",
        confirm: "Dossier {reference} a bien été inscrit",
      },
    },
  },
};
</script>