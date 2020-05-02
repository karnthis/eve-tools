<template>
  <container class="reactionsroot">
    <h1>Reactions</h1>
    <ReactionHeader />
  </container>
</template>

<script>
import ReactionHeader from '@/components/ReactionHeader'

export default {
  name: 'ReactionsRoot',

  components: {
    ReactionHeader
  },

  data: () => ({
    //
  })
}
</script>
