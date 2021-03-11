<template>
  <div>
    
    <div v-if="$route.params.locale === 'nl'">
      
      Jouw wijzigingen voor dossier <strong>{{email.payload.reference}}</strong> werden verstuurd voor validatie naar <strong>Fednot Steundienst</strong>.  
      Van zodra een medewerker jouw wijzigingen heeft beoordeeld, krijg je een email.

    </div>
    <div v-else-if="$route.params.locale === 'fr'">
      Les modifications proposées pas vous pour votre dossier <strong>{{email.payload.reference}}</strong> ont été envoyées vers <strong>Fednot Support</strong> pour être validées.  
      Dès qu'un employé a évalué vos modifications, vous recevrez un nouveau courriel. 
    </div>
    <div v-else>
      Your proposed modifications for dossier <strong>{{email.payload.reference}}</strong> have been sent to <strong>Fednot Support</strong>.  
      As soon as a team member has evaluated your proposal, we will send you an update via email.
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