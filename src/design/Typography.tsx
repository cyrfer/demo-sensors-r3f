import { CSSProperties } from "react"

export type Variant = 'h1' | 'h2' | 'body'

const style: Record<Variant, CSSProperties> = {
  h1: {fontSize: '2rem', fontWeight: 900},
  h2: {fontSize: '1.5rem', fontWeight: 750},
  body: {fontSize: '1rem', fontWeight: 500},
}

export interface TypographyProps {
  variant: Variant
  children: React.ReactNode | React.ReactNode[]
}

export const Typography = ({
  variant,
  children,
}: TypographyProps) => {
  return (
    <div style={style[variant]}>
      {children}
    </div>
  )
}
