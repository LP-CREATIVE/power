// src/components/ui/BleSpeedMonitor.tsx
import React, { useState } from 'react';

const SERVICE_UUID = '1101';
const CHAR_UUID    = '2101';

export default function BleSpeedMonitor() {
  const [speed, setSpeed] = useState<string| null>(null);
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState<BluetoothDevice | null>(null);

  async function connectBLE() {
    try {
      const dev = await navigator.bluetooth.requestDevice({
        filters: [{ services: [SERVICE_UUID] }]
      });
      setDevice(dev);
      const server  = await dev.gatt!.connect();
      const service = await server.getPrimaryService(SERVICE_UUID);
      const char    = await service.getCharacteristic(CHAR_UUID);
      await char.startNotifications();
      char.addEventListener('characteristicvaluechanged', onSpeedChanged);
      setConnected(true);
    } catch (e: any) {
      console.error(e);
      alert('BLE error: ' + e.message);
    }
  }

  function onSpeedChanged(e: Event) {
    const val = (e.target as BluetoothRemoteGATTCharacteristic).value!;
    const str = new TextDecoder().decode(val);
    const n   = parseFloat(str);
    if (!isNaN(n)) setSpeed(n.toFixed(1));
  }

  function disconnect() {
    if (device && device.gatt?.connected) device.gatt.disconnect();
    setConnected(false);
    setSpeed(null);
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
  );
}
