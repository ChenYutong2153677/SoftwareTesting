<template>
  <el-container style="height: 100vh; display: flex; flex-direction: column;">

    <el-container>
      <el-aside style="flex-grow: 0; flex-shrink: 0;">
        <div class="title">
          <img src="../assets/logo.png" alt="logo" style="height: 20px; width: 20px;"/>
          软件测试平台
        </div>
        
        <el-menu class="menu" :default-openeds="['1', '2']" router=true>
          <el-submenu index="1">
            <template #title><i class="el-icon-s-order"></i><span>测试练习</span></template>

            <el-menu-item index="/triangle"><i class="el-icon-s-promotion"></i>三角形问题</el-menu-item>
            <el-menu-item index="/telecom"><i class="el-icon-money"></i>电信收费问题</el-menu-item>
            <el-menu-item index="/computer"><i class="el-icon-s-platform"></i>电脑销售系统</el-menu-item>
            <el-menu-item index="/calendar"><i class="el-icon-date"></i>万年历问题</el-menu-item>

          </el-submenu>
          <el-submenu index="2">
            <template #title><i class="el-icon-menu"></i><span>项目测试</span></template>
            <el-menu-item index="/unitTest">单元测试</el-menu-item>
            <el-menu-item index="/integrationTest">集成测试</el-menu-item>
            <el-menu-item index="/regressionTest">回归测试</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main class="main" style="flex-grow: 1; overflow: auto;">
        <div class="header-breadcrumb">
          <el-breadcrumb>
            <el-breadcrumb-item v-for="(matched, m) in this.$route.matched" :key="m" :to="matched">
              <!--假如我们目前的路由是/a/aa-01，那么此时 this.$route.matched匹配到的会是一个数组，包含 '/'，'/a'，'/a/aa-01'，这三个path的路由信息 -->
              {{ matched.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  name: 'Layout',
  data() {
    const item = {

    };
    return {
      tableData: Array(20).fill(item)
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
  margin: 20px;
}

#el-menu {
  height: 100%; 
  display: flex; 
  flex-direction: column;
}

.menu .el-submenu__title,
.menu .el-menu-item {
  text-align: left !important;
}

.main {
  padding: 20px;
  background-color: #f4f4f4;
}
</style>