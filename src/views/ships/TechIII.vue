<template>
  <container class="t3ships">
    <h1>Tech III Ships</h1>
    <ShipHeader/>
  </container>
</template>

<script>
  import ShipHeader from "@/components/ShipHeader";

  export default {
    name: 'T3Ships',

    components: {
      ShipHeader,
    },

    data: () => ({
      //
    }),
  };
</script>