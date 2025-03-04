import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginAccount } from '~/apis/auth.apis'
import Input from '~/Components/Input'
import { ResponseApi } from '~/types/utils.type'
import { loginSchema, LoginSchema } from '~/utils/rules'
import { isAxiosUnprocessableEntityError } from '~/utils/utils'

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema)
  })
  const loginAccountMutation = useMutation({
    mutationFn: (body: LoginSchema) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = data
    loginAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
        toast.success('Logined successfully')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<LoginSchema>>(error)) {
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
                classname='mt-3'
              />
              <Input
                type='password'
                placeholder='Nhap Password'
                name='password'
                register={register}
                errorMessage={errors.password?.message}
              />
              <div className='mt-8'>
                <button className='bg-oranges p-4 w-full text-white hover:bg-red-600 border-none'>Đăng Nhập</button>
              </div>
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
