<template>
    <div id="albumList">
        <div class="headerbox">
           <div class="header">
                <img src="../../assets/img/return.png" alt="" class="goback" @click="goback">
                <div class="mark" :style="this.backImg"></div>
                <div class="markbg"></div>
                <div class="headerimg">
                    <img :src="albumcont.blurPicUrl" alt="">
                </div>
                <div class="header-right">
                    <div class="hader-right-top">
                        <p>{{albumcont.name}}</p>
                    </div>
                </div>
            </div>
            <div class="title">
                <div class="title-intro">
                    <p>简介：{{albumcont.description}}</p>
                </div>
            </div>
        </div>
        <AlbumSong :msg='msgsong'></AlbumSong>
    </div>
</template>

<script>
import AlbumSong from "./AlbumSong.vue";
export default {
  name: "albumList",
  components: {
    AlbumSong
  },
  data() {
    return {
      albumcont: "",
      msgsong: ""
    };
  },
  computed: {
    backImg: function() {
      return "background-image : url(" + this.albumcont.blurPicUrl + " )  ";
    }
  },
  methods: {
    handle: function(params) {
      axios
        .get("http://localhost:3000/album", {
          params: {
            id: params
          }
        })
        .then(response => {
          this.albumcont = response.data.album;
          this.msgsong = response.data.songs;
          console.log(this.msgsong);
        })
        .catch(error => {
          console.log(error);
        });
    },
    goback(){
      this.$router.go(-1);
    }
  },

  created() {
    this.handle(this.$route.query.id);
    //  console.log(markimg)
  }
};
</script>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
.headerbox {
  width: 100%;
  height: 330px;
  background-color: #f8f8f8;
}
.header {
  width: 100%;
  height: 186px;
  // background-color: aqua;
  position: relative;
  display: flex;
  overflow: hidden;
  z-index: 0;
  .goback {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 5px;
    left: 5px;
  }
  .mark {
    width: 100%;
    height: 100%;
    position: absolute;
    filter: blur(20px);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -2;
    transform: scale(1.5);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .markbg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    top: 0;
    left: 0;
    z-index: -1;
  }
  .headerimg {
    width: 40%;
    box-sizing: border-box;
    padding: 40px 10px;
    img {
      width: 100%;
    }
  }
  .header-right {
    // box-sizing: border-box;
    // padding:30px 10px;
    padding-top: 40px;
    padding-left: 10px;
    color: white;
  }
}
.title {
  .title-tabs {
    list-style: none;
    color: #666666;
    padding: 10px 0 10px 5px;
    li {
      display: inline;
      padding: 0 8px;
      margin-left: 5px;
    }
  }
  .title-intro {
    font-size: 14px;
    color: #666666;
    padding: 10px 18px 0 18px;
    line-height: 25px;
    text-align: justify;
    overflow: hidden;
    height: 100px;
  }
}
</style>


