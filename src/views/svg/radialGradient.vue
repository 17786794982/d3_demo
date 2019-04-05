<template>
  <svg>
    <defs>
      <radialGradient id="radial" cx="50%" cy="50%">
        <stop offset="0" style="stop-color: #f00"></stop>
        <stop offset="50%" style="stop-color: #0f0"></stop>
        <stop offset="100%" style="stop-color: #00f"></stop>
      </radialGradient>
    </defs>
    <rect x="20" y="20" width="200" height="200" style="fill: url(#radial);stroke: black"></rect>
  </svg>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        msg: ''
      };
    },
    methods: {}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
