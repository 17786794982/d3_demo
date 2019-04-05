<template>
  <div id="app">
    <h1>d3</h1>
    <ul id="nav">
      <li>
        <router-link :to="{name: 'force'}">force</router-link>
      </li>
      <li>
        <router-link :to="{name: 'tree'}">tree</router-link>
      </li>
      <li>
        <router-link :to="{name: 'svg'}">svg</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
