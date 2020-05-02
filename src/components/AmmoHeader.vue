<template>
    <v-container>
        <v-row>
            <v-spacer></v-spacer>
            <v-btn to="/reactions/alchemy" text>
                <span class="mr-2">Tech I</span>
            </v-btn>
            <v-btn to="/reactions/fuel" text>
                <span class="mr-2">Tech II</span>
            </v-btn>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'AmmoHeader',

        data: () => ({}),
    }
</script>

<style scoped>

</style>