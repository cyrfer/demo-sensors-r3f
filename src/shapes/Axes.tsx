import { useMemo } from "react"
import {
  Euler,
  Vector3,
  // Quaternion,
} from "three"

const rotateX90 = new Euler(0.5*Math.PI, 0, 0)
const rotateZ90n = new Euler(0, 0, -0.5*Math.PI)

export interface AxesProps {
  name: string
  length: number
  radius: number
}

export const Axes = ({
  name,
  length,
  radius,
}: AxesProps) => {
  const radiusTop = radius
  const radiusBottom = radius
  const p = useMemo<Vector3>(() => {
    return new Vector3(0, 0.5*length, 0)
  }, [length])

  return (
    <group name={name}>
      <group name={"x"} rotation={rotateZ90n}>
        <mesh position={p}>
          <cylinderGeometry args={[radiusTop, radiusBottom, length]} />
          <meshBasicMaterial color={'red'} />
        </mesh>
      </group>

      <group name={"y"}>
        <mesh position={p}>
          <cylinderGeometry args={[radiusTop, radiusBottom, length]} />
          <meshBasicMaterial color={'green'} />
        </mesh>
      </group>

      <group name={"z"} rotation={rotateX90}>
        <mesh position={p}>
          <cylinderGeometry args={[radiusTop, radiusBottom, length]} />
          <meshBasicMaterial color={'blue'} />
        </mesh>
      </group>
    </group>
  )
}
