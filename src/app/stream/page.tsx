// src/app/stream/page.tsx
'use client'
/// <reference types="web-bluetooth" />

import React, { useState, useRef } from 'react'

export default function StreamPage() {
  const [status, setStatus] = useState('Idle')
  const logRef = useRef<HTMLDivElement>(null)

  const SERVICE_UUID = '00001101-0000-1000-8000-00805f9b34fb'
  const CHAR_UUID    = '00002101-0000-1000-8000-00805f9b34fb'
  const DB_ENDPOINT  = '/api/imu'

  const appendLog = (msg: string) => {
    if (!logRef.current) return
    logRef.current.textContent += msg + '\n'
    logRef.current.scrollTop = logRef.current.scrollHeight
  }

  async function startStream() {
    try {
      setStatus('Requesting device…')
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'NanoIMU' }],
        optionalServices: [SERVICE_UUID]
      })

      setStatus('Connecting…')
      const server  = await device.gatt!.connect()
      setStatus('Getting service…')
      const service = await server.getPrimaryService(SERVICE_UUID)
      setStatus('Getting characteristic…')
      const ch      = await service.getCharacteristic(CHAR_UUID)

      setStatus('Starting notifications…')
      await ch.startNotifications()
      ch.addEventListener('characteristicvaluechanged', handleNotify)

      setStatus('Streaming…')
    } catch (e: any) {
      setStatus('Error: ' + e.message)
    }
  }

  async function handleNotify(e: Event) {
    const ch   = e.target as BluetoothRemoteGATTCharacteristic
    const raw  = new TextDecoder().decode(ch.value!).trim()
    appendLog(`RX: ${raw}`)

    const parts = raw.split(',').map(s => s.trim())
    if (parts.length < 10) return

    const payload = {
      ax: parseFloat(parts[0]),
      ay: parseFloat(parts[1]),
      az: parseFloat(parts[2]),
      gx: parseFloat(parts[3]),
      gy: parseFloat(parts[4]),
      gz: parseFloat(parts[5]),
      mx: parseFloat(parts[6]),
      my: parseFloat(parts[7]),
      mz: parseFloat(parts[8]),
      counter: parseInt(parts[9], 10),
    }

    try {
      const r = await fetch(DB_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      appendLog(`→ DB: ${r.status}`)
    } catch (err: any) {
      appendLog(`DB error: ${err.message}`)
    }
  }

  return (
    <main style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>Powerband IMU Stream</h1>
      <button onClick={startStream} disabled={status === 'Streaming…'}>
        Connect & Start
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
