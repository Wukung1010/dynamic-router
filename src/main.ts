import './main.css'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory, RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import App from './App.vue'
import Layout from './Layout.vue'
import AppWrapper from './AppWrapper.vue'
import About from './About.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    name: 'root',
    children: [
      { path: 'app', name: 'appWrapper', component: AppWrapper, children: [] },
      { path: 'about', component: About }
    ]
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// proxy router.push
const o_push = router.push
let curApp: AppInfo | undefined
router.push = (to: RouteLocationRaw & { noApp?: boolean}) => {
  const noApp = to.noApp || false
  if (!noApp && curApp) {
    if (typeof to === 'string') {
      const next = `/app/${curApp.name}${to}`
      console.log(`rebuild route from: ${to}; to: ${next}`)
      return o_push.call(router, next)
    } else {
    }
  } else {
    return o_push.call(router, to)
  }
}

const app = createApp(App)
app.use(router).mount('#app')


interface AppInfo {
  name: string
  path: string
}
const apps: AppInfo[] = [
  { name: 'App1', path: '../App1' },
  { name: 'App2', path: '../App2' }
]
const cache = new Set()
router.beforeEach(async (to) => {
  const { fullPath } = to
  const result = fullPath.match(/\/app\/([A-Za-z0-9]*)[\/]?/)
  if (result && result[1]) {
    const appName = result[1]
    curApp = apps.find(({ name }) => name === appName)
    if (!cache.has(appName)) {
      await loadApp(appName)
      return to
    }
  } else {
    curApp = undefined
  }
})
async function loadApp(app: AppInfo | string) {
  if (typeof app === 'string') {
    const find: AppInfo | undefined = apps.find(({ name }) => name === app)
    if (!find) return
    app = find
  }
  const a = await import(app.path)
  cache.add(app.name)
  router.addRoute('appWrapper', {
    path: app.name,
    component: Promise.resolve(a),
    children: (a as any).routes || []
  })
  return a
}
async function goApp (app: AppInfo) {
  if (!cache.has(app.name)) {
    await loadApp(app)
  }
  router.push({ path: `/app/${app.name}`, noApp: true } as any)
}

export { goApp, apps }
