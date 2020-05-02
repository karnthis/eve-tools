<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </div>
    <v-spacer />
    <v-btn
      to="/about"
      text
    >
      <span class="mr-2">About</span>
    </v-btn>
    <v-btn
      to="/ammo"
      text
    >
      <span class="mr-2">Ammo</span>
    </v-btn>
    <v-btn
      to="/implants"
      text
    >
      <span class="mr-2">Implants</span>
    </v-btn>
    <v-btn
      to="/modules"
      text
    >
      <span class="mr-2">Modules</span>
    </v-btn>
    <v-btn
      to="/reactions"
      text
    >
      <span class="mr-2">Reactions</span>
    </v-btn>
    <v-btn
      to="/ships"
      text
    >
      <span class="mr-2">Ships</span>
    </v-btn>
    <!--        <v-btn to="/" text>-->
    <!--            <span class="mr-2">Modules</span>-->
    <!--        </v-btn>-->
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavigationBar',

  data: () => ({

  })
}
</script>

<style scoped>

</style>
