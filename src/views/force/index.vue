<template>
  <div>
    <ul>
      <li>
        <router-link :to="{name: 'force_guidance_graph'}">force_guidance_graph</router-link>
      </li>
      <li>
        <router-link :to="{name: 'force2'}">force2</router-link>
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
