<template>
  <div class="d-flex flex-column">
    <v-subheader class="d-flex justify-space-between mt-15 mb-15">
      <v-btn
        fab
        width="120"
        height="120"
        color="success"
        @click="$router.go(-1)"
      >
      <v-icon>mdi-arrow-left-circle</v-icon>
      <span>Go back</span>
      </v-btn>
      <v-row class='d-flex justify-center' no-gutters>
      <v-col
        v-for="(item, index) in shownDetails"
        :key="item"
        elevation="12"
        cols="4"
        sm="2"
      >
        <v-card class="pl-2"  outlined>
          <h4 class="overline"> {{ index }} </h4>
        </v-card>
        <v-card class="pa-2" outlined>
          <h3> {{ item }} </h3>
        </v-card>
      </v-col>
    </v-row>
      <v-btn
        fab
        width="120"
        height="120"
        color="success"
        @click="redirectToMainPage()"
      >
      <span>Main Page</span>
      <v-icon>mdi-arrow-right-circle</v-icon>
      </v-btn>
    </v-subheader>
    <div class="d-flex flex-row justify-center">
      <selected-numbers :numbers="details.draw" :isDisabled="true" title="DRAW"/>
      <selected-numbers
        :numbers="details.bet"
        :isDisabled="true"
        title="BET"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SelectedNumbers from '@/components/SelectedNumbers/SelectedNumbers.vue';

export default {
  name: 'HistoryDetails',
  components: {
    SelectedNumbers,
  },
  data() {
    return {
      // shownDetails: {},
    };
  },
  mounted() {
    this.setSelectedRowEntry(this.internalId);
  },
  computed: {
    ...mapState(['selectedRow', 'winIndexes']),
    internalId() {
      return this.$route.query.id;
    },
    details() {
      return this.selectedRow;
    },
    shownDetails() {
      const subset = (({
        createdAt,
        createdOn,
        result,
        amount,
      }) => ([{
        'Date: ': createdOn,
        'Time: ': createdAt,
        'Status: ': result,
        'Amount: ': amount,
      }]))(this.selectedRow)[0];

      return subset;
    },
  },
  methods: {
    ...mapActions(['setSelectedRowEntry']),
    redirectToMainPage() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>
