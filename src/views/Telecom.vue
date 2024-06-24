<template>
  <div class="telecom">
    <div class="top">
      <div style="width: 30%;">
        <h1>电信收费问题</h1>
        <el-upload class="upload-demo" action="http://localhost:5000/telecom" :on-preview="handlePreview"
          :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="100" :on-exceed="handleExceed"
          :on-success="Success" :file-list="fileList">
          <el-button size="small" type="primary">上传测试用例</el-button>
          <div class="el-upload__tip">只能上传csv文件，且不超过500kb</div>
        </el-upload>
      </div>
      <div class="chart-container" style="width: 40%;" ref="pieChart"></div>
    </div>
    <div class="result">
      <el-table 
        :data="tableData"
        :cell-style="{ textAlign: 'center' }" 
        :header-cell-style="{ textAlign: 'center' }"
        height="55vh"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        >
        <el-table-column prop=id label="序号">
        </el-table-column>
        <el-table-column prop=minutes label="本月通话的分钟数" >
        </el-table-column>
        <el-table-column prop=actual label="年度逾期缴费次数">
        </el-table-column>
        <el-table-column prop=max label="最大逾期缴费次数">
        </el-table-column>
        <el-table-column prop=EO label="预期输出">
        </el-table-column>
        <el-table-column prop=AO label="实际输出">
        </el-table-column>
        <el-table-column 
          prop=test
          label="是否通过测试"
          :filters="[{ text: '通过测试', value: '通过测试' }, { text: '未通过测试', value: '未通过测试' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.test === '未通过测试' ? 'danger' : 'success'"
              disable-transitions>{{scope.row.test}}</el-tag>
          </template>
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
      fileList: [],
      pieChart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
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
      const transformedData = response.map(item => {
      return {
        "id": item[0],
        "minutes": item[1],
        "actual": item[2],
        "max": item[4],
        "EO": item[3],
        "AO": item[5],
        "test": item[6]
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
.telecom {
  text-align: left;
  width: 100%;
}

.upload-demo {
  margin-top: 20px;
}

.telecom .top {
  display: flex;
  justify-content: space-between;
}

.chart-container {
  display: flex;
  justify-content: flex-end; /* 使图表容器靠右对齐 */
  margin: 20px;
  height: 250px;
}

/deep/ .el-upload {
  text-align: left;
}

.el-upload__tip {
  margin-top: 10px;
}

/deep/ .el-table .warning-row {
  background: oldlace;
}

/deep/ .el-table .success-row {
  background: #f0f9eb;
}
</style>
