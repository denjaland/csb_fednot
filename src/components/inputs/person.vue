<template>
<div>
  <div
    class="flex flex-row items-center border-b border-gray-300 focus-within:border-indigo-500 transition-all"
    v-if="v.id === null"
  >
    <input
      v-model="rrn"
      type="text"
      :readonly="readonly"
      class="block sm:text-sm outline-none w-full"
      :placeholder="$t('ph')"
    />
  </div>
  <div class="flex flex-row justify-between" v-else>
    <person-view :person="v" :deletable="!readonly" v-on:delete="rrn = ''"></person-view>
  </div>
</div>
</template>
<script>
import _ from "lodash";
import PersonView from "../view/person";


export default {
  components: {
    PersonView
  },
  props: {
    value: {
      required: true,
    },
    readonly: {
      required: false,
      default: false
    }
  },
  data() {
    return {
      t: {
        id: null,
        rrn: "",
        first_name: "",
        last_name: "",
        address: { street: "", nbr: "", postal_code: "", city: "" },
      },
      v: _.merge({}, this.t, this.value),
      rrn: _.merge({}, { rrn: "" }, this.value).rrn,
    };
  },
  beforeMount() {
    this.v = _.merge({}, this.t, this.value);
  },
  watch: {
    v: {
      deep: true,
      handler: function (n, o) {
        this.$emit("input", this.v);
      },
    },
    rrn: function (n, o) {
      if (n.length !== 11) {
        this.v = { id: null, rrn: "", first_name: "", last_name: "" };
      } else {
        // find the person in the database
        let people = _.filter(this.$store.state.meta.people, function (el) {
          return el.rrn === n;
        });
        this.v = people.length === 1 ? people[0] : this.t;
      }
    },
  },
  i18n: {
    messages: {
      en: {
        ph: 'Enter the national register number'
      },
      nl: {
        ph: 'Voer rijksregisternummer in'
      },
      fr: {
        ph: 'Entrez le numéro de registre national'
      }
    }
  }
};
</script>