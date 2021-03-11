<template>
  <div>
    <div class="flex flex-row items-center text-gray-500 mb-2">
          
        <router-link :to="'/' + $route.params.locale + '/cpc'"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="stroke-current w-4 h-4"><g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"><path d="M3.753,13.944v8.25h6v-6a1.5,1.5,0,0,1,1.5-1.5h1.5a1.5,1.5,0,0,1,1.5,1.5v6h6v-8.25" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M.753,12.444,10.942,2.255a1.5,1.5,0,0,1,2.122,0L23.253,12.444" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg> </router-link>     
        <div class="mx-3 text-gray-400">/</div>
    </div>
    <div class="flex flex-row items-center justify-between mb-4">
      <h1 class="text-2xl text-indigo-800 font-semibold">{{ $t("title") }}</h1>
      <div class="flex flex-row items-stretch">
        <router-link
          :to="'/' + $route.params.locale + '/cpc/consultations/create'"
          class="font-semibold text-sm text-white bg-indigo-800 rounded shadow hover:bg-indigo-700 py-2 px-4 flex flex-row items-center"
        >
          <icon-add class="w-4 h-4 mr-2"></icon-add>
          <div>{{ $t("btn_new") }}</div>
        </router-link>
      </div>
    </div>

    <div class="bg-white flex flex-col items-center py-24 shadow rounded">
      <icon-rome class="w-16 h-16 text-gray-400"></icon-rome>
    <div class="text-gray-500 text-xl mt-6">{{$t('coming')}}</div>
    </div>


  </div>
    
</template>
<script>

import _ from 'lodash';
import IconRome from '../../../components/icons/rome';
import IconAdd from '../../../components/icons/add'


export default {
  components: {IconRome, IconAdd},
 
  i18n: {
    messages: {
      en: {
        title: 'My Consultations',
        coming: 'This page is still under construction.  Come back soon!',
        btn_new: 'New consultation'
      },
      nl: {
        title: 'Mijn consultatie',
        coming: 'Deze pagina is nog in opbouw. Kom snel terug!',
        btn_new: 'Nieuwe consultatie'
      },
      fr: {
        title: 'Mes consultation',
        coming: 'Cette page est encore en cours de construction. Reviens bientôt!',
        btn_new: 'Nouveaux consultation'
      }
    }
  }
}
</script>