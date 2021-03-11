<template>
  <div class=" grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <label class="block text-sm font-medium text-gray-700"
        :class="{
                'text-red-500': !validations.declarer,
              }"
      > {{$t('declarer')}} * </label>
      <div class="mt-1">
        <person-input v-model="v.data.declarers[0]" :readonly="readonly"></person-input>
      </div>
    </div>
  </div>
</template>
<script>
import PersonInput from "../../../../../components/inputs/person";

export default {
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
        declarer: this.v.data.declarers[0] && this.v.data.declarers[0].id !== null
      }
    }
  },
  methods: {
    validate: function() {
      this.v.is_valid = this.validations.declarer;
      this.$emit("input", this.v);
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
        declarer: 'Declarer'
      },
      nl: {
        declarer: 'Declarant'
      },
      fr: {
        declarer: 'Déclarant'
      }
    }
  }
};
</script>