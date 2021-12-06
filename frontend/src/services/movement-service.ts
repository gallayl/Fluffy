import { Injectable, Injector } from '@furystack/inject'
import { ObservableValue } from '@furystack/utils'
import { getLogger, ScopedLogger } from '@furystack/logging'
import Semaphore from 'semaphore-async-await'
import { JoystickOutputData } from 'nipplejs'
import { ClientSettings } from './client-settings'

@Injectable({ lifetime: 'singleton' })
export class MovementService {
  private logger: ScopedLogger
  private lock = new Semaphore(1)

  public async stop() {
    fetch('/api/stop', { method: 'POST' })
    try {
      await this.lock.acquire()
      await fetch('/api/stop', { method: 'POST' })
    } finally {
      this.lock.release()
    }
    this.logger.verbose({ message: 'Stopped' })
  }

  public readonly leftSpeed = new ObservableValue(0)
  public readonly rightSpeed = new ObservableValue(0)
  public readonly frontDistance = new ObservableValue(0)

  public async move(data: JoystickOutputData): Promise<void> {
    if (!data.angle) {
      return
    }
    try {
      await this.lock.acquire()
      const { force } = data

      const steer = -Math.round(
        Math.cos(data.angle.radian - Math.PI) * this.settings.currentSettings.getValue().steerSensitivity * force,
      )
      const speed = -Math.round(
        Math.sin(data.angle.radian - Math.PI) * this.settings.currentSettings.getValue().throttleSensitivity * force,
      )

      await fetch('/api/move', { method: 'POST', body: JSON.stringify({ speed, steer }) })
    } finally {
      this.lock.release()
    }
  }

  constructor(private readonly settings: ClientSettings, injector: Injector) {
    this.logger = getLogger(injector).withScope('MovementService')
  }
}
