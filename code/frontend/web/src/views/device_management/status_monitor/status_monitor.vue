<template>
  <div class="app-container">
    <el-card class="card-box" style="width: 100%">
      <div slot="header">
        <span style="margin-right: 20px">教室：</span>
        <el-select
          value="screen"
          placeholder="教室号"
          @select="classChosen"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-form
        style="width: 100%; height: 700px; float: left;"
      >
        <div
          id="box0"
          style="width: 80%; height: 50%; margin-left: 12%; position: absolute; visibility: hidden;"
          >
          <div
            class="image-box"
            id="onescreen"
          >
          </div>
          <div id="onlyname" style="width: 90%; height: 10%; margin-right: 20px; text-align: center; float:left;">?</div>
        </div>
        <a
          id="box1"
          style="width: 50%; height: 50%; float: left;"
          @click="look1"
          >
          <div
            class="image-box"
            id="screen1"
          >
          </div>
          <div id="name1" style="width: 90%; height: 10%; margin-right: 20px; text-align: center; float:left;">?</div>
        </a>
        <div
          id="box2"
          style="width: 50%; height: 50%; float: left;">
          <div
            class="image-box"
            id="screen2"
          >
          </div>
          <div id="name2" style="width: 90%; height: 10%; margin-right: 20px; text-align: center;">?</div>
        </div>
        <div
          id="box3"
          style="width: 50%; height: 50%; float: left;">
          <div
            class="image-box"
            id="screen3"
          >
          </div>
          <div id="name3" style="width: 90%; height: 10%; margin-right: 20px; text-align: center;">?</div>
        </div>
        <div
          id="box4"
          style="width: 50%; height: 50%; float: left;">
          <div
            class="image-box"
            id="screen4"
          >
          </div>
          <div id="name4" style="width: 90%; height: 10%; margin-right: 20px; text-align: center;">?</div>
        </div>
      </el-form>
    </el-card>
    <el-table v-loading="false" :data="list" @selection-change="screenSelectionChange"  ref="textDocRef" @row-click="textRowClick">
      <el-table-column label="查看" type="selection" width="85" align="center" />
      <el-table-column label="机器名" align="center" prop="screenName" />
      <el-table-column label="IP地址" align="center" prop="screenIP" />
      <el-table-column label="操作时间" align="center" prop="screenTime">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//import RFB from "@novnc/novnc/core/rfb"

