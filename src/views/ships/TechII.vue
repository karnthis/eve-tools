<template>
  <container class="t2ships">
    <h1>Tech II Ships</h1>
    <ShipHeader/>
  </container>
</template>

<script>
  import ShipHeader from "@/components/ShipHeader";

  export default {
    name: 'T2Ships',

    components: {
      ShipHeader,
    },

    data: () => ({
      //
    }),
  };
</script>