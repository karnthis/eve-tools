<template>
  <container class="t2modules">
    <h1>Tech II Modules</h1>
    <ModuleHeader/>
  </container>
</template>

<script>
  import ModuleHeader from "@/components/ModuleHeader";

  export default {
    name: 'T2Modules',

    components: {
      ModuleHeader,
    },

    data: () => ({
      //
    }),
  };
</script>