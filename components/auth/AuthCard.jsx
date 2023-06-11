import Image from "next/image";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

import { db } from "@/utils/firebase";
const AuthCard = ({ id, userImageUrl, email, userStatus }) => {
  // update  User Status
  const UpdateStatus = async (e) => {
    const selectedStatus = e.target.value;
    const notification = toast.loading("Updating User Status...");
    try {
      await updateDoc(doc(db, "users", id), {
        userStatus: selectedStatus,
        updatedAt: Timestamp.now().toDate(),
      });
      toast.success("User Status Updated Successfully!", {
        id: notification,
      });
    } catch (error) {
      toast.error(error.message || "An error occurred", {
        id: notification,
      });
    }
  };

  return (
    <tr className="border-b bg-dark border-gray-700">
      <th scope="row" className="items-center p-2 whitespace-nowrap text-white">
        <Image
          className="lg:h-12 lg:w-14 h-10 w-10 rounded-md"
          src={userImageUrl}
          alt={email}
          width={200}
          height={200}
        />
      </th>
      <td className="p-2 mt-[29px]">
        <div className="flex items-center">
          <div className="pl-2">
            <div className="text-base font-semibold text-white">
              <p className="line-clamp-1">{email}</p>
            </div>
          </div>
        </div>
      </td>
      <th scope="row" className="items-center p-2 whitespace-nowrap text-white">
        <select
          value={userStatus}
          onChange={UpdateStatus}
          className="rounded-lg text-base p-1 bg-[#4b4747]
            text-white focus:ring-primary focus:outline-none focus:ring-2"
        >
          <option value="Admin">
            <p className="text-gray-500 flex gap-2 items-center">Admin</p>
          </option>
          <option value="User">
            <p className="text-gray-500 flex gap-2 items-center">User</p>
          </option>
        </select>
      </th>
    </tr>
  );
};

export default AuthCard;
