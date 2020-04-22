<template>
  <div class="bg">
    <mu-container class="container">
      <mu-form ref="form" :model="validateForm" class="login-form">
        <mu-form-item label="用户名" prop="username" :rules="usernameRules">
          <mu-text-field
            v-model="validateForm.username"
            prop="username"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field
            type="password"
            v-model="validateForm.password"
            prop="password"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="验证码" prop="verifyCode" :rules="yzmRules">
          <mu-text-field v-model="validateForm.verifyCode" prop="verifycode">
            <v-img
              :src="img"
              aspect-ratio="2"
              contain
              @click="getimg"
              height="80px"
            ></v-img>
          </mu-text-field>
        </mu-form-item>

        <mu-form-item prop="isAgree" :rules="argeeRules">
          <mu-checkbox
            label="同意用户协议"
            v-model="validateForm.isAgree"
          ></mu-checkbox>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="primary" @click="submit">提交</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </mu-form-item>
      </mu-form>
      <mu-dialog title="Dialog" width="360" :open.sync="openSimple">
        {{ data.msg }}
        <mu-button
          slot="actions"
          flat
          color="primary"
          @click="closeSimpleDialog"
          >Close</mu-button
        >
      </mu-dialog>
    </mu-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: "必须填写用户名" },
        { validate: (val) => val.length >= 3, message: "用户名长度大于3" },
      ],
      passwordRules: [
        { validate: (val) => !!val, message: "必须填写密码" },
        {
          validate: (val) => val.length >= 3 && val.length <= 10,
          message: "密码长度大于3小于10",
        },
      ],
      argeeRules: [{ validate: (val) => !!val, message: "必须同意用户协议" }],
      yzmRules: [
        { validate: (val) => !!val, message: "必须填写验证码" },
        {
          validate: (val) => val.length == 4,
          message: "验证码等于4",
        },
      ],
      validateForm: {
        username: "",
        password: "",
        verifyCode: "",
        isAgree: false,
      },
      menuList: [],
      openSimple: false,
      uid: "",
      img: "",
      data: "",
    };
  },
  components: {},
  created() {},
  mounted() {
    this.getimg();
    console.log(this.uid);
    console.log(this.img);
  },
  methods: {
    openSimpleDialog() {
      this.openSimple = true;
    },
    closeSimpleDialog() {
      this.openSimple = false;
    },

    submit() {
      this.$refs.form.validate().then((result) => {
        console.log("form valid: ", result);

        if (result === true) {
          this.$axios({
            method: "POST",
            url: "http://localhost:8080/api/sysAdmin/login",
            data: {
              name: this.validateForm.username,
              password: this.validateForm.password,
              verifyCode: this.validateForm.verifyCode,
              uuid: this.uid,
            },
          }).then((res) => {
            this.data = res.data;
            this.openSimpleDialog();
            if (res.data.code === 20000) {
              let user = {
                userId: this.data.userId,
                username: this.data.username,
                userRole: this.data.userRole,
                avatar: this.data.awatar,
              };
              this.menuList = [
                {
                  title: "Dashboard",
                  icon: "mdi-view-dashboard",
                  url: "/dashboard",
                  subMenus: [],
                },
                {
                  title: "音乐管理",
                  icon: "mdi-music",
                  url: "",
                  subMenus: [
                    {
                      title: "歌单管理",
                      icon: "mdi-domain",
                      url: "/music-list",
                      permissions: [],
                    },
                    {
                      title: "歌曲管理",
                      icon: "mdi-text",
                      url: "/music",
                      permissions: ["music:add", "music:edit", "music:delete"],
                    },
                  ],
                },
                {
                  title: "About",
                  icon: "mdi-help-box",
                  url: "/about",
                  subMenus: [],
                },
              ];
              localStorage.setItem("token", this.data.token);
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("menuList", JSON.stringify(this.menuList));
              this.$store.commit("setToken", this.data.token);
              this.$store.commit("setUser", user);
              this.$store.commit("setMenuList", this.menuList);
              this.$router.push("/");
              this.openSimpleDialog();
            }
          });
        }
      });
    },

    uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";
      this.uid = s.join("");
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        username: "",
        password: "",
        isAgree: false,
      };
    },
    getimg() {
      this.uuid();
      this.img = "http://localhost:8080/captcha?uuid=" + this.uid;
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.bg {
  background-image: url("../assets/images/背景.jpg");
  background-size: cover;
  opacity: 0.8;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-form {
  max-width: 500px;
  margin-left: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
.container {
  opacity: 0.9;
}
</style>
