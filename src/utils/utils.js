import axios from "axios";

//ImgBB
// export const getImageUrl = async(imageData) => {
//     const imageFormData = new FormData();
//   imageFormData.append("image", imageData);

//   const {data} = await axios.post(
//     `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
//     imageFormData
//   );

//   return data.data.url;
// }


//Cloudinary
export const getImageUrl = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "unsigned_upload");

  const { data } = await axios.post(
    "https://api.cloudinary.com/v1_1/dqs6k0so6/image/upload",
    formData,
  );

  return data.secure_url;
};


export const saveUserInfo = async(userInfo) => {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/users`,
      userInfo,
    );
    return res;
}

