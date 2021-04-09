<template>
  <div class="Admin">
    <div>
      <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </header>

      <div class="page-heading">
        <h3>Admin</h3>
      </div>
      <div class="page-content">
        <section class="row">
          <div class="card m-0 p-0">
            <div class="table-responsive">
              <table class="table table-borderless">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ลำดับ</th>
                    <th scope="col">username</th>
                    <th scope="col">วัน/เดือน/ปี</th>
                    <th scope="col">
                      <b-button v-b-modal.modal-banner variant="primary">
                        <i class="fas fa-user-tie"></i> เพิ่ม Admin
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
                      <form v-on:submit.prevent="createadmin">
                        <div class="form-group text-left">
                          <label>Username</label>
                          <input
                            type="text"
                            class="form-control"
                            id="News_name"
                            aria-describedby="News_name"
                            v-model="objforms.username"
                          />
                        </div>
                        <div class="form-group text-left">
                          <label>Password</label>
                          <input
                            type="password"
                            class="form-control"
                            id="News_name"
                            aria-describedby="News_name"
                            v-model="objforms.password"
                          />
                        </div>
                        <div class="form-group text-left">
                          <label>rePassword</label>
                          <input
                            v-bind:style="classvalidate"
                            v-on:keyup="validate"
                            type="password"
                            class="form-control"
                            id="News_name"
                            aria-describedby="News_name"
                            v-model="objforms.repassword"
                            required
                          />
                        </div>
                        <div class="text-center mt-5">
                          <button
                            type="button"
                            class="btn btn-secondary mr-2"
                            data-dismiss="modal"
                            @click="
                              $bvModal.hide('modal-banner');
                              cleareditadmin();
                            "
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
                  <tr v-for="(admin, index) in pageOfItems" :key="admin">
                    <td scope="row">{{ index + 1 }}</td>
                    <td>{{ admin.username }}</td>
                    <td>{{ admin.created_date | formatDate }}</td>
                    <td>
                      <button
                        class="btn btn-primary "
                        @click="deleteadmin(admin.id)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                      <b-button
                        v-b-modal.modal-banner-edit
                        variant="primary"
                        @click="editadmin(index)"
                      >
                        <i class="fas fa-edit"></i>
                      </b-button>
                      <!-- Button trigger modal -->
                      <!-- Modal -->
                      <b-modal
                        id="modal-banner-edit"
                        hide-footer
                        content-class="shadow"
                        title="แก้ไข Banner"
                        size="l"
                      >
                        <form v-on:submit.prevent="updateadmin">
                          <div class="form-group text-left">
                            <label>Username</label>
                            <input
                              type="text"
                              class="form-control"
                              id="News_name"
                              aria-describedby="News_name"
                              v-model="edit_admin.username"
                            />
                          </div>
                          <div class="form-group text-left">
                            <label>Password</label>
                            <input
                              type="password"
                              class="form-control"
                              id="News_name"
                              aria-describedby="News_name"
                              v-model="edit_admin.password"
                            />
                          </div>
                          <div class="form-group text-left">
                            <label>ยืนยันรหัสผ่าน</label>
                            <input
                              v-bind:style="classvalidateedit"
                              v-on:keyup="validateedit"
                              type="password"
                              class="form-control"
                              id="News_name"
                              aria-describedby="News_name"
                              v-model="edit_admin.repassword"
                              required
                            />
                          </div>
                          <div class="text-center mt-5">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-dismiss="modal"
                              @click="
                                $bvModal.hide('modal-banner-edit');
                                cleareditadmin();
                              "
                            >
                              ปิด
                            </button>
                            <button
                              type="submit"
                              class="btn btn-primary"
                              @click="$bvModal.hide('modal-banner-edit')"
                            >
                              เพิ่ม
                            </button>
                          </div>
                        </form>
                      </b-modal>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card text-center m-3">
              <div class="card-footer pb-0 pt-3">
                <jw-pagination
                  :pageSize="10"
                  :labels="customLabels"
                  :items="admin ? admin : undefined"
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
let axios = require("axios");
export default {
  name: "Admin",
  data() {
    return {
      objforms: {
        username: "",
        password: "",
        repassword: "",
      },
      admin: "",
      edit_admin: {
        username: "",
        password: "",
        repassword: "",
        id: "",
      },
      pageOfItems: [],
      customLabels,
      classvalidate: {
        borderColor: "",
      },
      classvalidateedit: {
        borderColor: "",
      },
    };
  },
  methods: {
    async createadmin() {
      if (this.objforms.repassword.trim() == this.objforms.password.trim()) {
        var data = JSON.stringify(this.objforms);
        var config = {
          method: "post",
          url: "https://express.crm-flow.com/api/admin/",
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
            this.cleareditadmin();
            this.getadmin();
            console.log(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    async getadmin() {
      let config = {
        method: "get",
        url: "https://express.crm-flow.com/api/admin/read",
        headers: {},
      };
      await axios(config)
        .then((response) => {
          this.admin = response.data;
          // alert('get');
          //   this.$store.dispatch("addadmin", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async editadmin(index) {
      for await (const [key, value] of Object.entries(this.admin[index])) {
        this.edit_admin[key] = value;
      }
      this.edit_admin.repassword = this.admin[index].password;
    },
    async cleareditadmin() {
      // this.edit_banner.push(this.banner[index]);
      this.edit_admin = {
        username: "",
        password: "",
        repassword: "",
      };
    },
    async updateadmin() {
      if (
        this.edit_admin.repassword.trim() == this.edit_admin.password.trim()
      ) {
        var data = JSON.stringify(this.edit_admin);
        var config = {
          method: "post",
          url: "https://express.crm-flow.com/api/admin/update",
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
            this.getadmin();
            console.log(response.data);
            this.cleareditadmin();
            // alert('get');
            //   this.$store.dispatch("addadmin", response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    async deleteadmin(id) {
      if (confirm("คุณต้องการจะลบรายการนี้หรือไม่?")) {
        var data = JSON.stringify({ id: id });
        var config = {
          method: "post",
          url: "https://express.crm-flow.com/api/admin/delete",
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
            this.getadmin();
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
    validate() {
      if (this.objforms.repassword.trim() == this.objforms.password.trim()) {
        this.classvalidate.borderColor = "";
        console.log(true);
      } else {
        this.classvalidate.borderColor = "red";
      }
    },
    validateedit() {
      if (
        this.edit_admin.repassword.trim() == this.edit_admin.password.trim()
      ) {
        this.classvalidateedit.borderColor = "";
        console.log(true);
      } else {
        this.classvalidateedit.borderColor = "red";
      }
    },
  },
  async created() {
    await this.getadmin();
  },
  computed: {
    get() {
      return this.$store.getters.getadmin;
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
