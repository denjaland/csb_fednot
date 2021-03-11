<template>
  <div class="flex flex-row justify-between rounded shadow w-full p-2 bg-gradient-to-br from-white to-bg-gray-100">
    <div class="flex flex-row items-center w-full">
      <div >
        <icon-person class="w-10 h-10 ml-4 mr-6 text-gray-300"></icon-person>  
      </div>
      <div class="flex flex-row items-begin justify-between flex-grow">
        <div class="flex flex-col">
          <div class="flex flex-row items-center">
            <div class="text-gray-600">{{person.first_name}} {{person.last_name}}</div>
            <div class="font-semibold rounded-full bg-white px-3 py-1 text-xs text-gray-500 ml-4 shadow">{{person.rrn}}</div>
          </div>
          <div class="text-gray-400">{{person.address.street}} {{person.address.nbr}}</div>
          <div class="text-gray-400">{{person.address.postal_code}} {{person.address.city}}</div>
        </div>
        <div class="flex flex-col items-end text-gray-600">
          <div class="">° {{moment(person.dob).format('LL')}}</div>
          <div class=" text-red-500" v-if="person.dod">&#128327; {{moment(person.dod).format('LL')}}</div>
        </div>
      </div>
    </div>
    <div v-if="deletable" class="pl-6">
      <icon-delete class="w-4 h-4 hover:text-red-500 transition-all cursor-pointer" v-on:click.native="$emit('delete')"></icon-delete>
    </div>

  </div>
</template>
<script>
import IconPerson from "../icons/person";
import IconDelete from "../icons/delete";
import moment from 'moment/min/moment-with-locales';

export default {
  components: {IconPerson, IconDelete} , 
  props: {
    person: {
      required: true
    },
    deletable: {
      required: false,
      default: false
    }
  },
methods: {
  moment(date) {
    return moment(date).locale(this.$route.params.locale);
  }
}

}
</script>