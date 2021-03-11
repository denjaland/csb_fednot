<template>
  <div>
    
    <div v-if="$route.params.locale === 'nl'">
      
      De akte voor uw dossier <strong>{{email.payload.reference}}</strong> werd gewijzigd door <strong>Fednot Steundienst</strong>.  De wijzigingen werden onmiddellijk ingeschreven in het register en kunnen worden bekeken in CRF. 

    </div>
    <div v-else-if="$route.params.locale === 'fr'">
      L'acte pour votre dossier <strong>{{email.payload.reference}}</strong> a été modifié par <strong>Fednot Support</strong>.  Les modifications ont été inscrites et vous pouvez les consulter dans RCF. 
    </div>
    <div v-else>
      The deed for your dossier <strong>{{email.payload.reference}}</strong> has been modified by <strong>Fednot Support</strong>.  The changes have been registered and you may view them within CRF.
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