<template>
  <v-container class="reactions">
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
                @click="processForm">
                Process
              </v-btn>
              <v-btn
                color="error"
                class="mr-4"
                @click="reset">
                Reset Form
              </v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-col>

      <v-col>
        <v-container v-for="item in partsData" :key="item.id">
          <v-row>
            {{ item.name }} : {{ item.finalCount }}
          </v-row>
          <v-row>
            Price Per : {{ item.buyPrice }}
          </v-row>
          <v-row>
            <v-switch
                    v-model="item.useBuy"
                    :label="`Use Buy Price: ${item.useBuy.toString()}`"
            ></v-switch>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            Total Run Time : {{ calculatedRunTime }}
          </v-row>
          <v-row>
            Total Cost : {{ price }}
          </v-row>
          <v-row>
            Actual Units : {{ actualUnits }}
          </v-row>
        </v-container>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'Reactions',
    data: () => ({
      price: 'disregard',
      valid: false,
      fuelCount: null,
      fuelAdjusted: null,
      fuelCountRules: [
        v => !!v || 'Target Fuel Count is required',
        v => Number.isInteger(Number(v)) || 'Target Fuel Count must be a number!'
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
      partsData: {
        9848: {
          name: 'Robotics',
          baseCount: 1,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          itemTotal: null,
          useBuy: true,
        },
        44: {
          name: 'Enriched Uranium',
          baseCount: 4,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          itemTotal: null,
          useBuy: true,
        },
        3689: {
          name: 'Mechanical Parts',
          baseCount: 4,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          itemTotal: null,
          useBuy: true,
        },
        9832: {
          name: 'Coolant',
          baseCount: 9,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          itemTotal: null,
          useBuy: true,
        },
        16275: {
          name: 'Strontium Clathrates',
          baseCount: 20,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          itemTotal: null,
          useBuy: true,
        },
        3683: {
          name: 'Oxygen',
          baseCount: 22,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          itemTotal: null,
          useBuy: true,
        },
        16272: {
          name: 'Heavy Water',
          baseCount: 170,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          itemTotal: null,
          useBuy: true,
        },
        16273: {
          name: 'Liquid Ozone',
          baseCount: 350,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          itemTotal: null,
          useBuy: true,
        },
        "A": {
          name: 'Isotopes',
          baseCount: 450,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          itemTotal: null,
          useBuy: true,
        },
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
      actualUnits: null,
    }),
    components: {

    },
    computed: {

    },
    methods: {
      validate () {
        return this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      // resetValidation () {
      //   this.$refs.form.resetValidation()
      // },
      totalCost: function() {
        const myData = Object.values(this.partsData)
        // console.dir(myData)
        // myData[0];
        const myResult = myData.reduce((prev, curr) =>{
          return prev + Number(curr.itemTotal)
        }, 0)
        // console.log(myResult)
        return myResult
      },
      processForm() {
        if (this.validate()) {
          const fuelAdjusted = Math.ceil(this.fuelCount / 40)

          Object.keys(this.partsData).forEach(key => {
            this.partsData[key].finalCount = this.beautifyNumber(Math.ceil((fuelAdjusted * this.partsData[key].baseCount) * this.getPercentage(this.selectedMaterialEfficiency)))
          })
          this.calculatedRunTime = this.beautifyTime(Math.ceil((fuelAdjusted * this.baseRunTime) * this.getPercentage(this.selectedTimeEfficiency)))
          this.actualUnits = 40 * fuelAdjusted
          this.fetchPrices(Object.keys(this.partsData), 30000142)
          .then((resp) => {
            for (const element in resp) {
              this.partsData[resp[element].itemId].buyPrice = resp[element].buy.max
              this.partsData[resp[element].itemId].sellPrice = resp[element].sell.min
              console.dir(resp[element])
              if (resp[element].useBuy) {
                this.partsData[resp[element].itemId].itemTotal = (Number(resp[element].buy.max) * Number(resp[element].finalCount))
              } else {
                this.partsData[resp[element].itemId].itemTotal = (Number(resp[element].sell.min) * Number(resp[element].finalCount))
              }
              console.dir(resp[element])
              console.dir(this.partsData)
            }
            this.price = this.totalCost()
          })
        }
      },
      async fetchPrices(itemIdArray, marketSystem) {
        const key = 6
        const url = `https://api.squirrellogic.com/marketer/${marketSystem}/?key=${key}`
        const data = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({itemIdArray})
        })
        .then(resp => resp.json())
        // .then(resp => {console.dir(resp)})
        // .then(resp => resp)
        // console.dir(data)
        return data
      },
      getPercentage(value) {
        return ((100 - Number(value)) / 100)
      },
      beautifyNumber(num) {
        return new Number(num).toLocaleString('en-US', {minimumFractionDigits: 0})
      },
      beautifyTime(time) {
        const days = ~~(time / 86400)
        const hours = ~~((time % 86400) / 3600)
        const minutes = ~~((time % 3600) / 60)
        const seconds = ~~(time % 60)

        return `${days}:${hours}:${minutes}:${seconds}`
      },
    },
  }
</script>