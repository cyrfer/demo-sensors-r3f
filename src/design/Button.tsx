import { CSSProperties, MouseEventHandler } from "react"

const style: CSSProperties = {
  width: 'fit-content',
  padding: 8,
  borderRadius: 8,
  borderColor: 'darkblue',
    color: 'white',
  backgroundColor: 'blue',
}

export interface ButtonProps {
  disabled?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode | React.ReactNode[]
}

export const Button = ({
  disabled,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      style={style}
      onClick={onClick}
    >{children}</button>
  )
}