export default {
  data() {
    return {
      options: [
        { value: "1", label: "101" },
        { value: "2", label: "102" },
        { value: "3", label: "103" },
        { value: "4", label: "104" },
        { value: "5", label: "105" },
        { value: "6", label: "106" },
      ],
      list: [
        {
          screenName: '机器1',
          screenIP: '192.168.142.11',
          screenTime: '0'
        },
        {
          screenName: '机器2',
          screenIP: '192.168.142.100',
          screenTime: '0'
        },
        {
          screenName: '机器3',
          screenIP: '192.168.142.11',
          screenTime: '0'
        },
        {
          screenName: '机器4',
          screenIP: '192.168.142.11',
          screenTime: '0'
        },
        {
          screenName: '机器5',
          screenIP: '192.168.142.4',
          screenTime: '0'
        },
        {
          screenName: '机器6',
          screenIP: '192.168.142.5',
          screenTime: '0'
        },
        {
          screenName: '机器7',
          screenIP: '192.168.142.6',
          screenTime: '0'
        },
        {
          screenName: '机器8',
          screenIP: '192.168.142.7',
          screenTime: '0'
        }
      ],
      wsURL: [],
      chosM: [],
      rfb1:null,
      scFLAG:4,
      rfb4:[null,null,null,null],
      wscreen: [{
          scre: 'screen1',
          scrt: 'name1'
        },
        {
          scre: 'screen2',
          scrt: 'name2'
        },
        {
          scre: 'screen3',
          scrt: 'name3'
        },
        {
          scre: 'screen4',
          scrt: 'name4'
        }]
    }
  },
    
  mounted () {
  },

  methods: {

    // vnc连接断开的回调函数
    disconnectedFromServer (msg) {
      if (msg.detail.clean) {
        // 根据 断开信息的msg.detail.clean 来判断是否可以重新连接
        //this.connectVnc()
      } else {
        //这里做不可重新连接的一些操作
        //console.log('链接失败,重新链接中-------' + this.wsURL)
        //this.connectVnc()
      }
    },
    // 连接成功的回调函数
    connectedToServer (msg) {
      // console.log('success', msg)
    },

    //连接vnc的函数      
    connectVnc1 () {
      const PASSWORD = '4396'
        if(this.rfb1!==null){
          this.rfb1._disconnect();
          this.rfb1=null;
          document.getElementById('onlyname').innerHTML='';
        }
        let url = 'ws://' + this.wsURL[0] + ':9000/websockify'
        console.log('连接至'+url);
        this.rfb1 = new RFB(document.getElementById('onescreen'), url, {
        // 向vnc 传递的一些参数，比如说虚拟机的开机密码等
        credentials: { password: PASSWORD }
         });
        //this.rfb[i].addEventListener('connect', this.connectedToServer);
        //this.rfb[i].addEventListener('disconnect', this.disconnectedFromServer);
        this.rfb1._viewOnly = true;
        this.rfb1._scaleViewport = true;  
        this.rfb1._resizeSession = true;
        console.log(this.rfb1)
        document.getElementById('onlyname').innerHTML=this.chosM[0];
    },

    connectVnc4 () {
      const PASSWORD = '4396'
      let maxlen = 4;
      for (var i=0;i < maxlen;i++){
        if(this.rfb4[i]!==null){
          this.rfb4[i]._disconnect();
          this.rfb4[i]=null;
          document.getElementById(this.wscreen[i].scrt).innerHTML='';
        }
        if(i<this.wsURL.length){
        let url = 'ws://' + this.wsURL[i] + ':9000/websockify'
        console.log('连接至'+url);
        this.rfb4[i] = new RFB(document.getElementById(this.wscreen[i].scre), url, {
        credentials: { password: PASSWORD }
         });
        this.rfb4[i]._viewOnly = true;
        this.rfb4[i]._scaleViewport = true;  
        this.rfb4[i]._resizeSession = true;
        console.log(this.rfb4[i])
        document.getElementById(this.wscreen[i].scrt).innerHTML=this.chosM[i];
        }
      }
    },

    yellow(x) { 
    x.style.background = "#FFFF00"; 
    },  

    screenNumChange(){
      for (var i=0;i < 4;i++)this.wsURL[i]=null;
      
      document.getElementById('box1').style.visibility='hidden';
      document.getElementById('box2').style.visibility='hidden';
      document.getElementById('box3').style.visibility='hidden';
      document.getElementById('box4').style.visibility='hidden';
      document.getElementById('box0').style.visibility='visible';
    },

    look1(){
      this.screenNumChange();
    },

    classChosen(){

    },

    screenSelectionChange(selection){
      if(this.scFLAG===1){
        this.screenSelectionChange1(selection);
      }
      else if(this.scFLAG===4){
        this.screenSelectionChange4(selection);
      }
    },

    screenSelectionChange1(selection){
      if(selection.length > 1){
        let tempArr0 = selection.slice(0,1);
        if (tempArr0.length !== 0) {
          tempArr0.forEach((ele) => {
            this.$refs.textDocRef.toggleRowSelection(ele, false);
          });
        }
      }
      else{
         this.chosM = selection.map(item => item.screenName);
         this.wsURL = selection.map(item => item.screenIP);
        this.connectVnc1();
      }

    },

    screenSelectionChange4(selection){
      if(selection.length > 4){
        this.$message.error("最多选择4个！");
        let tempArr = selection.slice(4);
        if (tempArr.length !== 0) {
          tempArr.forEach((ele) => {
            this.$refs.textDocRef.toggleRowSelection(ele, false);
          });
        }
      }
      else{
        this.chosM = selection.map(item => item.screenName);
        this.wsURL = selection.map(item => item.screenIP);
        this.connectVnc4();
      }
    },

    textRowClick(row) {
      this.$refs.textDocRef.toggleRowSelection(row);
    },
  }
};
</script>

<style lang="scss" scoped>
.card-box {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.image-box {
  width: 90%;
  height: 90%;
  background: gray
}

</style>

