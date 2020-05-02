<template>
  <container class="factionships">
    <h1>Faction Ships</h1>
    <ShipHeader />
  </container>
</template>

<script>
import ShipHeader from '@/components/ShipHeader'

export default {
  name: 'FactionShips',

  components: {
    ShipHeader
  },

  data: () => ({
    //
  })
}
</script>
