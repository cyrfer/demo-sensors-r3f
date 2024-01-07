import { Color, MeshProps } from '@react-three/fiber'

export interface Box3dProps {
  name: string
  color: Color
  scale: MeshProps['scale']
}

export const Box3d = ({
  name,
  color,
  scale,
}: Box3dProps) => {
  // width?: number,
  // height?: number,
  // depth?: number,

  return (
    <group name={name}>
      <mesh scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}
