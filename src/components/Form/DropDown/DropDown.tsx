import ValidationError from "@components/ValidationError/ValidationError";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import useDetectOutsideClick from "@hook/useDetectOutsideClick";
import useWidgetAppContext from "@context/WidgetAppContext";
import type { CATEGORY } from "types/index";
import styles from "./DropDown.module.css";

type Props = {
  label?: string;
  category: CATEGORY | null;
  handleChooseCategory: (category: string, categoryId: string) => void;
  error: string;
};

const DropDown = React.memo(
  ({
    label = "Choose Category",
    handleChooseCategory,
    category,
    error,
  }: Props) => {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [dropListHover, setDropListHover] = useState<boolean>(false);
    const { widgetList } = useWidgetAppContext();

    const dropDownRef = useDetectOutsideClick(() => setOpenDropdown(false));

    return (
      <div className="flex gap-3 items-center justify-between flex-wrap mid-tab:flex-col mid-tab:items-start w-full">
        <span
          className="text-[#674188] font-semibold"
          onClick={() => setOpenDropdown(true)}
        >
          {label}
        </span>
        <div className="mid-tab:w-full" ref={dropDownRef}>
          <div
            className={`${styles["dropdown"]} mid-tab:w-full w-[13rem] md:w-[16rem] `}
            id="select-category"
          >
            <div
              className={styles["dropdown-btn"]}
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <span>{category ? category.category : "select category"}</span>
              <span title="expand-collapse">
                {openDropdown ? <FaAngleUp /> : <FaAngleDown />}
              </span>
            </div>
            {openDropdown && (
              <ul className={styles["dropdown-list"]}>
                {widgetList?.map((item) => (
                  <li
                    key={item?.categoryId}
                    onMouseEnter={() => setDropListHover(true)}
                    onMouseLeave={() => setDropListHover(false)}
                    className={`${styles["dropdown-item"]} drop ${!dropListHover && category?.categoryId === item?.categoryId && styles["selected-dropdown-item"]}`}
                    id={item.categoryId}
                    onClick={() => {
                      handleChooseCategory(item?.category, item?.categoryId);
                      setOpenDropdown(false);
                    }}
                  >
                    {item?.category}
                  </li>
                ))}
                <li
                  onMouseEnter={() => setDropListHover(true)}
                  onMouseLeave={() => setDropListHover(false)}
                  className={`${styles["dropdown-item"]} ${!dropListHover && category?.categoryId === "new" && styles["selected-dropdown-item"]}`}
                  onClick={() => {
                    handleChooseCategory("+ Add new", "new");
                    setOpenDropdown(false);
                  }}
                >
                  <span className="flex items-center gap-1">
                    <AiOutlinePlus className="text-lg" /> Add New
                  </span>
                </li>
              </ul>
            )}
          </div>
          {/* validation error */}
          {error && <ValidationError error={error} />}
        </div>
      </div>
    );
  }
);

export default DropDown;
