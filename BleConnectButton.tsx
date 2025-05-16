"use client";

import { useState } from "react";

export default function BleConnectButton() {
  const [connected, setConnected] = useState(false);
  const [value, setValue] = useState<string>("");

  const connectToBLE = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: "Adafruit" }],
        optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"], // UART service
      });

      const server = await device.gatt?.connect();
      const service = await server?.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");

      const rxChar = await service?.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca9e"); // RX = notify from device
      await rxChar?.startNotifications();

      rxChar?.addEventListener("characteristicvaluechanged", (event) => {
        const value = new TextDecoder().decode((event.target as any).value);
        setValue(value.trim());
        console.log("📡 Received:", value);
      });

      setConnected(true);
    } catch (err) {
      console.error("❌ BLE Error:", err);
    }
  };

  return (
    <div className="p-4 border rounded">
      <button onClick={connectToBLE} className="bg-black text-white px-4 py-2 rounded">
        {connected ? "Connected ✅" : "Connect to Feather"}
      </button>
      {value && <div className="mt-4 font-mono text-sm">Last received: {value}</div>}
    </div>
  );
}
