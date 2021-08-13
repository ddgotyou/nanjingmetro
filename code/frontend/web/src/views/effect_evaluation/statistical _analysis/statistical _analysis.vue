<template>

    <div class="app-container">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>培训计划</span>

            </div>
          <el-form inline="true" model="planform" ref="planform" label-width="80px" class="form">
		  				<el-form-item label="计划名称" prop="name" >
			  				<el-select v-model="planform.name" >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>
              <el-form-item label="状态" prop="state">
			  				<el-select v-model="planform.state" >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>
              <el-form-item label="专业" prop="major">
			  				<el-select v-model="planform.major"  >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>
              <el-form-item label="讲师" prop="teacher">
			  				<el-select v-model="planform.teacher"  >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>
              <el-form-item label="开始时间" prop="starttime">
			  				<el-select v-model="planform.starttime"  >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>
              <el-form-item label="结束时间" prop="endtime">
			  				<el-select v-model="planform.endtime"  >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>

            <el-form-item >
              <el-button type="primary">确定</el-button>
            </el-form-item>
            </el-form>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column prop="plan" label="培训计划" >
              </el-table-column>
              <el-table-column prop="state" label="状态">
              </el-table-column>
              <el-table-column prop="teacher" label="讲师">
              </el-table-column>
              <el-table-column prop="stunum" label="学员人数">
              </el-table-column>
              <el-table-column prop="passnum" label="通过人数" width="120">
              </el-table-column>
              <el-table-column prop="passrate" label="通过率" width="120">
              </el-table-column>
            </el-table>
          </el-card>


          <div style="margin: 80px;"></div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>任务使用</span>

            </div>
          <el-form inline="true" model="taskuseform" ref="taskuseform" label-width="80px" class="form">
		  				<el-form-item label="专业" prop="taskmajor" >
			  				<el-select v-model="planform.taskmajor" >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>
              <el-form-item label="任务" prop="task">
			  				<el-select v-model="planform.task" >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>
              <el-form-item label="类型" prop="classify">
			  				<el-select v-model="planform.classify"  >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>


            <el-form-item >
              <el-button type="primary">确定</el-button>
            </el-form-item>
            </el-form>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column prop="planname" label="任务名" >
              </el-table-column>
              <el-table-column prop="major" label="专业">
              </el-table-column>
              <el-table-column prop="classify" label="类型">
              </el-table-column>
              <el-table-column prop="usenum" label="使用次数">
              </el-table-column>
            </el-table>
          </el-card>

          <div style="margin: 80px;"></div>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>错题统计</span>
            </div>
          <el-form inline="true" model="mistakeform" ref="mistakeform" label-width="80px" class="form">
		  				<el-form-item label="计划名称" prop="name" >
			  				<el-select v-model="planform.name" >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>
              <el-form-item label="状态" prop="state">
			  				<el-select v-model="planform.state" >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>
              <el-form-item label="专业" prop="major">
			  				<el-select v-model="planform.major"  >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>
              <el-form-item label="讲师" prop="teacher">
			  				<el-select v-model="planform.teacher"  >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>
              <el-form-item label="类型" prop="starttime">
			  				<el-select v-model="planform.starttime"  >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>
              <el-form-item label="学员" prop="endtime">
			  				<el-select v-model="planform.endtime"  >
							    <el-option label="一号" value="1"></el-option>
                  <el-option label="二号" value="2"></el-option>
						  	</el-select>
						  </el-form-item>

            <el-form-item >
              <el-button type="primary">确定</el-button>
            </el-form-item>
            </el-form>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column prop="homenum" label="题目序号" >
              </el-table-column>
              <el-table-column prop="major" label="专业">
              </el-table-column>
              <el-table-column prop="classify" label="类型">
              </el-table-column>
              <el-table-column prop="num" label="次数">
              </el-table-column>
              <el-table-column label="详情" width="120">
                <el-link type="primary">详情</el-link>
              </el-table-column>

            </el-table>
          </el-card>



  </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

</style>

<script>
  export default {
    data() {
      const item = {
        teacher:'王一二',
        state:'',
        plan:'',
        stunum:'',
        passnum:'',
        passrate:'',
      };
      return {
        planform: {
          name: '',
          state:'',


        },
        tableData: Array(5).fill(item),

      }
    }
  };
</script>
