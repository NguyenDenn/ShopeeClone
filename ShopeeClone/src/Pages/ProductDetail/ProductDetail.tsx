import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from '~/apis/product.apis'
import ProductRating from '~/Components/ProductRating'
import { Product as ProductType, ProductListConfig } from '~/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from '~/utils/utils'
import Product from '../ProductList/components/Product'
import QuantityController from '~/Components/QuantityController'
import purchaseApi from '../../apis/purchase.api'
import { AppContext } from '~/context/app.context'
import { toast } from 'react-toastify'
import { purchaseStatus } from '~/constants/purchase'

export default function ProductDetail() {
  const { isAuthenticated } = useContext(AppContext)
  const [buyCount, setBuyCount] = useState(0)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: ProductDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetails(id as string)
  })
  const product = ProductDetailData?.data.data

  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  // san pham tuong tu
  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }
  const { data: ProductData } = useQuery({
    queryKey: ['product', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product)
  })
  console.log('product', product)
  console.log('ProductData', ProductData)
  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const next = () => {
    if (currentIndexImages[1] < (product as ProductType).images.length) {
      return setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImages[0] > 0) {
      return setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const imageRef = useRef<HTMLImageElement>(null)

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const image = imageRef.current as HTMLImageElement
    const rect = event.currentTarget.getBoundingClientRect()
    console.log(rect)
    const { naturalHeight, naturalWidth } = image
    // cách 1: lấy offsetX , offsetY đơn giản khi chúng ta đã xử lý được bubble event
    // const { offsetY, offsetX } = event.nativeEvent

    // cách 2: lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
    // event bubble
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCartMutation = useMutation(purchaseApi.addToCart)
  // const addToCartMutation = useMutation({
  //   mutationFn: (body: { buy_count: number; product_id: string }) => purchaseApi.addToCart(body)
  // })
  const queryClient = useQueryClient()
  const addToCart = () => {
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập trước khi mua hàng')
    }
    addToCartMutation.mutate(
      {
        buy_count: buyCount,
        product_id: product?._id as string
      },

      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
        }
      }
    )
  }
  if (!product) return null
  return (
    <div className='bg-gray-200 py-6 animate-fade-up'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative pt-[100%] shadow overflow-hidden cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='absolute top-0 left-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.slice(0, 5).map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full  pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-oranges' />}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1>{product.name}</h1>
              <div className='flex items-center mt-8'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-oranges text-oranges'>{product.rating}</span>
                </div>
                <ProductRating
                  rating={product.rating}
                  activeClassname='fill-oranges text-oranges h-4 w-4'
                  nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                />
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500 '>Đã bán</span>
                </div>
              </div>
              <div className='flex items-center bg-gray-50 px-5 py-4'>
                <div className='line-through text-gray-500'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='text-oranges ml-3 text-3xl font-medium'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-oranges px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm giá
                </div>
              </div>
              <div className='flex items-center mt-8'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>

              <div className='mt-8 flex items-center'>
                <button
                  className='px-4 h-12 flex items-center justify-center border border-oranges text-oranges bg-oranges/10 capitalize shadow-sm hover:bg-oranges/5'
                  onClick={addToCart}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-[10px] h-5 w-5 fill-current stroke-oranges'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                  thêm vào giỏ hàng
                </button>
                <button className='h-12 min-w-[12rem] bg-oranges capitalize  text-white ml-5 hover:bg-oranges/90 flex items-center justify-center outline-none rounded-sm'>
                  mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='mt-8 bg-white py-4 shadow'>
          <div className='rounded capitalize bg-gray-50 text-lg text-slate-700'>mô tả sản phẩm</div>
          <div className='mt-12 mx-4 mb-4 text-sm leading-loose'>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
      </div>
      <div className='mt-8 '>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='uppercase text-gray-400 '>Có thể bạn cũng thích</div>
          {ProductData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 '>
              {ProductData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
