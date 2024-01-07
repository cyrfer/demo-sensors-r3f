import { useFrame } from "@react-three/fiber"
import { useMemo } from "react"
import { Quaternion, Vector3 } from "three"
import { Scene } from "./Scene"


// threejs directions:
// +x, right
// +y, up
// +z, away from screen (toward our eyes)

// const X_AXIS = new Vector3(1, 0, 0)
// const Y_AXIS = new Vector3(0, 1, 0)
// const Z_AXIS = new Vector3(0, 0, 1)


// browser's reference frame
// https://w3c.github.io/orientation-sensor/#absoluteorientationsensor-model
const fixSensorR1 = new Quaternion()
// fixSensorR1.setFromAxisAngle(Z_AXIS, 0.5*Math.PI)

const fixSensorR2 = new Quaternion()
// fixSensorR2.setFromAxisAngle(Y_AXIS, 0.5*Math.PI)

const xformSensorToScene = new Quaternion()
// just guessing we need 2 transformations
xformSensorToScene.multiplyQuaternions(fixSensorR2, fixSensorR1)
xformSensorToScene.normalize()

export interface Vantage {
  position: number[]
}

const vantagePoints: Vector3[] = [
  new Vector3(-5, 2, 5),
  new Vector3(-2, 2, 4),
  new Vector3(-2, 0.1, 4),
  new Vector3(0, 0.1, 4),
  // new Vector3(0, 5, 10),
  // new Vector3(-4, 0.1, 0),
]

// const msSwitchVantagePoint = 1000

export interface App3dProps {
  qSensor: Quaternion
}

export const App3d = ({
  qSensor,
}: App3dProps) => {

  // set up the vantage
  useFrame((state) => {
    const camera = state.camera
    const p = vantagePoints[3]
    camera.position.set(p.x, p.y, p.z)
    camera.lookAt(0, 0, 0)
  })

  // set up the sensor controller
  const qPhone = useMemo<Quaternion>(() => {
    const q = new Quaternion()
    // HELP!!!
    q.multiplyQuaternions(qSensor, xformSensorToScene)
    // q.normalize()
    // console.log('qSensor', qSensor, 'qCamera', q)
    return q
  }, [qSensor])

  return (
    <Scene qPhone={qPhone} />
  )
}
