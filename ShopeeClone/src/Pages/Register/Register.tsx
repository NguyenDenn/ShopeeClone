import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from '~/utils/rules'
import Input from '~/Components/Input'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '~/apis/auth.apis'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import { ResponseApi } from '~/types/utils.type'
export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Schema>({
    resolver: yupResolver(schema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Schema, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<Schema, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          // dùng cho trường hợp nhiều trường (> email và password)
          // if (formError) {
          //   Object.keys(formError).forEach((key) => {
          //     setError(key as keyof Omit<Schema, 'confirm_password'>, {
          //       message: formError[key as keyof Omit<Schema, 'confirm_password'>],
          //       type: 'Server'
          //     })
          //   })
          // }
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-oranges'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='bg-white rounded p-10' noValidate onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                type='email'
                placeholder='Nhap Email'
                name='email'
                register={register}
                errorMessage={errors.email?.message}
                classname='mt-3'
              />
              <Input
                type='password'
                placeholder='Nhap Password'
                name='password'
                register={register}
                errorMessage={errors.password?.message}
              />
              <Input
                type='password'
                placeholder='Nhap Lai Password'
                name='confirm_password'
                register={register}
                errorMessage={errors.confirm_password?.message}
              />
              <div className='mt-8'>
                <button className='bg-oranges p-4 w-full text-white hover:bg-red-600 border-none'>Đăng Ký</button>
              </div>
              <div className='mt-5 text-center'>
                <p className='text-gray-300'>
                  Bạn đã có tài khoản? <span className='text-orange'>Đăng Nhập</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
