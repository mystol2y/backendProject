<template>
  <div class="Dashboard" id="Dashboard">
    <div id="sidebar" class="active">
      <div class="sidebar-wrapper active">
        <div class="sidebar-header">
          <div class="d-flex justify-content-between">
            <div class="logo mx-auto d-block">
              <img
                src="../../src/assets/registerlogo.png"
                alt="Logo"
                srcset=""
              />
            </div>
            <div class="toggler">
              <a href="#" class="sidebar-hide d-xl-none d-block"
                ><i class="bi bi-x bi-middle"></i
              ></a>
            </div>
          </div>
          <button class="btn btn-danger w-100 mt-5" @click="logOut">
            ออกจากระบบ
          </button>
        </div>
        <div class="sidebar-menu">
          <ul class="menu">
            <li class="sidebar-title">Menu</li>

            <li
              class="sidebar-item "
              @click="(status = 'all'), setActive('lia')"
              :class="{ active: isActive('lia') }"
            >
              <a class="sidebar-link">
                <i class="bi bi-grid-fill"></i>
                <span>Dashboard</span>
              </a>
            </li>

            <li
              class="sidebar-item "
              @click="(status = 'a'), setActive('li')"
              :class="{ active: isActive('li') }"
            >
              <a class="sidebar-link">
                <i class="bi bi-grid-fill"></i>
                <span>สมาชิก</span>
              </a>
            </li>
            <li
              class="sidebar-item   "
              @click="(status = 'b'), setActive('li1')"
              :class="{ active: isActive('li1') }"
            >
              <a class="sidebar-link">
                <i class="bi bi-grid-fill"></i>
                <span>ข่าวสาร</span>
              </a>
            </li>
            <li
              class="sidebar-item "
              @click="(status = 'c'), setActive('li2')"
              :class="{ active: isActive('li2') }"
            >
              <a class="sidebar-link">
                <i class="bi bi-grid-fill"></i>
                <span>กิจกรรม</span>
              </a>
            </li>
            <li
              class="sidebar-item "
              @click="(status = 'd'), setActive('li3')"
              :class="{ active: isActive('li3') }"
            >
              <a class="sidebar-link">
                <i class="bi bi-grid-fill"></i>
                <span>สิทธิประโยชน์</span>
              </a>
            </li>

            <li
              class="sidebar-item "
              @click="(status = 'e'), setActive('li4')"
              :class="{ active: isActive('li4') }"
            >
              <a class="sidebar-link">
                <i class="bi bi-grid-fill"></i>
                <span>Banner</span>
              </a>
            </li>

            <li
              class="sidebar-item "
              @click="(status = 'f'), setActive('li5')"
              :class="{ active: isActive('li5') }"
            >
              <a class="sidebar-link">
                <i class="bi bi-grid-fill"></i>
                <span>Admin</span>
              </a>
            </li>
            <li
              class="sidebar-item "
              @click="(status = 'g'), setActive('li6')"
              :class="{ active: isActive('li6') }"
            >
              <a class="sidebar-link">
                <i class="bi bi-grid-fill"></i>
                <span>Receipt</span>
              </a>
            </li>
            <li
              class="sidebar-item "
              @click="(status = 'h'), setActive('li7')"
              :class="{ active: isActive('li7') }"
            >
              <a class="sidebar-link">
                <i class="bi bi-grid-fill"></i>
                <span>Invoice</span>
              </a>
            </li>
          </ul>
        </div>
        <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
      </div>
    </div>

    <div id="main" v-if="status === 'all'">
      <Dashboard />
      </div>
    <div id="main" v-if="status === 'a'">
      <Member />
    </div>

    <div id="main" v-if="status === 'b'">
      <News />
    </div>

    <div id="main" v-if="status === 'c'">
      <Activity />
    </div>

    <div id="main" v-if="status === 'd'">
      <Benefits />
    </div>

    <div id="main" v-if="status === 'e'">
      <Banner />
    </div>

    <div id="main" v-if="status === 'f'">
      <Admin />
    </div>
    <div id="main" v-if="status === 'g'">
      <Receipt />
    </div>
    <div id="main" v-if="status === 'h'">
      <Invoice />
    </div>
  </div>
</template>
//require('@/assets/js/main.js');

<script>
import Receipt from "@/components/Receipt.vue";
import Invoice from "@/components/Invoice.vue";
import Member from "@/components/Member.vue";
import News from "@/components/News.vue";
import Activity from "@/components/Activity.vue";
import Benefits from "@/components/Benefits.vue";
import Banner from "@/components/Banner.vue";
import Dashboard from "@/components/Dashboard.vue";
import Admin from "@/components/Admin.vue";
import router from "../router/index";
export default {
  name: "Home",
  components: {
    Member,
    News,
    Activity,
    Benefits,
    Banner,
    Admin,
    Receipt,
    Invoice,
    Dashboard
  },
  data() {
    return {
      status: "all",
      activeItem: "lia",
    };
  },
  async mounted() {
    let addScript = document.createElement("script");
    addScript.setAttribute("src", "/assets/js/main.js");
    document.head.appendChild(addScript);
  },
  methods: {
    isActive: function(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive: function(menuItem) {
      this.activeItem = menuItem; // no need for Vue.set()
    },

    async logOut() {
      localStorage.removeItem("admin");
      this.$store.dispatch("removeAdmin");
      console.log("logout");
      router.push({ name: "Login" });
    },
  },
  async created() {
  },
  computed: {
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
