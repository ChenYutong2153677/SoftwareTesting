<template>
  <div class="unitTest">
    <el-row>
      <h1>单元测试</h1>
    </el-row>
    <el-row style="display: flex;">
      <div>
        <el-select v-model="selected" class="m-2" placeholder="选择需要测试的微服务" size="large">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>

      <el-button type="primary" style="margin-left: 15px;height: 40px;" @click="unitTesting">进行测试</el-button>
    </el-row>
    <br />
    <iframe class="unitAllure" id="unitAllure" src=''></iframe>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "UnitTest",
  data() {
    return {
      options: [
        {
          value: "http://localhost:18085/test/unit",
          label: "健康资讯微服务",
        },
        {
          value: "http://localhost:18087/test/unit",
          label: "药品信息微服务",
        },
        {
          value: "http://localhost:8083/test/unit",
          label: "个人中心微服务",
        },
        {
          value: "http://localhost:8081/test/unit",
          label: "登陆注册微服务",
        },
        {
          value: "http://localhost:8093/test/unit",
          label: "动态微服务",
        },
        {
          value: "http://localhost:18083/test/unit",
          label: "日历提醒微服务",
        },
      ],
      selected: "",
      tableData: [],
      fileList: []
    };
  },
  methods: {
    unitTesting() {
      console.log(this.selected);
      axios({
        url: this.selected,
        method: "get",
      })
        .then((res) => {
          console.log(res, "测试成功");
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("测试失败");
        })
        .finally(() => {
          console.log("测试结束");
          document.getElementById('unitAllure').src = 'http://100.80.136.121:1686/index.html';
          setTimeout(function () {
            // 尝试刷新 iframe 内容
            document.getElementById('unitAllure').contentWindow.location.reload(true);
          }, 1000); // 等待 1 秒后尝试刷新
        });
    },
  },
};
</script>

<style scoped>
.unitAllure {
  width: 70vw;
  height: 70vh;
}
</style>