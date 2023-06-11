import { RiEditBoxLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/router";
import { handleDelete } from "@/Api/Apis";
import { TbConfetti } from "react-icons/tb";

const ProductCard = ({
  id,
  imageUrl,
  Name,
  productNo,
  Price,
  Discount,
  Offer,
}) => {
  const router = useRouter();
  return (
    <tr className="border-b bg-dark border-gray-700">
      <th
        scope="row"
        className="items-center p-1 lg:p-2 whitespace-nowrap text-white"
      >
        <Image
          className="lg:h-12 lg:w-14 h-10 w-10 rounded-md"
          src={imageUrl}
          alt={Name}
          width={200}
          height={200}
        />
      </th>
      <td className="p-1 lg:p-2 hidden lg:flex mt-[10px]">
        <div className="flex items-center">
          <div className="pl-2">
            <div className="text-base font-semibold text-white">
              <p className="line-clamp-1">{Name}</p>
            </div>
          </div>
        </div>
      </td>
      <td className="p-1 lg:p-2">
        <div className="flex items-center">
          <div className="pl-2">
            <div className="text-base font-semibold text-white">{Price}</div>
          </div>
        </div>
      </td>
      <td className="p-1 lg:p-2">
        <div className="flex items-center">
          <div className="pl-2">
            <div className="text-base font-semibold text-white">{Discount}</div>
          </div>
        </div>
      </td>
      <td className="p-1 lg:p-2">
        <div className="flex items-center">
          <div className="pl-2">
            <div
              className="text-base font-semibold text-white flex gap-2 cursor-pointer"
              onClick={() => router.push(`/updateProduct/updateOffer/${id}`)}
            >
              <p
                className={
                  Offer === "Yes"
                    ? "hover:text-green-600 hover:underline"
                    : "hover:text-blue-500 hover:underline"
                }
              >
                {Offer}
              </p>
              <TbConfetti
                className={
                  Offer === "Yes"
                    ? "h-6 w-6 text-green-500 hover:text-green-600"
                    : "h-6 w-6 text-blue-400 hover:text-blue-500"
                }
              />
            </div>
          </div>
        </div>
      </td>
      <td className="p-1 lg:p-2">
        <div className="flex items-center">
          <div className="pl-2">
            <div className="text-base font-semibold text-white">
              {productNo}
            </div>
          </div>
        </div>
      </td>
      <td className="p-1 lg:p-2">
        <div className="pl-2 flex items-center gap-3">
          <RiEditBoxLine
            className="h-6 w-6 text-green-500 hover:text-green-600 cursor-pointer"
            onClick={() => router.push(`/updateProduct/${id}`)}
          />
          <MdDeleteOutline
            className="h-6 w-6 text-red-500 hover:text-red-600 cursor-pointer"
            onClick={() => handleDelete(id, "products", imageUrl)}
          />
        </div>
      </td>
    </tr>
  );
};

export default ProductCard;
