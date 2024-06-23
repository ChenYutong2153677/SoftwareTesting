<template>

 <div class='container'>
   <el-container>
    <h1 class="header">判断三角形类型</h1>

    <el-footer>
       <el-tabs type="border-card" style="width: 50%; height: 350px">
        <el-tab-pane label="单个测试" name="first">
          <h4>单个测试</h4>
          <el-form ref="form" :model="form" label-width="80px" class="input-form">
            <el-form-item label="第一条边" class="input-text">
              <el-input v-model="form.edge1"></el-input>
            </el-form-item>
            <el-form-item label="第二条边" class="input-text">
              <el-input v-model="form.edge2"></el-input>
            </el-form-item>
            <el-form-item label="第三条边" class="input-text">
              <el-input v-model="form.edge3"></el-input>
            </el-form-item>
            <el-form-item class="button">
              <el-button type="primary" @click="onClick"><i class="el-icon-circle-check"></i>提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="批量测试" name="second">
          <h4>批量测试</h4>
          <el-upload
            class="upload-demo"
            action="http://localhost:5000/triangle"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="100"
            :on-exceed="handleExceed"
            :on-success="Success"
            :file-list="fileList">
            <el-button type="primary"><i class="el-icon-upload el-icon--right"></i>上传测试用例</el-button>
            <div class="el-upload__tip">只能上传csv文件，且不超过500KB</div>
          </el-upload>
        </el-tab-pane>
      </el-tabs>

      <div>
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
              label="第一条边"
              width="170">
          </el-table-column>
          <el-table-column
              prop=2
              label="第二条边"
              width="170">
          </el-table-column>
          <el-table-column
              prop=3
              label="第三条边"
              width="170">
          </el-table-column>
          <el-table-column
              prop=4
              label="预期输出"
              width="170">
          </el-table-column>
          <el-table-column
              prop=5
              label="是否构成三角形">
          </el-table-column>
          <el-table-column
              prop=6
              label="实际输出">
          </el-table-column>
          <el-table-column
              prop=7
              label="是否通过测试">
              <template v-slot="scope">
                  <div :style="{ color: scope.row[7] === '通过' ? 'green' : 'red' }">
                      {{ scope.row[7] }}
                  </div>
              </template>
          </el-table-column>
        </el-table>
    </div>
    </el-footer>
   </el-container>

 </div>

</template>
<script>
export default {
  name: "Triangle",
  data() {
    return {
      uploadActionUrl:'',
      tableData: [],
      fileList: [],
      form: {
        edge1: '',
        edge2: '',
        edge3: '',
      },
    }
  },
  methods: {
    onClick() {
      var a = parseFloat(this.form.edge1)
      var b = parseFloat(this.form.edge2)
      var c = parseFloat(this.form.edge3)
      if (a < 0)
          this.$message.warning ("第一条边不能为0")
      if (b < 0)
          this.$message.warning ("第二条边不能为0")
      if (c < 0)
          this.$message.warning ("第三条边不能为0")
      if (a > 100)
          this.$message.warning ("第一条边超出了边界")
      if (b > 100)
          this.$message.warning ("第二条边超出了边界")
      if (c > 100)
          this.$message.warning ("第三条边超出了边界")
      if(a>0 && a<=100 && b>0 && b<=100 && c>0 && c<=100){
        if (a + c > b && a + b > c && b + c > a)
        {
          if (a == b && b == c)
            this.$message.success ("等边三角形")
          else if( a == b || b == c || a == c)
            this.$message.success ("等腰三角形")
          else
            this.$message.success ("普通三角形")
        }
        else
          this.$message.error ("不是三角形")
      }
    },
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
.header{
  margin-top: 20px;
  margin-bottom: 15px;
  text-align: left;
}
.el-footer{
  padding:0px;
}
.upload-demo {
  margin-top: 50px;
}
.input-form{
  padding-right: 20px;
}

</style>
