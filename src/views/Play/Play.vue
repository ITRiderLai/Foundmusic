<template>
    <div id="play">
         <div class="playbox" :class="{ active: active }">
              <div class="audio" v-on:click="active = !active">
                <div class="a-s-b">
                  <div class="a-s">
                    <img :src="currentMusic.songpicUrl" alt="">
                  </div>
                  <div class="a-f">
                    <div class="a-f-t">{{currentMusic.songcont && currentMusic.songcont.name}}</div>
                    <div class="a-f-b">{{currentMusic.single}}</div>
                  </div>
                  <div class="a-f-r">
           
                      <img src="../../assets/img/left.png" alt="" @click="prevBtn" style="width:1rem;height:1rem">
                   
  
                      <img src="../../assets/img/play.png" alt="" @click="togglePlayer" v-if="!$store.state.isPlaying">
                      <img src="../../assets/img/playing.png" alt="" v-else  @click="togglePlayer">
 

                      <img src="../../assets/img/right.png" alt="" @click="nextBtn" style="width:1rem;height:1rem">

               
                      <div class="listicon" @click="toggleList">
                        <img src="../../assets/img/playlist.png" alt=""  style="width:1rem;height:1rem">
                      </div>
                 
                  </div>
                </div>
                <audio ref="player" :src="playMusic" @ended="handleEnded" id="au"></audio>
                <ul :class="togglelist == false ? 'listbox':'listbox active'">
                  <li>播放完列表</li>
                  <li v-for="(item, index) in $store.state.playedlist" :key="index" @click="playList(item.id)">{{item.name}}</li>
                </ul>
              </div>
              <div class="audiocont" :style="`background-image : url(${currentMusic.songpicUrl} )`">
                <div class="a-c-box">
                  <div class="a-c-bg" @click="togglePlayer">
                    <img :src="currentMusic.songpicUrl" :style="{ transform: `rotate(${$store.state.rotate}deg)` }" alt="" class="img1">
                    <div class="songicon">
                      <img src="../../assets/img/songplay.png" alt="" v-if="!$store.state.isPlaying">
                    </div>
                  </div>
                </div>
                
                <Scroll ref="lyricScroll" class="middle-r" :data="songparser && currentLryic">
                  <div class="lyric-wrapper">
                    <div v-if="songparser && currentLryic">
                      <p ref="lyricLine" class="txt"
                        :class="{'current':currentLineNum === index}"
                        v-for="(line,index) in currentLryic" :key="index">
                        {{ line.txt }}</p>
                    </div>
                  </div>
                </Scroll>
              </div>
         </div>
    </div>
</template>

