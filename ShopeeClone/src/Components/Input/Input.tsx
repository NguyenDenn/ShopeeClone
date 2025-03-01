import { UseFormRegister } from 'react-hook-form'

type Props = {
  type: React.HTMLInputTypeAttribute
  placeholder: string
  errorMessage?: string
  classname?: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
}

export default function Input({ type, placeholder, name, classname, errorMessage, register }: Props) {
  return (
    <div className={classname}>
      <input
        type={type}
        placeholder={placeholder}
        className='mt-8 w-full rounded-sm border border-gray-300 outline-none p-4 focus:border-gray-500 focus:shadow-sm'
        {...register(name)}
      />
      <div className='text-sm text-red-500 mt-1 min-h-[1rem]'>{errorMessage}</div>
    </div>
  )
}
