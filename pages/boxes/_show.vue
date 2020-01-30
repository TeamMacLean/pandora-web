<template>
  <div>
    <b-modal :active.sync="isNewBagModalActive" :width="320" scroll="keep">
      <div class="card">
        <div class="card-content">
          <NewBag :box="box" @onComplete="onComplete" />
        </div>
      </div>
    </b-modal>
    <section class="section">
      <div class="container">
        <div class="is-pulled-left">
          <h2 class="title">
            <b-icon icon="package-variant" size="is-medium" />
            {{box.code}}
          </h2>
        </div>
        <div class="is-pulled-right">
          <!-- <b-button class="button" icon-left="printer-pos" @click="printLabel">Print label</b-button> -->
        </div>
        <div class="is-clearfix" />

        <br />
        <!-- <h3 class="title is-5">Location:</h3> -->
        <p class="is-size-5">Bay: {{box.bay}}</p>
        <p class="is-size-5">Shelf: {{box.shelf}}</p>
        <p class="is-size-5">Created by: {{box.createdBy}}</p>
        <p class="is-size-5">Created at: {{moment(box.createdAt).calendar()}}</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <!-- bags -->

        <div class="is-pulled-left">
          <h2 class="title is-5">Seed bags</h2>
        </div>
        <div class="is-pulled-right">
          <b-button icon-left="plus" @click="isNewBagModalActive = true" type="is-primary">New Bag</b-button>
        </div>
        <div class="is-clearfix" />
        <br />
        <div v-if="box.bags">
          <div v-for="bag in box.bags" :key="bag.code" @click="onBagClick(bag.code)">
            <div class="card is-button">
              <div class="card-content">
                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <b-icon icon="seed-outline" class="is-centered-block" />
                    </div>
                    <div class="level-item">
                      <strong>{{bag.species}}</strong>
                    </div>
                    <div class="level-item">
                      <strong>{{bag.accession}}</strong>
                    </div>
                  </div>

                  <div class="level-right">
                    <div class="level-item">{{bag.code}}</div>
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

export default {
  middleware: "auth",
  components: { NewBag, BagCard },
  asyncData({ route, $axios, error, store }) {
    return $axios
      .get("/box", { params: { code: route.params.show } })
      .then(res => {
        if (res.status === 200 && res.data.box) {
          // res.data.project.samples = [];
          return {
            isNewBagModalActive: false,
            box: res.data.box
          };
        } else {
          error({ statusCode: 501, message: "Box not found" });
        }
      })
      .catch(err => {
        console.error(err);
        error({ statusCode: 501, message: "Box not found" });
      });
  },
  methods: {
    refreshBox() {
      this.$axios
        .get("/box", { params: { code: this.box.code } })
        .then(res => {
          if (res.status === 200 && res.data.box) {
            this.box = res.data.box;
          } else {
            error({ statusCode: 501, message: "Box not found" });
          }
        })
        .catch(err => {
          console.error(err);
          error({ statusCode: 501, message: "Box not found" });
        });
    },
    onBagClick(bagCode) {
      this.$router.push({
        name: "bags-show",
        params: { show: bagCode }
      });
    },
    onComplete() {
      this.isNewBagModalActive = false;
      this.refreshBox();
    }
    // printLabel() {
    //   return;
    //   var labelDiv = document.getElementById("label");
    //   var w = labelDiv.offsetWidth;
    //   var h = labelDiv.offsetHeight;
    //   const box = this.box;

    //   html2canvas(labelDiv).then(function(canvas) {
    //     var doc = new jsPDF("l", "px", [w * 1.4, h * 1.4]);
    //     var imgData = canvas.toDataURL("image/png");
    //     doc.addImage(imgData, "PNG", 0, 0, w, h);
    //     doc.save(`${box.id}-label.pdf`);
    //   });
    // }
  }
};
</script>

<style scoped>
.is-button:hover {
  cursor: pointer;
}
</style>