<template>
  <div class="regressionTest">
    <el-row>
      <h1>回归测试</h1>
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
    <iframe class="regressionAllure" id="regressionAllure" src=''></iframe>
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
          value: "http://localhost:18085/test/regression",
          label: "健康资讯微服务",
        },
        {
          value: "http://localhost:18087/test/regression",
          label: "药品信息微服务",
        },
        {
          value: "http://localhost:8083/test/regression",
          label: "个人中心微服务",
        },
        {
          value: "http://localhost:8081/test/regression",
          label: "登陆注册微服务",
        },
        {
          value: "http://localhost:8093/test/regression",
          label: "动态微服务",
        },
        {
          value: "http://localhost:8101/test/regression",
          label: "AI微服务",
        },
        {
          value: "http://localhost:8082/test/regression",
          label: "问答微服务",
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
          console.log(res);
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("测试失败");
        })
        .finally(() => {
          console.log("测试结束");
          document.getElementById('regressionAllure').src = 'http://100.80.136.121:1688/index.html';
          setTimeout(function () {
            // 尝试刷新 iframe 内容
            document.getElementById('regressionAllure').contentWindow.location.reload(true);
          }, 1000); // 等待 1 秒后尝试刷新
        });
    },
  },
};
</script>

<style scoped>
.regressionAllure {
  width: 70vw;
  height: 70vh;
}
</style>