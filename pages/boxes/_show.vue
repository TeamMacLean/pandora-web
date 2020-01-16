<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="is-pulled-left">
          <h2 class="title is-4">
            <b-icon icon="package-variant" size="is-medium" />
            {{box.code}}
          </h2>
          <!-- <h3 class="title is-5">Location:</h3> -->
          <p>Bay: {{box.bay}}</p>
          <p>Shelf: {{box.shelf}}</p>
          
        </div>
        <div class="is-pulled-right">
          <b-button class="button" icon-left="printer-pos" @click="printLabel">Print label</b-button>
        </div>
        <div class="is-clearfix" />

      </div>
    </section>
    <section class="section">
      <div class="container">
        <!-- bags -->

        <div class="is-pulled-left">
          <h2 class="title is-5">Seed bags</h2>
        </div>
        <div class="is-pulled-right">
          <b-button icon-left="plus" @click="isNewBagModalActive = true">New Bag</b-button>

          <b-modal :active.sync="isNewBagModalActive" :width="320" scroll="keep">
            <div class="card">
              <div class="card-content">
                <NewBag :box="box" @onComplete="onComplete" />
              </div>
            </div>
          </b-modal>
        </div>
        <div class="is-clearfix" />
        <br />
        <div v-if="box.bags">
          <div class="columns" v-for="i in Math.ceil(box.bags.length / 6)" :key="i">
            <div
              class="column is-2"
              v-for="bag in box.bags.slice((i - 1) * 6, i * 6)"
              :key="bag.id"
            >
              <BagCard :bag="bag" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
            box: res.data.box,
            QRData: ""
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
    onComplete() {
      this.isNewBagModalActive = false;
      this.refreshBox();
    },
    printLabel() {
      return 
      var labelDiv = document.getElementById("label");
      var w = labelDiv.offsetWidth;
      var h = labelDiv.offsetHeight;
      const box = this.box;

      html2canvas(labelDiv).then(function(canvas) {
        var doc = new jsPDF("l", "px", [w * 1.4, h * 1.4]);
        var imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 0, 0, w, h);
        doc.save(`${box.id}-label.pdf`);
      });
    }
  },
  created: async function() {
    try {
      this.QRData = await QRCode.toDataURL(this.box.id);
    } catch (err) {
      console.error(err);
    }
  }
};
</script>