import { useGetLayoutByTypeQuery } from "@/app/redux/features/layout/layoutApi";
import { styles } from "@/app/styles/style";
import { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetLayoutByTypeQuery("Categories");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlerDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handlerDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handlerDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className="your-custom-css-class">
        <div>
          <label className={`${styles.label}`}>Course Name</label>

          <input
            type="text"
            id="name"
            name=""
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            required
            className={`${styles.input}`}
            placeholder="MERN stack LMS platform with next"
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            required
            placeholder="Write something amazing..."
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Price</label>

            <input
              type="number"
              id="price"
              required
              name=""
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              className={`${styles.input}`}
              placeholder="29"
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label}`}>
              Estimated Price (optional)
            </label>

            <input
              type="number"
              id="price"
              name=""
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              className={`${styles.input}`}
              placeholder="59"
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Tags</label>

            <input
              type="text"
              id="tags"
              name=""
              value={courseInfo.tags}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              className={`${styles.input}`}
              placeholder="MERN stack LMS platform with next"
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label}`}>Course Categories</label>

            <select
              name=""
              id=""
              value={courseInfo.categories}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setCourseInfo({ ...courseInfo, categories: e.target.value });
              }}
              className={`${styles.input}`}
            >
              <option value="">Select Category</option>
              {categories.map((item: any) => (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Level</label>

            <input
              type="text"
              required
              id="level"
              name=""
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              className={`${styles.input}`}
              placeholder="Beginner/Intermediate/Expert"
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label}`}>Demo Url</label>

            <input
              type="text"
              id="demoUrl"
              required
              name=""
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              className={`${styles.input}`}
              placeholder="eeefs323"
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            required
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] 
p-3 border flex items-center justify-center 
${dragging ? "bg-blue-500" : "bg-transparent"}`}
            onDragOver={handlerDragOver}
            onDragLeave={handlerDragLeave}
            onDrop={handlerDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center 
    text-white rounded mt-8 cursor-pointer flex items-center justify-center"
            value="Next"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
