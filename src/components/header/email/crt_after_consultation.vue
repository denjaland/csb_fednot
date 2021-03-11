<template>
  <div>
    
    <div v-if="$route.params.locale === 'nl'">
      
      Je consulteerde in het verleden het CRT voor dossier <strong>{{email.payload.consultation.reference}}</strong>.
      Er werd recent een nieuwe inschrijving in CRT verricht voor dezelfde persoon.  We raden je dan ook aan een nieuwe consultatie uit te voeren.  

    </div>
    <div v-else-if="$route.params.locale === 'fr'">
      Vous avez consulté le RCT pour dossier <strong>{{email.payload.consultation.reference}}</strong>.
      Récemment, une nouvelle inscription pour le même personne a été enregistré.  Nous vous invitons de re-consulter le registre.
      
    </div>
    <div v-else>
      You have made a consultation for dossier  <strong>{{email.payload.reference}}</strong>.  
      Recently, a new registration in CRT for the same person has been added.  We strongly recommend to reconsult the register.
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