import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { useRouter } from "next/router";

import { handleDelete } from "@/Api/Apis";

const CategoryCard = ({ imageUrl, Category, id }) => {
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
            alt={Category}
            width={500}
            height={500}
          />
        </th>
        <td className="p-1 lg:p-2">
          <div className="flex items-center">
            <div className="pl-3">
              <div className="text-base font-semibold">{Category}</div>
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
            onClick={() => handleDelete(id, "category", imageUrl)}
          />
        </td>
      </tr>
    </>
  );
};

export default CategoryCard;
