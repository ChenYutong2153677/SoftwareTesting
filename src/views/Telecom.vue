<template>
  <div class="telecom">
    <div style="width: 250px;">
      <h1>电信收费问题</h1>
      <el-upload
          class="upload-demo"
          action="http://localhost:5000/telecom"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="100"
          :on-exceed="handleExceed"
          :on-success="Success"
          :file-list="fileList">
        <el-button size="small" type="primary">上传测试用例</el-button>
        <div class="el-upload__tip">只能上传csv文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div class="result">
      <el-table
          :data="tableData"
          stripe
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{textAlign:'center'}"
          style="width: 100%">
        <el-table-column
            prop=0
            label="序号"
            width="80">
        </el-table-column>
        <el-table-column
            prop=1
            label="本月通话的分钟数"
            width="180">
        </el-table-column>
        <el-table-column
            prop=2
            width="180"
            label="实际不按时缴费次数">
        </el-table-column>
        <el-table-column
            prop=3
            width="280"
            label="预期输出">
        </el-table-column>
        <el-table-column
            prop=4
            width="180"
            label="最大容许不按时缴费次数">
        </el-table-column>
        <el-table-column
            prop=5
            width="180"
            label="实际输出">
        </el-table-column>
        <el-table-column
            prop=6
            width="180"
            label="是否通过测试">
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "telecom",
  data() {
    return {
      tableData: [],
      fileList: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 100 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // eslint-disable-next-line no-unused-vars
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // eslint-disable-next-line no-unused-vars
    Success(response, file, fileList) {
      this.tableData = response;
    }
  }
}
</script>

<style scoped>
.telecom{
  text-align: left;
  width: 100%;
}
.upload-demo{
  margin-top: 20px;
}
/deep/ .el-upload{
  text-align: left;
}
.el-upload__tip{
  margin-top: 10px;
}
.result{
  margin-top: 50px;
}
</style>
