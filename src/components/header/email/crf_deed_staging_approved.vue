<template>
  <div>
    
    <div v-if="$route.params.locale === 'nl'">
      
      De akte voor uw dossier <strong>{{email.payload.reference}}</strong> werd gewijzigd door <strong>{{user.first_name}} {{user.last_name}}</strong>.  De wijzigingen werden na validatie door Fednot Steundienst ingeschreven in het register en kunnen worden bekeken in CRF. 

    </div>
    <div v-else-if="$route.params.locale === 'fr'">
      L'acte pour votre dossier <strong>{{email.payload.reference}}</strong> a été modifié par <strong>{{user.first_name}} {{user.last_name}}</strong>.  Les modifications ont été inscrites après validation par Fednot Support et vous pouvez les consulter dans RCF. 
    </div>
    <div v-else>
      The deed for your dossier <strong>{{email.payload.reference}}</strong> has been modified by <strong>{{user.first_name}} {{user.last_name}}</strong>.  The changes have been registered after validation by Fednot Support and you may view them within CRF.
    </div>
    
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  
  props: {
    email: {
      required: true
    }
  },
  computed: {
    user() {
      return _.last(_.filter(this.email.payload.staging, function(s) { return s.status === 'promoted';})).deed.user;
    }
  }


}
</script>