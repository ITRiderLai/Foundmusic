<template>
  <div class="about">
    <div class="singer" v-for="(item, index) in singerTabs" :key="index" v-on:click="handle(item.id)">
      <div class="singer-left">
        <img :src="item.img1v1Url" alt="">
      </div>
      <div class="singer-right">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      singerTabs: []
    };
  },
  methods: {
    handle(id) {
      this.$router.push({ name: "singerList", query: { id: id } });
    }
  },
  created() {
    axios
      .get("http://localhost:3000/top/artists?offset=0&limit=30")
      .then(response => {
        var arr = response.data.artists;

        this.singerTabs = arr;
        // console.log(arr);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped lang='less'>
body {
  background-color: #f4f4f4;
}
.singer {
  width: 95%;

  margin: 0 auto;
  background-color: white;
  margin-top: 10px;
  display: flex;
  .singer-left {
    width: 25%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .singer-right {
    width: 75%;
    padding: 10px;

  }
}
</style>

