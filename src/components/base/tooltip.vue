<template>
  <div class="relative">
    <div @mouseover="state.tooltip = true" @mouseenter="state.tooltip = true" @mouseleave="state.tooltip = false"><slot></slot></div>
    <div 
      class="-left-1/2 -right-1/2  flex flex-col items-center absolute z-10 text-xs  bottom-full mb-2 whitespace-no-wrap transform transition-all duration-150 ease-in-out origin-bottom"
       :class="'scale-y-' + (state.tooltip ? '100' : '0')">
      <div class="rounded py-2 px-4 shadow-lg" :class="'bg-' + color + '-' + (inverse ? '100' : '700') + ' text-' + color + '-' + (inverse ? '700' : '100') ">{{tooltip}}</div>
      <svg :class="'absolute text-' + color + '-' + (inverse ? '100' : '700') + ' h-2 top-full'" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve">
        <polygon class="fill-current shadow-lg" points="0,0 127.5,127.5 255,0"/>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      state: {
        tooltip: false
      }
    }
  },
  props: {
    tooltip: {
      required: true
    },
    color: {
      required: false,
      default: 'indigo'
    },
    inverse: {
      required: false,
      default: false
    }
  },

}
</script>