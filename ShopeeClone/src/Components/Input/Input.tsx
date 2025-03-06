import { InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  type,
  placeholder,
  name,
  className,
  errorMessage,
  register,
  classNameInput = 'mt-8 w-full rounded-sm border border-gray-300 outline-none p-4 focus:border-gray-500 focus:shadow-sm',
  classNameError = 'text-sm text-red-500 mt-1 min-h-[1rem]'
}: Props) {
  const registerResult = register && name ? register(name) : null
  return (
    <div className={className}>
      <input type={type} placeholder={placeholder} className={classNameInput} {...registerResult} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
