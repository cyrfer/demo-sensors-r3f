import { createContext } from 'react'
import { StateArgs } from './utils'

export interface AppContextData {
  
}

export type AppContextStateArgs = StateArgs<AppContextData>

export const makeInitAppContextData = (): AppContextData => ({
})

export const AppContext = createContext<AppContextStateArgs>([
  makeInitAppContextData(),
  x => x
])
