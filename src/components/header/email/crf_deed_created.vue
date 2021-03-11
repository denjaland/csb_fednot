<template>
  <div>
    
    <div v-if="$route.params.locale === 'nl'">
      
      De akte voor uw dossier <strong>{{email.payload.reference}}</strong> werd succesvol ingeschreven. 
      
    </div>
    <div v-else-if="$route.params.locale === 'fr'">
      L'acte pour votre dossier <strong>{{email.payload.reference}}</strong> a bien été enregistré. 
    </div>
    <div v-else>
      The deed for your dossier <strong>{{email.payload.reference}}</strong> has correctly been registered.
    </div>
    
  </div>
</template>

<script>
export default {
  
  props: {
    email: {
      required: true
    }
  },


}
</script>