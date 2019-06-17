<template>
    <div class="login">
        <div v-on:click="returnHandle" class="returnstyle"><img src="../../assets/img/return.png" alt=""></div>
        <div class="mark"></div>
        <div class="textbox">
            <input ref="user" type="text" class="username" placeholder="请输入用户名">
            <input ref="psw" type="password" class="password" placeholder="请输入密码">
        </div>
        <div class="loginbtnbox">
            <button class="loginbtn" @click="loginHandle">登&emsp;&emsp;录</button>
        </div>
        <div class="tiaojian">
            <label><input type="checkbox" name="check" checked=“checked”>同意《用户协议》和《隐私政策》</label>
        </div>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {
    returnHandle(){
      this.$router.push({name:"musicmaster"});
    },
    loginHandle(){
      let id = this.$refs.user.value;
      let pwd = this.$refs.psw.value;
      this.$store.dispatch("Login",{id,pwd}).then(()=>{
         this.$router.push({name:"found"});
      }); 
    }
  }
};
</script>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
.login {
  position: relative;
  .returnstyle{
    position: absolute;
    width: 20px;
    height: 20px;
    padding: 5px;
    z-index: 5;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .mark {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  background-image: url(../../assets/img/bg.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  height: 100%;
  position: relative;
  background-size: cover;
  .textbox {
    position: relative;
    top: 50%;
    transform: translateY(-100%);
    input {
      outline: none;
      display: block;
      margin: 0 auto;
      width: 75%;
      height: 40px;
      margin-bottom: 10px;
      // background: none;
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 50px;
      border: none;
      color: white;
      padding-left: 20px;
      &::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.8);
        padding-left: 10px;
      }
    }
  }
  .loginbtnbox {
    .loginbtn {
      position: absolute;
      color: white;
      min-width: 80%;
      // background-color: rgba(0, green, blue, alpha)
      background: none;
      left: 50%;
      transform: translateX(-50%);
      height: 40px;
      outline: none;
      bottom: 100px;
      border: 2px solid white;
      border-radius: 50px;
      &:active {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .tiaojian {
    position: absolute;
    color: white;
    width: 190px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 70px;
    font-size: 12px;
    input[type="checkbox"] {
      width: 10px;
      height: 10px;
      background: none;
    }
  }
}
</style>




