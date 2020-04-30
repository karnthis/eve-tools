<template>
  <container class="reactions">
    <h1>Reactions</h1>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-form
                ref="form"
                v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <v-text-field
                        v-model="fuelCount"
                        :rules="fuelCountRules"
                        label="Desired Fuel Count"
                        filled
                        required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <v-select
                        v-model="selectedIsotope"
                        :items="isotopes"
                        :rules="isotopeRules"
                        label="Isotope"
                        filled
                        required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="2">
                <v-select
                        v-model="selectedMaterialEfficiency"
                        :items="materialEfficiencyOptions"
                        :rules="materialEfficiencyRules"
                        label="ME"
                        filled
                        required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="2">
                <v-select
                        v-model="selectedTimeEfficiency"
                        :items="timeEfficiencyOptions"
                        :rules="timeEfficiencyRules"
                        label="TE"
                        filled
                        required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click="processForm"
              >
                Process
              </v-btn>
              <v-btn
                      color="error"
                      class="mr-4"
                      @click="reset"
              >
                Reset Form
              </v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-col>

      <v-col>
        <v-container>
          <v-row>
            Robotics : {{ calculatedNumbers.robotics }}
          </v-row>
          <v-row>
            Enriched Uranium : {{ calculatedNumbers.enrichedUranium }}
          </v-row>
          <v-row>
            Mechanical Parts : {{ calculatedNumbers.mechanicalParts }}
          </v-row>
          <v-row>
            Coolant : {{ calculatedNumbers.coolant }}
          </v-row>
          <v-row>
            Strontium Clathrates : {{ calculatedNumbers.strontiumClathrates }}
          </v-row>
          <v-row>
            Oxygen : {{ calculatedNumbers.oxygen }}
          </v-row>
          <v-row>
            Heavy Water : {{ calculatedNumbers.heavyWater }}
          </v-row>
          <v-row>
            Liquid Ozone : {{ calculatedNumbers.liquidOzone }}
          </v-row>
          <v-row>
            {{ selectedIsotope }} Isotopes : {{ calculatedNumbers.isotopes }}
          </v-row>
          <v-row>
            Run Time : {{ calculatedRunTime }}
          </v-row>
        </v-container>
      </v-col>

    </v-row>
  </container>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'Reactions',
    data: () => ({
      valid: false,
      fuelCount: null,
      fuelAdjusted: null,
      fuelCountRules: [
        v => !!v || 'Target Fuel Count is required',
        v => Number(v) || 'Target Fuel Count must be a number!'
      ],
      selectedIsotope: 'Generic',
      isotopeRules: [
        v => !!v || 'Isotope Type is required',
      ],
      isotopes: [
        'Helium',
        'Hydrogen',
        'Nitrogen',
        'Oxygen',
      ],
      baseNumbers: {
        robotics: 1,
        enrichedUranium: 4,
        mechanicalParts: 4,
        coolant: 9,
        strontiumClathrates: 20,
        oxygen: 22,
        heavyWater: 170,
        liquidOzone: 350,
        isotopes: 450,
      },
      // calculatedNumbers: {
      //   robotics: 0,
      //   enrichedUranium: 0,
      //   mechanicalParts: 0,
      //   coolant: 0,
      //   strontiumClathrates: 0,
      //   oxygen: 0,
      //   heavyWater: 0,
      //   liquidOzone: 0,
      //   isotopes: 0,
      // },
      calculatedNumbers: {
        robotics: null,
        enrichedUranium: null,
        mechanicalParts: null,
        coolant: null,
        strontiumClathrates: null,
        oxygen: null,
        heavyWater: null,
        liquidOzone: null,
        isotopes: null,
      },
      selectedMaterialEfficiency: null,
      materialEfficiencyRules: [
        v => Number.isInteger(Number(v)) || 'ME is required',
      ],
      materialEfficiencyOptions: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      selectedTimeEfficiency: null,
      timeEfficiencyRules: [
        v => Number.isInteger(Number(v)) || 'TE is required',
      ],
      timeEfficiencyOptions: [
        0,
        2,
        4,
        6,
        8,
        10,
        12,
        14,
        16,
        18,
        20
      ],
      calculatedRunTime: null,
      baseRunTime: 900, // 15 minutes in seconds
    }),
    components: {

    },
    methods: {
      validate () {
        return this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      processForm() {
        // alert(this.validate())
        if (this.validate()) {
          this.fuelAdjusted = Math.ceil(this.fuelCount / 40)
          Object.keys(this.baseNumbers).forEach(key => {
            this.calculatedNumbers[key] = Math.ceil((this.fuelAdjusted * this.baseNumbers[key]) * this.getPercentage(this.selectedMaterialEfficiency))
          })
          this.calculatedRunTime = this.beautifyTime(Math.ceil((this.fuelAdjusted * this.baseRunTime) * this.getPercentage(this.selectedTimeEfficiency)))
        }
      },
      getPercentage(value) {
        return ((100 - Number(value)) / 100)
      },
      beautifyTime(time) {
        alert(time)
        const days = ~~(time / 86400)
        const hours = ~~((time % 86400) / 3600)
        const minutes = ~~((time % 3600) / 60)
        const seconds = ~~(time % 60)

        return `${days}:${hours}:${minutes}:${seconds}`
      },
    },
  }
</script>