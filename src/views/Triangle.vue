<template>
  <div class='triangle'>
    <el-container>
      <h1 class="header">判断三角形类型</h1>

      <el-footer>
        <div class="top">
          <el-tabs v-model="activeName" type="border-card" style="width: 50%; height: min-content">
            <el-tab-pane label="单次测试" name="first">
              <el-form ref="form" :model="form" label-width="120px" class="input-form">
                <el-form-item label="第一条边 [1, 100]" class="input-text">
                  <el-input v-model="form.edge1"></el-input>
                </el-form-item>
                <el-form-item label="第二条边 [1, 100]" class="input-text">
                  <el-input v-model="form.edge2"></el-input>
                </el-form-item>
                <el-form-item label="第三条边 [1, 100]" class="input-text">
                  <el-input v-model="form.edge3"></el-input>
                </el-form-item>
                <el-form-item label="预期输出 [1, 100]" class="input-option">
                  <el-select v-model="value" placeholder="请选择" style="width: 100%;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="button">
                  <el-button type="primary" @click="onClick"><i class="el-icon-circle-check"></i>提交</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="批量测试" name="second">
              <el-upload class="upload-demo" action="http://localhost:5000/triangle" :on-preview="handlePreview"
                :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="100" :on-exceed="handleExceed"
                :on-success="Success" :file-list="fileList">
                <el-button type="primary"><i class="el-icon-upload el-icon--right"></i>上传测试用例</el-button>
                <div class="el-upload__tip">只能上传csv文件，且不超过500KB</div>
              </el-upload>
            </el-tab-pane>
          </el-tabs>
          <div class="chart-container" style="width: 40%;" ref="pieChart"></div>
        </div>

        <div class="result">
          <el-table 
            :data="tableData"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ textAlign: 'center' }"
            height="36vh"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            >
            <el-table-column prop=id label="序号">
            </el-table-column>
            <el-table-column prop=side1 label="第一条边">
            </el-table-column>
            <el-table-column prop=side2 label="第二条边">
            </el-table-column>
            <el-table-column prop=side3 label="第三条边">
            </el-table-column>
            <el-table-column prop=triangle label="是否构成三角形">
            </el-table-column>
            <el-table-column prop=EO label="预期输出">
            </el-table-column>
            <el-table-column prop=AO label="实际输出">
            </el-table-column>
            <el-table-column prop=test label="是否通过测试"
              :filters="[{ text: '通过测试', value: '通过测试' }, { text: '未通过测试', value: '未通过测试' }]" :filter-method="filterTag"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.row.test === '未通过测试' ? 'danger' : 'success'"
                  disable-transitions>{{ scope.row.test }}</el-tag>
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
      uploadActionUrl: '',
      tableData: [],
      fileList: [],
      form: {
        edge1: '',
        edge2: '',
        edge3: '',
      },
      options: [{
          value: '第一条边不能为0',
          label: '第一条边不能为0'
        }, {
          value: '第二条边不能为0',
          label: '第二条边不能为0'
        }, {
          value: '第三条边不能为0',
          label: '第三条边不能为0'
        }, {
          value: '第一条边不能小于0',
          label: '第一条边不能小于0'
        }, {
          value: '第二条边不能小于0',
          label: '第二条边不能小于0'
        }, {
          value: '第三条边不能小于0',
          label: '第三条边不能小于0'
        }, {
          value: '第一条边超出了边界',
          label: '第一条边超出了边界'
        }, {
          value: '第二条边超出了边界',
          label: '第二条边超出了边界'
        }, {
          value: '第三条边超出了边界',
          label: '第三条边超出了边界'
        }, {
          value: '等边三角形',
          label: '等边三角形'
        }, {
          value: '等腰三角形',
          label: '等腰三角形'
        }, {
          value: '一般三角形',
          label: '一般三角形'
        }, {
          value: '不构成三角形',
          label: '不构成三角形'
        }],
      value: '',
      pieChart: null,
      activeName: 'first'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    onClick() {
      var AO = ""
      var triangle = "否"
      var a = parseFloat(this.form.edge1)
      var b = parseFloat(this.form.edge2)
      var c = parseFloat(this.form.edge3)
      if (a == 0)
        AO = "第一条边不能为0"
        // this.$message.warning("第一条边不能为0")
      else if (b == 0)
        AO = "第二条边不能为0"
        // this.$message.warning("第二条边不能为0")
      else if (c == 0)
        AO = "第三条边不能为0"
        // this.$message.warning("第三条边不能为0")
      else if (a < 0)
        AO = "第一条边不能小于0"
        // this.$message.warning("第一条边不能小于0")
      else if (b < 0)
        AO = "第二条边不能小于0"
        // this.$message.warning("第二条边不能小于0")
      else if (c < 0)
        AO = "第三条边不能小于0"
        // this.$message.warning("第三条边不能小于0")
      else if (a > 100)
        AO = "第一条边超出了边界"
        // this.$message.warning("第一条边超出了边界")
      else if (b > 100)
        AO = "第二条边超出了边界"
        // this.$message.warning("第二条边超出了边界")
      if (c > 100)
        AO = "第三条边超出了边界"
        // this.$message.warning("第三条边超出了边界")
      else if (a > 0 && a <= 100 && b > 0 && b <= 100 && c > 0 && c <= 100) {
        if (a + c > b && a + b > c && b + c > a) {
          if (a == b && b == c)
            AO = "等边三角形"
            // this.$message.success("等边三角形")
          else if (a == b || b == c || a == c)
            AO = "等腰三角形"
            // this.$message.success("等腰三角形")
          else
            AO = "一般三角形"
            // this.$message.success("一般三角形")
          triangle = "是"
        }
        else
          AO = "不构成三角形"
          // this.$message.error("不构成三角形")
      }
      console.log("AO: ", AO)
      // 将这组测试结果添加到表格中
      this.tableData.push({
        id: this.tableData.length + 1,
        side1: a,
        side2: b,
        side3: c,
        EO: this.value,
        triangle: triangle,
        AO: AO,
        test: this.value === AO ? "通过测试" : "未通过测试"
      });
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
      const transformedData = response.map(item => {
      return {
        "id": item[0],
        "side1": item[1],
        "side2": item[2],
        "side3": item[3],
        "EO": item[4],
        "triangle": item[5],
        "AO": item[6],
        "test": item[7]
      };
    });
      this.tableData = transformedData;
      this.updateChart();
      console.log(this.tableData)
    },

    tableRowClassName({row, rowIndex}) {
      if (row.test === "未通过测试") {
        return 'warning-row';
      }
      return '';
    },
    filterTag(value, row) {
      return row.test === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

    initChart() {
      this.pieChart = this.$echarts.init(this.$refs.pieChart);
      this.updateChart();
    },
    updateChart() {
      console.log('updateChart');
      if(!this.tableData.length) {
        return;
      }
      const passCount = this.tableData.filter(item => item.test === '通过测试').length;
      const failCount = this.tableData.filter(item => item.test === '未通过测试').length;
      const total = this.tableData.length;
      const passRate = ((passCount / total) * 100).toFixed(2);
      console.log(passCount, failCount, total, passRate);

      const option = {
        title: {
          text: '测试用例通过率',
          subtext: `总测试用例数: ${total}`,
          textStyle:{
            fontSize: 14,
          },
          subtextStyle:{
            fontSize: 10,
          },
          left: 'center',
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '通过率',
            type: 'pie',
            radius: '50%',
            data: [
              { value: passCount, name: '通过测试'+passRate+'%' },
              { value: failCount, name: '未通过测试'+failCount+'%' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      this.pieChart.setOption(option);
    }
  },
  watch: {
    tableData: {
      deep: true,
      handler() {
        this.updateChart();
      }
    }
  }
}
</script>

<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 15px;
  text-align: left;
}

.triangle .top {
  display: flex;
  justify-content: space-between;
}

.chart-container {
  display: flex;
  justify-content: flex-end; /* 使图表容器靠右对齐 */
  margin: 20px;
  height: 250px;
}

.el-footer {
  padding: 0px;
}

.result {
  margin-top: 20px;
}

.upload-demo {
  margin-top: 50px;
}

.input-form {
  padding-right: 20px;
}

/deep/ .el-table .warning-row {
  background: oldlace;
}

/deep/ .el-table .success-row {
  background: #f0f9eb;
}
</style>
