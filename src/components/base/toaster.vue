<template>
  <div class="flex flex-col items-center fixed bottom-0 z-20 w-screen mb-6">
    <div class="container flex flex-col items-center">
      <div :class="'w-1/2 rounded shadow-lg bg-' + item.color + '-600 p-4 text-white mt-2 flex flex-row items-center'" v-for="item in messages" :key="item.id">
        <div><component :is="item.icon + '-icon'" :class="'w-8 h-8 text-' + item.color + '-200 mr-4'"></component></div>
        <div>{{item.message}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';

import HiIcon from '../icons/hi';
import ErrorIcon from '../icons/error';
import SuccessIcon from '../icons/success';
import InfoIcon from '../icons/info';

export default {
  components: {HiIcon, ErrorIcon, SuccessIcon, InfoIcon },
  data() {
    return {
      types: {
        success: {
          color: 'green',
          icon: 'success'
        },
        error: {
          color: 'red',
          icon: 'error'
        },
        info: {
          color: 'blue',
          icon: 'info'
        },
      }
    }
  },
  computed: {
    messages() {
      let self = this;
      return _.map(this.$store.state.notifications.messages, function(m) {
        return _.merge({}, self.types[m.type], m);
      });
    }
  }
}
</script>