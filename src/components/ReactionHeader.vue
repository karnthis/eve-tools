<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-btn
        to="/reactions/alchemy"
        text
      >
        <span class="mr-2">Alchemy</span>
      </v-btn>
      <v-btn
        to="/reactions/fuel"
        text
      >
        <span class="mr-2">Fuel</span>
      </v-btn>
      <v-btn
        to="/reactions/reactions"
        text
      >
        <span class="mr-2">Reactions</span>
      </v-btn>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ReactionHeader',

  data: () => ({})
}
</script>

<style scoped>

</style>
