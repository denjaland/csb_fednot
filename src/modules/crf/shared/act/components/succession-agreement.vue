<template>
  <div class="flex flex-col">
    <div class=" grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <label class="block text-sm font-medium text-gray-700"
        :class="{'text-red-500': !validations.testator}"> {{$t('testator')}} </label>
        <div class="mt-1">
          <person-input v-model="v.data.declarers[0]" :readonly="readonly"></person-input>
        </div>
      </div>
    </div>
    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <label class="block text-sm font-medium text-gray-700"
        :class="{'text-red-500': !validations.involved_count || !validations.all_involved}"> {{$t('involved')}} *</label>
        <div class="mt-2 flex flex-row flex-grow" v-for="(p, i) in v.data.involved" :key="i" >
          <person-input v-model="v.data.involved[i]" class="flex-grow" :readonly="readonly"></person-input>
          <div class="transition-all hover:text-red-500 cursor-pointer" v-if="!readonly"
            v-on:click="v.data.involved.splice(v.data.involved.indexOf(p), 1);"
          ><icon-delete class="w-3 h-3 -mr-6"></icon-delete></div>
        </div>
        <div class="flex flex-row items-center mt-4">
          <div v-if="!readonly" class="rounded-full border px-2 py-1 flex flex-row items-center cursor-pointer  text-xs font-semibold hover:shadow hover:bg-gray-50 transitiona--" v-on:click="v.data.involved.push(null)">
            <icon-add class="w-3 h-3 mr-2"></icon-add>
            <div>{{$t('add')}}</div>
          </div>
          <div v-if="!validations.testator_not_involved" class="text-red-500 text-xs font-semibold ml-4">{{$t('testator_not_involved')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PersonInput from "../../../../../components/inputs/person";
import _ from 'lodash';
import IconAdd from "../../../../../components/icons/add";
import IconDelete from "../../../../../components/icons/delete";

export default {
  components: {
    PersonInput,
    IconAdd,
    IconDelete
  },
  data() {
    return {
      v: this.value,
    };
  },
  computed: {
    validations() {

    
      return {
        testator: this.v.data.declarers[0] && this.v.data.declarers[0].id !== null,
        involved_count: this.v.data.involved.length > 0,
        all_involved: _.filter(this.v.data.involved, function(i) { return i === null || i.id === null}).length === 0,
        involveds: _.map(this.v.data.involved, function(i) { return i && i.id !== null}),
        testator_not_involved: !_.map(this.v.data.involved, function(i) { return i ? (i.id || 0) : 0; }).includes(this.v.data.declarers[0] ? (this.v.data.declarers[0].id || -1) : -1)
      }
    }
  },
  methods: {
    validate: function() {
      
      this.v.is_valid = this.validations.testator && this.validations.involved_count && this.validations.all_involved && this.validations.testator_not_involved;
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
        testator: 'Testator',
        involved: 'Involved parties',
        add: 'Add party',
        testator_not_involved: 'Testator can not be involved party'
      },
      nl: {
        testator: 'Erflater',
        involved: 'Betrokken partijen',
        add: 'Voeg persoon toe',
        testator_not_involved: 'Erflater kan geen betrokken partij zijn'
      },
      fr: {
        testator: 'Testateur',
        involved: 'Parties impliquées',
        add: 'Ajouter une personne',
        testator_not_involved: 'Testateur ne peut pas être partie impliquée'
      }
    }
  }
};
</script>