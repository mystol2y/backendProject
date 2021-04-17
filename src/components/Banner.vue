<template>
  <div class="Banner">
    <div>
      <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </header>
      <notifications position="top right" />
      <div class="page-heading">
        <h3>Banner</h3>
      </div>
      <div class="page-content">
        <section class="row">
          <div class="card m-0 p-0">
            <div class="table-responsive">
              <table class="table table-borderless">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ลำดับ</th>
                    <th scope="col">รูปภาพ</th>
                    <th scope="col">ประเภท</th>
                    <th scope="col">วัน/เดือน/ปี</th>
                    <th scope="col">โพสต์โดย</th>
                    <th scope="col">
                      <b-button v-b-modal.modal-banner variant="primary">
                        <i class="far fa-image"></i> เพิ่ม Banner
                      </b-button>
                    </th>
                    <!-- Modal -->
                    <b-modal
                      id="modal-banner"
                      hide-footer
                      content-class="shadow"
                      title="เพิ่ม Banner"
                      size="l"
                    >
                      <form v-on:submit.prevent="onSubmit">
                        <div class="form-group text-left">
                          <label>เลือกรูปภาพ</label>
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
                              >{{ banner_img.name }}</label
                            >
                          </div>
                        </div>
                        <div>
                          <select
                            class="form-select form-select-lg"
                            aria-label=".form-select-sm example"
                            v-model="type"
                            :selected="type"
                          >
                            <option value="-1">เลือกกลุ่ม</option>
                            <option value="0">ข่าว</option>
                            <option value="1">อีเวนต์</option>
                            <option value="2">สิทธิประโยชน์</option>
                          </select>
                        </div>
                        <div class="text-center mt-5">
                          <button
                            type="button"
                            class="btn btn-secondary mr-2"
                            data-dismiss="modal"
                            @click="$bvModal.hide('modal-banner')"
                          >
                            ปิด
                          </button>
                          <button
                            type="submit"
                            class="btn btn-primary"
                            @click="$bvModal.hide('modal-banner')"
                          >
                            ตกลง
                          </button>
                        </div>
                      </form>
                    </b-modal>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(bann, index) in pageOfItems" :key="bann + index">
                    <td scope="row">{{ bann.id + 1 }}</td>
                    <td class="wi-img">
                      <img
                        :src="api_img + bann.banner.img_name"
                        alt=""
                        style="width: 100px"
                      />
                    </td>
                    <td>{{ getTypebanner(bann.banner.type) }}</td>
                    <td>{{ bann.banner.created_date | formatDate }}</td>
                    <td>{{ bann.banner.author }}</td>
                    <td>
                      <button
                        class="btn btn-primary "
                        @click="deleteBanner(bann.banner.ref_id)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                      <b-button
                        v-b-modal.modal-banner-edit
                        variant="primary"
                        @click="editBanner(bann.id)"
                      >
                        <i class="fas fa-edit"></i>
                      </b-button>
                      <!-- Button trigger modal -->
                      <!-- Modal -->
                    </td>
                  </tr>
                </tbody>
                <b-modal
                  id="modal-banner-edit"
                  hide-footer
                  content-class="shadow"
                  title="แก้ไข Banner"
                  size="l"
                >
                  <form v-on:submit.prevent="updateBanner">
                    <div class="form-group text-left">
                      <label>เลือกรูปภาพ</label>
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
                          >{{ edit_banner.img_name }}</label
                        >
                      </div>
                    </div>
                    <div>
                      <select
                        class="form-select form-select-lg"
                        aria-label=".form-select-sm example"
                        v-model="edit_banner.type"
                        :selected="edit_banner.type"
                      >
                        <option value="-1">เลือกกลุ่ม</option>
                        <option value="0">ข่าว</option>
                        <option value="1">อีเวนต์</option>
                        <option value="2">สิทธิประโยชน์</option>
                      </select>
                    </div>
                    <div class="text-center mt-5">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        @click="
                          $bvModal.hide('modal-banner-edit');
                          cleareditBanner();
                        "
                      >
                        ปิด
                      </button>
                      <button
                        type="submit"
                        class="btn btn-primary"
                        @click="
                          $bvModal.hide('modal-banner-edit');
                          cleareditBanner();
                        "
                      >
                        เพิ่ม
                      </button>
                    </div>
                  </form>
                </b-modal>
              </table>
            </div>
            <div class="text-center m-3 pb-0 pt-3">
              <jw-pagination
                :pageSize="10"
                :labels="customLabels"
                :items="exampleItems ? exampleItems : undefined"
                @changePage="onChangePage"
              ></jw-pagination>
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
const api_img = "https://express.crm-flow.com/media/banner/";
let axios = require("axios");
export default {
  name: "Banner",
  data() {
    return {
      status: "all",
      activeItem: "lia",
      banner_img: "",
      banner_img_update: "",
      type: "-1",
      banner: "",
      api_img,
      edit_banner: {
        id: "",
        type: "",
        ref_id: "",
        author: "",
        img_name: "",
        created_date: "",
      },
      pageOfItems: [],
      customLabels,
      exampleItems:"",
    };
  },
  methods: {
    processFile(event) {
      this.banner_img = event.target.files[0];
    },
    processFileupdate(event) {
      this.edit_banner.img_name = event.target.files[0].name;
      this.edit_banner.img = event.target.files[0];
    },
    async onSubmit() {
      let data = new FormData();
      //   alert('res');
      data.append("banner", this.banner_img, this.banner_img.name);
      data.append("type", this.type);
      data.append("author", this.get.username);
      var config = {
        method: "post",
        url: "https://express.crm-flow.com/api/banner",
        data: data,
      };
      await axios(config)
        .then((response) => {
          this.$notify({
            type: "success",
            title: "ทำการายการสำเร็จ",
            text: "สร้างแบนเนอร์สำเร็จ",
          });
          // console.log(localStorage.getItem("username"));
          console.log(response.data);
          this.getBanner();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async getBanner() {
      var config = {
        method: "get",
        url: "https://express.crm-flow.com/api/banner/read",
      };
      await axios(config)
        .then((response) => {
          // console.log(localStorage.getItem("username"));
          this.banner = response.data;
          this.banner_img = "";
          console.log(response.data);
          this.exampleItems = [...this.banner.keys()].map((i) => ({
            id: i,
            banner: this.banner[i],
          }));
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getTypebanner(type) {
      if (type == 0) return "ข่าว";
      if (type == 1) return "อีเวนต์";
      return "สิทธิประโยชน์";
    },
    async editBanner(index) {
      // this.edit_banner.push(this.banner[index]);
      // this.edit_banner.id = await this.banner[index].id;
      // this.edit_banner.type = await this.banner[index].type;
      // this.edit_banner.ref_id = await this.banner[index].ref_id;
      // this.edit_banner.author = await this.banner[index].author;
      // this.edit_banner.img_name = await this.banner[index].img_name;
      // this.edit_banner.created_date = await this.banner[index].created_date;
      for await (const [key, value] of Object.entries(this.banner[index])) {
        this.edit_banner[key] = value;
      }
    },
    async cleareditBanner() {
      // this.edit_banner.push(this.banner[index]);
      this.edit_banner = {
        id: "",
        type: "",
        ref_id: "",
        author: "",
        img_name: "",
        created_date: "",
      };
    },
    async updateBanner() {
      let data = new FormData();
      //   alert('res');
      if (this.banner_img != "")
        data.append("banner", this.banner_img, this.banner_img.name);
      data.append("type", this.edit_banner.type);
      data.append("author", this.get.username);
      data.append("img_name", this.edit_banner.img_name);
      data.append("ref_id", this.edit_banner.ref_id);
      var config = {
        method: "post",
        url: "https://express.crm-flow.com/api/banner/update",
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
            text: "แก้ไขข้อมูลแบนเนอร์สำเร็จ",
          });
          console.log(response.data);
          this.getBanner();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async deleteBanner(ref_id) {
      if (confirm("คุณต้องการจะลบรายการนี้หรือไม่?")) {
        var data = JSON.stringify({ ref_id: ref_id });
        var config = {
          method: "post",
          url: "https://express.crm-flow.com/api/banner/delete",
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
              text: "ลบแบนเนอร์สำเร็จ",
            });
            console.log(response.data);
            this.getBanner();
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
  created() {
    this.getBanner();
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
  width: 150px;
}
td button {
  margin-left: 10px;
}
</style>
