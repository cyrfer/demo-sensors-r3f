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
