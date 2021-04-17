<template>
  <div class="Benefits">
    <div>
      <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </header>
      <notifications position="top right" />
      <div class="page-heading">
        <h3>สิทธิประโยชน์</h3>
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
                    <th scope="col">ภาพหัวสิทธิ</th>
                    <th scope="col">สถานะ</th>
                    <th scope="col">วัน/เดือน/ปี</th>
                    <th scope="col">โพสต์โดย</th>
                    <th scope="col">
                      <b-button v-b-modal.modal-benefits variant="primary">
                        <i class="fas fa-newspaper mx-2"></i> เพิ่มสิทธิประโยชน์
                      </b-button>
                    </th>

                    <!-- Modal -->
                    <b-modal
                      id="modal-benefits"
                      hide-footer
                      content-class="shadow"
                      title="เพิ่ม Banner"
                      size="l"
                    >
                      <form v-on:submit.prevent="createBenefits">
                        <div class="form-group text-left">
                          <label for="Benefits_name">ชื่อสิทธิประโยชน์</label>
                          <input
                            type="text"
                            class="form-control"
                            id="Benefits_name"
                            aria-describedby="Benefits_name"
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
                            >รายละเอียดสิทธิประโยชน์</label
                          >
                          <froala
                            id="exampleFormControlTextarea1"
                            rows="3"
                            v-model="objforms.body"
                          ></froala>
                        </div>
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
                            @click="$bvModal.hide('modal-benefits')"
                          >
                            ปิด
                          </button>
                          <button
                            type="submit"
                            class="btn btn-primary"
                            @click="$bvModal.hide('modal-benefits')"
                          >
                            โพสต์
                          </button>
                        </div>
                      </form>
                    </b-modal>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="benefit in pageOfItems" :key="benefit.id">
                    <td scope="row">{{ benefit.id + 1 }}</td>
                    <td>{{ benefit.benefits.title }}</td>
                    <td>
                      <img
                        :src="api_img + benefit.benefits.img_name"
                        alt=""
                        style="width: 100px"
                      />
                    </td>
                    <td>
                      {{ benefit.benefits.publish == 1 ? "เปิดใช้งาน" : "ปิด" }}
                    </td>
                    <td>{{ benefit.benefits.created_at | formatDate }}</td>
                    <td>{{ benefit.benefits.author }}</td>
                    <td>
                      <button
                        class="btn btn-primary"
                        @click="deleteBenefits(benefit.benefits.ref_id_img)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                      <b-button
                        v-b-modal.modal-benefits-edit
                        variant="primary"
                        @click="editBenefits(benefit.id)"
                      >
                        <i class="fas fa-edit"></i>
                      </b-button>
                      <!-- Button trigger modal -->
                      <!-- Modal -->
                    </td>
                  </tr>
                  <b-modal
                    id="modal-benefits-edit"
                    hide-footer
                    content-class="shadow"
                    title="แก้ไข benefits"
                    size="l"
                  >
                    <form v-on:submit.prevent="updateBenefits">
                      <div class="form-group text-left">
                        <label>ชื่อ</label>
                        <input
                          type="text"
                          class="form-control"
                          id="Benefits_name12"
                          aria-describedby="Benefits_name1"
                          v-model="edit_benefits.title"
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
                          >{{ edit_benefits.img.name }}</label
                        >
                      </div>
                      <div class="form-group text-left">
                        <label for="exampleFormControlTextarea1"
                          >รายละเอียดสิทธิประโยชน์</label
                        >
                        <froala
                          id="exampleFormControlTextarea1"
                          rows="3"
                          v-model="edit_benefits.body"
                        ></froala>
                      </div>
                      <select
                        class="form-select form-select-lg"
                        aria-label=".form-select-sm example"
                        v-model="edit_benefits.publish"
                        :selected="edit_benefits.publish"
                      >
                        <option value="1">เปิดใช้งาน</option>
                        <option value="2">ปิด</option>
                      </select>
                      <div class="text-center">
                        <button
                          type="button"
                          class="btn btn-secondary mr-2"
                          data-dismiss="modal"
                          @click="$bvModal.hide('modal-benefits-edit')"
                        >
                          ปิด
                        </button>
                        <button
                          type="submit"
                          class="btn btn-primary"
                          @click="$bvModal.hide('modal-benefits-edit')"
                        >
                          โพสต์
                        </button>
                      </div>
                    </form>
                  </b-modal>
                </tbody>
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
let axios = require("axios");
const api_img = "https://express.crm-flow.com/media/benefits/";
export default {
  name: "Benefits",
  data() {
    return {
      objforms: {
        title: "",
        body: "",
        author: "",
        description: "",
        img: {
          file: "",
          name: "",
        },
        publish: "1",
      },
      benefits: "",
      edit_benefits: {
        title: "",
        body: "",
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
      exampleItems: "",
    };
  },
  methods: {
    processFile(event) {
      this.objforms.img.file = event.target.files[0];
      this.objforms.img.name = event.target.files[0].name;
    },
    processFileupdate(event) {
      this.edit_benefits.img.file = event.target.files[0];
      this.edit_benefits.img.name = event.target.files[0].name;
    },
    async createBenefits() {
      this.objforms.author = this.getAdmin.username;
      var data = new FormData();
      data.append("img", this.objforms.img.file);
      data.append("forms", JSON.stringify(this.objforms));
      var config = {
        method: "post",
        url: "https://express.crm-flow.com/api/benefits",
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
            text: "สร้างสิทธิประโยชน์สำเร็จ",
          });
          console.log(response.data);
          this.getBenefits();
          this.objforms = {
            title: "",
            body: "",
            author: "",
            description: "",
            img: {
              file: "",
              name: "",
            },
            publish: "1",
          };
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
          this.benefits = response.data;
          this.exampleItems = [...this.benefits.keys()].map((i) => ({
            id: i,
            benefits: this.benefits[i],
          }));
          // alert('get');
          //   this.$store.dispatch("addNews", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async editBenefits(index) {
      this.edit_benefits.img.name = this.benefits[index].img_name;
      for await (const [key, value] of Object.entries(this.benefits[index])) {
        this.edit_benefits[key] = value;
      }
    },
    async updateBenefits() {
      this.edit_benefits.author = await this.getAdmin.username;
      var data = new FormData();
      data.append("img", await this.edit_benefits.img.file);
      data.append("forms", JSON.stringify(this.edit_benefits));
      console.log(this.edit_benefits);
      var config = {
        method: "post",
        url: "https://express.crm-flow.com/api/benefits/update",
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
            text: "แก้ไขข้อมูลสิทธิประโยชน์สำเร็จ",
          });
          console.log(response.data);
          this.getBenefits();
          // alert('get');
          //   this.$store.dispatch("addNews", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async deleteBenefits(id) {
      if (confirm("คุณต้องการจะลบรายการนี้หรือไม่?")) {
        var data = JSON.stringify({ id: id });
        var config = {
          method: "post",
          url: "https://express.crm-flow.com/api/benefits/delete",
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
              text: "ลบสิทธิประโยชน์สำเร็จ",
            });
            this.getBenefits();
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
    await this.getBenefits();
  },
  computed: {
    get() {
      return this.$store.getters.news;
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
