import { NippleComponent } from '@furystack/shades-nipple'
import { JoystickOutputData } from 'nipplejs'
import { Shade, createComponent } from '@furystack/shades'
import { MovementService } from '../services/movement-service'
export const JoystickPage = Shade<
  unknown,
  {
    movementService: MovementService
    updateInterval: ReturnType<typeof setInterval>
    sendData?: JoystickOutputData
    isLookActive: boolean
  }
>({
  getInitialState: ({ injector }) => ({
    movementService: injector.getInstance(MovementService),
    isLookActive: false,
    updateInterval: setInterval(() => {
      /** */
    }, 100),
  }),
  constructed: ({ updateState, getState }) => {
    clearInterval(getState().updateInterval) // clear initial
    updateState({
      updateInterval: setInterval(() => {
        const { sendData } = getState()
        if (sendData) {
          getState().movementService.move(sendData)
          updateState({ sendData: undefined }, true)
        }
      }, 100),
    })
    return () => clearInterval(getState().updateInterval)
  },
  render: ({ updateState, getState }) => {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <NippleComponent
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
          managerOptions={{}}
          onEnd={(_ev, data) => {
            getState().movementService.stop()
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
