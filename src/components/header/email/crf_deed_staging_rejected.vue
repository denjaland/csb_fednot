<template>
  <div>
    
    <div v-if="$route.params.locale === 'nl'">
      
      De wijzigingen voor uw dossier <strong>{{email.payload.reference}}</strong> werden gewijgerd door <strong>Fednot Steundienst</strong>.  
      Gelieve ons te contacteren voor verdere inlichtingen.

    </div>
    <div v-else-if="$route.params.locale === 'fr'">
      L'acte pour votre dossier <strong>{{email.payload.reference}}</strong> ont été rejettées par <strong>Fednot Support</strong>.  
      Pour plus d'info, veuillez nous contacter.
    </div>
    <div v-else>
      The deed for your dossier <strong>{{email.payload.reference}}</strong> has been modified by <strong>Fednot Support</strong>.  
      Please do not hesitate to contact us for more information.
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