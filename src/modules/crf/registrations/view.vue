<template>
  <model-viewer :model="deed">
    <div v-if="deed !== null">
    <div class="flex flex-row items-center text-gray-500 mb-2">
      <router-link :to="'/' + $route.params.locale  + '/crf'"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.com/svgjs"
          viewBox="0 0 140 140"
          class="stroke-current w-4 h-4"
        >
          <g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
            <path
              d="M3.753,13.944v8.25h6v-6a1.5,1.5,0,0,1,1.5-1.5h1.5a1.5,1.5,0,0,1,1.5,1.5v6h6v-8.25"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            ></path>
            <path
              d="M.753,12.444,10.942,2.255a1.5,1.5,0,0,1,2.122,0L23.253,12.444"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            ></path>
          </g>
        </svg>
      </router-link>
      <div class="mx-3 text-gray-400">/</div>
      <router-link :to="'/' + $route.params.locale + '/crf/registrations'">{{
        $t("breadcrumb")
      }}</router-link>
      <div class="mx-3 text-gray-400">/</div>
    </div>

    <div class="flex flex-row items-center justify-between mb-4">
      <div class="flex flex-row items-center">
        <h1 class="text-2xl text-indigo-800 font-semibold">
          {{ $t("title") }} {{ deed.reference }}
        </h1>
        <div
          :class="
            'text-' +
            r.color +
            '-600 bg-' +
            r.color +
            '-100 px-3 py-1 text-base ml-2 rounded-full text-gray-600 font-semibold shadow'
          "
          v-for="r in registers"
          :key="r.id"
        >
          {{ r.name[$i18n.locale] }}
        </div>

        <div
          :class="
            'bg-' +
            $t('status.' + status + '.color') +
            '-100 px-3 py-1 text-base ml-2 rounded-full text-' +
            $t('status.' + status + '.color') +
            '-600 font-semibold shadow'
          "
        >
          {{ $t("status." + status + ".label") }}
        </div>
      </div>
      <div class="flex flex-row items-center">
        <deed-version
          v-if="$store.state.settings.enable_versioning_of_registrations && $store.state.state.user.role_id === 3"
          class="mr-6"
          :key="deed.deed_id + '-' + versions.viewing"
        ></deed-version>
        <action-button :deed="deed_global"></action-button>
      </div>
    </div>

    <div
      v-if="
        $store.state.state.user.role_id === 3 &&
        status === 'in_review' &&
        versions.viewing !== versions.pending
      "
      class="text-center bg-white px-8 py-4 rounded shadow mb-4 transition-all hover:bg-gray-50 font-semibold text-sm text-yellow-600 cursor-pointer"
      v-on:click="$router.push('/' + $route.params.locale + '/crf/registrations/' + $route.params.id + '/versions/' + versions.pending)"
    >
      {{ $t("go_to_review") }}
    </div>
    <div
      v-if="
        $store.state.state.user.role_id === 3 &&
        status === 'in_review' &&
        versions.viewing === versions.pending
      "
      class="flex flex-row items-center justify-between bg-white px-8 py-4 rounded shadow mb-4 transition-all font-semibold text-sm text-yellow-600 cursor-pointer"
    >
      <div>{{ $t("validate") }}</div>
      <div class="flex flex-row items-center">
        <div
          v-on:click="reject();"
          class="px-3 py-1 text-white bg-red-600 hover:bg-red-500 cursor-pointer mr-4 rounded-full shadow"
        >
          {{ $t("reject") }}
        </div>
        <div
          v-on:click="approve();$store.commit('promote', deed_global); $router.push('/' + $route.params.locale + '/crf/registrations/' + $route.params.id)"
          class="px-3 py-1 text-white bg-green-600 hover:bg-green-500 cursor-pointer rounded-full shadow"
        >
          {{ $t("approve") }}
        </div>
      </div>
    </div>

    <deed-view 
      :deed="deed" 
      :deed_global="deed_global" 
      :modus="($store.state.state.user.role_id === 3 && versions.viewing === versions.pending) ? 'review' : 'view'"
    ></deed-view>
    </div>
  </model-viewer>
</template>


<script>
import _ from "lodash";

import ModelViewer from "../../../components/base/model-viewer";
import DeedView from "../shared/deed/view";
import ActionButton from "../shared/deed/components/action-button";
import DeedVersion from "./components/deed-version";

