export default function SortProductList() {
  return (
    <div className='py-4 px-3 bg-gray-300/40'>
      <div className='flex flex-wrap justify-between items-center gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button className='bg-oranges p-2 rounded text-white capitalize text-sm hover:bg-oranges/80 text-center'>
            Phổ biến
          </button>
          <button className='bg-white p-2 rounded text-black capitalize text-sm hover:bg-slate-50/80 text-center'>
            mới nhất
          </button>
          <button className='bg-white p-2 rounded text-black capitalize text-sm hover:bg-slate-50/80 text-center'>
            bán chạy
          </button>
          <select className='h-8 px-4 capitalize bg-white text-black text-sm hover:bg-slate-50/80 text-left outline-none'>
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp đến cao</option>
            <option value='price:desc'>Giá: Cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-oranges'>1</span>
            <span className=''>/2</span>
          </div>
          <div className='ml-2'>
            <button className='px-3 h-8 rounded-tl-sm rounded-br-sm bg-white/60 hover:bg-slate-200 cursor-not-allowed shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5 ' />
              </svg>
            </button>
            <button className='px-3 h-8 rounded-tl-sm rounded-br-sm bg-white/60 hover:bg-slate-200 shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
