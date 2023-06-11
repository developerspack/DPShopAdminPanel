import { db } from "@/utils/firebase";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const HeaderDetails = ({
  id,
  orderDate,
  orderAmount,
  orderStatus,
  setDropDown,
  dropStatus,
  orderId,
}) => {
  const UpdateStatus = async (e) => {
    const selectedStatus = e.target.value;
    const notification = toast.loading("Updating Order Status...");
    try {
      await updateDoc(doc(db, "orders", id), {
        orderStatus: selectedStatus,
        updatedAt: Timestamp.now().toDate(),
      });
      toast.success("Order Status Updated Successfully!", {
        id: notification,
      });
    } catch (error) {
      toast.error(error.message || "An error occurred", {
        id: notification,
      });
    }
  };
  const toggleContent = () => {
    if (dropStatus === orderId) {
      setDropDown(null); // Close the dropdown for the same order
    } else {
      setDropDown(orderId); // Open the dropdown for the clicked order
    }
  };

  return (
    <div className="p-2 text-lg md:items-center md:justify-center bg-dark flex">
      <div className="flex-1">
        <span className="text-gray-300 space-y-1">
          <p>OrderID</p>
          <p className="text-gray-500">{id.slice(0, 8)}...</p>
        </span>
      </div>
      <div className="flex-1 hidden md:block">
        <span className="text-gray-300 space-y-1">
          <p>Date</p>
          <p className="text-gray-500">{orderDate}</p>
        </span>
      </div>
      <div className="flex-1 hidden md:block">
        <span className="text-gray-300 space-y-1">
          <p>Total Amount</p>
          <p className="text-gray-500">Ksh.{orderAmount}</p>
        </span>
      </div>
      <div className="flex-1">
        <span className="text-gray-300 space-y-1">
          <p>Order Status</p>
          <select
            value={orderStatus}
            onChange={UpdateStatus}
            className="rounded-lg text-base p-1 bg-[#4b4747]
            text-white focus:ring-primary focus:outline-none focus:ring-2"
          >
            <option value="Processing">
              <p className="text-gray-500 flex gap-2 items-center">
                Processing
              </p>
            </option>
            <option value="Cancelled">
              <p className="text-gray-500 flex gap-2 items-center">Cancelled</p>
            </option>
            <option value="Delivered">
              <p className="text-gray-500 flex gap-2 items-center">Delivered</p>
            </option>
          </select>
        </span>
      </div>
      <button
        className="cursor-pointer text-white hover:bg-gray-800 md:hover:bg-primary hover:text-black p-3 flex md:border-2
    md:border-slate-600 md:rounded-lg rounded-full"
        onClick={toggleContent}
      >
        <span className="hidden md:block">Show Products</span>
        {dropStatus === orderId ? (
          <MdArrowDropUp className="h-8 w-8" />
        ) : (
          <MdArrowDropDown className="h-8 w-8" />
        )}
      </button>
    </div>
  );
};

export default HeaderDetails;
