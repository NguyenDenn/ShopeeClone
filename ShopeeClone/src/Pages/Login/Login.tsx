import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from '~/apis/auth.apis'
import Button from '~/Components/Button'
import Input from '~/Components/Input'
import { AppContext } from '~/context/app.context'
import { SuccessResponseApi } from '~/types/utils.type'
import { LoginSchema, schema } from '~/utils/rules'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

type FormData = Pick<LoginSchema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const loginAccountMutation = useMutation({
    mutationFn: (body: LoginSchema) => authApi.loginAccount(body)
  })
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    const body = data
    loginAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
        toast.success('Logined successfully')
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<SuccessResponseApi<LoginSchema>>(error)) {
          const formError = error.response?.data.data
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

              <Button
                className='bg-oranges  p-4 w-full text-white hover:bg-red-600 border-none flex items-center justify-center'
                isLoading={loginAccountMutation.isLoading}
                disabled={loginAccountMutation.isLoading}
              >
                Đăng Nhập
              </Button>
              <div className='mt-5 text-center'>
                <p className='text-gray-300'>
                  Bạn đã có tài khoản?{' '}
                  <Link className='text-oranges cursor-pointer' to='/register'>
                    Đăng Ký
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
