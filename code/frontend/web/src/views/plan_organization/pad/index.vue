<template>
  <div class="app-container">
    <!-- 筛选框 -->
    <el-card class="card-box" style="width: 100%">
      <div slot="header">筛选框</div>
      <el-form label-width="auto" label-position="right">
        <el-col :span="4">
          <el-form-item label="培训任务">
            <el-select v-model="query.trainingPlan" class="filter-item mr10">
              <el-option
                v-for="option in trainingTaskList"
                :key="option.key"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="状态">
            <el-select v-model="query.status" class="filter-item mr10">
              <el-option label="已评" value="0" />
              <el-option label="未评" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="学号">
            <el-input
              v-model="query.no"
              placeholder="通过学号搜索"
              class="filter-item mr10"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="学员">
            <el-input
              v-model="query.name"
              placeholder="通过姓名搜索"
              class="filter-item mr10"
            />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <div style="text-align: right">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="handleSearch"
              >搜索</el-button
            >
          </div>
        </el-col>
        <el-col :span="3">
          <div style="float: right">
            <el-button icon="el-icon-refresh" @click="handleReset"
              >重置</el-button
            >
          </div>
        </el-col>
      </el-form>
    </el-card>

    <!----------------------------------------------------------------------------------lzl
    ---------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------->
    <!-- 学员评分弹出页 -->
    <el-dialog :title="details_title" :visible.sync="details_is_show" width="75%">
      <div style="text-align:right;">
        当前用户：{{now_user.name}}
      </div>

      <el-row style="display:flex;">
        <el-col style="width:15%;align-self:center;"><div>
            <el-button style="width:70%; text-align:center;" type="info" plain @click="pre_one()">上一个</el-button>
          </div></el-col>
        <el-col style="width:70%"><div>
            <div style="font-size:x-large;font-weight:bold">培训信息：</div>
            <div>
              <el-row>
                <el-col style="width:50%">培训计划:{{training_info.plan}}</el-col>
                <el-col style="width:50%">任务名称:{{training_info.task}}</el-col>
                <!--el-col style="width:30%">指导老师:{{training_info.teacher}}</el-col-->
              </el-row>
            </div>

            <div style="font-size:x-large;font-weight:bold;margin-top:40px">学员信息：</div>
            <div>
              <el-row>
                <el-col style="width:30%">姓名:{{score_details.student_info.name}}</el-col>
                <el-col style="width:30%">学号:{{score_details.student_info.num}}</el-col>
                <!--el-col style="width:25%">岗位:{{score_details.student_info.station}}</el-col-->
                <el-col style="width:30%">得分:{{score_details.student_info.score}}</el-col>
              </el-row>
            </div>
            
          </div></el-col>
        <el-col style="width:15%;align-self:center;"><div>
            <el-button style="width:70%; text-align:center" type="info" plain @click="next_one()">下一个</el-button>
          </div></el-col>
      </el-row>
      
      <el-table
        :data="score_details.score_list"
        height="350px"
        border
        fit
        style="width: 100%; margin-top:50px">
          <el-table-column type="index" label="序号" align="center" />
          <el-table-column
            prop="content"
            label="考核内容">
          </el-table-column>
          <!--el-table-column
            prop="pivot"
            label="考核要点">
          </el-table-column>
          <el-table-column
            prop="stations"
            label="涉及岗位">
          </el-table-column-->
          <el-table-column
            prop="totalScore"
            align="center"
            label="分值">
          </el-table-column>
          <!--el-table-column
            prop="demand"
            label="评分标准">
          </el-table-column-->
          <el-table-column label="得分">
            <template slot-scope="{row}">
              <el-input v-model="row.score" type="number"></el-input>
            </template>
          </el-table-column>
      </el-table>

      <div style="margin-top:20px;text-align:right">
        <el-button type="primary" @click="update_score();">上传成绩</el-button>
        <el-button @click="cancle();">取消</el-button>
      </div>

    </el-dialog>

    <!-------------------------------------------------------------------------------end_lzl
    ---------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------->




    <!-- 培训计划框 -->
    <el-card class="card-box" style="width: 100%">
      <div slot="header">XX培训计划任务表</div>

      <el-collapse v-model="actived" accordion>
        <el-collapse-item
          v-for="(plan, plankey) in trainingTaskList"
          :key="plan.key"
          :title="plan.taskName"
          :name="plan.taskName"
        >
          <el-table
            :data="trainingTaskList[plankey].trainees"
            :default-sort="{ prop: 'id', order: 'descending' }"
            stripe
          >
            <el-table-column v-if="false" prop="id" />
            <el-table-column type="index" label="序号" align="center" />
            <el-table-column prop="name" label="学员" align="center" />
            <el-table-column prop="id" label="学号" align="center" />
            <el-table-column prop="status" label="评分状态" align="center"/>

            <!--el-table-column prop="grade" label="成绩" align="center" /-->
            <el-table-column prop="" label="评分表" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDetail(plankey, scope)"
                  >详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>

    </el-card>
  </div>
