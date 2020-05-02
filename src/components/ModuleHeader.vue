<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-btn
        to="/modules/tech1"
        text
      >
        <span class="mr-2">Tech I</span>
      </v-btn>
      <v-btn
        to="/modules/tech2"
        text
      >
        <span class="mr-2">Tech II</span>
      </v-btn>
      <v-btn
        to="/modules/faction"
        text
      >
        <span class="mr-2">Faction</span>
      </v-btn>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ModuleHeader',

  data: () => ({})
}
</script>

<style scoped>

</style>
