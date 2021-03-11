<template>
  
  <div class="flex flex-col bg-gray-50 mx-8 my-4 p-8 rounded shadow">

    <div class="mb-8">{{$t('greeting', {first_name: email.to.first_name })}}</div>

    <component :is="email.type" :email="email"></component>

    <div class="mt-8 flex flex-col">
      <div>{{$t('regards')}}</div>
      <div>FedNot</div>
    </div>

  </div>

</template>
<script>
import crf_deed_created from './crf_deed_created'; 
import crf_deed_edited_by_support from './crf_deed_edited_by_support';
import crf_deed_minor_changes from './crf_deed_minor_changes';
import crf_deed_pending_validation from './crf_deed_pending_validation';
import crf_deed_staging_approved from './crf_deed_staging_approved';
import crf_deed_staging_rejected from './crf_deed_staging_rejected';
import crt_after_consultation from './crt_after_consultation';

export default {
  components: {crt_after_consultation, crf_deed_created, crf_deed_edited_by_support, crf_deed_minor_changes, crf_deed_pending_validation, crf_deed_staging_approved, crf_deed_staging_rejected},
  props: {
    email: {
      required: true
    }
  },
  i18n: {
    messages: {
      en: {
        greeting: 'Dear {first_name},',
        regards: 'Kind regards,',
      },
      nl: {
        greeting: 'Beste {first_name},',
        regards: 'Met vriendelijke groeten,',
      },
      fr: {
        greeting: 'Cher {first_name},',
        regards: 'Meilleures salutations,',
      }
    }
  }
}
</script>