<template>
  <container class="reactions">
    <h1>Reactions</h1>
    <ReactionHeader />
  </container>
</template>

<script>
import ReactionHeader from '@/components/ReactionHeader'

export default {
  name: 'Reactions',

  components: {
    ReactionHeader
  },

  data: () => ({
    //
  })
}
</script>
