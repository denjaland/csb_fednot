<template>
  <div class="relative" v-click-outside="close">
    <div class="text-indigo-200 hover:text-white bg-indigo-600 px-2 py-1 uppercase flex flex-row items-center rounded cursor-pointer" v-on:click="state.open = !state.open">
      <div>{{$route.params.locale}}</div>
      <icon-down class="w-3 h-3 ml-2"></icon-down>
    </div>
    <div class="z-10 absolute right-0 bg-white rounded shadow overflow-hidden text-indigo-600 transform transition-all duration-150 ease-in-out origin-top" 
:class="{
'scale-y-0': !state.open,
'scale-y-100': state.open
}"
    >
        <div class="hover:bg-gray-50 py-2 px-4 cursor-pointer font-semibold" v-for="l in locs" :key="l" v-on:click="$router.push({params: { locale: l}})">{{$t('locales.' + l)}}</div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import IconDown from '../icons/down';
export default {
  components: {IconDown},
  data() {
    return {
      locales: ['en', 'nl', 'fr'],
      state: {
        open: false
      }
    }
  },
  computed: {
    locs: function() {
      let self = this;
      return _.filter(this.locales, function(el) {
        return el !== self.$route.params.locale;
      })
    }
  },
  methods: {
    close: function() {
      this.state.open = false;
    }
  },
  i18n: {
    messages: {
      en: {
        locales: {
          en: 'English',
          fr: 'Français',
          nl: 'Nederlands'
        }
      },
      fr: {
        locales: {
          en: 'English',
          fr: 'Français',
          nl: 'Nederlands'
        }
      },
      nl: {
        locales: {
          en: 'English',
          fr: 'Français',
          nl: 'Nederlands'
        }
      }
    }
  }
}
</script>

