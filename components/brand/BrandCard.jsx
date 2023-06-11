import { RiEditBoxLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/router";

import { handleDelete } from "@/Api/Apis";

const BrandCard = ({ id, imageUrl, Brand }) => {
  const router = useRouter();
  return (
    <>
      <tr className="border-b bg-dark border-gray-700 text-white">
        <th
          scope="row"
          className="flex items-center whitespace-nowrap px-7 py-2"
        >
          <Image
            className="w-10 h-10 rounded-full"
            src={imageUrl}
            alt={Brand}
            width={500}
            height={500}
          />
        </th>
        <td className="p-1 lg:p-2">
          <div className="flex items-center">
            <div className="pl-3">
              <div className="text-base font-semibold">{Brand}</div>
            </div>
          </div>
        </td>
        <td className="flex gap-3">
          <RiEditBoxLine
            className="h-6 w-6 text-green-500 hover:text-green-600 cursor-pointer"
            onClick={() => router.push(`/updateCategory/${id}`)}
          />
          <MdDeleteOutline
            className="h-6 w-6 text-red-500 hover:text-red-600 cursor-pointer"
            onClick={() => handleDelete(id, "brand", imageUrl)}
          />
        </td>
      </tr>
    </>
  );
};

export default BrandCard;
