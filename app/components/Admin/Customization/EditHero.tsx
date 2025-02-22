import {
  useEditLayoutMutation,
  useGetLayoutByTypeQuery,
} from "@/app/redux/features/layout/layoutApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

const EditHero = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();
  const { data, refetch } = useGetLayoutByTypeQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setSubTitle(data?.layout?.banner?.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }

    if (isSuccess) {
      refetch();
      toast.success("Hero updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <div
      className="w-full flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-16 lg:px-24 py-12 "
      style={{
        position: "relative",
        top: "200px",
      }}
    >
      {/* Image Section */}
      <div className="relative w-full md:w-[45%] flex justify-center">
        <div className="relative group">
          <img
            src={image}
            alt="Banner"
            className="w-full h-auto max-w-md rounded-lg shadow-xl object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <label
            htmlFor="banner"
            className="absolute bottom-4 right-4 bg-black bg-opacity-60 p-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-opacity-80"
          >
            <AiOutlineCamera className="text-white text-3xl" />
          </label>
          <input
            type="file"
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className="hidden"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="w-full md:w-[50%] flex flex-col items-center md:items-start text-center md:text-left">
        <textarea
          className="w-full text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white bg-transparent resize-none border-b-2 border-gray-300 focus:border-primary outline-none px-4 py-3 transition-all duration-300 ease-in-out"
          placeholder="Improve Your Online Learning Experience Better Instantly"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={2}
        />
        <br />
        <textarea
          className="w-full text-lg text-gray-700 dark:text-gray-300 bg-transparent resize-none border-b-2 border-gray-300 focus:border-primary outline-none px-4 py-3 transition-all duration-300 ease-in-out"
          placeholder="We have 40k+ Online courses & 500K+ Online registered students. Find your desired courses from them."
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          rows={3}
        />
        <br />
        <button
          className={`w-[140px] h-[50px] mt-6 rounded-lg font-medium text-white transition-all duration-300 ease-in-out shadow-md ${
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image
              ? "bg-[#42d383] hover:bg-[#36b974] cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleEdit}
          disabled={
            data?.layout?.banner?.title === title &&
            data?.layout?.banner?.subTitle === subTitle &&
            data?.layout?.banner?.image?.url === image
          }
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditHero;
