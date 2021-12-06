import { Injectable, Injector } from '@furystack/inject'
import { NotyService } from '@furystack/shades-common-components'
import { ObservableValue } from '@furystack/utils'
import { getLogger, ScopedLogger } from '@furystack/logging'

const localStorageKey = 'FLEA_SETTINGS'

export interface ClientSettingsValues {
  throttleSensitivity: number
  steerSensitivity: number
  lookSensitivity: number
}

export const defaultSettings: ClientSettingsValues = {
  throttleSensitivity: 20,
  steerSensitivity: 20,
  lookSensitivity: 20,
}

@Injectable({ lifetime: 'singleton' })
export class ClientSettings {
  currentSettings = new ObservableValue<ClientSettingsValues>(defaultSettings)

  logger: ScopedLogger

  private initConfig() {
    const settings = localStorage.getItem(localStorageKey)
    try {
      const value = JSON.parse(settings || '')
      this.currentSettings.setValue({ ...this.currentSettings.getValue(), ...value })
    } catch (error) {
      this.logger.warning({ message: 'Failed to parse stored settings. Resetting to defaults...' })
      localStorage.removeItem(localStorageKey)
    }
  }

  constructor(injector: Injector) {
    this.logger = getLogger(injector).withScope('ClientSettings')
    this.initConfig()
    this.currentSettings.subscribe((change) => {
      localStorage.setItem(localStorageKey, JSON.stringify(change))
      injector.getInstance(NotyService).addNoty({ type: 'success', title: 'Success', body: 'Configuration saved' })
    })
  }
}
