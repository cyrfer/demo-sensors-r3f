import { Color, Vector3 } from "three"


export interface CardinalDirectionLabelProps {
  position: Vector3
  color: Color
}

export const CardinalDirectionLabel = ({
  position,
  color,
}: CardinalDirectionLabelProps) => {
  return (
    <mesh position={position}>
      <boxGeometry />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
