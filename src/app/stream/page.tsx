/// <reference types="web-bluetooth" />
'use client'

import React, { useState, useRef, useEffect } from 'react'

export default function StreamPage() {
  const [status, setStatus] = useState('Idle')
  const logRef = useRef<HTMLDivElement>(null)
  const [device, setDevice] = useState<BluetoothDevice | null>(null)
  const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null)

  // Nordic UART Service UUID
  const SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
  const DB_ENDPOINT  = '/api/imu'

  const appendLog = (msg: string) => {
    if (!logRef.current) return
    logRef.current.textContent += msg + '\n'
    logRef.current.scrollTop = logRef.current.scrollHeight
  }

  // Dynamically find the first notify-capable characteristic
  async function findNotifyChar(service: BluetoothRemoteGATTService) {
    const chars = await service.getCharacteristics()
    const notifyChar = chars.find(c => c.properties.notify)
    return notifyChar?.uuid || null
  }

  async function startStream() {
    try {
      setStatus('Requesting device…')
      const dev = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [SERVICE_UUID]
      })
      setDevice(dev)

      setStatus('Connecting…')
      const server = await dev.gatt!.connect()

      setStatus('Getting service…')
      const service = await server.getPrimaryService(SERVICE_UUID)

      setStatus('Finding notify characteristic…')
      const notifyUuid = await findNotifyChar(service)
      if (!notifyUuid) throw new Error('No notify characteristic found')

      setStatus('Getting characteristic…')
      const ch = await service.getCharacteristic(notifyUuid)
      setCharacteristic(ch)

      setStatus('Starting notifications…')
      await ch.startNotifications()
      ch.addEventListener('characteristicvaluechanged', handleNotify)

      setStatus(`Streaming from ${dev.name || dev.id}`)
    } catch (e: any) {
      setStatus('Error: ' + e.message)
    }
  }

  async function handleNotify(e: Event) {
    const ch = e.target as BluetoothRemoteGATTCharacteristic
    const raw = new TextDecoder().decode(ch.value!).trim()
    appendLog(`RX: ${raw}`)

    const parts = raw.split(',').map(s => s.trim())
    if (parts.length < 10) return

    const payload = {
      ax: parseFloat(parts[0]), ay: parseFloat(parts[1]), az: parseFloat(parts[2]),
      gx: parseFloat(parts[3]), gy: parseFloat(parts[4]), gz: parseFloat(parts[5]),
      mx: parseFloat(parts[6]), my: parseFloat(parts[7]), mz: parseFloat(parts[8]),
      counter: parseInt(parts[9], 10)
    }

    try {
      const res = await fetch(DB_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      appendLog(`→ DB: ${res.status}`)
    } catch (err: any) {
      appendLog(`DB error: ${err.message}`)
    }
  }

  useEffect(() => {
    return () => {
      if (characteristic) {
        characteristic.removeEventListener('characteristicvaluechanged', handleNotify)
      }
      if (device?.gatt?.connected) {
        device.gatt.disconnect()
      }
    }
  }, [device, characteristic])

  return (
    <main style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>Powerband IMU Stream</h1>
      <button onClick={startStream} disabled={status.startsWith('Streaming')}>
        {status.startsWith('Streaming') ? 'Streaming…' : 'Connect & Start'}
      </button>
      <p>Status: {status}</p>
      <div
        ref={logRef}
        style={{
          marginTop: 16,
          padding: 8,
          background: '#f5f5f5',
          height: 300,
          overflowY: 'auto',
          whiteSpace: 'pre-wrap'
        }}
      />
    </main>
  )
}
