<template>
    <el-container style="height:100vh">

        <el-container >
            <el-aside width="200px">
              <div class="title" style="font-size:20px;color:#4da5ff;height:50px;margin-top:20px;">
                软件测试平台
              </div>
                <el-menu :default-openeds="['1','2']"
                         text-color="white"
                         active-text-color="#4da5ff"
                         router=true>
                    <el-submenu index="1">
                        <template #title><i class="el-icon-s-order"></i><span style="color:#4da5ff">平时作业</span></template>

                        <el-menu-item index="/triangle"><i class="el-icon-s-promotion"></i>三角形问题</el-menu-item>
                        <el-menu-item index="/telecom"><i class="el-icon-money"></i>电信收费问题</el-menu-item>
                        <el-menu-item index="/sales"><i class="el-icon-money"></i>销售系统员工考评</el-menu-item>
                        <el-menu-item index="/computer"><i class="el-icon-s-platform"></i>电脑销售系统</el-menu-item>
                        <el-menu-item index="/calendar"><i class="el-icon-date"></i>万年历问题</el-menu-item>

                    </el-submenu>
                    <el-submenu index="2">
                        <template #title><i class="el-icon-menu"></i><span style="color:#4da5ff">期末项目</span></template>
                        <el-menu-item index="/unitTest">单元测试</el-menu-item>
                        <el-menu-item index="/integrationTest">集成测试</el-menu-item>
                        <el-menu-item index="/regressionTest">回归测试</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-main>

              <div class="header-breadcrumb">
                <el-breadcrumb>
                  <el-breadcrumb-item v-for="(matched,m) in this.$route.matched" :key="m" :to="matched">
                    <!--假如我们目前的路由是/a/aa-01，那么此时 this.$route.matched匹配到的会是一个数组，包含 '/'，'/a'，'/a/aa-01'，这三个path的路由信息 -->
                    {{matched.name}}
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
.header-breadcrumb {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: dimgray solid 1px;
  font-weight: 700;
}

.el-aside {
  border: 0;
  background-color: #2c2c2c;
  color: white;
}

/deep/ .el-breadcrumb__separator {
  color: #2c2c2c;
}

/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a[data-v-005bfc5a], .el-breadcrumb__item:last-child .el-breadcrumb__item[data-v-005bfc5a]:last-child  {
  color: #303133;
}

/deep/ .el-breadcrumb__separator{
  margin:0 5px;
}

.el-aside .el-menu {
  background-color: #2c2c2c;
  color: white;
}

.el-aside .el-menu .el-submenu {
  background-color: rgb(39, 105, 160);
  color: white;
}

.el-aside .el-menu .el-submenu #title {
  background-color: #2c2c2c;
  color: gold
}

.el-aside .el-menu .el-submenu .el-menu-item {
  background-color: #2c2c2c;
  color: white;
}

.el-aside .el-menu .el-submenu .el-menu-item:hover {
  background-color: rgb(44, 43, 43);
}

.el-aside .el-menu .el-submenu .el-menu-item:active {
  background-color: rgb(44, 43, 43);
}
</style>