import { useEffect, useState } from "react";
import { db, storage } from "@/utils/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { toast } from "react-hot-toast";

// Hnadle Delete
export const handleDelete = async (id, collectionName, imageUrl) => {
  const notification = toast.loading(`Delteting ${collectionName}...`);
  try {
    await deleteDoc(doc(db, collectionName, id));
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
    toast.success(`${collectionName} Deleteted Successfully!`, {
      id: notification,
    });
  } catch (error) {
    toast.error(error.message, {
      id: notification,
    });
  }
};

// upload doc
export const uploadDocument = async (collectionName, form, selectedFile) => {
  const notification = toast.loading(`Creating ${collectionName}...`);
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...form,
      createdAt: Timestamp.now().toDate(),
    });
    const imageRef = ref(storage, `${collectionName}/${docRef.id}`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, collectionName, docRef.id), {
          imageUrl: downloadURL,
        });
      });
    }
    toast.success(`${collectionName} Created Successfully!`, {
      id: notification,
    });
  } catch (error) {
    toast.error(error.message, {
      id: notification,
    });
  }
};

// get collection
export const FetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  const getCollection = () => {
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef);
      // const q = query(docRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(allData);
        setData(allData);
        setloading(false);
      });
    } catch (error) {
      setloading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return { data, loading };
};

// get doc
export const FetchDocument = (collectionName, id) => {
  const [document, setDocument] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDocument = async () => {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        const obj = {
          id: id,
          ...docSnap.data(),
        };
        setDocument(obj);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Document not found");
      }
    };
    id && getDocument();
  }, [id]);
  return { isLoading, document };
};

// update doc
export const UpdateDcoument = async (
  collectionName,
  id,
  selectedFile,
  imageUrl,
  form
) => {
  const notification = toast.loading(`Updating ${collectionName}...`);
  try {
    if (selectedFile === imageUrl) {
      await updateDoc(doc(db, collectionName, id), {
        ...form,
        updatedAt: Timestamp.now().toDate(),
      });
    } else {
      await updateDoc(doc(db, collectionName, id), {
        ...form,
        updatedAt: Timestamp.now().toDate(),
      });
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      const imageRef = ref(storage, `${collectionName}/${id}`);
      if (selectedFile) {
        await uploadString(imageRef, selectedFile, "data_url").then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, collectionName, id), {
              imageUrl: downloadURL,
            });
          }
        );
      }
    }
    toast.success(`${collectionName} Updated Successfully!`, {
      id: notification,
    });
  } catch (error) {
    toast.error(error.message, {
      id: notification,
    });
  }
};

export const FetchProductsReviews = (collectionName) => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProductRatings() {
      setIsLoading(true);
      const queryRef = collection(db, collectionName);
      const Query = query(queryRef); // Limit the query to 10 documents
      const querySnapshot = await getDocs(Query);
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(products);

      const reviewsRef = await getDocs(collection(db, "reviews"));
      const reviews = reviewsRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(reviews);

      const productRatings = products.map((product) => {
        const productReviews = reviews.filter(
          (review) => review.productID === product.id
        );

        let totalRating = 0;
        const reviewers = productReviews.length;

        productReviews.forEach((reviews) => {
          totalRating += reviews.rate;
        });
        const beingRated = (5 * totalRating) / (reviewers * 5);
        const ratingInPercentage = (totalRating / (reviewers * 5)) * 100;
        let ratedInPercentage =
          reviewers === 0 ? 0 : parseFloat(ratingInPercentage.toFixed(0));
        let rating = reviewers === 0 ? 0 : parseFloat(beingRated.toFixed(1));
        return { ...product, rating, reviewers, ratedInPercentage };
      });

      setProduct(productRatings);
      setIsLoading(false);
    }

    fetchProductRatings();
  }, []);

  return { product, isLoading };
};
