<template>
  <div class="Login ">
    <form v-on:submit.prevent="onSubmit" class="container mt-5">
      <div class="card text-left p-5">
        <h5 class="text-center my-3">Backend</h5>
        <img src="../assets/registerlogo.png" alt="" />
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="text"
            class="form-control"
            id="Username"
            v-model="username"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="password"
          />
        </div>
        <!-- <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div> -->
        <button type="submit" class="btn  mt-5 mb-3">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
const axios = require("axios");
import router from "../router/index";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      admin: "",
    };
  },
  methods: {
    onSubmit: function() {
      let data = JSON.stringify({
        username: this.username,
        password: this.password,
      });
      let config = {
        method: "post",
        url: "https://express.crm-flow.com/api/admin/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(async (response) => {
          // console.log(response.data);
          this.admin = await response.data[0];
          localStorage.setItem("admin", JSON.stringify(this.admin));
          this.$store.dispatch("addAdmin", JSON.stringify(this.admin));
          router.push({ name: "Dashboard" });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.Login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
      circle at center center,
      transparent,
      rgb(33, 33, 33)
    ),
    repeating-linear-gradient(
      135deg,
      rgb(33, 33, 33) 0px,
      rgb(33, 33, 33) 2px,
      transparent 2px,
      transparent 10px,
      rgb(33, 33, 33) 10px,
      rgb(33, 33, 33) 11px,
      transparent 11px,
      transparent 21px
    ),
    repeating-linear-gradient(
      45deg,
      rgb(47, 47, 47) 0px,
      rgb(47, 47, 47) 4px,
      transparent 4px,
      transparent 8px
    ),
    linear-gradient(90deg, rgb(33, 33, 33), rgb(33, 33, 33));
}
form .card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-image: linear-gradient(
      45deg,
      rgba(130, 89, 219, 0.2),
      rgba(44, 192, 226, 0.2),
      rgba(182, 103, 181, 0.2)
    ),
    linear-gradient(
      135deg,
      rgb(39, 20, 149),
      rgb(65, 82, 185),
      rgb(91, 144, 220)
    );
}
img {
  width: 150px;
  height: auto;
  margin: 0 auto;
}
label {
  color: white;
  margin: 20px 0;
  font-size: 20px;
}
h5 {
  font-size: 30px;
  color: white;
}
.btn {
  background-image: linear-gradient(
    45deg,
    rgb(139, 59, 210),
    rgb(47, 30, 152)
  ) !important;
  color: white;
  height: 50px;
}
@media (min-width: 1024px) and (max-width: 1366px) {
  form .card {
    width: 50%;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  form .card {
    width: 75%;
  }
  img {
    width: 150px;
    height: auto;
    margin: 0 auto;
  }
  label {
    color: white;
    margin: 20px 0;
    font-size: 20px;
  }
  h5 {
    font-size: 30px;
    color: white;
  }
}
@media (min-width: 250px) and (max-width: 767px) {
  form .card {
    width: 90%;
    height: auto;
  }

  img {
    width: 50px;
    height: auto;
    margin: 0 auto;
  }
  label {
    color: white;
    margin: 20px 0;
    font-size: 16px;
  }
  h5 {
    font-size: 20px;
    color: white;
  }
  .btn {
    width: 100%;
  }
}
</style>
