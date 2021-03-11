<template>
  <div>
    <div v-if="model === null" class="bg-white flex flex-col items-center py-24 shadow rounded">

      <icon-empty class="w-16 h-16 text-gray-400"></icon-empty>
      <div class="text-gray-500 text-xl mt-6">{{ $t("not_found") }}</div>

    </div>

    <slot v-else></slot>
  </div>
</template>
<script>

import IconEmpty from '../icons/empty';

export default {
  components: {IconEmpty},
  props:{
    model: {
      required: true
    }
  },
  i18n: {
    messages: {
      en: {
        not_found: 'Whooops.  Looks like we did not find what you were looking for...'
      },
      nl: {
        not_found: 'Whooops.  Het lijkt erop dat we niet konden vinden wat je zocht...'
      },
      fr: {
        not_found: 'Whooops.  Il semble que nous n\'avons pas trouvé ce que vous recherchiez...'
      }
    }
  }
}
</script>
