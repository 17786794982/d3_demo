<template>
  <svg>
    <g transform="translate(10, 50)">
      <path id="path" d="M30 40 c 50 10, 70 10, 120 40 S150 0,200 40" style="fill: none; stroke: black;"></path>
      <text>
        <textPath xlink:href="#path" startOffset="50%" text-anchor="middle">
          <tspan>hello</tspan>
          <tspan>world</tspan>
        </textPath>
      </text>
    </g>
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
