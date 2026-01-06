import Image from "next/image";
interface FeaturedCourseCardProps {
  title: string;
  category: string;
  instructor: string;
  rating: string;
  ratingCount: string;
  students: string;
  level: string;
  duration: string;
  price: string;
  originalPrice: string;
  image: string;
}

const FeaturedCourseCard = ({
  title,
  category,
  instructor,
  rating,
  ratingCount,
  students,
  level,
  duration,
  price,
  originalPrice,
  image,
}: FeaturedCourseCardProps) => {
  return (
    <div className='flex flex-col sm:flex-row gap-4 rounded-lg border border-gray-200 bg-white p-0 transition-all duration-300 hover:shadow-md hover:border-gray-300'>
      {/* Image - Responsive */}
      <div className='w-full sm:w-48 h-48 sm:h-auto rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none bg-gradient-to-br from-blue-100 to-purple-100 flex-shrink-0 flex items-center justify-center text-gray-400 overflow-hidden relative'>
        <Image
          src={image}
          alt={title}
          fill
          className='object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none'
        />
      </div>
      {/* Content */}
      <div className='flex flex-1 flex-col gap-3 p-4 sm:py-4 sm:pr-4 sm:pl-0'>
        {/* Category and Price Row */}
        <div className='flex items-start justify-between gap-2'>
          <span className='text-xs font-medium text-green-600 uppercase bg-green-50 px-2 py-1 rounded'>
            {category}
          </span>
          <div className='flex items-center gap-2'>
            <span className='text-base font-semibold text-gray-900'>
              ${price}
            </span>
            <span className='text-sm line-through text-gray-400'>
              ${originalPrice}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className='text-base font-semibold text-gray-900 line-clamp-2 leading-snug'>
          {title}
        </h3>

        {/* Instructor and Rating Row */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4'>
          <div className='flex items-center gap-2'>
            <div className='w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs'>
              👤
            </div>
            <span className='text-sm text-gray-700'>{instructor}</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-orange-500'>⭐</span>
            <span className='text-sm font-medium text-gray-900'>{rating}</span>
            <span className='text-sm text-gray-500'>({ratingCount})</span>
          </div>
        </div>

        {/* Bottom Info Row */}
        <div className='flex flex-wrap items-center gap-3 sm:gap-6 text-sm text-gray-600'>
          <div className='flex items-center gap-1'>
            <svg
              className='w-4 h-4 text-blue-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
            <span className='whitespace-nowrap'>{students} students</span>
          </div>
          <div className='flex items-center gap-1'>
            <svg
              className='w-4 h-4 text-red-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
              />
            </svg>
            <span>{level}</span>
          </div>
          <div className='flex items-center gap-1'>
            <svg
              className='w-4 h-4 text-green-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <circle cx='12' cy='12' r='10' strokeWidth='2' />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 6v6l4 2'
              />
            </svg>
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourseCard;
