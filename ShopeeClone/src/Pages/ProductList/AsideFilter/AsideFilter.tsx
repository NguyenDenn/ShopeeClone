import { createSearchParams, Link } from 'react-router-dom'
import Button from '~/Components/Button'
import Input from '~/Components/Input'
import path from '~/constants/path'
import { QueryConfig } from '../ProductList'
import { Category } from '~/types/categories.type'
import classNames from 'classnames'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
export default function AsideFilter({ categories, queryConfig }: Props) {
  const { category } = queryConfig
  console.log('category', category, 'categories', categories)
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold '>
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất Cả Danh Mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {categories.map((categoriesItem) => {
          const isActive = category === categoriesItem._id
          return (
            <li className='py-2 pl-2' key={categoriesItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoriesItem._id
                  }).toString()
                }}
                className={classNames('px-2 relative', {
                  ' font-semibold text-oranges': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='fill-oranges h-2 w-2 absolute top-1 left-[-10px]'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoriesItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='w-3 h-4 fill-current stroke-current mr-3'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div>Khoảng Giá</div>
        <form className='mt-2'>
          <div className='flex items-start'>
            <Input
              type='text'
              className='grow'
              name='form'
              classNameInput=' w-full rounded-sm border border-gray-300 outline-none p-1 focus:border-gray-500 focus:shadow-sm'
              placeholder='₫ TỪ'
            />
            <div className='mx-2 mt-2 shrink-0'> - </div>
            <Input
              type='text'
              className='grow'
              name='form'
              classNameInput=' w-full rounded-sm border border-gray-300 outline-none p-1 focus:border-gray-500 focus:shadow-sm'
              placeholder='₫ ĐẾN'
            />
          </div>
          <Button className='w-full p-2 uppercase bg-oranges text-white text-sm hover: bg-oranges/80 justify-center items-center'>
            Áp Dụng
          </Button>
        </form>
      </div>
      <div />
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-3 h-4 mr-1' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>trở lên</span>
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to={path.home} className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-3 h-4 mr-1' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>trở lên</span>
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button className='w-full bg-oranges py-2 rounded-md uppercase text-white hover:bg-oranges/80'>Xóa tất cả</Button>
    </div>
  )
}
