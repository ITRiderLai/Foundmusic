<template>
  <div class="FoundListView">
    <div class="mymassage">
        <div class="msg" v-for="(item, index) in msg" :key="index">
            <span>{{item.title}}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'FoundListView',
  props:{
      msg:'',
  },
  data() {
    return {
      
    }
  },
  methods:{

  },
  created() {
        console.log(this.msg)
      
    },
}
</script>

<style scoped lang='less'> 
*{
  margin: 0;
  padding: 0;
}

.mymassage{
  width: 100%;


  margin-top: 10px;
  .msg{
      width: 100%;
      height: 30px;
        background-color: white;
        border-bottom: 1px solid rgb(212, 212, 212);
        &:last-child{
            border: none;
        }
  }
  span{
    line-height: 30px;
    padding-left: 20px;
    
  }
}
</style>


