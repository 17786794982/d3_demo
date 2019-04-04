<template>
  <div>
    <ul>
      <li>
        <router-link :to="{name: 'd3_two_tree'}">d3-two-tree</router-link>
      </li>
      <li>
        <router-link :to="{name: 'd3-path'}">d3-path</router-link>
      </li>
      <li>
        <router-link :to="{name: 'downTree'}">downTree</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
  
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>

</style>
