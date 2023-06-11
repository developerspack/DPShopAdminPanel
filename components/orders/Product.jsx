import Image from "next/image";

const Product = ({ id, imageUrl, Name, Price }) => {
  return (
    <div className="flex p-2 text-white" key={id}>
      <div className="flex-shrink-0">
        <Image
          width={500}
          height={500}
          src={imageUrl}
          alt=""
          className="md:w-24 md:h-24 w-28 h-28 rounded-lg"
        />
      </div>
      <div className="p-2 pl-5">
        <div className="md:grid grid-cols-2 md:space-y-0 space-y-2">
          <div className="">
            <p className="md:text-xl text-sm font-bold">{Name}</p>
            {/* <p className="">Golden</p> */}
          </div>

          <div className="lg:ml-[18rem] md:ml-[10rem]">
            <p className="text-sm font-bold md:text-2xl">Ksh.{Price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
