<template>
  <svg>
    <defs>
      <marker id="marker" markerWidth="10" markerHeight="10" refX="4" refY="4" orient="auto">
        <path d="M 0 0 4 4 0 8" style="fill:none;stroke:black;"></path>
        <path d="M0,0 L8,4 L0,8 L4,4 Z" style="fill:#ccc;stroke:#ccc;"></path>
        <!-- <path d="M0,0 L8,4 L0,8 L4,4 Z" style="fill:#ccc;stroke:#ccc;"></path> -->
      </marker>
    </defs>
    <path d="M 10 20 100 20 A 20 30 0 0 1 120 50 L 120 110"
          style="marker-start: url(#marker);marker-mid:url(#marker);marker-end: url(#marker);fill: none; stroke: black;"></path>
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
