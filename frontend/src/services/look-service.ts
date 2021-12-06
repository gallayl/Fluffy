import { Injectable } from '@furystack/inject'

@Injectable({ lifetime: 'singleton' })
export class LookService {
  public lookAt(pitch: number, yaw: number) {
    fetch('/api/pwmdegree', { method: 'POST', body: JSON.stringify({ channel: 15, value: Math.round(90 - pitch) }) })
    fetch('/api/pwmdegree', { method: 'POST', body: JSON.stringify({ channel: 14, value: Math.round(90 - yaw) }) })
  }

  public release() {
    fetch('/api/pwmdegree', { method: 'POST', body: JSON.stringify({ channel: 15, value: Math.round(90) }) })
    fetch('/api/pwmdegree', { method: 'POST', body: JSON.stringify({ channel: 14, value: Math.round(90) }) })
  }
}
