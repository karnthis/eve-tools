<template>
  <container class="ships">
    <h1>Ships</h1>
    <ShipHeader />
  </container>
</template>

<script>
import ShipHeader from '@/components/ShipHeader'

export default {
  name: 'App',

  components: {
    ShipHeader
  },

  data: () => ({
    //
  })
}
</script>
