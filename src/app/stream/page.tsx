/// <reference types="web-bluetooth" />
'use client'

import React, { useState, useRef, useEffect } from 'react'

export default function StreamPage() {
  const [status, setStatus] = useState('Idle')
  const logRef = useRef<HTMLDivElement>(null)
  const [device, setDevice] = useState<BluetoothDevice | null>(null)
  const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null)

  // Potential UART Service UUIDs (Nordic NUS + Arduino BLE example)
  const SERVICE_UUIDS = [
    '6e400001-b5a3-f393-e0a9-e50e24dcca9e',       // Nordic UART Service
    '19b10000-e8f2-537e-4f6c-d104768a1214'        // Arduino example UART
  ]
  const DB_ENDPOINT = '/api/imu'

  const appendLog = (msg: string) => {
    if (!logRef.current) return
    logRef.current.textContent += msg + '\n'
    logRef.current.scrollTop = logRef.current.scrollHeight
  }

  // Handle GATT disconnects and log
  function handleDisconnect() {
    appendLog('⚠️ Device disconnected')
    setStatus('Disconnected')
  }

  // Dynamically find notify characteristic
  async function findNotifyChar(service: BluetoothRemoteGATTService) {
    const chars = await service.getCharacteristics()
    const notifyChar = chars.find(c => c.properties.notify)
    return notifyChar?.uuid || null
  }

  async function startStream() {
    if (!navigator.bluetooth) {
      setStatus(
        'Web Bluetooth API not supported. Use Chrome (Desktop/Android) or iOS Safari 16.4+'
      )
      return
    }

    try {
      setStatus('Requesting device…')
      const dev = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: SERVICE_UUIDS
      })
      setDevice(dev)
      dev.addEventListener('gattserverdisconnected', handleDisconnect)

      setStatus('Connecting…')
      const server = await dev.gatt!.connect()

      // Try each service UUID until one succeeds
      let service: BluetoothRemoteGATTService | null = null
      for (const uuid of SERVICE_UUIDS) {
        try {
          service = await server.getPrimaryService(uuid)
          appendLog(`🔍 Found service ${uuid}`)
          break
        } catch (_) {
          // not advertising this service, continue
        }
      }
      if (!service) throw new Error('No supported UART service found')

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
      setStatus('Error: ' + (e.message || e))
      appendLog(`❌ ${e}`)
    }
  }

  async function handleNotify(e: Event) {
    const ch = e.target as BluetoothRemoteGATTCharacteristic
    const raw = new TextDecoder().decode(ch.value!).trim()
    appendLog(`RX: ${raw}`)

    const parts = raw.split(',').map(s => s.trim())
    if (parts.length < 9) return

    const payload = {
      ax: parseFloat(parts[0]), ay: parseFloat(parts[1]), az: parseFloat(parts[2]),
      gx: parseFloat(parts[3]), gy: parseFloat(parts[4]), gz: parseFloat(parts[5]),
      mx: parseFloat(parts[6]), my: parseFloat(parts[7]), mz: parseFloat(parts[8]),
      // optional counter if present
      ...(parts.length >= 10 && { counter: parseInt(parts[9], 10) })
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (characteristic) {
        characteristic.removeEventListener('characteristicvaluechanged', handleNotify)
      }
      if (device) {
        device.removeEventListener('gattserverdisconnected', handleDisconnect)
        if (device.gatt?.connected) device.gatt.disconnect()
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
