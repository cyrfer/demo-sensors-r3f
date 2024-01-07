
import {
  Grid,
} from '@react-three/drei'

import {
  Vector3,
  Quaternion,
  Color,
} from 'three'

import {
  CardinalDirectionLabel,
  Axes,
  Box3d,
  Box3dProps,
} from './shapes'

// threejs directions:
// +x, right
// +y, up
// +z, away from screen (toward our eyes)

// dimensions
// iphone 13: 147 x 72 x 7.65 mm
// normalize (divide) above by 76.5, to get:
// iphone 13^: 1.92157 x 0.9412 x 0.1
// that maps to this: z, x, y
const phoneLength = 1.92157
const phoneWidth = 0.9412
const phoneThickness = 0.1
const scaleIphone13: Box3dProps['scale'] = [phoneWidth, phoneThickness, phoneLength]
// const scaleIphone13: Box3dProps['scale'] = [0.9412, 0.1, 1.92157]


export interface AppUsersPhoneProps {
  quaternion: Quaternion
}

export const AppUsersPhone = ({
  quaternion,
}: AppUsersPhoneProps) => {
  return (
    <group quaternion={quaternion}>
      <Box3d name={'phone-model'} scale={scaleIphone13} color={'white'} />
      <group name={'phone-charger-port'} position={[0, -0.5*phoneLength, 0]}>
        <Box3d name={'box-port'} scale={0.05} color={'darkgreen'} />
      </group>
      <Axes name={"axes-phone"} length={1.5} radius={0.05} />
    </group>
  )
}

const RED = new Color('red')
const ORANGE = new Color('orange')
const BLUE = new Color('blue')
const YELLOW = new Color('yellow')

// cardinal directions
const distanceCardinal = 5
const NORTH = new Vector3(0, 0, -distanceCardinal)
const EAST = new Vector3(distanceCardinal, 0, 0)
const SOUTH = new Vector3(0, 0, distanceCardinal)
const WEST = new Vector3(-distanceCardinal, 0, 0)

export interface SceneProps {
  qPhone: Quaternion
}

export const Scene = ({
  qPhone,
}: SceneProps) => {

  return (
    <>
      <Grid cellColor="white" args={[10, 10]} />
      <AppUsersPhone quaternion={qPhone} />
      <CardinalDirectionLabel position={NORTH} color={YELLOW} />
      <CardinalDirectionLabel position={EAST} color={RED} />
      <CardinalDirectionLabel position={SOUTH} color={BLUE} />
      <CardinalDirectionLabel position={WEST} color={ORANGE} />
    </>
  )
}
