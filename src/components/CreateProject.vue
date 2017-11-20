<template lang="pug">
  .content
    h1.title There are no projects yet!
    h2.subtitle Time to create some projects and get your hands dirty.
    a.btn(href="#/create-project-form") Create project
</template>

<script>
  export default {
    name: 'create-project'
  }
</script>

<style scoped>
  .content {
    width: 500px;
    margin: auto;
    text-align: center;
  }

  .title {
    display: block;
    font-size: 28px;
  }

  .subtitle {
    display: block;
    font-size: 18px;
  }
</style>
