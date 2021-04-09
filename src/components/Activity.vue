<template>
  <div class="events">
    <div>
      <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </header>
      <notifications position="top right" />
      <div class="page-heading">
        <h3>กิจกรรม</h3>
      </div>
      <div class="page-content">
        <section class="row">
          <div class="card m-0 p-0">
            <div class="table-responsive">
              <table class="table table-borderless">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ลำดับ</th>
                    <th scope="col">เรื่อง</th>
                    <th scope="col">ภาพหัวกิจกรรม</th>
                    <th scope="col">สถานะ</th>
                    <th scope="col">วัน/เดือน/ปี</th>
                    <th scope="col">วัน/เดือน/ปี</th>
                    <th scope="col">โพสต์โดย</th>
                    <th scope="col">
                      <b-button v-b-modal.modal-events variant="primary">
                        <i class="fas fa-calendar-day mx-2"></i> เพิ่มกิจกรรม
                      </b-button>
                    </th>
                    <!-- Modal -->
                    <b-modal
                      id="modal-events"
                      hide-footer
                      content-class="shadow"
                      title="เพิ่ม เพิ่มกิจกรรม"
                      size="l"
                    >
                      <form v-on:submit.prevent="createEvents">
                        <div class="form-group text-left">
                          <label for="events_name">ชื่อเรื่อง</label>
                          <input
                            type="text"
                            class="form-control"
                            id="events_name"
                            aria-describedby="events_name"
                            v-model="objforms.title"
                          />
                        </div>
                        <div class="custom-file">
                          <input
                            type="file"
                            class="custom-file-input"
                            id="inputGroupFile05"
                            @change="processFile($event)"
                          />
                          <label
                            class="custom-file-label"
                            for="inputGroupFile05"
                            >{{ objforms.img.name }}</label
                          >
                        </div>
                        <div class="form-group text-left">
                          <label for="exampleFormControlTextarea1"
                            >เนื้อหาข่าว</label
                          >
                          <froala v-model="objforms.body"></froala>
                        </div>
                        <!-- <date-picker
                          :auto-submit="true"
                          v-model="objforms.event_time"
                          lang="en"
                          type="datetime"
                          format="DD-MM-YYYY HH:mm"
                          class="w-100"
                        ></date-picker> -->
                        <VueCtkDateTimePicker
                          format="YYYY-MM-DD HH:mm"
                          v-model="objforms.event_time"
                        />

                        <select
                          class="form-select form-select-lg"
                          aria-label=".form-select-sm example"
                          v-model="objforms.publish"
                          :selected="objforms.publish"
                        >
                          <option value="1">เปิดใช้งาน</option>
                          <option value="2">ปิด</option>
                        </select>
                        <div class="text-center">
                          <button
                            type="button"
                            class="btn btn-secondary mr-2"
                            data-dismiss="modal"
                            @click="$bvModal.hide('modal-events')"
                          >
                            ปิด
                          </button>
                          <button
                            type="submit"
                            class="btn btn-primary"
                            @click="$bvModal.hide('modal-events')"
                          >
                            โพสต์
                          </button>
                        </div>
                      </form>
                    </b-modal>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(event, index) in pageOfItems"
                    :key="event + index"
                  >
                    <td scope="row">{{ index + 1 }}</td>
                    <td>{{ event.title }}</td>
                    <td>
                      <img
                        :src="api_img + event.img_name"
                        alt=""
                        style="width: 100px"
                      />
                    </td>
                    <td>{{ event.publish == 1 ? "เปิดใช้งาน" : "ปิด" }}</td>
                    <td>{{ event.created_at | formatDate }}</td>
                    <td>{{ event.event_time | formatDate }}</td>
                    <td>{{ event.author }}</td>
                    <td>
                      <button
                        class="btn btn-primary"
                        @click="deleteEvents(event.ref_id_img)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                      <b-button
                        v-b-modal.modal-events-edit
                        variant="primary"
                        @click="editEvents(index)"
                      >
                        <i class="fas fa-edit"></i>
                      </b-button>
                      <!-- Button trigger modal -->
                      <!-- Modal -->
                    </td>
                  </tr>
                  <b-modal
                    id="modal-events-edit"
                    hide-footer
                    content-class="shadow"
                    title="แก้ไขรายละเอียดของกิจกรรม"
                    size="l"
                  >
                    <form v-on:submit.prevent="updateEvents">
                      <div class="form-group text-left">
                        <label>ชื่อเรื่อง</label>
                        <input
                          type="text"
                          class="form-control"
                          id="events_name12"
                          aria-describedby="events_name1"
                          v-model="edit_events.title"
                        />
                      </div>
                      <div class="custom-file">
                        <input
                          type="file"
                          class="custom-file-input"
                          id="inputGroupFile05"
                          @change="processFileupdate($event)"
                        />
                        <label
                          class="custom-file-label"
                          for="inputGroupFile05"
                          >{{ edit_events.img.name }}</label
                        >
                      </div>
                      <div class="form-group text-left">
                        <label for="exampleFormControlTextarea1"
                          >เนื้อหาข่าว</label
                        >
                        <froala v-model="edit_events.body"></froala>
                      </div>
                      <VueCtkDateTimePicker
                        format="YYYY-MM-DD HH:mm"
                        v-model="edit_events.event_time"
                      />
                      <select
                        class="form-select form-select-lg"
                        aria-label=".form-select-sm example"
                        v-model="edit_events.publish"
                        :selected="edit_events.publish"
                      >
                        <option value="1">เปิดใช้งาน</option>
                        <option value="2">ปิด</option>
                      </select>
                      <div class="text-center">
                        <button
                          type="button"
                          class="btn btn-secondary mr-2"
                          data-dismiss="modal"
                          @click="
                            $bvModal.hide('modal-events-edit');
                            cleareditEvents();
                          "
                        >
                          ปิด
                        </button>
                        <button
                          type="submit"
                          class="btn btn-primary"
                          @click="$bvModal.hide('modal-events-edit')"
                        >
                          โพสต์
                        </button>
                      </div>
                    </form>
                  </b-modal>
                </tbody>
              </table>
            </div>
            <div class="card text-center m-3">
              <div class="card-footer pb-0 pt-3">
                <jw-pagination
                  :pageSize="10"
                  :labels="customLabels"
                  :items="events ? events : undefined"
                  @changePage="onChangePage"
                ></jw-pagination>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
