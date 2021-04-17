<template>
  <div class="News">
    <div>
      <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </header>
      <notifications position="top right" />
      <div class="page-heading">
        <h3>ข่าวสาร</h3>
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
                    <th scope="col">ภาพหัวข่าว</th>
                    <th scope="col">สถานะ</th>
                    <th scope="col">วัน/เดือน/ปี</th>
                    <th scope="col">โพสต์โดย</th>
                    <th scope="col">
                      <b-button v-b-modal.modal-news variant="primary">
                        <i class="fas fa-newspaper mx-2"></i> เพิ่มข่าวสาร
                      </b-button>
                    </th>

                    <!-- Modal -->
                    <b-modal
                      id="modal-news"
                      hide-footer
                      content-class="shadow"
                      title="เพิ่มข่าวสาร"
                      size="l"
                    >
                      <form v-on:submit.prevent="createNews">
                        <div class="form-group text-left">
                          <label for="News_name">ชื่อเรื่อง</label>
                          <input
                            type="text"
                            class="form-control"
                            id="News_name"
                            aria-describedby="News_name"
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
                            @click="$bvModal.hide('modal-news')"
                          >
                            ปิด
                          </button>
                          <button
                            type="submit"
                            class="btn btn-primary"
                            @click="$bvModal.hide('modal-news')"
                          >
                            โพสต์
                          </button>
                        </div>
                      </form>
                    </b-modal>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(news_, index) in pageOfItems" :key="news + index">
                    <td scope="row">{{ news_.id + 1 }}</td>
                    <td>{{ news_.news.title }}</td>
                    <td>
                      <img
                        :src="api_img + news_.news.img_name"
                        alt=""
                        style="width: 100px"
                      />
                    </td>
                    <td>
                      {{ news_.news.publish == 1 ? "เปิดใช้งาน" : "ปิด" }}
                    </td>
                    <td>{{ news_.news.created_at | formatDate }}</td>
                    <td>{{ news_.news.author }}</td>
                    <td>
                      <button
                        class="btn btn-primary"
                        @click="deleteNews(news_.news.ref_id_img)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                      <b-button
                        v-b-modal.modal-news-edit
                        variant="primary"
                        @click="editNews(news_.id)"
                      >
                        <i class="fas fa-edit"></i>
                      </b-button>
                      <!-- Button trigger modal -->
                      <!-- Modal -->
                    </td>
                  </tr>
                  <b-modal
                    id="modal-news-edit"
                    hide-footer
                    content-class="shadow"
                    title="แก้ไขรายละเอียดของข่าว"
                    size="l"
                  >
                    <form v-on:submit.prevent="updateNews">
                      <div class="form-group text-left">
                        <label>ชื่อเรื่อง</label>
                        <input
                          type="text"
                          class="form-control"
                          id="News_name12"
                          aria-describedby="News_name1"
                          v-model="edit_news.title"
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
                          >{{ edit_news.img.name }}</label
                        >
                      </div>
                      <div class="form-group text-left">
                        <label for="exampleFormControlTextarea1"
                          >เนื้อหาข่าว</label
                        >
                        <froala
                          id="exampleFormControlTextarea1"
                          rows="3"
                          v-model="edit_news.body"
                        ></froala>
                      </div>
                      <select
                        class="form-select form-select-lg"
                        aria-label=".form-select-sm example"
                        v-model="edit_news.publish"
                        :selected="edit_news.publish"
                      >
                        <option value="1">เปิดใช้งาน</option>
                        <option value="2">ปิด</option>
                      </select>
                      <div class="text-center">
                        <button
                          type="button"
                          class="btn btn-secondary mr-2"
                          data-dismiss="modal"
                          @click="$bvModal.hide('modal-news-edit')"
                        >
                          ปิด
                        </button>
                        <button
                          type="submit"
                          class="btn btn-primary"
                          @click="$bvModal.hide('modal-news-edit')"
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
const api_img = "https://express.crm-flow.com/media/news/";
export default {
  name: "News",
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
      news: "",
      edit_news: {
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
      this.edit_news.img.file = event.target.files[0];
      this.edit_news.img.name = event.target.files[0].name;
    },
    async createNews() {
      this.objforms.author = this.getAdmin.username;
      var data = new FormData();
      data.append("img", this.objforms.img.file);
      data.append("forms", JSON.stringify(this.objforms));
      var config = {
        method: "post",
        url: "https://express.crm-flow.com/api/news",
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
            text: "สร้างข่าวสำเร็จ",
          });
          this.getNews();
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
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
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
          this.exampleItems = [...this.news.keys()].map((i) => ({
            id: i,
            news: this.news[i],
          }));
          // alert('get');
          //   this.$store.dispatch("addNews", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async editNews(index) {
      this.edit_news.img.name = this.news[index].img_name;
      for await (const [key, value] of Object.entries(this.news[index])) {
        this.edit_news[key] = value;
      }
    },
    async updateNews() {
      this.edit_news.author = await this.getAdmin.username;
      var data = new FormData();
      data.append("img", await this.edit_news.img.file);
      data.append("forms", JSON.stringify(this.edit_news));
      console.log(this.edit_news);
      var config = {
        method: "post",
        url: "https://express.crm-flow.com/api/news/update",
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
            text: "แก้ไขข้อมูลข่าวสำเร็จ",
          });
          console.log(response.data);
          this.getNews();
          // alert('get');
          //   this.$store.dispatch("addNews", response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async deleteNews(id) {
      // alert(id);
      if (confirm("คุณต้องการจะลบรายการนี้หรือไม่?")) {
        var data = JSON.stringify({ id: id });
        var config = {
          method: "post",
          url: "https://express.crm-flow.com/api/news/delete",
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
              text: "ลบข่าวสำเร็จ",
            });
            this.getNews();
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
    await this.getNews();
  },
  computed: {
    get() {
      return this.$store.getters.getNews;
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
