<template>
    <div id="singerList">
        <div class="headerbox">
           <div class="header" :style="this.backImg">
                <img src="../../assets/img/return.png" alt="" class="goback" @click="goback">
            </div>
            <div class="title">
                <div class="title-intro">
                    <p>简介：{{Songcont.briefDesc}}</p>
                </div>
            </div>
        </div>
        <AlbumSong :msg='msgsong'></AlbumSong>
    </div>
</template>

<script>
import AlbumSong from "../Album/AlbumSong.vue";
export default {
  name: "singerList",
  components: {
    AlbumSong
  },
  data() {
    return {
      Songcont: '',
      msgsong: '',
    };
  },
  
  methods: {
    handle: function(params) {
      axios
        .get("http://localhost:3000/artists", {
          params: {
            id: params
          }
        })
        .then(response => {
          this.Songcont = response.data.artist;
          this.msgsong = response.data.hotSongs;
          console.log(response.data.hotSongs)
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
  },
  computed: {
    backImg: function() {
      return "background-image : url(" + this.Songcont.picUrl + " )  ";
    }
  },
};
</script>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
.headerbox {
  width: 100%;
  background-color: #f8f8f8;
  .header {
    width: 100%;
    height: 250px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    .goback {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 5px;
    left: 5px;
  }
  }
  .title {
    .title-intro{
      font-size: 14px;
      color: #666666;
      padding: 10px 18px 0 18px;
      line-height: 25px;
      text-align: justify;
      overflow: hidden;
      height: 100px;
    }
  }
}
</style>


