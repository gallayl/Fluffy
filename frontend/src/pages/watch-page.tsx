import { NippleComponent } from '@furystack/shades-nipple'
import { JoystickOutputData } from 'nipplejs'
import { Shade, createComponent } from '@furystack/shades'
import { LookService } from '../services/look-service'
import { ClientSettings } from '../services/client-settings'
export const WatchPage = Shade<
  unknown,
  {
    lookService: LookService
    updateInterval: ReturnType<typeof setInterval>
    sendData?: JoystickOutputData
  }
>({
  getInitialState: ({ injector }) => ({
    lookService: injector.getInstance(LookService),
    updateInterval: setInterval(() => {
      /** */
    }, 100),
  }),
  constructed: ({ updateState, getState, injector }) => {
    clearInterval(getState().updateInterval) // clear initial
    updateState({
      updateInterval: setInterval(() => {
        const { sendData } = getState()
        if (sendData && sendData.angle) {
          const sensitivity = injector.getInstance(ClientSettings).currentSettings.getValue().lookSensitivity
          const pitch = Math.cos(sendData.angle.radian) * sendData.force * sensitivity
          const yaw = Math.sin(sendData.angle.radian) * sendData.force * sensitivity
          getState().lookService.lookAt(pitch, yaw)
          updateState({ sendData: undefined }, true)
        }
      }, 100),
    })
    return () => clearInterval(getState().updateInterval)
  },
  render: ({ updateState, injector }) => {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <NippleComponent
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
          managerOptions={{
            mode: 'static',
            position: { left: '50%', top: '50%' },
            color: 'red',
          }}
          onEnd={(_ev, data) => {
            injector.getInstance(LookService).release()
            updateState({ sendData: data }, true)
          }}
          onMove={(_ev, data) => {
            updateState({ sendData: data }, true)
          }}
        />
      </div>
    )
  },
})
