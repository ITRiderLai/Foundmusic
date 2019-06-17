import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { setInterval, clearInterval } from 'timers';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList: [],
    currentMusic: {},
    rotate: 0,
    rotateTimer: null,
    isPlaying: false,
    playedlist:[],
    currentuser:{},
    islogin:false,
  },
  mutations: {
   
    stopPlay (state) {
      clearInterval(state.rotateTimer)
      state.isPlaying = false
    },
    startRotate (state) {
      state.rotateTimer = setInterval(() => {
        state.rotate++
      }, 30)
    },
    emptySongList (state) {
      state.songList = []
      state.currentMusic = {}
      clearInterval(state.rotateTimer)
      state.isPlaying = false
    },
    whileLogin(state,login){
      state.islogin = login;
    },
    Logout(state){
      state.currentuser = {};
    },
    userLogin(state,{id,pwd}){
      state.currentuser.userid = id;
      state.currentuser.userpwd = pwd;
    }
    
  },
  actions: {
   
    playList ({ commit, dispatch, state }, {songIds, id}) {
    
      return new Promise((resolve, reject) => {
        state.songList = songIds
        if (songIds.indexOf(id) < 0) songIds.unshift(id)
        dispatch('play', id)
          .then(() => { resolve() })
          .catch(err => reject(err))
      })
    },
    
    play ({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        
        if (!id) {
          state.isPlaying = true
          commit('startRotate')
          return resolve()
        }
        
        if (state.isPlaying && state.currentMusic.songUrl) {
          commit('stopPlay')
        }
      
        if (id === state.currentMusic.id) {
          let songUrl = state.currentMusic.songUrl
          state.currentMusic.songUrl = ''
          setTimeout(() => {
            state.currentMusic.songUrl = songUrl
            state.isPlaying = true
          }, 20)
          return resolve()
        }
        let currentMusic = {}
        // 获取播放url
        let getUrl = axios({
          url: 'http://localhost:3000/song/url',
          method: 'get',
          params: {
            id: id
          }
        })
          .then(res => {
            
            currentMusic.songUrl = res.data.data[0].url
          })
        // 获取歌曲详情
        let getDetails = axios({
          url: 'http://localhost:3000/song/detail',
          method: 'get',
          params: {
            ids: id
          }
        })
          .then(response => {
            let samejudgement = state.playedlist.find(item => item.id == response.data.songs[0].id)
            let judgementindex = state.playedlist.indexOf(samejudgement) < 0
            if (state.playedlist.length == 0 || judgementindex) {
               state.playedlist.push({"name":response.data.songs[0].name,"id":response.data.songs[0].id})
            }
            currentMusic.songpicUrl = response.data.songs[0].al.picUrl;
            currentMusic.songcont = response.data.songs[0];
            currentMusic.single = response.data.songs[0].ar[0].name;
          })
        // 获取歌词
        let getLyric = axios({
          url: 'http://localhost:3000/lyric',
          method: 'get',
          params: {
            id: id
          }
        })
          .then(res => {
            currentMusic.lyric = res.data.lrc.lyric;

          })
          .catch(err => {})
        Promise.all([ getUrl, getDetails,getLyric ])
          .then(() => {
            state.isPlaying = true
            
            let index = state.songList.findIndex(function (songId) {
              return songId === id
            })
            if (index < 0) {
              let currentSong = state.songList.findIndex(songId => songId === state.currentMusic.id)
              state.songList.splice(currentSong, 0, id)
            }
        
            currentMusic.id = id
            state.currentMusic = currentMusic
            state.rotate = 0
            commit('startRotate')
            resolve()
          })
          .catch(err => reject(err))
      })
    },
    Login({state,commit,dispatch},{id,pwd}){
      return new Promise((resolve,reject)=>{
      axios
        .get("http://localhost:3000/login/cellphone", {
          params: {
            phone: id,
            password: pwd
          }
        })
        .then(res => {
            alert("登录成功")
            commit("whileLogin",true);
            let userid = res.data.account.id
            // dispatch("userDetail",{userid});
            resolve(dispatch("userDetail",{userid}))
        })
        .catch(error => {
          console.log(error);
        });
      })
    },
    userDetail({state,commit},{userid}){
      return new Promise((resolve,reject)=>{
        axios
        .get("http://localhost:3000/user/detail",{
          params:{
            uid:userid,
          }
        })
        .then(response => {
          //用户信息

          state.currentuser.avatarUrl = response.data.profile.avatarUrl;
          state.currentuser.nickname = response.data.profile.nickname;
          state.currentuser.level = response.data.level;
          state.currentuser.gender = response.data.profile.gender;
          state.currentuser.follows = response.data.profile.follows;
          state.currentuser.followeds = response.data.profile.followeds;
          resolve();
        })
        .catch(error => {
          console.log(error);
        });  
      }); 
    },
    prev ({ state, dispatch }) {
      let currentIndex = state.songList.findIndex(id => id === state.currentMusic.id)
      let prevIndex = currentIndex - 1
      if (prevIndex < 0) prevIndex = state.songList.length - 1
      dispatch('play', state.songList[prevIndex])
    },  

    next ({ state, dispatch }) {
      let currentIndex = state.songList.findIndex(id => id === state.currentMusic.id)
      let nextIndex = currentIndex + 1
      if (nextIndex >= state.songList.length) nextIndex = 0
      dispatch('play', state.songList[nextIndex])
    }
  }
})
