import { useFrame } from "@react-three/fiber"
import { useMemo } from "react"
import { Quaternion, Vector3 } from "three"
import { Scene } from "./Scene"
import { applySensor } from "./utils"

export interface Vantage {
  position: number[]
}

const vantagePoints: Vector3[] = [
  new Vector3(-5, 2, 5),
  new Vector3(-2, 2, 4),
  new Vector3(-2, 0.1, 4),
  new Vector3(0, 0.1, 4),
]


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
    return applySensor(qSensor)
  }, [qSensor])

  return (
    <Scene qPhone={qPhone} />
  )
}
