<template>
<div class="Songsheet">
    <div class="cont-second">
        <div class="cont-title">
            <p>为你推荐歌单</p>
        </div>
       <div class="sheetbox">
            <div class="sheet" v-for="(item, index) in songname" :key="index" v-on:click="handle(item.id)">
                <div class="mark"></div>
                <div class="sheetcont">
                    <img :src="item.picUrl" alt="">
                    <p>{{item.name}}</p>
                </div>
            </div>
        </div> 
    </div>
  
</div>

</template>

<script>
export default {
    name: 'Songsheet',
    data() {
        return {
            songname:[],
        }
    },
    methods:{
        handle(id){
            this.$router.push({name:'sheetList',query: { id: id }})
            
        }
    },
    created() {
      axios
      .get("http://localhost:3000/personalized")
      .then(response => {
        var arr = response.data.result.slice(0,6)
        arr.forEach(element => {
        this.songname.push(element) 
        });

        
      })
      .catch(error => {
        console.log(error);
      });  
      
    },
    
}
</script>

<style scoped lang='less'>
*{
    margin:0;
    padding:0;
}
.cont-second{
    padding-top: 30px;
}
.cont-title{
    text-align: center;
    p{
        padding-bottom: 20px;
    }
}
.sheetbox{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .sheet{
        width: 32.9%;
        // height: 180px;
        // background-color: aqua;
        padding-bottom: 15px;
        .sheetcont{
            width: 100%;
    
            img{
            width:100%;
        }
        p{
            font-size: 12px;
            // padding-top: 5px;
            // padding-left: 5px;
            padding:0 10px ;
            text-align: justify;
        }
        }
        
    }
}
</style>

