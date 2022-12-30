import * as fs from "fs-extra"
import * as path from "path"

function ext(jsx = false) {
  return fs.existsSync(path.resolve("tsconfig.json")) ? (jsx ? ".tsx" : ".ts") : ".js"
}

function getBlitzPath(type: string) {
  const appPath = `app/blitz-${type}${ext(false)}`
  const srcPath = `src/blitz-${type}${ext(false)}`
  const appDir = fs.existsSync(path.resolve(appPath))
  const srcDir = fs.existsSync(path.resolve(srcPath))

  if (appDir) {
    return appPath
  } else if (srcDir) {
    return srcPath
  }
}

function getAppSourceDir(isConfigFile?: boolean) {
  const srcPath = "src/pages"
  const srcDir = fs.existsSync(path.resolve(srcPath))

  if (srcDir || (srcDir && isConfigFile)) {
    return "src"
  } else if (!srcDir && isConfigFile) {
    return "{pages,app}"
  } else {
    return "app"
  }
}

function findPageDir() {
  const srcPagePath = `src/pages`
  const srcPage = getAppSourceDir()

  switch (srcPage) {
    case "src": {
      return srcPagePath
    }
    default: {
      return `pages`
    }
  }
}

export const paths = {
  document() {
    return `${findPageDir()}/_document${ext(true)}`
  },
  app() {
    return `${findPageDir()}/_app${ext(true)}`
  },
  appSrcDirectory({isConfig}: {isConfig?: boolean}) {
    return getAppSourceDir(isConfig)
  },
  blitzServer() {
    return getBlitzPath("server")
  },
  blitzClient() {
    return getBlitzPath("client")
  },
  entry() {
    return `${findPageDir()}/index${ext(true)}`
  },
  nextConfig() {
    return `next.config.js`
  },
  babelConfig() {
    return `babel.config.js`
  },
  packageJson() {
    return "package.json"
  },
  prismaSchema() {
    return "db/schema.prisma"
  },
}
