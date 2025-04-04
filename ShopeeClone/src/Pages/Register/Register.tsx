import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from '~/utils/rules'
import Input from '~/Components/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from '~/apis/auth.apis'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'
import { SuccessResponseApi } from '~/types/utils.type'
import { Link, useNavigate } from 'react-router-dom'
import Button from '~/Components/Button'
import path from '~/constants/path'
import { useContext } from 'react'
import { AppContext } from '~/context/app.context'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const navigate = useNavigate()
  const registerAccountMutation = useMutation({
    mutationFn: (body: Pick<FormData, 'email' | 'password'>) => authApi.registerAccount(body)
  })
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        navigate(path.home)
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<SuccessResponseApi<Omit<Schema, 'confirm_password'>>>(error)) {
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
                className='mt-3'
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
              <Button
                className='bg-oranges  p-4 w-full text-white hover:bg-red-600 border-none flex items-center justify-center'
                isLoading={registerAccountMutation.isLoading}
                disabled={registerAccountMutation.isLoading}
              >
                Đăng Ký
              </Button>
              <div className='mt-5 text-center'>
                <p className='text-gray-300'>
                  Bạn đã có tài khoản?{' '}
                  <Link className='text-oranges cursor-pointer' to='/login'>
                    Đăng Nhập
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
