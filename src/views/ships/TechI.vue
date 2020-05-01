<template>
  <container class="t1ships">
    <h1>Tech I Ships</h1>
    <ShipHeader/>
  </container>
</template>

<script>
  import ShipHeader from "@/components/ShipHeader";

  export default {
    name: 'T1Ships',

    components: {
      ShipHeader,
    },

    data: () => ({
      //
    }),
  };
</script>