<script>
import Scroll from '../../components/scroll';
import LyricParser from 'lyric-parser';
export default {
  name: "play",
  props: {
    id: ""
  }, 
  components: {
      Scroll
  },
  data() {
    return {
      active: false,
      togglelist: false,
      songparser:null,
      currentLryic:null,
      currentLineNum:null
    };
  },
  mounted() {
  },

  computed: {
    currentMusic() {
      return this.$store.state.currentMusic;
    },
    playMusic(){
      return this.$store.state.currentMusic.songUrl;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    playLyric(){
      return this.$store.state.currentMusic.lyric
    }
  },
  watch: {
    active(newVal, oldVal) {
      document.body.style.overflow = newVal ? "hidden" : "";
    },
    isPlaying(newVal, oldVal) {
      if (newVal === true) {
        this.$nextTick(() => {
          this.$refs.player.play();
        });
        return;
      }
        this.$refs.player.pause();
    },
    playLyric(newVal, oldVal){
      if (typeof(this.playLyric) != 'string') {
        return
      }
      //切歌时判断是否先存在歌词对象
      if (this.songparser) {
        this.songparser.stop();
      }
      this.songparser = new LyricParser(newVal,({lineNum, txt})=>{
        this.currentLineNum = lineNum
        // 若当前行大于5,开始滚动,以保歌词显示于中间位置
        if (lineNum>2) {
           let lineEl = this.$refs.lyricLine[lineNum-2]
            // 结合better-scroll，滚动歌词
           this.$refs.lyricScroll.scrollToElement(lineEl, 1000)
        } else {
          this.$refs.lyricScroll.scrollTo(0, 0, 1000)
        }
      })
      this.currentLryic = this.songparser.lines;
      if (this.$store.state.isPlaying) {
         this.songparser.play();
      }
    },
  },
  methods: {
    togglePlayer(e) {
      e.stopPropagation();
      if (this.$store.state.isPlaying) {
        this.$store.commit("stopPlay");
      } else {
        this.$store.dispatch("play");
      }
      if (this.songparser) {
        this.songparser.togglePlay();
      }
    },
    handleEnded(e) {
      this.$store.dispatch("next");
    },
    nextBtn(e) {
      e.stopPropagation();
      this.$store.dispatch("next");
    },
    prevBtn(e) {
      e.stopPropagation();
      this.$store.dispatch("prev");
    },
    toggleList(e) {
      e.stopPropagation();
      if (this.togglelist) {
        this.togglelist = false;
      } else {
        this.togglelist = true;
      }
    },
    playList(id) {
       var event = window.event||arguments[0];
      event.stopPropagation();
      this.$store.dispatch('play', id);
    }
  }
};
</script>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
.playbox {
  width: 100%;
  position: fixed;
  top: 92%;
  // bottom: -93%;
  z-index: 5;
  transition: all 1s;

  .audio {
    width: 100%;
    height: 50px;
    background-color: #f8f8f8;
    position: relative;
    top: 0;
    left: 0;
    .a-s-b {
      height: 50px;
      display: flex;
      flex-direction: row;
      .a-s {
        width: 15%;
        // padding: 5px 10px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        box-sizing: border-box;

        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
      }
      .a-f {
        width: 50%;
        .a-f-t {
          font-size: 14px;
          padding-top: 8px;
        }
        .a-f-b {
          font-size: 10px;
          color: #666;
        }
      }
      .a-f-r {
        width: 35%;
        display: flex;
        align-items: center;
        justify-content: center;
        justify-content: space-around;
        img {
          width: 1.5rem;
          height: 1.5rem;
        }
        .listicon{
          width: 1rem;
          height: 1rem;
        }
      }
    }
    .listbox {
      width: 100%;
      height: 400px;
      background-color: rgba(248, 248, 248, 0.98);  
      color: #666;
      position: absolute;
      top: 0;
      left: 0;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      overflow: scroll;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      z-index: -1;
      transition: all 0.6s;
      li {
        line-height: 45px;
        list-style: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding-left: 20px;
      }
      &.active {
        top: -400px;
      }
    }
  }
  .audiocont {
    width: 100%;
    height: 800px;
    // height: 100%;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    // filter: blur(10px);
    .a-c-box {
      width: 250px;
      height: 250px;

      margin: 0 auto;
      // padding-top: 80px;
      padding-top: 50px;
      padding-bottom: 20px;
      .a-c-bg {
        width: 100%;
        height: 100%;
        // background-color: black;
        background-image: url(../../assets/img/disc-ip6.png);
        background-size: cover;
        margin: 0 auto;
        position: relative;

        .img1 {
          width: 70%;
          height: 70%;
          border-radius: 50%;
          margin-top: 38px;
          margin-left: 38px;
          transform: rotateZ(45deg);
        }
        .songicon {
          width: 60px;
          height: 60px;
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translateX(-50%);
          // transform: translateY(-50%);

          img {
            max-width: 100%;
          }
        }
      }
    }
    &:before {
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
    }
  }
  &.active {
    width: 100%;
    position: fixed;
    height: 100%;
    top: 0;
    z-index: 5;
    // background-color: green;
  }
}
.middle-r{
   display: inline-block;
   vertical-align: top;
   width: 100%;
   height: 20%;
   overflow: hidden;
   .lyric-wrapper{
     width: 80%;
     margin: 0 auto;
     overflow: hidden;
     text-align: center;
     .txt{
       line-height: 32px;
       color: rgba(255, 255, 255, 0.5);
       font-size: 14px;
       &.current{
         color: #fff;
       }
     }
   }
}
</style>


