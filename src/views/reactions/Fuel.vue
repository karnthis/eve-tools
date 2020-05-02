<template>
  <v-container class="reactions">
    <h1>Fuel</h1>
    <ReactionHeader />
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="6"
      >
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="4"
              >
                <v-text-field
                  v-model="fuelCount"
                  :rules="fuelCountRules"
                  label="Desired Fuel Count"
                  filled
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="4"
              >
                <v-select
                  v-model="selectedIsotope"
                  :items="isotopes.map(item => item.name)"
                  :rules="isotopeRules"
                  label="Isotope"
                  filled
                  required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="2"
              >
                <v-select
                  v-model="selectedMaterialEfficiency"
                  :items="materialEfficiencyOptions"
                  :rules="materialEfficiencyRules"
                  label="ME"
                  filled
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="2"
              >
                <v-select
                  v-model="selectedTimeEfficiency"
                  :items="timeEfficiencyOptions"
                  :rules="timeEfficiencyRules"
                  label="TE"
                  filled
                  required
                />
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

      <v-col class="outputs">
        <v-container
          v-for="item in respObject"
          :key="item.id"
        >
          <div>
            <v-row>
              {{ item.name }} : {{ beautifyNumber(item.finalCount) }}
            </v-row>
            <v-row>
              Price Per / Total : {{ beautifyNumber(item.priceUsed, 2) }} / {{ beautifyNumber(item.itemTotal, 2) }}
            </v-row>
            <v-row>
<!--              <v-switch-->
<!--                v-model="item.useBuy"-->
<!--                :label="`Use Buy Price: ${item.useBuy.toString()}`"-->
<!--              />-->
            </v-row>
          </div>
        </v-container>
        <v-container>
          <v-row>
            Total Run Time : {{ beautifyTime(calculatedRunTime) }}
          </v-row>
          <v-row>
            Total Cost : {{ beautifyNumber(price, 2) }}
          </v-row>
          <v-row>
            Actual Units : {{ beautifyNumber(actualUnits) }}
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ReactionHeader from '@/components/ReactionHeader.vue'

