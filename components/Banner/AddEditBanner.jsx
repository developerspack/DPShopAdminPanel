import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaSpellCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { FetchDocument } from "@/Api/Apis";
import { db, storage } from "@/utils/firebase";

const initialState = {
  FirstLine: "",
  SecondLine: "",
  imageUrl: "",
};

const AddEditBanner = ({ id }) => {
  const { document } = FetchDocument("banner", id);
  const [form, setForm] = useState(initialState);
  const [fileType, setFileType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const { FirstLine, SecondLine, imageUrl } = form;
  const router = useRouter();

  useEffect(() => {
    setForm({ ...document });
    setSelectedFile(imageUrl);
  }, [document, imageUrl]);
  // console.log(imageUrl === imageUrl);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const notification = toast.loading("Working...");
    setIsLoading(true);
    if (FirstLine && SecondLine && selectedFile) {
      if (!id) {
        if (fileType === false) {
          toast.error("Wrong Type of Picture. Please try again.");
          setIsLoading(false);
        } else {
          try {
            const docRef = await addDoc(collection(db, "banner"), {
              ...form,
              imageUrl: [], // Initialize the imageUrl field as an empty array
              createdAt: Timestamp.now().toDate(),
            });
            const imageURLs = []; // Create an array to store the download URLs
            for (const file of selectedFile) {
              const imageRef = ref(storage, `banner/${file.name}`);
              await uploadBytes(imageRef, file, "data_url");
              const downloadURL = await getDownloadURL(imageRef);
              imageURLs.push(downloadURL); // Add the download URL to the array
            }
            await updateDoc(doc(db, "banner", docRef.id), {
              imageUrl: imageURLs, // Assign the array of URLs to the imageUrl field
            });
            router.push("/Banner");
            setIsLoading(false);
            toast.success("Banner Created Successfully!", {
              id: notification,
            });
          } catch (error) {
            toast.error(error.message, {
              id: notification,
            });
            setIsLoading(false);
          }
        }
      } else {
        if (fileType === false) {
          toast.error("Wrong Type of Picture. Please try again.");
          setIsLoading(false);
        } else {
          try {
            if (selectedFile === imageUrl) {
              await updateDoc(doc(db, "banner", id), {
                ...form,
                updatedAt: Timestamp.now().toDate(),
              });
            } else {
              await updateDoc(doc(db, "banner", id), {
                ...form,
                updatedAt: Timestamp.now().toDate(),
              });
              const imageURLs = []; // Create an array to store the download URLs
              for (const url of imageUrl) {
                const storageRef = ref(storage, url);
                await deleteObject(storageRef);
              }
              for (const file of selectedFile) {
                const imageRef = ref(storage, `banner/${file.name}`);
                await uploadBytes(imageRef, file, "data_url");
                const downloadURL = await getDownloadURL(imageRef);
                imageURLs.push(downloadURL); // Add the download URL to the array
              }
              await updateDoc(doc(db, "banner", id), {
                imageUrl: imageURLs, // Assign the array of URLs to the imageUrl field
              });
            }
            router.push("/Banner");
            setIsLoading(false);
            toast.success("Banner Created Successfully!", {
              id: notification,
            });
          } catch (error) {
            toast.error(error.message, {
              id: notification,
            });
            setIsLoading(false);
          }
        }
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // input image
  const addProductImage = (e) => {
    const files = e.target.files;
    const imagesArray = [];

    for (let i = 0; i < files.length; i++) {
      if (
        files[i].type === "image/png" ||
        files[i].type === "image/jpeg" ||
        files[i].type === "image/jpg" ||
        files[i].type === "image/tiff" ||
        files[i].type === "image/gif" ||
        files[i].type === "image/svg"
      ) {
        imagesArray.push(files[i]);
        setSelectedFile(imagesArray);
      } else {
        setFileType(false);
      }
    }
  };

  // console.log(form);
  return (
    <form
      className="lg:w-[40%] w-[85%] flex flex-col items-center m-auto p-[3vmax] bg-dark lg:gap-3 gap-2 rounded-lg text-black"
      onSubmit={HandleSubmit}
    >
      <h1 className="font-sans block lg:text-3xl text-2xl text-white">
        {id ? "Update Banner" : "Create Banner"}
      </h1>
      <div className="inset-y-0 flex items-center pl-3 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2">
        <FaSpellCheck className="h-5 w-5" />

        <input
          type="text"
          required
          placeholder="FirstLine"
          name="FirstLine"
          value={FirstLine}
          onChange={handleChange}
          className="block w-full pl-10 p-2 bg-gray-100 border-none outline-none text-gray-800 placeholder:text-gray-600"
        />
      </div>

      <div className="inset-y-0 flex items-center pl-3 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2">
        <FaSpellCheck className="h-5 w-5" />

        <input
          type="text"
          required
          placeholder="Second Line"
          name="SecondLine"
          value={SecondLine}
          onChange={handleChange}
          className="block w-full pl-10 p-2 bg-gray-100 border-none outline-none text-gray-800 placeholder:text-gray-600"
        />
      </div>
      {!selectedFile && (
        <div
          className="flex items-center justify-center w-full"
          onClick={() => filePickerRef.current.click()}
        >
          <span
            className="flex items-center justify-center w-full h-12 border-none 
      rounded-lg cursor-pointer  bg-primary"
          >
            <AiOutlineCloudUpload className="w-5 h-5 mb-3 mt-3" />
            Upload Images
            <input
              type="file"
              multiple
              ref={filePickerRef}
              hidden
              onChange={addProductImage}
            />
          </span>
        </div>
      )}
      {/* Image View */}
      {selectedFile && (
        <div className="flex items-start space-x-2">
          <div
            className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 
        rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setSelectedFile(null)}
          >
            <MdDelete className="text-white h-5" />
          </div>
          <div className="overflow-y-auto flex gap-1 scrollbar-design">
            {selectedFile.map((image, index) => (
              <img
                src={
                  selectedFile === imageUrl ? image : URL.createObjectURL(image)
                }
                className="w-full h-[20%] rounded-2xl max-h-40 object-contain pb-2"
                key={index}
                alt={`Image ${index}`}
              />
            ))}
          </div>
        </div>
      )}
      <button
        className="block border-none w-full pl-10 p-2.5 rounded-[4px] bg-primary 
    outline-none cursor-pointer font-medium disabled:bg-green-200 disabled:cursor-default"
        type="submit"
        disabled={isLoading}
      >
        {id ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
};

export default AddEditBanner;
