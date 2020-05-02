<template>
  <container class="t1modules">
    <h1>Tech I Modules</h1>
    <ModuleHeader/>
  </container>
</template>

<script>
  import ModuleHeader from "@/components/ModuleHeader";

  export default {
    name: 'T1Modules',

    components: {
      ModuleHeader,
    },

    data: () => ({
      //
    }),
  };
</script>