import { styles } from "@/app/styles/style";
import { FC } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";
type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };
  const handlerAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: string) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };
  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (benefits[benefits.length - 1]?.title !== "") {
      setActive(active + 1);
    } else if (prerequisites[prerequisites.length - 1]?.title !== "") {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields before proceeding to the next step!");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="benefits">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            key={index}
            type="text"
            name="Benefit"
            placeholder="You will be able to build a full stack LMS Platform..."
            required
            className={`${styles.input} m-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          className="dark:text-white text-black"
          onClick={handlerAddBenefit}
        />
      </div>

      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="benefits">
          What are the prerequisites for students in this course?
        </label>
        <br />
        {prerequisites.map((prerequisites: any, index: number) => (
          <input
            key={index}
            type="text"
            name="prerequisites"
            placeholder="You need basic knowledge of MERN Stack"
            required
            className={`${styles.input} m-2`}
            value={prerequisites.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          className="dark:text-white text-black"
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full md:w-[180px] flex items-center justify-center h-[40px] 
                 bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>

        <div
          className="w-full md:w-[180px] flex items-center justify-center h-[40px] 
                 bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