export default {
  name: 'Fuel',
  components: {
    ReactionHeader
  },
  data: () => ({
    price: null,
    valid: false,
    fuelCount: null,
    fuelAdjusted: null,
    fuelCountRules: [
      value => !!value || 'Target Fuel Count is required',
      value => Number.isInteger(Number(value)) || 'Target Fuel Count must be a number!'
    ],
    selectedIsotope: 'Generic',
    isotopeRules: [
      value => !!value || 'Isotope Type is required'
    ],
    isotopes: [
      {
        id: 16274,
        name: 'Helium',
        baseCount: 450,
        useBuy: true
      },
      {
        id: 17889,
        name: 'Hydrogen',
        baseCount: 450,
        useBuy: true
      },
      {
        id: 17888,
        name: 'Nitrogen',
        baseCount: 450,
        useBuy: true
      },
      {
        id: 17887,
        name: 'Oxygen',
        baseCount: 450,
        useBuy: true
      }
    ],
    partsData: [
      {
        id: 9848,
        name: 'Robotics',
        baseCount: 1,
        useBuy: true
      },
      {
        id: 44,
        name: 'Enriched Uranium',
        baseCount: 4,
        useBuy: true
      },
      {
        id: 3689,
        name: 'Mechanical Parts',
        baseCount: 4,
        useBuy: true
      },
      {
        id: 9832,
        name: 'Coolant',
        baseCount: 9,
        useBuy: true
      },
      {
        id: 16275,
        name: 'Strontium Clathrates',
        baseCount: 20,
        useBuy: true
      },
      {
        id: 3683,
        name: 'Oxygen',
        baseCount: 22,
        useBuy: true
      },
      {
        id: 16272,
        name: 'Heavy Water',
        baseCount: 170,
        useBuy: true
      },
      {
        id: 16273,
        name: 'Liquid Ozone',
        baseCount: 350,
        useBuy: true
      },
      {
        id: null,
        name: 'Isotopes',
        baseCount: 450,
        useBuy: true
      }
    ],
    selectedMaterialEfficiency: null,
    materialEfficiencyRules: [
      value => Number.isInteger(Number(value)) || 'ME is required'
    ],
    materialEfficiencyOptions: [
      ...Array(11).keys()
    ],
    selectedTimeEfficiency: null,
    timeEfficiencyRules: [
      value => Number.isInteger(Number(value)) || 'TE is required'
    ],
    timeEfficiencyOptions: [
      ...Array(11).keys()
    ].map(timeEffNum => timeEffNum * 2),
    calculatedRunTime: null,
    baseRunTime: 900, // 15 minutes in seconds
    actualUnits: null,
    respObject: {}
  }),
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
    calculateTotalCost: function (toCalculate) {
      return Object.values(toCalculate).map(item => item.itemTotal).reduce((prev, curr) => {
        return prev + curr
      }, 0)
    },
    fullItemArray (currentIsotope) {
      return [...this.partsData.filter(item => !!item.id ), ...this.isotopes.filter(item => item.name === currentIsotope)]
    },
    async fetchAndProcessData(itemIds, fullItemSet) {
      return await this.fetchPrices(itemIds, 30000142)
      .then((resp) => {
        const respObject = {}
        for (const item of resp) {
          console.log(item)
          let completeItem = {}
          for (const localItem of fullItemSet) {
            if (localItem.id === item.itemId) {
              completeItem = { ...localItem }
              completeItem.buyPrice = item.buy.max
              completeItem.sellPrice = item.sell.min
              break
            } else {
              continue
            }
          }
          respObject[completeItem.id] = completeItem
        }
        return respObject
      })
    },
    calculateTotals(toCalculate, fuelAdjusted) {
      for (const item in toCalculate) {
        const workingItem = toCalculate[item]
        workingItem.finalCount = Math.ceil(workingItem.baseCount * fuelAdjusted * this.getPercentage(this.selectedMaterialEfficiency))
        if (workingItem.finalCount < fuelAdjusted) {
          workingItem.finalCount = fuelAdjusted
        } else {
          // Do Nothing
        }
        workingItem.priceUsed = (workingItem.useBuy) ? workingItem.buyPrice : workingItem.sellPrice
        console.log(workingItem)
        workingItem.itemTotal = workingItem.finalCount * workingItem.priceUsed
      }
      return toCalculate
    },
    processForm () {
      if (this.validate()) {
        const fuelAdjusted = Math.ceil(this.fuelCount / 40)
        this.actualUnits = fuelAdjusted * 40
        console.log(fuelAdjusted)
        const fullItemSet = this.fullItemArray(this.selectedIsotope)
        const itemIds = fullItemSet.map(item => item.id)
        console.log(itemIds)

        this.calculatedRunTime = Math.ceil((fuelAdjusted * this.baseRunTime) * this.getPercentage(this.selectedTimeEfficiency))

        this.fetchAndProcessData(itemIds, fullItemSet)
        .then((resp) => {
          this.respObject = this.calculateTotals(resp, fuelAdjusted)
          this.price = this.calculateTotalCost(this.respObject)

        })
      }
    },

    async fetchPrices (itemIdArray, marketSystem) {
      const key = 6
      const url = `https://api.squirrellogic.com/marketer/${marketSystem}/?key=${key}`
      const data = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ itemIdArray })
      })
        .then(resp => resp.json())
        // .then(resp => {console.dir(resp);return resp})
        // .then(resp => resp)
        // console.dir(data)
      return data
    },
    getPercentage (value) {
      return ((100 - Number(value)) / 100)
    },
    beautifyNumber (num, places) {
      return new Number(num).toLocaleString('en-US', { minimumFractionDigits: places || 0 })
    },
    beautifyTime (time) {
      const days = ~~(time / 86400)
      const hours = ~~((time % 86400) / 3600)
      const minutes = ~~((time % 3600) / 60)
      const seconds = ~~(time % 60)

      return `${days}:${hours}:${minutes}:${seconds}`
    }
  }
}
</script>

<style scoped>
  .outputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(5, 1fr);
  }
  .outputs div {
    /*todo*/
  }

</style>
