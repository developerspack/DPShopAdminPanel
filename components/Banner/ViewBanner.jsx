import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import Link from "next/link";
import { RiEditBoxLine } from "react-icons/ri";
import { useRouter } from "next/router";

const ViewBanner = ({ imageUrl, FirstLine, SecondLine, id }) => {
  const router = useRouter();
  return (
    <div>
      <div className="object-cover rounded-lg">
        <div className="container">
          <div className="lg:ml-80">
            <div className="relative">
              <div className="object-cover">
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Autoplay, Pagination]}
                  className="rounded-lg"
                >
                  {imageUrl?.map((url, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="right-2 top-2 absolute bg-primary p-2 rounded-lg cursor-pointer hover:bg-green-500 drop-shadow-2xl"
                        onClick={() => router.push(`/updateBanner/${id}`)}
                      >
                        <RiEditBoxLine className="h-10 w-10" />
                      </div>
                      <Image
                        src={url}
                        alt=""
                        className="block w-full object-cover h-[350px] lg:h-[500px]"
                        width={500}
                        height={500}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div
                className="flex p-0 pt-0 pr-3 pb-3 pl-3 lg:p-0 lg:pt-0 lg:pb-[17%] lg:pl-[8%] relative 
              justify-end z-10 -top-60 lg:-top-72 flex-col gap-2"
              >
                <h4 className="font-semibold text-base w-fit p-2 text-white bg-dark rounded-md">
                  New Fashion
                </h4>
                <h2 className="text-black">
                  <span className="text-gray-900 lg:text-5xl text-3xl">
                    {FirstLine}
                  </span>
                  <br />
                  <span className="text-gray-700 lg:text-4xl text-2xl">
                    {SecondLine}
                  </span>
                </h2>
                <Link
                  href="/Banner"
                  className="text-lg font-bold w-fit bg-primary p-4 rounded-lg text-black"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBanner;
