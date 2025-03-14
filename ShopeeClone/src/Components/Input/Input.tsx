import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  name,
  className,
  errorMessage,
  register,
  classNameInput = 'mt-8 w-full rounded-sm border border-gray-300 outline-none p-4 focus:border-gray-500 focus:shadow-sm',
  classNameError = 'text-sm text-red-500 mt-1 min-h-[1rem]',
  ...rest
}: Props) {
  const registerResult = register && name ? register(name) : null
  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
