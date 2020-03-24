import { wapService } from '../services/wap.service.js'
import cloudinaryService from "../services/cloudinary.service.js";

export default ({
  state: {
    waps: [],
    wap: {},
    selectedCmp: {},
  },
  getters: {
    getWap(state) {
      return state.wap;
    },
    getSelectedCmp(state) {
      return state.selectedCmp
    },
    getWapTheme(state) {
      return state.wap.theme;
    }
  },
  mutations: {

    setWaps(state, { waps }) {
      state.waps = waps
    },
    setWap(state, { wap }) {
      state.wap = wap
    },
    addCmp(state, { addedCmp }) {
      state.wap.cmps.push(addedCmp)
    },
    updateWap(state, { updatedCmp }) {
      const idx = state.wap.cmps.findIndex(currCmp => currCmp.id === updatedCmp.id)
      state.wap.cmps.splice(idx, 1, updatedCmp)
    },
    removeCmp(state, { cmp }) {
      const idx = state.wap.cmps.findIndex(currCmp => currCmp.id === cmp.id)
      state.wap.cmps.splice(idx, 1)
    },
    setSelectedCmp(state, { cmp }) {
      state.selectedCmp = cmp
    },
		changeWapTheme(state, { theme }) {
      state.wap.theme = theme
    },
		changeWapTitle(state, { title }) {
      state.wap.title = title
    },
    updatePos(state, { updatedPos }) {
      const idx = state.wap.cmps.findIndex(cmp => cmp.id === updatedPos.cmp.id)
      if (idx + updatedPos.diff > 0 || idx + updatedPos.diff < state.wap.cmps.length)
        state.wap.cmps.splice(idx, 1)
      state.wap.cmps.splice(idx + updatedPos.diff, 0, updatedPos.cmp)
    }
  },
  actions: {
    async loadWaps(context) {
      const waps = await wapService.query()
      console.log(wap)
      context.commit({ type: 'setWaps', waps })
      return waps
    },
    async loadWap(context) {
      const wap = await wapService.getById('5e7a76591c9d440000f4b6fb')
      console.log(wap)
      context.commit({ type: 'setWap', wap })
      return wap
    },
    async updateCmp(context, { cmp }) {
      const cmpCopy = JSON.parse(JSON.stringify(cmp))
      const wapCopy = JSON.parse(JSON.stringify(context.state.wap))
      const wap = await wapService.updateWap(wapCopy, cmpCopy)
      context.commit({
        type: 'setWap',
        wap
      })
    },
    async uploadImg(context, { ev }) {
      context.commit({ type: 'setInProgress', inProgress: true })
      const res = await cloudinaryService.uploadImg(ev);
      context.commit({ type: 'setInProgress', inProgress: false })
      const { url } = res;
      return (url) ? url : "http://res.cloudinary.com/omer1234/image/upload/v1584998858/li0hhzwliqjrqcqv2coz.jpg";
    },
    async addCmp(context, { cmp }) {
      var addedCmp = JSON.parse(JSON.stringify(cmp))
      addedCmp.id = await wapService.makeId();
      context.commit({
        type: 'addCmp',
        addedCmp
      })
    },

    async saveWap(context) {
      context.commit({ type: 'setInProgress', inProgress: true })
      await wapService.update(context.state.wap)
      context.commit({ type: 'setInProgress', inProgress: false })
    },
  },
})