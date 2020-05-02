<template>
  <v-container class="reactions">
    <h1>Fuel</h1>
    <ReactionHeader/>
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
                  :items="Object.keys(isotopes)"
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

      <v-col class="outputs">
        <v-container v-for="item in partsData" :key="item.id">
          <div>
            <v-row>
              {{ item.name }} : {{ beautifyNumber(item.finalCount) }}
            </v-row>
            <v-row>
              Price Per : {{ beautifyNumber(item.priceUsed) }}
            </v-row>
            <v-row>
              <v-switch
                      v-model="item.useBuy"
                      :label="`Use Buy Price: ${item.useBuy.toString()}`"
              ></v-switch>
            </v-row>
          </div>

        </v-container>
        <v-container>
          <v-row>
            Total Run Time : {{ calculatedRunTime }}
          </v-row>
          <v-row>
            Total Cost : {{ beautifyNumber(price) }}
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
         v => !!v || 'Target Fuel Count is required',
         v => Number.isInteger(Number(v)) || 'Target Fuel Count must be a number!'
       ],
       selectedIsotope: 'Generic',
       isotopeRules: [
         v => !!v || 'Isotope Type is required',
       ],
       isotopes: {
         'Helium': 16274,
         'Hydrogen': 17889,
         'Nitrogen': 17888  ,
         'Oxygen': 17887,
      },
      partsData: [
        {
    id: 9848,
          name: 'Robotics',
          baseCount: 1,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          priceUsed: null,
          itemTotal: null,
          useBuy: true,
        },
        {
    id: 44,
          name: 'Enriched Uranium',
          baseCount: 4,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          priceUsed: null,
          itemTotal: null,
          useBuy: true,
        },
        {
    id: 3689,
          name: 'Mechanical Parts',
          baseCount: 4,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          priceUsed: null,
          itemTotal: null,
          useBuy: true,
        },
        {
    id: 9832,
          name: 'Coolant',
          baseCount: 9,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          priceUsed: null,
          itemTotal: null,
          useBuy: true,
        },
        {
    id: 16275,
          name: 'Strontium Clathrates',
          baseCount: 20,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          priceUsed: null,
          itemTotal: null,
          useBuy: true,
        },
        {
    id: 3683,
          name: 'Oxygen',
          baseCount: 22,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          priceUsed: null,
          itemTotal: null,
          useBuy: true,
        },
        {
    id: 16272,
          name: 'Heavy Water',
          baseCount: 170,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          priceUsed: null,
          itemTotal: null,
          useBuy: true,
        },
        {
          id: 16273,
          name: 'Liquid Ozone',
          baseCount: 350,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          priceUsed: null,
          itemTotal: null,
          useBuy: true,
        },
        {
          id: null,
          name: 'Isotopes',
          baseCount: 450,
          finalCount: null,
          buyPrice: null,
          sellPrice: null,
          priceUsed: null,
          itemTotal: null,
          useBuy: true,
        },
      ],
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
        // const {A, ...toUse} = this.partsData
        // console.log(A)
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

          const itemIds = this.partsData.map(item => item.id || this.isotopes[this.selectedIsotope])
          // console.log(itemIds)


          this.fetchPrices(itemIds, 30000142)
          .then((resp) => {
            // console.log(resp)
            // console.log(resp[0])
            const respObject = {}
            for (const item of resp) {
              // console.log(item)
              respObject[item.itemId] = item
            }
            console.dir(respObject)

            const resultsData = this.partsData.map(item => {
              let currentItem = {}
              if (item.id !== undefined) {
                currentItem = respObject[item.id]
              } else {
                currentItem = respObject[8]
                item.name = 'betsy'

              }
              console.dir(currentItem)
              item.finalCount = this.beautifyNumber(item.baseCount * fuelAdjusted)
              item.buyPrice = this.beautifyNumber(currentItem.buy.max)
              item.sellPrice = this.beautifyNumber(currentItem.sell.min)
              if (item.useBuy) {
                item.priceUsed = item.buyPrice
              } else {
                item.priceUsed = item.sellPrice
              }
              item.itemTotal = this.beautifyNumber(item.priceUsed * item.finalCount)

              return item
            })
            console.dir(resultsData)


            // console.dir(resp)
          })
        }
          // return resultsData
          //
          //   const _ = {
          //     id: 9848,
          //     name: 'Robotics',
          //     baseCount: 1,
          //     finalCount: 333,
          //     buyPrice: null,
          //     sellPrice: null,
          //     priceUsed: null,
          //     itemTotal: null,
          //     useBuy: true,
          //   }
          //   console.log(item)
          //
          // this.partsData.forEach(key => {
          //   this.partsData[key].finalCount = (Math.ceil((fuelAdjusted * this.partsData[key].baseCount) * this.getPercentage(this.selectedMaterialEfficiency)))
          // })
          // this.calculatedRunTime = this.beautifyTime(Math.ceil((fuelAdjusted * this.baseRunTime) * this.getPercentage(this.selectedTimeEfficiency)))
          // this.actualUnits = 40 * fuelAdjusted
          // this.fetchPrices(Object.keys(this.partsData), 30000142)
          // .then((resp) => {
          //   for (const element in resp) {
          //     const workingChunk = this.partsData[resp[element].itemId]
          //     workingChunk.buyPrice = resp[element].buy.max
          //     workingChunk.sellPrice = resp[element].sell.min
          //     // console.dir('workingChunk')
          //     // console.dir(workingChunk)
          //     // console.dir('resp[element]')
          //     // console.dir(resp[element])
          //     // console.dir(typeof workingChunk.useBuy)
          //     if (workingChunk.useBuy) {
          //       workingChunk.itemTotal = (Number(workingChunk.buyPrice) * Number(workingChunk.finalCount))
          //       workingChunk.priceUsed = workingChunk.buyPrice
          //     } else {
          //       workingChunk.itemTotal = (Number(workingChunk.sellPrice) * Number(workingChunk.finalCount))
          //       workingChunk.priceUsed = workingChunk.sellPrice
          //     }
          //     // console.dir(resp[element])
          //     // console.dir(this.partsData)
          //   }
          //   this.price = this.totalCost()


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
        // .then(resp => {console.dir(resp);return resp})
        // .then(resp => resp)
        // console.dir(data)
        return data
      },
      getPercentage(value) {
        return ((100 - Number(value)) / 100)
      },
      beautifyNumber(num, places) {
        return new Number(num).toLocaleString('en-US', {minimumFractionDigits: places || 0})
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