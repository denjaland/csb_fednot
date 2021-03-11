<template>
  <div class=" grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <label class="block text-sm font-medium text-gray-700"
      :class="{'text-red-500': !validations.declarer}"> {{$t('declarer')}} *</label>
      <div class="mt-1">
        <person-input v-model="v.data.declarers[0]" :readonly="readonly"></person-input>
      </div>
    </div>
    <div class="sm:col-span-3">
      <label class="block text-sm font-medium text-gray-700"
      :class="{'text-red-500': !validations.location}"> {{$t('location')}} *</label>
      <div class="mt-1">
        <list-search-input v-model="v.data.location" :options="locations" :filter="false" :readonly="readonly"></list-search-input>
      </div>
    </div>
  </div>
</template>
<script>
import PersonInput from "../../../../../components/inputs/person";
import ListSearchInput from "../../../../../components/inputs/list-search";
import _ from 'lodash';

export default {
  components: {
    PersonInput,
    ListSearchInput
  },
  data() {
    return {
      v: this.value,
    };
  },
  computed: {
    validations() {
      return {
        declarer: this.v.data.declarers[0] && this.v.data.declarers[0].id !== null,
        location: _.map(this.locations, function(l) { return parseInt(l.id) }).includes(parseInt(this.v.data.location))
      }
    },
    locations() {
      let self = this;
      return _.map(this.$store.state.meta.deed_locations, function(l) {
        return {
          id: l.id,
          label: l.label[self.$i18n.locale]
        }
      })
    }
  },
  methods: {
    validate: function() {
      this.v.is_valid = this.validations.declarer && this.validations.location;
      this.$emit("input", this.v);
    }
  },
  props: {
    readonly: {
      required: false,
      default: false
    },
    value: {
      required: true,
    },
    acts: {
      required: true,
    },
    active_act: {
      required: false
    },
    modus: {
      required: false,
      default: 'view'
    }
  },
  watch: {
    v: {
      deep: true,
      handler: function (n, o) {
        this.validate();
      },
    },
  },
  mounted() {
    this.validate();
  },
  i18n: {
    messages: {
      en: {
        declarer: 'Declarer',
        location: 'Custodian of the document'
      },
      nl: {
        declarer: 'Declarant',
        location: 'Bewaarder van het document'
      },
      fr: {
        declarer: 'Déclarant',
        location: 'Detenteur du document'
      }
    }
  }
};
</script>