<template>
<div  :class="isgetfrom == true ? 'jdbox active':'jdbox'">
  <div class="jd" :style="isgetfrom == true ? 'overflow:visible':'overflow:hidden'">
    <div class="header-top">
      <div class="header-title">
        <router-link class="header-item" :style="isgetfrom == true ?'opacity:0':'opacity:1'" v-for="(item, index) in tabs" :key="index" :to="item.path">{{item.title}}</router-link>
        <!-- <div  :class="[item.isActive? 'titlestyle':'']" v-for="(item, index) in tabs" :key="index" v-on:click="goclick(item)">{{item.title}}</div> -->
      </div>
    </div>
    <div class="inputbox">
      <input type="text" placeholder="搜索" @focus='getFocus' v-model="searchmsg" :style="isgetfrom == true ? 'margin:0 10px;width:80%;':'margin:0 auto'">
      <div  :class="isgetfrom == true ? 'inputtext active':'inputtext'" @click="isgetfrom=false">取消</div>
      <ul class="searchlist" v-if="isgetfrom">
        <li v-for="(item, index) in searchlistmsg" :key="index" @click="searchSong(item.id)">
              <p>{{item.name}}</p>
        </li>
      </ul>
    </div>

  </div>
  <router-view></router-view>
</div>
</template>

<script>
let _ = require("lodash");
export default {
  name: "jd",
  data() {
    return {
      isgetfrom: false,
      searchmsg: "",
      searchlistmsg:'',
      tabs: [
        { title: "推荐", path: "/musicmaster" },
        { title: "热门歌手", path: "/mine" },
        { title: "我的", path: "/found" }
      ]
    };
  },
  watch: {
    searchmsg: function() {
      this.debounded();
    }
  },
  created: function() {
    this.debounded = _.debounce(this.getSearch, 500);
    if (!this.$store.state.islogin) {
      this.tabs[this.tabs.length-1].path = '/login'
      console.log(this.tabs[this.tabs.length-1].path)
    }
  },
  methods: {
    goclick(item) {
      if (item.isActive) {
        return;
      }
      for (var i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].isActive) {
          this.tabs[i].isActive = false;
          break;
        }
      }
      item.isActive = true;
      this.$router.push(item.path);
    },
    getFocus() {
      this.isgetfrom = true;
    },
    getSearch() {
      axios
        .get(
          "http://localhost:3000/search",
          {
            params: {
              keywords: this.searchmsg
            }
          }
        )
        .then(response => {
          this.searchlistmsg = response.data.result.songs
          console.log(this.searchlistmsg)
        })
        .catch(function(error) {});
    },
    searchSong(id){
       this.$store.commit('emptySongList')
       let ids = this.searchlistmsg.map(song => song.id)
       this.$store.dispatch('playList', { songIds: ids, id: id })
      console.log(ids)
    }
  }
};
</script>

<style scoped lang='less'>
.jdbox {
  width: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s;
  
  &.active {
    position: relative;
    top: -34px;
  }
  .jd {
    background-color: #30c27c;
    font-size: 18px;
    font-family: "黑体";
    padding-bottom: 6px;
    width: 100%;
    .header-top {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      .header-nav {
        padding-left: 10px;
        color: white;
      }
      .header-title {
        margin: 0 auto;
        .header-item {
          display: inline-block;
          padding: 0 10px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.6s;
        }
        .router-link-active {
          color: white;
        }
        .titlestyle {
          color: white;
        }
      }
      .header-plus {
        padding-right: 10px;
        color: white;
      }
    }

    input {
      width: 95%;
      display: block;
      margin: 0 auto;
      height: 25px;
      background-color: rgba(0, 0, 0, 0.2);
      outline: none;
      border: none;
      color: white;
      transition: all 0.6s;
      &::-webkit-input-placeholder {
        color: white;
        text-align: center;
      }
    }
  }
  .inputbox {
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    .inputtext {
      position: absolute;
      // left: 50px;
      right: -40px;
      font-size: 14px;
      color: white;
      line-height: 25px;
      // margin: 0 auto;
      opacity: 0;
      transition: all 0.6s;

      &.active {
        right: 18px;
        opacity: 1;
      }
    }
    .searchlist {
      margin: 0;
      padding: 0;
      position: absolute;
      z-index: 2;
      top: 32px;
      width: 100%;
      // height: 100%;
      background-color: white;
      li {
        list-style: none;
        // line-height: 50px;
        font-size: 16px;
        font-family: Helvetica;
        // font-style: ;
        font-weight: 200;
        color: #333;
        display: flex;
        flex-direction: row;
        p{
          padding-left: 10px;
          margin: 0;
          line-height: 50px;
          width: 100%;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>



