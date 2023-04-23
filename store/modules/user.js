import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import { login, logout, getInfo, getDict } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const baseUrl = config.baseUrl

const user = {
  state: {
    token: getToken(),
    name: storage.get(constant.name),
    avatar: storage.get(constant.avatar),
    roles: storage.get(constant.roles),
    permissions: storage.get(constant.permissions),
    dicts: storage.get(constant.dicts)
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
      storage.set(constant.name, name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      storage.set(constant.avatar, avatar)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      storage.set(constant.roles, roles)
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
      storage.set(constant.permissions, permissions)
    },
    SET_DICTS: (state, dicts) => {
      state.dicts = dicts
      storage.set(constant.dicts, dicts)
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      userInfo.username = userInfo.username.trim()
      userInfo.password = userInfo.password
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          setToken(res.data.Authorization)
          commit('SET_TOKEN', res.data.Authorization)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.user
          const avatar = (user == null || user.avatar == "" || user.avatar == null) ? require("@/static/images/profile.jpg") : baseUrl + user.avatar
          const username = (user == null || user.username == "" || user.username == null) ? "" : user.username
          if (res.roles && res.roles.length > 0) {
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', username)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取字典信息
    GetDict({ commit, state }) {
      return new Promise((resolve, reject) => {
        getDict().then(res => {
          const dicts = res.data
          commit('SET_DICTS', dicts)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
		commit('SET_TOKEN', '')
		commit('SET_ROLES', [])
		commit('SET_PERMISSIONS', [])
		removeToken()
		storage.clean()
		resolve()
      })
    }
  }
}

export default user
