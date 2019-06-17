<template>
  <div id="app">
    <play></play>
    <router-view/>
  </div>
</template>

<style lang="less">
  body,html{
    margin: 0;
    padding: 0;
    background-color: #eeeff0;
  }

</style>

<script>
import Play from './views/Play/Play';
export default {
  name:'app',
  data() {
    return {
      songList: ''
    }
  },
  components:{
      Play
  },
  methods:{
  }
}
</script>
<style lang='less'>
#app{
  width:100%;
  height:100%;
}
</style>


