import parse from 'html-react-parser';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);
import 'swiper/css';
import 'swiper/css/pagination';

import { CoreGalleryBlock } from 'types';
import styles from './PostGallery.module.scss';

interface PostGalleryProps {
  block: CoreGalleryBlock;
}

export const PostGallery: React.FC<PostGalleryProps> = ({ block }) => {
  const [isCarousel, setIsCarousel] = useState(false);

  useEffect(() => {
    setIsCarousel(block.attributes?.className === 'carousel');
  }, [block.attributes?.className]);

  const urls = block.cdnContent.match(/https?:\/\/[^\s]+/g);
  const imageUrls = urls.filter((url) =>
    url.includes('cdn.cfye.com/app/uploads')
  );
  const imagePairs = imageUrls.reduce((result, value, index, array) => {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  }, []);

  return (
    <>
      {isCarousel ? (
        <div className={cx('container__full-width', styles['gallery-wrap'])}>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides={true}
            pagination={{ dynamicBullets: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
          >
            {imagePairs.map((image) => (
              <SwiperSlide key={image[0]}>
                <img
                  className={cx(styles['gallery-img'])}
                  src={image[0].slice(0, -1)}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        parse(block.cdnContent)
      )}
    </>
  );
};
