<template>
  <div class="mine">
    <div class="header">
      <div v-on:click="handle"><img src="../../assets/img/return.png" alt=""></div>
      <p>账号</p>
    </div>
    <div class="coont-first">
      <div class="userimg">
        <img :src="$store.state.currentuser.avatarUrl" alt="">
      </div>
      <div class="username">
        <p>{{$store.state.currentuser.nickname}}</p>
        <div>
          <p>Lv.{{$store.state.currentuser.level}}</p>
          </div>
      </div>
      <div class="userset">
        <div class="usersetfont">
          <p>签到</p>
        </div>
      </div>
    </div>
    <div class="coont-first-bottom">
      <div class="box">
          <p>动态</p>
          <p>{{$store.state.currentuser.gender}}</p>
      </div>
      <div class="box">
          <p>关注</p>
          <p>{{$store.state.currentuser.follows}}</p>
      </div>
      <div class="box">
          <p>粉丝</p>
          <p>{{$store.state.currentuser.followeds}}</p>
      </div>
    </div>
    <div class="mymassage">
      <span>我的消息</span>
    </div>
    <FoundListView :msg='messageTabs'></FoundListView>
    <FoundListView :msg='messageTabssecond'></FoundListView>
    <FoundListView :msg='messageTabsthirth'></FoundListView>
    <div class="Logout" @click="Logout">
      <p>退出登录</p>
    </div>
  </div>
</template>

<script>
import FoundListView from "./FoundListView.vue";
import { log } from "util";
export default {
  name: "mine",
  components: {
    FoundListView
  },
  data() {
    return {
      messageTabs: [
        { title: "会员中心" },
        { title: "商城" },
        { title: "精品游戏推荐" },
        { title: "在线听歌免流量" }
      ],
      messageTabssecond: [
        { title: "设置" },
        { title: "扫一扫" },
        { title: "个性换肤" },
        { title: "夜间模式" },
        { title: "定时关闭" },
        { title: "音乐闹钟" },
        { title: "驾驶模式" },
        { title: "优惠券" }
      ],
      messageTabsthirth: [{ title: "分享QQ音乐" }, { title: "关于" }]
    };
  },
  methods: {
    handle() {
      this.$router.push({name:"musicmaster"});
    },
    Logout(){
      this.$store.commit("Logout");
      this.$router.push({name:"login"});
      this.$store.commit("whileLogin",false);
    }
  },
  created() {
   
  }
};
</script>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
.mine{
  padding-bottom: 50px;
}
.header {
  background-color: #30c27c;
  display: flex;
  flex-direction: row;
  img {
    // line-height: 40px;
    // color: white;
    // font-size: 24px;
    // padding-left: 15px;
    width: 25px;
    height: 25px;
    padding-top: 7px;
  }

  p {
    text-align: center;
    line-height: 40px;
    color: white;
    width: 100%;
    padding-right: 15px;
  }
}
.coont-first {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
  // background-color: aquamarine;
  border-bottom: 1px solid rgb(212, 212, 212);
  background-color: white;
  .userimg {
    width: 25%;
    position: relative;
    
    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);

    }
  }
  .username {
    display: flex;
    width: 55%;
    flex-direction: column;
    justify-content: center;
    p {
      font-size: 14px;
    }
    div {
      width: 2rem;
      height: 1rem;
      border: 1px solid rgb(212, 212, 212);
      border-radius: 50px;
      p {
        font-size: 10px;
        text-align: center;
      }
    }
  }
  .userset {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      // width: 60%;
      width: 2rem;
      height: 1rem;
      text-align: center;
      // margin-top: 25px;
      border: 1px solid rgb(212, 212, 212);
      font-size: 12px;
      border-radius: 2rem;
    }
  }
}
.coont-first-bottom {
  display: flex;
  flex-direction: row;
  padding: 5px 0;
  background-color: white;
  .box {
    width: 33%;
    border-right: 1px solid rgb(212, 212, 212);
    &:last-child {
      border: none;
    }
    p {
      text-align: center;
      font-size: 14px;
      color: rgb(153, 153, 153);
    }
  }
}
.mymassage {
  width: 100%;
  height: 30px;
  background-color: white;
  margin-top: 10px;
  span {
    line-height: 30px;
    padding-left: 20px;
  }
}
.Logout {
  width: 100%;
  height: 30px;
  background-color: white;
  margin: 10px 0;
  p {
    text-align: center;
    color: #30c27c;
    line-height: 30px;
  }
}
</style>


