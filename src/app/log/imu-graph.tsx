// pages/imu-graph.tsx
import dynamic from "next/dynamic";

// Dynamically import so Chart.js only runs in the browser
const IMUGraph = dynamic(() => import("../components/IMUGraph"), { ssr: false });

export default function IMUPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Live IMU Dashboard</h1>
      <p>
        This chart pulls directly from your <code>imu_samples</code> table in Supabase
        (using the anon/public key).
      </p>
      <IMUGraph />
    </main>
  );
}
