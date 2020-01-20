<template>
  <div>
    <b-modal :active.sync="isLogModalActive" :width="320" scroll="keep">
      <NewLog :bag="bag" />
    </b-modal>
    <section class="section">
      <div class="container">
        <div class="is-pulled-left">
          <h2 class="title">
            <b-icon icon="seed-outline" size="is-medium" />
            {{bag.species}}
          </h2>
        </div>
        <div class="is-pulled-right">
          <!-- <b-button class="button" icon-left="printer-pos" >Print label</b-button> -->
          <b-button
            class="button"
            type="is-primary"
            icon-left="pencil"
            @click="isLogModalActive = true"
          >Log change</b-button>
        </div>
        <div class="is-clearfix" />

        <br />
        <p class="is-size-5">{{bag.accession}}</p>
        <nuxt-link :to="{name: 'boxes-show', params: { show: bag.box.code }}">
          <p class="is-size-5">
            <b-icon icon="package-variant" />
            {{bag.box.code}}
          </p>
        </nuxt-link>

        <p class="is-size-5">Created by: {{bag.createdBy}}</p>
      </div>
    </section>
  </div>
</template>

<script>
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

import NewBag from "~/components/NewBag";
import BagCard from "~/components/BagCard";
import NewLog from "~/components/NewLog";
export default {
  middleware: "auth",
  components: { NewBag, BagCard, NewLog },
  asyncData({ route, $axios, error, store }) {
    return $axios
      .get("/bag", { params: { code: route.params.show } })
      .then(res => {
        if (res.status === 200 && res.data.bag) {
          // res.data.project.samples = [];
          return {
            isLogModalActive: false,
            isNewBagModalActive: false,
            bag: res.data.bag
            // QRData: ""
          };
        } else {
          error({ statusCode: 501, message: "bag not found" });
        }
      })
      .catch(err => {
        console.error(err);
        error({ statusCode: 501, message: "bag not found" });
      });
  },
  methods: {
    refreshbag() {
      this.$axios
        .get("/bag", { params: { code: this.bag.code } })
        .then(res => {
          if (res.status === 200 && res.data.bag) {
            this.bag = res.data.bag;
          } else {
            error({ statusCode: 501, message: "bag not found" });
          }
        })
        .catch(err => {
          console.error(err);
          error({ statusCode: 501, message: "bag not found" });
        });
    },
    onComplete() {
      this.isLogModalActive = false;
      this.refreshbag();
    }
  
  }
};
</script>