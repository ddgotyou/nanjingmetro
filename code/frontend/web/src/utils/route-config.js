
export function getConfigItem(configs, routeName) {
  for (let i = 0; i < configs.length; i++) {
    if (configs[i].name === routeName) {
      return configs[i]
    }
  }

  return null
}

export function configRoutes(routes, configs) {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].name) {
      const config = getConfigItem(configs, routes[i].name)
      if (config) {
        if (routes[i].meta) {
          routes[i].meta.roles = config.meta.roles
        } else {
          routes[i].meta = { roles: config.meta.roles }
        }
      } else {
        if (routes[i].meta) {
          routes[i].meta.roles = []
        } else {
          routes[i].meta = { roles: [] }
        }
      }
    }

    if (routes[i].children) {
      configRoutes(routes[i].children, configs)
    }
  }
}
