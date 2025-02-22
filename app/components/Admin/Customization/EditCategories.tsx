import {
  useEditLayoutMutation,
  useGetLayoutByTypeQuery,
} from "@/app/redux/features/layout/layoutApi";
import React, { useEffect, useState, useCallback } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { IoMdAddCircleOutline } from "react-icons/io";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, refetch } = useGetLayoutByTypeQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [editLayout, { isLoading, isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();

  // Fetch categories when data changes or layout is successfully updated
  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories);
    }

    if (layoutSuccess) {
      refetch();
      toast.success("Categories updated successfully");
    }

    if (error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message || "Error updating categories");
    }
  }, [data, layoutSuccess, error, refetch]);

  const handleCategoriesAdd = useCallback((id: any, value: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === id ? { ...category, title: value } : category
      )
    );
  }, []);

  const newCategoriesHandler = () => {
    const lastCategory = categories[categories.length - 1];
    if (!lastCategory?.title) {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategories) => [...prevCategories, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => JSON.stringify(originalCategories) === JSON.stringify(newCategories);

  const isAnyCategoryTitleEmpty = (categories: any[]) =>
    categories.some((category) => !category.title);

  const editCategoriesHandler = async () => {
    if (
      areCategoriesUnchanged(data?.layout?.categories, categories) ||
      isAnyCategoryTitleEmpty(categories)
    ) {
      return;
    }

    await editLayout({
      type: "Categories",
      categories,
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={styles.title}>All Categories</h1>
          <div className="space-y-3">
            {categories.map((item: any, index: number) => (
              <div
                className="flex items-center justify-center p-3"
                key={item._id || index}
              >
                <input
                  className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                  value={item.title}
                  onChange={(e) =>
                    handleCategoriesAdd(item._id, e.target.value)
                  }
                  placeholder="Enter category title..."
                />
                <AiOutlineDelete
                  className="dark:text-white text-black text-[18px] cursor-pointer"
                  onClick={() => {
                    setCategories((prevCategories) =>
                      prevCategories.filter((i) => i._id !== item._id)
                    );
                  }}
                  title="Delete category"
                />
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center mt-4">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
              title="Add new category"
            />
          </div>

          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] bg-[#cccccc34] dark:text-white text-black
                ${
                  areCategoriesUnchanged(
                    data?.layout?.categories,
                    categories
                  ) || isAnyCategoryTitleEmpty(categories)
                    ? "!cursor-not-allowed"
                    : "!cursor-pointer !bg-[#42d383]"
                }
                !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data?.layout?.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler
            }
            title="Save changes"
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
