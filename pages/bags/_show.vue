<template>
  <div>
    <b-modal :active.sync="isLogModalActive" :width="320" scroll="keep">
      <NewLog :bag="bag" @onComplete="onComplete" />
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
         <p class="is-size-5">
          <nuxt-link :to="{name: 'boxes-show', params: { show: bag.box.code }}">
            <b-icon icon="package-variant" />
            {{bag.box.code}}
          </nuxt-link>
        </p>
        
        <p class="is-size-5">Accession: {{bag.accession}}</p>
        <p class="is-size-5">ID: {{bag.code}}</p>

        <p class="is-size-5">Created by: {{bag.createdBy}}</p>
        <p class="is-size-5">Created at: {{moment(bag.createdAt).calendar()}}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div v-if="bag.logs">
          <div v-for="log in bag.logs" :key="log._id">
            <div class="card">
              <div class="card-content">
                <div class="level">
                  <div class="level-left">
                    <!-- <div class="level-item"> -->
                    <!-- <b-icon icon="seed-outline" class="is-centered-block" /> -->
                    <!-- </div> -->
                    <div class="level-item">
                      <span>
                        <strong>{{log.all ? 'all' : log.count}}</strong> taken by
                        <strong>{{log.by}}</strong>
                        on
                        {{moment(log.createdAt).calendar()}}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
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
      console.log("on complete");
      this.isLogModalActive = false;
      this.refreshbag();
    }
  }
};
</script>
