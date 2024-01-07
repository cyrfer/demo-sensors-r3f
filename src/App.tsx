import { Canvas } from '@react-three/fiber'
import { App3d } from './App3D'
import { useCallback, useState } from 'react'
import { Button, Typography } from './design'
import { Quaternion } from 'three'

const fullScreenStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
}

function App() {
  const [show3d, setShow3d] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sensorError, setSensorError] = useState<any>()
  const [sensorQ, setSensorQ] = useState<Quaternion>(new Quaternion())

  const onClickStartSensor = useCallback(() => {
    const options: MotionSensorOptions = {
      frequency: 1,
      referenceFrame: "device",
    }
    const sensor = new AbsoluteOrientationSensor(options)

    sensor.addEventListener("reading", () => {
      console.log('orientationsensor reading', sensor.quaternion)
      // model is a Three.js object instantiated elsewhere.
      // model.quaternion.fromArray(sensor.quaternion).inverse();
      if (sensor.quaternion) {
        const q = new Quaternion()
        q.fromArray(sensor.quaternion)
        setSensorQ(q)
      }
    })

    sensor.addEventListener("error", (event) => {
      console.error('orientationsensor error', event)
      setSensorError(event.error)
      if (event.error.name === 'NotAllowedError') {
        console.log('Permission to access sensor was denied.');
      } else if (event.error.name === 'NotReadableError' ) {
        console.log('Cannot connect to the sensor.');
      }
    })

    sensor.addEventListener("activate", () => {
      console.log('orientationsensor activate')
      setShow3d(true)
    })

    Promise.all([
      // @ts-expect-error, Type '"accelerometer"' is not assignable to type 'PermissionName'
      navigator.permissions.query({ name: "accelerometer" }),
      // @ts-expect-error, Type '"magnetometer"' is not assignable to type 'PermissionName'
      navigator.permissions.query({ name: "magnetometer" }),
      // @ts-expect-error, Type '"gyroscope"' is not assignable to type 'PermissionName'
      navigator.permissions.query({ name: "gyroscope" }),
    ]).then((results) => {
      if (results.every((result) => result.state === "granted")) {
        console.log("permissions granted for AbsoluteOrientationSensor.")
        sensor.start()
      } else {
        console.log("No permissions to use AbsoluteOrientationSensor.")
      }
    })

  }, [])

  return (
    <div style={fullScreenStyle}>
      {show3d && (
        <Canvas>
          <App3d qSensor={sensorQ} />
        </Canvas>
      )}
      {!show3d && (
        <div style={{
          ...fullScreenStyle,
          padding: 8,
          gap: 8,
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: sensorError ? 'darkred' : 'green', 
        }}>
          <Typography variant={'h1'}>Demo: Tilt virtual using physical sensors</Typography>
          <Typography variant={'body'}>Then, on an Android phone, open the URL on your local network. To Enter 3D,</Typography>
          <Typography variant={'h2'}>Start Motion Sensor Tracking</Typography>
          <Button
            disabled={show3d}
            onClick={onClickStartSensor}
          >START</Button>
          {sensorError && (
            <Typography variant='body'>{sensorError.name}</Typography>
          )}
        </div>
      )}
    </div>
  )
}

export default App
