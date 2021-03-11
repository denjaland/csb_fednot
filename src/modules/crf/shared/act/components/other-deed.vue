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
      :class="{'text-red-500': !validations.description}"> {{$t('description')}} *</label>
      <div class="mt-1">
        <input
                v-model="v.data.description"
                :readonly="readonly"
                type="text"
                class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
              />
      </div>
    </div>
  </div>
</template>
<script>
import PersonInput from "../../../../../components/inputs/person";

export default {
  components: {
    PersonInput,
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
        description: this.v.data.description.trim().length > 3
      }
    }
  },
  methods: {
    validate: function() {
      this.v.is_valid = this.validations.declarer && this.validations.description
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
        description: 'Description of the deed'
      },
      nl: {
        declarer: 'Declarant',
        description: 'Omschrijving van de akte'
      },
      fr: {
        declarer: 'Déclarant',
        description: 'Déscription de l\'acte'
      }
    }
  }
};
</script>