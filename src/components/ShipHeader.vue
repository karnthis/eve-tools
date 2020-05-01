<template>
    <v-container>
        <v-row>
            <v-spacer></v-spacer>
            <v-btn to="/ships/tech1" text>
                <span class="mr-2">Tech I</span>
            </v-btn>
            <v-btn to="/ships/tech2" text>
                <span class="mr-2">Tech II</span>
            </v-btn>
            <v-btn to="/ships/tech3" text>
                <span class="mr-2">Tech III</span>
            </v-btn>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'ShipHeader',

        data: () => ({}),
    }
</script>

<style scoped>

</style>