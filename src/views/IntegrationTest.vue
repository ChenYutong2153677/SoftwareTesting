<template>
  <div class="unittest">
    <el-row>
      <h1 style="font-size: 18px">集成测试</h1>
    </el-row>
    <el-row style="display: flex">
      <div style="font-size: 18px; margin-top: 7px; margin-right: 15px">
        前后端接口测试
      </div>
      <div>
        <el-select
          v-model="selected"
          class="m-2"
          placeholder="选择需要测试的微服务"
          size="large"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-button
        type="primary"
        style="margin-left: 15px; height: 40px"
        @click="unitTesting"
        >进行测试</el-button
      >
    </el-row>
    <div style="margin-top: 20px; margin-buttom: 20px"></div>
    <el-row style="display: flex">
      <div style="font-size: 18px; margin-top: 7px; margin-right: 15px">
        外部系统集成测试
      </div>
      <div>
        <el-select
          v-model="selectedSystem"
          class="m-2"
          placeholder="选择需要测试的微服务"
          size="large"
        >
          <el-option
            v-for="item in systems"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-button
        type="primary"
        style="margin-left: 15px; height: 40px"
        @click="outTesting"
        >进行测试</el-button
      >
    </el-row>

    <div style="margin-top: 20px; margin-buttom: 20px"></div>
    <el-row style="display: flex">
      <div style="font-size: 18px; margin-top: 7px; margin-right: 15px">
        模块间集成测试
      </div>
      <div>
        <el-select
          v-model="selectedModule"
          class="m-2"
          placeholder="选择需要测试的微服务"
          size="large"
        >
          <el-option
            v-for="item in modules"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <el-button
        type="primary"
        style="margin-left: 15px; height: 40px"
        @click="btwmoduleTesting"
        >进行测试</el-button
      >
    </el-row>
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
          value: "http://localhost:18085/test/integration",
          label: "健康资讯微服务",
        },
        {
          value: "http://localhost:18087/test/integration",
          label: "药品信息微服务",
        },
        {
          value: "http://localhost:8083/test/integration",
          label: "个人中心微服务",
        },
        {
          value: "http://localhost:8081/test/integration",
          label: "登陆注册微服务",
        },
        {
          value: "http://localhost:8093/test/integration",
          label: "动态微服务",
        },
        {
          value: "http://localhost:8101/test/integration",
          label: "AI微服务",
        },
        {
          value: "http://localhost:8082/test/integration",
          label: "问答微服务",
        },
      ],
      modules: [
        {
          value: "http://localhost:8093/test/feign",
          label: "动态微服务调用其它系统接口",
        },
        {
          value: "http://localhost:8082/test/feign",
          label: "问答微服务调用其它系统接口",
        },
      ],
      systems: [
        {
          value: "http://localhost:8090/test/external",
          label: "高校机构微服务与外部系统集成",
        },
      ],
      selected: "",
      selectedModule: "",
      selectedSystem: "",
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
          console.log("预测失败");
        });
    },
    outTesting() {
      console.log(this.selectedSystem);
      axios({
        url: this.selectedSystem,
        method: "get",
      })
        .then((res) => {
          console.log(res);
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("预测失败");
        });
    },
    btwmoduleTesting()
    {
      console.log(this.selectedModule);
      axios({
        url: this.selectedModule,
        method: "get",
      })
        .then((res) => {
          console.log(res);
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("预测失败");
        });
    }
  },
  
};
</script>

<style scoped>
</style>