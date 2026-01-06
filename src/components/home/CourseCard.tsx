import Image from "next/image";

interface CourseCardProps {
  title: string;
  category: string;
  price: number;
  rating: number;
  students: string;
  image: string;
}

const CourseCard = ({
  title,
  category,
  price,
  rating,
  students,
  image,
}: CourseCardProps) => {
  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1'>
      {/* Image */}
      <div className='relative h-48 w-full bg-gradient-to-br from-blue-100 to-purple-100'>
        <div className='absolute inset-0 flex items-center justify-center text-gray-400'>
          <Image src={image} alt={title} fill className='object-cover' />
        </div>
      </div>

      {/* Content */}
      <div className='flex flex-col gap-4 p-4'>
        {/* Category + Price */}
        <div className='flex items-center justify-between'>
          <span className='text-xs font-medium rounded bg-orange-50 px-2 py-1 uppercase text-orange-600'>
            {category}
          </span>
          <span className='text-base font-semibold text-orange-600'>
            ${price}
          </span>
        </div>

        {/* Title */}
        <h3 className='text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem]'>
          {title}
        </h3>

        {/* Divider */}
        <div className='h-px w-full bg-gray-100' />

        {/* Rating */}
        <div className='flex items-center gap-3'>
          <span className='flex items-center gap-1 text-sm font-medium text-gray-900'>
            ⭐ {rating}
          </span>
          <span className='text-sm text-gray-500'>{students} students</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
