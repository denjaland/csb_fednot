<template>
  
  <div class="flex flex-col justify-right px-6 py-1 rounded bg-indigo-700 hover:bg-indigo-600 transition-all shadow cursor-pointer" v-if="$store.state.state.study !== null" v-on:click="$store.commit('switch', 'study')">
    <div class="text-indigo-200 text-right hidden lg:block">{{$t('study')}}</div>
    <div class="text-right">{{$store.state.state.study.name}}</div>
  </div>

</template>

<script>
export default {
  
  i18n: {
    messages: {
      en: {
        study: 'Study'
      },
      nl: {
        study: 'Studie'
      },
      fr: {
        study: 'Studie'
      }
    }
  }

}
</script>