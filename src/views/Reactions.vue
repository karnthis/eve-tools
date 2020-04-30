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
                        autofocus
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
                        v-model="selectedMineralEfficiency"
                        :items="mineralEfficiencyOptions"
                        :rules="mineralEfficiencyRules"
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
      valid: true,
      selectedIsotope: null,
      isotopeRules: [
        v => !!v || 'Isotope is required',
      ],
      isotopes: [
        'Helium',
        'Hydrogen',
        'Nitrogen',
        'Oxygen',
      ],
      fuelCount: '',
      fuelAdjusted: null,
      fuelCountRules: [
        v => !!v || 'Target Fuel is required',
        v => Number(v) || 'Target Fuel must be a number!'
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
      calculatedNumbers: {
        robotics: 0,
        enrichedUranium: 0,
        mechanicalParts: 0,
        coolant: 0,
        strontiumClathrates: 0,
        oxygen: 0,
        heavyWater: 0,
        liquidOzone: 0,
        isotopes: 0,
      },
      selectedMineralEfficiency: null,
      mineralEfficiencyRules: [
        v => Number.isInteger(Number(v)) || 'ME is required',
      ],
      mineralEfficiencyOptions: [
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
      ]



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
        alert(this.validate())
        if (this.validate()) {
          this.fuelAdjusted = Math.ceil(this.fuelCount / 40)
          Object.keys(this.baseNumbers).forEach(key => {
            this.calculatedNumbers[key] = Math.ceil((this.fuelAdjusted * this.baseNumbers[key]) * ((100 - Number(this.selectedMineralEfficiency))/ 100))
          })
        }
      }
    },
  }
</script>