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

export const paths = {
  document() {
    return `pages/_document${ext(true)}`
  },
  app() {
    return `pages/_app${ext(true)}`
  },
  blitzServer() {
    return getBlitzPath("server")
  },
  blitzClient() {
    return getBlitzPath("client")
  },
  entry() {
    return `pages/index${ext(true)}`
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
