<template>
  <div>
    <a href="https://d3js.org.cn" target="_blank">学习地址</a>
    <h2>1、marker</h2>
    <v-marker></v-marker>
    
    <h2>2、线性渐变</h2>
    <v-linear-gradient></v-linear-gradient>
    
    <h2>2、径向渐变</h2>
    <v-radial-gradient></v-radial-gradient>
    
    <h2>3、文本路径</h2>
    <v-text-path></v-text-path>
    
    <h2>4、SVG动画</h2>
    <v-animate></v-animate>
  
  </div>
</template>

<script>
  import vMarker from './marker'
  import vLinearGradient from './linearGradient'
  import vRadialGradient from './radialGradient'
  import vTextPath from './textPath'
  import vAnimate from './animate'
  
  export default {
    name: '',
    data() {
      return {
        msg: ''
      };
    },
    components: {
      vMarker,
      vLinearGradient,
      vRadialGradient,
      vTextPath,
      vAnimate,
    },
    methods: {}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
