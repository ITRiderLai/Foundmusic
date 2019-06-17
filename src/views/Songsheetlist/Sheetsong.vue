<template>
    <div id="sheetsong">
        <p class="title">歌曲列表</p>
        <ul class="songlist">
            <li v-for="(item, index) in songarr" :key="index" v-on:click="play(item.id)">
                <div class="songlist-index">{{index}}</div>
                <div class="sl-r">
                    <div class="sl-l-i">
                        <p class="sl-l-t1">{{item.name}}</p>
                        <p class="sl-l-t2">{{item.ar[0].name}}-{{item.al.name}}</p>
                    </div>
                    <div class="sl-r-i">
                        <img src="../../assets/img/play.png" alt="">
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "sheetsong",
  props: {
    msg: ''
  },
  data() {
    return {
      songarr:''
    };
  },
  computed: {
    
  },
  watch:{
      msg(){
          axios
       .get("http://localhost:3000/song/detail",{
           params:{
              ids:  this.msg
          }
      })
      .then(response => {
        this.songarr = response.data.songs
      })
      .catch(error => {
        console.log(error);
      }); 
      }
  },
  methods: {
     play (id) {
         this.$store.commit('emptySongList')
       let ids = this.songarr.map(song => song.id)
    //    console.log(ids)
       this.$store.dispatch('playList', { songIds: ids, id: id })
   }
  },
};
</script>

<style scoped lang='less'>
*{
    margin: 0;
    padding:0;
}
#sheetsong{
    .title{
        font-size: 12px;
        padding:5px 20px  ;
        color: #666;
    }
    .songlist{
        background-color: #f8f8f8;
        li{
           display: flex; 
           width: 100%;
           height: 60px;
           .songlist-index{
               line-height: 60px;
               width: 10%;
               text-align: center;
               color: #666;
           }
           .sl-r{
              border-bottom: 1px solid rgba(0,0,0,.1);
              width: 90%;
              display: flex;
               .sl-l-i{
                   width: 80%;
                   .sl-l-t1{
                       padding-top: 12px;
                       color: #333;
                        width: 100%;
                         height: 20px;
                       overflow: hidden;
                   }
                   .sl-l-t2{
                       width: 100%;
                        height: 20px;
                       overflow: hidden;
                       font-size: 12px;
                       color: #888;
                   }
                   
               }
               .sl-r-i{
                   width: 20%;
                   text-align: center;
                    padding-top: 16px;
                   img{
                           max-width: 40%;
                    }
               }
           }
        }
        
    }
}
</style>


