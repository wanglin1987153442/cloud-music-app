<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider collapsible v-model="collapsed">
      <div>
        <img class="logo" :src="this.user.avatar" />
        <span style="color:white">{{ this.user.userRole }}</span>
      </div>

      <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
        <a-menu-item key="1">
          <a-icon type="pie-chart" />
          <span>Dashboard</span>
          <router-link to="/dashboard"></router-link>
        </a-menu-item>

        <a-sub-menu key="sub2">
          <span slot="title"
            ><a-icon type="customer-service" /><span>音乐管理</span></span
          >

          <a-menu-item key="6">
            <router-link to="/music-list">
              <a-icon type="appstore" />歌单管理</router-link
            ></a-menu-item
          >

          <a-menu-item key="7"><a-icon type="build" />歌曲管理</a-menu-item>
          <a-menu-item key="8"><a-icon type="message" />评论管理</a-menu-item>
          <a-menu-item key="9"><a-icon type="profile" />专辑管理</a-menu-item>
          <a-menu-item key="10"><a-icon type="download" />下载管理</a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>权限管理</span></span>
          <a-menu-item key="21"
            ><a-icon type="usergroup-add" />角色管理</a-menu-item
          >
          <a-menu-item key="22"><a-icon type="table" />菜单管理</a-menu-item>
        </a-sub-menu>

        <a-menu-item key="41">
          <a-icon type="file" />
          <span>导出文件</span>
        </a-menu-item>
        <a-menu-item key="42">
          <a-icon type="poweroff" />
          <input type="button" value="退出登录" @click="logout()" />
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <div class="header">
        <input type="text" placeholder="请输入查询内容" class="input-search" />
        <a-icon
          type="search"
          :style="{ fontSize: '21px', color: 'rgb(184, 172, 133)' }"
        />
      </div>

      <router-view></router-view>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      user: this.$store.state.user,
      collapsed: false,
      studentList: [],
    };
  },
  methods: {
    logout() {
      alert("logout");

      localStorage.removeItem("token");
      this.$store.commit("setUser", null);
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.header {
  background-color: rgb(0, 33, 64);
}
.input-search {
  height: 40px;
  width: 368px;
  margin-left: 400px;
  margin-right: 20px;
  background-color: rgb(0, 33, 64);
  color: #fff;
}
/**
 *  修改google浏览器，默认的聚焦黄色背景为白色
 */
input:-webkit-autofill,
select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
}

input {
  outline-color: invert;
  outline-style: none;
  outline-width: 0px;
  border: none;
  border-style: none;
  text-shadow: none;
  -webkit-appearance: none;
  -webkit-user-select: text;
  outline-color: transparent;
  box-shadow: none;
}
</style>
