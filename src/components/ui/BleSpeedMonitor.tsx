'use client'

import { useState } from 'react'

const SERVICE_UUID = '1101'
const CHAR_UUID    = '2101'

export default function BleSpeedMonitor() {
  const [speed, setSpeed]       = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [device, setDevice]       = useState<BluetoothDevice | null>(null)

  async function connectBLE() {
    try {
      const dev = await navigator.bluetooth.requestDevice({
        filters: [{ services: [SERVICE_UUID] }],
      })
      setDevice(dev)

      const server  = await dev.gatt!.connect()
      const service = await server.getPrimaryService(SERVICE_UUID)
      const char    = await service.getCharacteristic(CHAR_UUID)

      await char.startNotifications()
      char.addEventListener('characteristicvaluechanged', onSpeedChanged)

      setConnected(true)
    } catch (err: unknown) {
      // eslint-disable-next-line no-console
      console.error('BLE connection failed', err)
      alert('BLE error: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  function onSpeedChanged(event: Event) {
    const char = event.target as BluetoothRemoteGATTCharacteristic
    const value = char.value!
    const text = new TextDecoder().decode(value)
    const n = parseFloat(text)
    if (!Number.isNaN(n)) setSpeed(n.toFixed(1))
  }

  function disconnect() {
    if (device?.gatt?.connected) device.gatt.disconnect()
    setConnected(false)
    setSpeed(null)
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      {connected ? (
        <>
          <h3 className="text-xl mb-2">Peak Speed</h3>
          <p className="text-4xl font-bold">{speed ?? '–––'} mph</p>
          <button onClick={disconnect} className="mt-4 btn-red">
            Disconnect
          </button>
        </>
      ) : (
        <button onClick={connectBLE} className="btn-blue">
          Connect to PowerBand
        </button>
      )}
    </div>
  )
}