</template>

<script>
import * as api from '@/api/training_plan/pad.js'

export default {
  data: function () {
    return {
      ///////////////////////////////////////////////////////////////
      // 按条件筛选
      query: {
        trainingPlan: "",
        status: "",
        no: "",
        name: "",
      },

      // 激活折叠板名
      actived: "",
      // 遮罩层
      loading: true,
      // 任务名称列表
      trainingTaskList: [],

      /////////////////////////////////////////////lzl
      //  当前用户
      now_user:{
        id: 114514,     //老师的id
        name:"XXX老师"
      },
      //  当前任务信息
      training_info:{
          planId:89,                        /////////////！！！！！！页面传值修改的是这里的内容               页面传参！！！！！！！！！！！！！
          plan:"XXX培训计划",                /////////////！！！！！！主要是这两行的内容
          task:"XXX任务",
          //teacher:"XXX指导老师",
          now_max_num:0     //当前任务最大的学员数目
        },

      //  学生信息与评分细则
      score_details:{
        student_info:{
          name:"",
          num:0,
          //station:"XXX岗位",
          score:0.00
        },
        score_list:[]
      },

      //  弹窗是否可见
      details_is_show:false,
      details_title:"培训管理系统PAD端--",
      //  确定点开的是哪一个任务与哪一个学员
      now_click:{
        now_task:-1,      //任务key
        now_student:-1,   //学员在数组中的序号
      }
    };
  },
  computed: {},
  mounted: function () {
    this.loadData();
  },

  created(){
    this.training_info.planId=this.$route.query.id
    this.training_info.plan=this.$route.query.name

    api.list_students({
      planId: 89
    }).then((res)=>{
      //console.log(res);
      this.trainingTaskList = res._embedded.scores;
    });
  },

  methods: {
    // 加载学员数据
    loadData() {
      api.listTrainingPlan(task).then((response) => {
        this.trainingTaskList = response._embedded.dboxVoes;
      });
    },

    // 根据输入框、选择框和搜索框的条件筛选学员
    handleSearch() {
      this.loading = true;
      listStudent(this.query).then((response) => {
        this.studentList = response._embedded
          ? response._embedded.traineeVoes
          : [];
        this.loading = false;
      });
    },
    // 重置学员列表
    handleReset() {
      // 清空查询字典
      for (var key in this.query) this.query[key] = null;
      // 重新加载数据
      this.loadData();
      // 不激活任何折叠板
      this.actived = "";
    },

    /////////////////////////////////////////////lzl
    // 查看某个学员打分 参数顺序：plankey,scope
    handleDetail(taskOrder, scope) {
      let planId = this.training_info.planId;
      api.get_details({
        userId: scope.row.id,
        planId: planId,
        taskOrder: taskOrder
      }).then((res)=>{
        //console.log(res);
        if(res._embedded){
          let sp = taskOrder;
          let sp2 = scope.$index;

          this.score_details.score_list = res._embedded.scores;

          this.now_click.now_task = taskOrder;
          this.now_click.now_student = sp2;

          this.training_info.now_max_num = this.trainingTaskList[sp].trainees.length;
          this.training_info.task=this.trainingTaskList[sp].taskName;
          //this.training_info.teacher="XXX指导老师";

          //console.log("第三方"+sp2+"得到"+this.training_info.now_max_num);

          this.score_details.student_info.name=scope.row.name;
          this.score_details.student_info.num=scope.row.id;
          //this.score_details.student_info.station="XXX岗位";
          let temp = parseInt(0);
          for(let x of this.score_details.score_list){
            temp = parseInt(temp) + parseInt(x.score);
          }
          this.score_details.student_info.score = temp;

          this.details_is_show=true;

        }else{
          this.$message({
            message: '该学生不存在评分信息',
            type: 'warning'
          });
          return;
        }
      });

      /*let sp=this.trainingTaskList.findIndex((role)=>role.key===index1);
      let sp2=this.studentList.findIndex((role)=>role.id===index2);

      this.now_click.now_task=index1;
      this.now_click.now_student=sp2;

      this.training_info.now_max_num=this.trainingTaskList[sp].student_num;
      this.training_info.task=this.trainingTaskList[sp].label;
      this.training_info.plan="XXX培训计划";
      this.training_info.teacher="XXX指导老师";
      
      this.score_details.student_info.name=this.studentList[sp2].name;
      this.score_details.student_info.num=this.studentList[sp2].no;
      this.score_details.student_info.station="XXX岗位";

      //  这里是前端造假
      if(this.studentList[sp2].rateStatus=="1"){
        this.score_details.student_info.score=0;
        for(let x of this.score_details.score_list){
          x.score = parseInt(0);
        }
      }else{
        this.score_details.student_info.score=this.studentList[sp2].grade;
      }*/
    },

    //上传成绩
    update_score(){

      let sp = this.now_click.now_task;
      let sp2=this.now_click.now_student;

      for(let i in this.score_details.score_list){
        let x = this.score_details.score_list[i];
        let para = {
          userId: this.trainingTaskList[sp].trainees[sp2].id,
          scoringItemId: parseInt(i) + parseInt(2),
          score: parseInt(x.score)
        };
        console.log(para);
        api.upload_score({
          para
        }).then((res)=>{
          console.log(res);

          if(i == this.score_details.score_list.length - 1){
            let ans=parseInt(0);
            for(let x of this.score_details.score_list){
              ans = parseInt(ans)+parseInt(x.score);
            }
            this.score_details.student_info.score=ans;
          }
        }).catch((err)=>{
          console.log(err);
          return;
        });


                    let ans=parseInt(0);
            for(let x of this.score_details.score_list){
              ans = parseInt(ans)+parseInt(x.score);
            }
            this.score_details.student_info.score=ans;
      }
    },

    //上传成绩
    cancle(){
      this.details_is_show=false;
    },

    //前一个学生
    pre_one(){
      if(this.now_click.now_student==0){
        this.$message('这已经是第一个学生了。');
      }else{
        let sp = this.now_click.now_task;

        this.now_click.now_student = this.now_click.now_student-1;
        let sp2=this.now_click.now_student;

        api.get_details({
          userId: this.trainingTaskList[sp].trainees[sp2].id,
          planId: this.training_info.planId,
          taskOrder: sp
        }).then((res)=>{
          this.score_details.score_list = res._embedded.scores;

          this.score_details.student_info.name=this.trainingTaskList[sp].trainees[sp2].name;
          this.score_details.student_info.num=this.trainingTaskList[sp].trainees[sp2].id;
          //this.score_details.student_info.station="XXX岗位";

          let temp = parseInt(0);
          for(let x of this.score_details.score_list){
            temp = parseInt(temp) + parseInt(x.score);
          }
          this.score_details.student_info.score = temp;
        });


      }
    },

    //后一个学生
    next_one(){
      if(this.now_click.now_student==(this.training_info.now_max_num-1)){
        this.$message('这已经是最后一个学生了。');
      }else{
        let sp = this.now_click.now_task;

        this.now_click.now_student = this.now_click.now_student + 1;
        let sp2=this.now_click.now_student;

        api.get_details({
          userId: this.trainingTaskList[sp].trainees[sp2].id,
          planId: this.training_info.planId,
          taskOrder: sp
        }).then((res)=>{
          this.score_details.score_list = res._embedded.scores;

          this.score_details.student_info.name=this.trainingTaskList[sp].trainees[sp2].name;
          this.score_details.student_info.num=this.trainingTaskList[sp].trainees[sp2].id;
          //this.score_details.student_info.station="XXX岗位";

          let temp = parseInt(0);
          for(let x of this.score_details.score_list){
            temp = parseInt(temp) + parseInt(x.score);
          }
          this.score_details.student_info.score = temp;
        });


      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  max-width: 100%;
  margin: 20px auto;
}

.filter-item {
  min-width: 100px;
  width: 100%;
}

.mr10 {
  margin-right: 10px;
}

.mt10 {
  margin-top: 10px;
}

.el-row {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

</style>
