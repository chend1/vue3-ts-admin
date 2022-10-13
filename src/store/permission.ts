import { asyncRoutes } from '@/router'
import type { menuType } from '@/api/login/type'
interface routeType {
  path: string
  name: string
  component: any
  meta: {
    isNav: boolean
    icon: string
    title: string
  }
  children?: routeType[]
}
// 1. 将后端返回的路由列表改为一维数组方便比较，本地路由做相同处理
// 2.将两个路由列表进行对比，取交集
// 3.将判断好的路由根据本地路由规则排列好
export function generateRoutes(menuList: menuType[]) {
  // 后端路由
  const backRoute: menuType[] = []
  getRouteList(menuList, backRoute)
  // 本地路由
  const localhostRoute: routeType[] = []
  getRouteList(asyncRoutes as routeType[], localhostRoute)
  const routeList = filterRouteList(backRoute, localhostRoute)
  return accessRouteList(routeList, asyncRoutes as routeType[])
}
/**
 * @param {array} routeList 路由列表
 * @param {array} routePaths 路由地址
 */
// 获取路由访问地址列表
function getRouteList(
  routeList: routeType[] | menuType[],
  flatRouteList: routeType[] | menuType[]
) {
  routeList.forEach((route: routeType | menuType) => {
    if (route.children && route.children.length) {
      getRouteList(route.children, flatRouteList)
    }
    if ((route as routeType)['meta']) {
      ;(flatRouteList as routeType[]).push(route as routeType)
    } else {
      ;(flatRouteList as menuType[]).push(route as menuType)
    }
  })
}

/**
 * @param {array} backRoute 后端返回路由
 * @param {array} localhostRoute 本地路由
 */
// 获取路由列表
function filterRouteList(backRoute: menuType[], localhostRoute: routeType[]) {
  let routeList: menuType[] = []
  routeList = backRoute.filter((route: menuType) => {
    return isHasRoute(localhostRoute, route).result
  })
  return routeList
}
/**
 * @param {array} routeList 路由列表
 * @param {array} route 判断路由
 */
function isHasRoute(
  routeList: routeType[] | menuType[],
  route: routeType | menuType
): { result: boolean, filterRoute: routeType | menuType | null} {
  let result = false
  let filterRoute: routeType | menuType | null = null;
  routeList.forEach((item) => {
    if (item.path === route.path) {
      result = true
      filterRoute = item
    }
  })
  return { result, filterRoute }
}

/**
 * @param {array} asyncRoutes 本地路由
 * @param {array} accessRoute 可使用的路由
 */
// 排列路由列表
function accessRouteList(accessRoute: menuType[], asyncRoutes: routeType[]) {
  const list: routeType[] = []
  asyncRoutes.forEach((route: any) => {
    const { result, filterRoute } = isHasRoute(accessRoute, route)
    if (result) {
      const newRoute = Object.assign({}, route)
      newRoute.meta.title = (filterRoute as menuType).title
      newRoute.meta.icon = (filterRoute as menuType).icon
      list.push(newRoute)
      newRoute.children = []
      if (route.children && route.children.length) {
        newRoute.children = accessRouteList(accessRoute, route.children)
      }
    }
  })
  return list
}
