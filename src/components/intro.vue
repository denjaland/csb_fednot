<template>
  <div class="fixed right-0 bottom-0 m-12 pb-8">
    <!--div class="bg-indigo-500 border border-indigo-500 border-2 shadow-lg p-4 rounded-full">
      <icon-help class="w-12 h-12 text-indigo-100"></icon-help>
    </div-->
  </div>
</template>

<script>
import IconHelp from './icons/support';
export default {
  data() {
    return {
      intro: this.$intro(),
      steps: [
        {
          intro: 'Welcome to our POC!'
        }
      ]
    }
  },

  components: {IconHelp},

  mounted() {
    //alert(this.$intro());
    //this.$intro().addSteps(this.steps);
    //this.$intro().start();
  }
}
</script>