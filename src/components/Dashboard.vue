<template>
  <div class="Dashboard" id="Dashboard">
      <div class="page-heading">
        <h3>Dashboard</h3>
      </div>
      <div class="page-content">
        <section class="row">
          <div class="col-12 col-lg-9">
            <div class="row">
              <div class="col-6 col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body px-3 py-4-5">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="stats-icon purple">
                          <i class="iconly-boldShow"></i>
                        </div>
                      </div>
                      <div class="col-md-8">
                        <h6 class="text-muted font-semibold">จำนวนสมาชิก</h6>
                        <h6 class="font-extrabold mb-0">{{ members_count }}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body px-3 py-4-5">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="stats-icon blue">
                          <i class="iconly-boldProfile"></i>
                        </div>
                      </div>
                      <div class="col-md-8">
                        <h6 class="text-muted font-semibold">จำนวนรายได้</h6>
                        <h6 class="font-extrabold mb-0">{{ members_fee }}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body px-3 py-4-5">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="stats-icon green">
                          <i class="iconly-boldAdd-User"></i>
                        </div>
                      </div>
                      <div class="col-md-8">
                        <h6 class="text-muted font-semibold">
                          จำนวนสิทธิพิเศษ
                        </h6>
                        <h6 class="font-extrabold mb-0">
                          {{ benefits_count }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-lg-3 col-md-6">
                <div class="card">
                  <div class="card-body px-3 py-4-5">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="stats-icon red">
                          <i class="iconly-boldBookmark"></i>
                        </div>
                      </div>
                      <div class="col-md-8">
                        <h6 class="text-muted font-semibold">
                          สมัครสมาชิกวันนี้
                        </h6>
                        <h6 class="font-extrabold mb-0">
                          {{ member_today_count }}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4>รายชื่อสมาชิกใกล้หมดอายุ / ปี</h4>
                  </div>
                  <div class="card-body">
                    <div id="chart-profile-visit">
                      <div class="table-responsive">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">ลำดับ</th>
                              <th scope="col">ชื่อ-นามสกุล</th>
                              <th scope="col">เบอร์โทรศัพท์</th>
                              <th scope="col">วันหมดอายุ</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(member_ex, index) in pageOfItemsMES"
                              :key="member_ex + index"
                            >
                              <th scope="row">{{ index + 1 }}</th>
                              <td>
                                {{ member_ex.firstname }}
                                {{ member_ex.lastname }}
                              </td>
                              <td>{{ member_ex.mobile }}</td>
                              <td>{{ member_ex.expired_date | formatDate }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="text-center m-3 pb-0 pt-3">
                    <jw-pagination
                      :pageSize="5"
                      :labels="customLabels"
                      :items="
                        member_expire_soon ? member_expire_soon : undefined
                      "
                      @changePage="onChangePageMES"
                    ></jw-pagination>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-xl-12">
                <div class="card">
                  <div class="card-header">
                    <h4>ข่าวสาร</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">เรื่อง</th>
                            <th scope="col">วัน/เดือน/ปี</th>
                            <th scope="col">โพสต์โดย</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(new_, index) in pageOfItemsNews"
                            :key="new_ + index"
                          >
                            <th scope="row">{{ index + 1 }}</th>
                            <td>
                              {{ new_.title }}
                            </td>
                            <td>{{ new_.created_at | formatDate }}</td>
                            <td>{{ new_.author }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="text-center m-3 pb-0 pt-3">
                    <jw-pagination
                      :pageSize="5"
                      :labels="customLabels"
                      :items="news ? news : undefined"
                      @changePage="onChangePageNews"
                    ></jw-pagination>
                  </div>
                </div>
              </div>
              <div class="col-12 col-xl-12">
                <div class="card">
                  <div class="card-header">
                    <h4>กิจกรรม</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">เรื่อง</th>
                            <th scope="col">วัน/เดือน/ปี</th>
                            <th scope="col">โพสต์โดย</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(event, index) in pageOfItemsEvents"
                            :key="event + index"
                          >
                            <th scope="row">{{ index + 1 }}</th>
                            <td>
                              {{ event.title }}
                            </td>
                            <td>{{ event.created_at | formatDate }}</td>
                            <td>{{ event.author }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="text-center m-3 pb-0 pt-3">
                    <jw-pagination
                      :pageSize="5"
                      :labels="customLabels"
                      :items="events ? events : undefined"
                      @changePage="onChangePageEvents"
                    ></jw-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-3">
            <div class="card">
              <div class="card-body py-4 px-5">
                <div class="d-flex align-items-center">
                  <div class="avatar avatar-xl">
                    <img src="assets/images/faces/1.jpg" alt="Face 1" />
                  </div>
                  <div class="ms-3 name">
                    <h5 class="font-bold">
                      {{ get.username }}
                    </h5>
                    <h6 class="text-muted mb-0"></h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="card text-left">
              <div class="card-header text-center">
                <h4>รายชื่อคนสมัครวันนี้</h4>
              </div>
              <div class="card-content pb-4">
                <div
                  class="recent-message d-flex px-4 py-3"
                  v-for="(member_today, index) in members_today"
                  :key="member_today + index"
                >
                  <div class="avatar avatar-lg">
                    <img src="assets/images/faces/4.jpg" />
                  </div>
                  <div class="name ms-4">
                    <h5 class="mb-1">
                      {{ member_today.firstname }} {{ member_today.lastname }}
                    </h5>
                    <h6 class="text-muted mb-0">{{ member_today.username }}</h6>
                    <h6
                      class=" mb-0"
                      :style="[
                        member_today.status == 1
                          ? { color: 'green' }
                          : { color: 'gold' },
                      ]"
                    >
                      {{
                        member_today.status == 1
                          ? "ตรวจสอบแล้ว"
                          : "รอการตรวจสอบ"
                      }}
                    </h6>
                  </div>
                </div>
                <div class="px-4">
                  <button
                    class="btn btn-block btn-xl btn-light-primary font-bold mt-3"
                  >
                    ดูทั้งหมด
                  </button>
                </div>
              </div>
            </div>
            <!-- <div class="card">
                            <div class="card-header">
                                <h4>Visitors Profile</h4>
                            </div>
                            <div class="card-body">
                                <div id="chart-visitors-profile"></div>
                            </div>
                        </div> -->
          </div>
        </section>
      </div>
    </div>
</template>
//require('@/assets/js/main.js');

<script>

let axios = require("axios");
const customLabels = {
  first: "fisrt",
  last: "last",
  previous: "<",
  next: ">",
};
// import Member from "@/components/Member.vue";
import router from "../router/index";
export default {
  name: "Dashboard",
  components: {
    //   Member,
  },
  data() {
    return {
      status: "all",
      activeItem: "lia",
      arr: {
        date: "",
        firstname: "",
        lastname: "",
        age: "",
        name_wife_husband: "",
        address: "",
        road: "",
        locality: "",
        district: "",
        province: "",
        zip_code: "",
        bus_name: "",
        bus_type: "",
        bus_location: "",
        bus_cal: "",
        bus_phone: "",
        name_person: "",
        slip_img0: "",
        slip_img1: "",
        slip_img2: "",
        slip_img3: "",
        slip_img4: "",
      },
      news: "",
      events: "",
      pageOfItemsNews: [],
      pageOfItemsEvents: [],
      customLabels,
      members_today: "",
      member_today_count: "",
      members: "",
      members_count: "",
      members_fee: "",
      benefits_count: "",
      admin: "",
      member_expire_soon: "",
      pageOfItemsMES: [],
    };
  },
  async mounted() {
    let addScript = document.createElement("script");
    addScript.setAttribute("src", "/assets/js/main.js");
    document.head.appendChild(addScript);
    await this.getAdmin();
    await this.getEvents();
    await this.getBenefits();
    await this.getNews();
    await this.getRegistoday();
    await this.getMembers();
    await this.getMembersfee();
    await this.getMember_sexpiresoon();
  },
  methods: {
    isActive: function(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive: function(menuItem) {
      this.activeItem = menuItem; // no need for Vue.set()
    },
    processFile0(event) {
      this.arr.slip_img0 = event.target.files[0];
    },
    processFile1(event) {
      this.arr.slip_img1 = event.target.files[0];
    },
    processFile2(event) {
      this.arr.slip_img2 = event.target.files[0];
    },
    processFile3(event) {
      this.arr.slip_img3 = event.target.files[0];
    },
    processFile4(event) {
      this.arr.slip_img4 = event.target.files[0];
    },
    async getNews() {
      let config = {
        method: "get",
        url: "https://express.crm-flow.com/api/news/read",
        headers: {},
      };
      await axios(config)
        .then((response) => {
          this.news = response.data;
          // alert('get');
          //   this.$store.dispatch("addNews", response.data);
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
    async getRegistoday() {
      let config = {
        method: "get",
        url: "https://express.crm-flow.com/api/registerforms/regis_today",
        headers: {},
      };
      await axios(config)
        .then((response) => {
          this.members_today = response.data;
          this.member_today_count = this.members_today.length;
          console.log(response.data);
          // alert('get');
          //   this.$store.dispatch("addevents", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async getMembers() {
      var config = {
        method: "get",
        url: "https://express.crm-flow.com/api/registerforms/check",
        headers: {},
      };
      await axios(config)
        .then(async (response) => {
          this.members = await response.data;
          this.members_count = this.members.length;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async getMembersfee() {
      var config = {
        method: "get",
        url: "https://express.crm-flow.com/api/registerforms/fee",
        headers: {},
      };
      await axios(config)
        .then(async (response) => {
          this.members_fee = await response.data.length;
          this.members_fee = this.members_fee * 1000;
          this.members_fee = await this.numberWithCommas(this.members_fee);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async getBenefits() {
      let config = {
        method: "get",
        url: "https://express.crm-flow.com/api/benefits/read",
        headers: {},
      };
      await axios(config)
        .then((response) => {
          this.benefits_count = response.data.length;
          // alert('get');
          //   this.$store.dispatch("addNews", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async getMember_sexpiresoon() {
      var config = {
        method: "get",
        url: "https://express.crm-flow.com/api/registerforms/expire_soon",
        headers: {},
      };
      await axios(config)
        .then(async (response) => {
          this.member_expire_soon = response.data;
          //   console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onChangePageNews(pageOfItems) {
      // update page of items
      this.pageOfItemsNews = pageOfItems;
    },
    onChangePageEvents(pageOfItems) {
      // update page of items
      this.pageOfItemsEvents = pageOfItems;
    },
    onChangePageMES(pageOfItems) {
      // update page of items
      this.pageOfItemsMES = pageOfItems;
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getAdmin() {
      localStorage.getItem("admin")
        ? this.$store.dispatch("addAdmin", localStorage.getItem("admin"))
        : router.push({ name: "Login" });
    },
    async logOut() {
      localStorage.removeItem("admin");
      this.$store.dispatch("removeAdmin");
      console.log("logout");
      router.push({ name: "Login" });
    },
  },
  async created() {
    await this.getAdmin();
    await this.getEvents();
    await this.getBenefits();
    await this.getNews();
    await this.getRegistoday();
    await this.getMembers();
    await this.getMembersfee();
    await this.getMember_sexpiresoon();
  },
  computed: {
    get() {
      return JSON.parse(this.$store.getters.getAdmin);
    },
  },
};
</script>

<style scoped>
.wi-img img {
  width: 100px;
}
td button {
  margin-left: 10px;
}
.modal-dialog {
  width: 100%;
}
.sidebar-header img {
  width: 75px;
  height: 75px;
}
.wid .modal-dialog {
  max-width: 75% !important;
}
</style>
