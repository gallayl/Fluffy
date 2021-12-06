import { Injector } from '@furystack/inject'
import { VerboseConsoleLogger, useLogging } from '@furystack/logging'
import { createComponent, initializeShadeRoot } from '@furystack/shades'
import { EnvironmentService } from './services/environment-service'
import { Layout } from './components/layout'

const shadeInjector = new Injector()

useLogging(shadeInjector, VerboseConsoleLogger)
shadeInjector.setExplicitInstance(
  {
    nodeEnv: process.env.NODE_ENV as 'development' | 'production',
    buildDate: new Date(process.env.BUILD_DATE as string),
    site: process.env.SITE || window.location.host,
  },
  EnvironmentService,
)

const rootElement: HTMLDivElement = document.getElementById('root') as HTMLDivElement
initializeShadeRoot({
  rootElement,
  injector: shadeInjector,
  jsxElement: <Layout />,
})
