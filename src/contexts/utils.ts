import {
  Dispatch,
  SetStateAction,
} from "react"

export type StateSetter<S> = Dispatch<SetStateAction<S>>
export type StateArgs<S> = [S, StateSetter<S>]
