import { getPhotos } from "../lib/data";
import { getPlaiceholder } from "plaiceholder";
import Image from "next/image";


const blurImages = async (photos) => {
  const images = await Promise.all (
  photos.map( async (image) => {
    const { base64, img} = await getPlaiceholder(image.photo.url, { size: 10 })
    return {
      ...img,
      base64,
      id: image.id,
      description: image.description,
      date: image.date
    };
  }),
  );
  return images;
};

export const getStaticProps = async () => {
  const photoResponse = await getPhotos();
  const { photos } = photoResponse;
  const blurredPhotos = await blurImages(photos);

  return {
    props: {
        revalidate: 3600,
      blurredPhotos,
    },
  };
};

export default function Gallery({ blurredPhotos }) {
    return (
      <div className='grid grid-cols-2 gap-3 max-w-3xl mx-auto px-4 sm:px-6 lg:px-0' >
        {
          blurredPhotos.map((photo) => (
            <Image 
              src={photo.src} 
              width={photo.width} 
              height={photo.height}
              placeholder="blur"
              blurDataURL={photo.base64}
              objectFit="cover"
            />
          ))
        }
      </div>
    )
}