const customLabels = {
  first: "fisrt",
  last: "last",
  previous: "<",
  next: ">",
};
const api_img = "https://express.crm-flow.com/media/events/";
import "vue2-datepicker/index.css";
let axios = require("axios");
export default {
  name: "events",
  components: {},
  data() {
    return {
      objforms: {
        title: "",
        body: "",
        event_time: "",
        author: "",
        description: "",
        img: {
          file: "",
          name: "",
        },
        publish: "1",
      },
      events: "",
      edit_events: {
        title: "",
        body: "",
        event_time: "",
        author: "",
        description: "",
        img: {
          file: "",
          name: "",
        },
        publish: "",
      },
      pageOfItems: [],
      customLabels,
      api_img,
    };
  },
  methods: {
    processFile(event) {
      this.objforms.img.file = event.target.files[0];
      this.objforms.img.name = event.target.files[0].name;
    },
    processFileupdate(event) {
      this.edit_events.img.file = event.target.files[0];
      this.edit_events.img.name = event.target.files[0].name;
    },
    async createEvents() {
      this.objforms.author = this.getAdmin.username;
      var data = new FormData();
      data.append("img", this.objforms.img.file);
      data.append("forms", JSON.stringify(this.objforms));
      var config = {
        method: "post",
        url: "https://express.crm-flow.com/api/events",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(async (response) => {
          this.$notify({
            type: "success",
            title: "ทำการายการสำเร็จ",
            text: "สร้างกิจกรรมสำเร็จ",
          });
          this.getEvents();
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async getEvents() {
      let config = {
        method: "get",
        url: "https://express.crm-flow.com/api/events/read",
        headers: {},
      };
      await axios(config)
        .then((response) => {
          this.events = response.data;
          // alert('get');
          //   this.$store.dispatch("addevents", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async editEvents(index) {
      this.edit_events.img.name = this.events[index].img_name;
      for await (const [key, value] of Object.entries(this.events[index])) {
        this.edit_events[key] = value;
      }
    },
    async cleareditEvents() {
      // this.edit_banner.push(this.banner[index]);
      this.edit_events = {
        title: "",
        body: "",
        event_time: "",
        author: "",
        description: "",
        img: {
          file: "",
          name: "",
        },
        publish: "",
      };
    },
    async updateEvents() {
      this.edit_events.author = await this.getAdmin.username;
      var data = new FormData();
      data.append("img", await this.edit_events.img.file);
      data.append("forms", JSON.stringify(this.edit_events));
      console.log(this.edit_events);
      var config = {
        method: "post",
        url: "https://express.crm-flow.com/api/events/update",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then((response) => {
          this.$notify({
            type: "success",
            title: "ทำการายการสำเร็จ",
            text: "แก้ไขรายละเอียดกิจกรรมสำเร็จ",
          });
          this.getEvents();
          console.log(response.data);
          this.cleareditEvents();
          // alert('get');
          //   this.$store.dispatch("addevents", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async deleteEvents(id) {
      if (confirm("คุณต้องการจะลบรายการนี้หรือไม่?")) {
        var data = JSON.stringify({ id: id });
        var config = {
          method: "post",
          url: "https://express.crm-flow.com/api/events/delete",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        await axios(config)
          .then((response) => {
            this.$notify({
              type: "success",
              title: "ทำการายการสำเร็จ",
              text: "ลบกิจกรรมสำเร็จ",
            });
            this.getEvents();
            console.log(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
  },
  async created() {
    await this.getEvents();
  },
  computed: {
    get() {
      return this.$store.getters.getevents;
    },
    getAdmin() {
      return JSON.parse(this.$store.getters.getAdmin);
    },
  },
};
</script>

<style scoped>
td button {
  margin-left: 10px;
}
</style>
