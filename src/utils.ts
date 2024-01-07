import { Quaternion, Vector3 } from "three"

export interface Transform {
  angleRadians: number
  axis: Vector3
}

export const makeQuaternionFromTransformStack = (xforms: Transform[]) => {
  const q = new Quaternion(0, 0, 0, 1)

  xforms.forEach(xf => {
    const qXf = new Quaternion(0, 0, 0, 1)
    qXf.setFromAxisAngle(xf.axis, xf.angleRadians)
    q.multiply(qXf)
  })

  return q
}


// threejs directions:
// +x, right
// +y, up
// +z, away from screen (toward our eyes)

// sensor directions:
// +x, right
// +y, into the screen (away from our eyes)
// +z, up
// https://w3c.github.io/orientation-sensor/#absoluteorientationsensor-model


const X_AXIS = new Vector3(1, 0, 0)
// const Y_AXIS = new Vector3(0, 1, 0)
// const Z_AXIS = new Vector3(0, 0, 1)


const xformSceneToSensor = new Quaternion()
xformSceneToSensor.setFromAxisAngle(X_AXIS, 0.5*Math.PI)

const xformSensorToScene = new Quaternion()
xformSensorToScene.setFromAxisAngle(X_AXIS, -0.5*Math.PI)

export const applySensor = (qSensor: Quaternion): Quaternion => {
  const q = new Quaternion()
  q.multiply(xformSensorToScene)
  q.multiply(qSensor)
  q.multiply(xformSceneToSensor)
  return q
}