export default {
  components: {
    ModelViewer,
    DeedView,
    ActionButton,
    DeedVersion,
  },
  methods: {
    notify(approve) {
      let self = this;
      let type = '';
      let notifies = [];
      
      if(approve) {
        type = 'crf_deed_staging_approved';
        // alert all users
        _.each(this.deed.staging, function(s) {
          if(s.deed.user.role_id !== 3) {
            notifies.push(s.deed.user)
          }
        });
      } else {
        type = 'crf_deed_staging_rejected';
        // alert me only
        notifies = [this.deed.user];
      }
      
      _.each(_.uniqBy(notifies, function(n) { return n.id }), function(n) {
        self.$store.commit('sendEmail', {
          to: n,
          type: type,
          payload: _.cloneDeep(self.$store.getters.deed(self.deed.deed_id)),
          subject: {
            reference: self.deed.reference
          }
        });
      });

      

      // toDo: add online notification...

    },
    approve() {
      this.$store.commit('promote', this.deed_global); 
      this.$router.push('/' + this.$route.params.locale + '/crf/registrations/' + this.$route.params.id)
      
      this.notify(true);
    },
    reject() {
      this.$store.commit('reject', this.deed_global); 
      this.$forceUpdate();

      this.notify(false);
    }
  },
  
  computed: {
    viewversion() {
      if (parseInt(this.$route.params.version) > 0 && parseInt(this.$route.params.version) <= this.deed_global.staging.length + 1) {
        return parseInt(this.$route.params.version)
      } else {
        return _.findLastIndex(this.deed_global.staging, function (s) { return s.status === "promoted"; }) + 1;
      }
    },
    versions() {
      return {
        viewing: this.viewversion,
        active: _.findLastIndex(this.deed_global.staging, function (s) { return s.status === "promoted"; }) + 1,
        pending: _.findIndex(this.deed_global.staging, function (s) { return s.status === "pending"; }) + 1
      }
    },
    status: function () {
      if (
        _.filter(this.deed_global.staging, function (el) {
          return el.status === "pending";
        }).length > 0
      )
        return "in_review";

      if (
        _.filter(this.deed_global.acts, function (a) {
          return a.cancelled_at === null;
        }).length === 0
      )
        return "cancelled";

      if (
        _.filter(this.deed_global.acts, function (a) {
          return a.cancelled_at !== null;
        }).length > 0
      )
        return "partially_cancelled";

      return "registered";
    },
    active_version: function () {

      return _.filter(this.deed_global.staging, function (s) {
        return s.status === "promoted";
      }).length;
    },
    pending_version: function () {
      if (this.status !== "in_review") return null;

      return (
        _.findIndex(this.deed_global.staging, function (s) {
          return s.status === "pending";
        }) + 1
      );
    },
    deed_global: function () {
      return this.$store.getters.deed(this.$route.params.id);
      
      /*let self = this;
      let deeds = _.filter(this.$store.state.data.deeds, function (el) {
        return parseInt(el.deed_id) === parseInt(self.$route.params.id);
      });
      if (deeds.length === 0) return null;

      return _.first(deeds);*/
    },
    deed: function () {
      let self = this;
      let deed = this.deed_global;

      if (parseInt(self.$route.params.version) > 0) {
        deed =
          deed.staging[parseInt(self.$route.params.version) - 1].deed || null;
      }

      return deed;
    },
    registers: function () {
      let registers = [];
      let self = this;
      _.each(this.deed.acts, function (a) {
        registers.push(
          _.filter(self.$store.state.meta.register_types, function (el) {
            return el.id === a.register;
          })[0]
        );
      });
      registers = _.uniqBy(registers, "id");

      return registers;
    },
  },
  i18n: {
    messages: {
      en: {
        breadcrumb: "My registrations",
        title: "Registration",
        status: {
          registered: {
            label: "Registered",
            color: "green",
          },
          in_review: {
            label: "Changes pending review",
            color: "yellow",
          },
          cancelled: {
            label: "Cancelled",
            color: "red",
          },
          partially_cancelled: {
            label: "Partially cancelled",
            color: "blue",
          },
        },
        go_to_review:
          "This registration currently has pending corrections to be validated.  Click here to validate.",
        validate: "Please validate the changes requested for this registration",
        reject: "Reject",
        approve: "Approve and register",
      },
      nl: {
        breadcrumb: "Mijn inschrijvingen",
        title: "Inschrijving",
        status: {
          registered: {
            label: "Ingeschreven",
            color: "green",
          },
          in_review: {
            label: "Wijzigingen in review",
            color: "yellow",
          },
          cancelled: {
            label: "Geannuleerd",
            color: "red",
          },
          partially_cancelled: {
            label: "Gedeeltelijk geannuleerd",
            color: "blue",
          },
        },
        go_to_review:
          "Deze inschrijving heeft correcties in afwachting van validatie.  Click hier om te valideren.",
        validate: "Gelieve de wijzigingen voor deze inschrijving te valideren",
        reject: "Afwijzen",
        approve: "Goedkeuren en inschrijven",
      },
      fr: {
        breadcrumb: "Mes inscriptions",
        title: "Inscription",
        status: {
          registered: {
            label: "Enregistré",
            color: "green",
          },
          in_review: {
            label: "Modifications en attente",
            color: "yellow",
          },
          cancelled: {
            label: "Annulée",
            color: "red",
          },
          partially_cancelled: {
            label: "Annulée partiellement",
            color: "blue",
          },
          go_to_review:
            "Cette inschription a des modifications en attente de validation.  Clicquez ici pour les valider",
        },
        validate:
          "Veuillez valider les modifications demandées pour cet enregistrement.",
        reject: "Rejetter",
        approve: "Accepter et inscrire",
      },
    },
  },
};
</script>