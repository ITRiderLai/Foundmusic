<template>
  <div class="musicmaster">
    <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in tabs" :key="index">
              <img :src="item.imgurl" alt="">
            </div>
          </div>
    <!-- 如果需要分页器 -->
          <div class="swiper-pagination">
          
          </div>
    </div>
    <Songsheet></Songsheet>
    <Latestalbum></Latestalbum>
  </div>
</template>

<script>
import "../../assets/js/swiper.min.js";
import Songsheet from "./songsheet.vue";
import Latestalbum from "./Latestalbum.vue";
export default {
  name: "musicmaster",
  components: {
    Songsheet,
    Latestalbum
  },
  data() {
    return {
      radiostation: null,
      newsong_name: null,
      newsong_img: null,
      newAlbum_name: null,
      newAlbum_img: null,
      tabs: [
        {
          imgurl:
            "http://qqmusicimg.oss-cn-beijing.aliyuncs.com/swiper/sw_1.jpg"
        },
        {
          imgurl:
            "http://qqmusicimg.oss-cn-beijing.aliyuncs.com/swiper/sw_2.jpg"
        },
        {
          imgurl:
            "http://qqmusicimg.oss-cn-beijing.aliyuncs.com/swiper/sw_3.jpg"
        },
        {
          imgurl:
            "http://qqmusicimg.oss-cn-beijing.aliyuncs.com/swiper/sw_4.jpg"
        },
        {
          imgurl:
            "http://qqmusicimg.oss-cn-beijing.aliyuncs.com/swiper/sw_5.jpg"
        }
      ],
      contitem: [{ title: null, songimg: null }, { title: null, songimg: null }]
    };
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      autoplay: true,
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      }
    });
  },
  created() {
    axios
      .get("http://localhost:3000/dj/recommend")
      .then(response => {
        // console.log(response.data.name);
        this.radiostation = response.data.djRadios[1].picUrl;
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("http://localhost:3000/top/album?offset=0&limit=2")
      .then(response => {
        this.contitem[0].title = response.data.albums[0].name;
        this.contitem[0].songimg = response.data.albums[0].picUrl;
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("http://localhost:3000/top/album?offset=0&limit=2")
      .then(response => {
        this.contitem[1].title = response.data.albums[1].name;
        this.contitem[1].songimg = response.data.albums[1].picUrl;
        // console.log(this.newAlbum_img)
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
.swiper-pagination-bullet-active {
  background: #30c27c;
}
</style>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}

.musicmaster {
  .swiper-container {
    width: 100%;

    .swiper-slide {
      img {
        width: 100%;
      }
    }
  }
  .personalradio {
    width: 100%;
    display: flex;
    // flex-wrap: wrap;
    justify-content: space-around;
    .personalradio-left {
      width: 40%;
      box-sizing: border-box;
      // padding: 10px;
      padding: 10px 0 0 10px;
      img {
        max-width: 100%;
      }
    }
    .personalradio-right {
      width: 60%;
      box-sizing: border-box;
      padding: 10px;
      .personal-right {
        width: 100%;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        padding: 0 0 5px 10px;
        .per-left {
          width: 67%;
          background-color: #f8f8f8;
          p {
            color: #000;
            font-size: 14px;
            padding: 10px;
          }
        }
        .per-right {
          width: 33%;
          img {
            max-width: 100%;
          }
        }
      }
    }
  }
}
</style>

