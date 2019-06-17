<template>
<div class="Latestalbum">
    <div class="cont-second">
        <div class="cont-title">
            <p>最新专辑</p>
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
  name: "Latestalbum",
  data() {
    return {
      songname: []
    };
  },
  methods: {
   handle(id){
            this.$router.push({name:'albumList',query: { id: id }})
            
        }
  },
  created() {
    axios
      .get("http://localhost:3000/album/newest")
      .then(response => {
        //   console.log(response.data.result.slice(0,6))
        var arr = response.data.albums.slice(0, 6);
        // console.log(arr)
        this.songname = arr;
      })
      .catch(error => {
        console.log(error);
      });
    console.log(this.songname);
  }
};
</script>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
.cont-second {
  padding-top: 30px;
}
.cont-title {
  text-align: center;
  p {
    padding-bottom: 20px;
  }
}
.sheetbox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .sheet {
    width: 32.9%;
    // height: 180px;
    // background-color: aqua;
    padding-bottom: 15px;
    .sheetcont {
      width: 100%;

      img {
        width: 100%;
      }
      p {
        font-size: 12px;
        // padding-top: 5px;
        // padding-left: 5px;
        padding: 0 10px;
        text-align: justify;
      }
    }
  }
}
</style>

