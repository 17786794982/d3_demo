<template>
  <svg>
    <defs>
      <linearGradient id="linear">
        <stop offset="0" style="stop-color: #fc0"></stop>
        <stop offset="100%" style="stop-color: #09c"></stop>
      </linearGradient>
    </defs>
    <rect x="20" y="20" width="200" height="100" style="fill: url(#linear);stroke: black;"></rect>
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
