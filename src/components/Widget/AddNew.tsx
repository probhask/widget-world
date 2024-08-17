import React, { useState } from "react";
import styles from "../../styles/AddNew.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import ValidationError from "./ValidationError";
import { useSearchParams } from "react-router-dom";
import useWidgetAppContext from "../../context/WidgetAppContext";
import type { CATEGORY, VALIDATION_ERROR } from "../../types";
import addNewWidgetFormValidation from "../../utils/addNewWidgetValidation";
import useDetectOutsideClick from "../../hook/useDetectOutsideClick";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const AddNew = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { widgetList, handleAddNewWidget } = useWidgetAppContext();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [dropListHover, setDropListHover] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>(
    searchParams.get("new-category") || ""
  );
  const [newWidget, setNewWidget] = useState<{ title: string; info: string }>({
    title: searchParams.get("title") || "",
    info: searchParams.get("info") || "",
  });

  const getCurrentCategoryData = (): CATEGORY | null => {
    const categoryId = searchParams.get("category");
    if (categoryId) {
      let categoryData: CATEGORY | null = null;
      for (let i = 0; i < widgetList.length; i++) {
        if (widgetList[i].categoryId === categoryId) {
          categoryData = {
            category: widgetList[i].category,
            categoryId: widgetList[i].categoryId,
          };
        }
      }
      if (categoryData === null && categoryId === "new") {
        categoryData = { categoryId: "new", category: "+ Add New" };
      }
      return categoryData;
    }
    return null;
  };
  const [category, setCategory] = useState<CATEGORY | null>(
    getCurrentCategoryData()
  );
  const dropDownRef = useDetectOutsideClick(() => setOpenDropdown(false));

  const [validationError, setValidationError] = useState<VALIDATION_ERROR>({
    chooseCategory: "",
    newCategory: "",
    widgetInfo: "",
    widgetTitle: "",
  });

  const resetFormData = () => {
    setSearchParams("");
    setCategory(null);
    setNewCategory("");
    setNewWidget({ info: "", title: "" });
    setValidationError({
      chooseCategory: "",
      newCategory: "",
      widgetInfo: "",
      widgetTitle: "",
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("handle submit called");

    const { result, validationError: error } = addNewWidgetFormValidation(
      widgetList,
      category,
      newCategory,
      newWidget
    );

    setValidationError(error);
    if (result) {
      handleAddNewWidget({
        info: newWidget.info,
        title: newWidget.title,
        isNewCategory: category?.categoryId === "new",
        newCategory: newCategory,
        categoryId: category?.categoryId,
      });
      resetFormData();
    }
  };

  const handleChooseCategory = (category: string, categoryId: string) => {
    setSearchParams((prev) => {
      prev.set("category", categoryId);
      return prev;
    });
    if (categoryId !== "new") {
      setSearchParams((prev) => {
        prev.delete("new-category");
        return prev;
      });
      setNewCategory("");
    }
    setCategory({ category, categoryId });
    setOpenDropdown(false);
  };

  const handleNewCategory = (newCategory: string) => {
    setSearchParams((prev) => {
      prev.set("new-category", newCategory);
      return prev;
    });
    setNewCategory(newCategory);
  };

  const handleTitle = (title: string) => {
    setSearchParams((prev) => {
      prev.set("title", title);
      return prev;
    });
    setNewWidget((prev) => ({ ...prev, title }));
  };
  const handleInfo = (info: string) => {
    setSearchParams((prev) => {
      prev.set("info", info);
      return prev;
    });
    setNewWidget((prev) => ({ ...prev, info }));
  };

  return (
    <section className="my-5 px-2">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-4"
        onReset={resetFormData}
      >
        {/* category */}
        <div className="flex gap-3 items-center justify-between flex-wrap mid-tab:flex-col mid-tab:items-start w-full">
          <span
            className="text-[#674188] font-semibold"
            onClick={() => setOpenDropdown(true)}
          >
            Choose Category
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
                <span>{openDropdown ? <FaAngleUp /> : <FaAngleDown />}</span>
              </div>
              {openDropdown && (
                <ul className={styles["dropdown-list"]}>
                  {widgetList?.map((item) => (
                    <li
                      key={item?.categoryId}
                      onMouseEnter={() => setDropListHover(true)}
                      onMouseLeave={() => setDropListHover(false)}
                      className={`${styles["dropdown-item"]} ${!dropListHover && category?.categoryId === item?.categoryId && styles["selected-dropdown-item"]}`}
                      id={item.categoryId}
                      onClick={() =>
                        handleChooseCategory(item?.category, item?.categoryId)
                      }
                    >
                      {item?.category}
                    </li>
                  ))}
                  <li
                    onMouseEnter={() => setDropListHover(true)}
                    onMouseLeave={() => setDropListHover(false)}
                    className={`${styles["dropdown-item"]} ${!dropListHover && category?.categoryId === "new" && styles["selected-dropdown-item"]}`}
                    onClick={() => handleChooseCategory("+ Add new", "new")}
                  >
                    <span className="flex items-center gap-1">
                      <AiOutlinePlus className="text-lg" /> Add New
                    </span>
                  </li>
                </ul>
              )}
            </div>
            {/* validation error */}
            {validationError.chooseCategory && (
              <ValidationError error={validationError.chooseCategory} />
            )}
          </div>
        </div>

        {/* new category */}
        {category?.categoryId === "new" && (
          <div className="flex gap-3 items-center justify-between flex-wrap mid-tab:flex-col mid-tab:items-start w-full">
            <label
              htmlFor="new-category"
              className="text-[#674188] font-semibold"
            >
              New Category
            </label>
            <div className="mid-tab:w-full w-[13rem]   md:w-[16rem] ">
              <input
                type="text"
                disabled={
                  category
                    ? widgetList
                        ?.map((widget) => widget?.categoryId)
                        ?.includes(category.categoryId)
                    : true
                }
                placeholder="enter name "
                name=""
                id=""
                value={newCategory}
                onChange={(e) => handleNewCategory(e.target.value)}
                className="border-2 border-[#C8A1E0] text-[#674188] rounded outline-none px-1 mid-tab:w-full w-[13rem]  md:w-[16rem]"
              />
              {validationError.newCategory && (
                <ValidationError error={validationError.newCategory} />
              )}
            </div>
          </div>
        )}

        {/* widget */}
        <fieldset className="flex flex-col gap-4 border-2 border-[#C8A1E0] rounded-md p-3">
          <legend className="text-lg font-bold px-2.5 uppercase text-[#674188] ">
            widget
          </legend>

          <div className="flex gap-3 items-center justify-between flex-wrap mid-tab:flex-col mid-tab:items-start w-full">
            <label
              htmlFor="widget-title"
              className="text-[#674188] font-semibold"
            >
              Title
            </label>
            <div className="mid-tab:w-full">
              <input
                type="text"
                placeholder="enter widget title"
                name=""
                id="widget-title"
                value={newWidget.title}
                onChange={(e) => handleTitle(e.target.value)}
                className="border-2 border-[#C8A1E0] text-[#674188] rounded outline-none px-1 w-[13rem] md:w-[16rem] mid-tab:w-full "
              />
              {validationError.widgetTitle && (
                <ValidationError error={validationError.widgetTitle} />
              )}
            </div>
          </div>
          <div className="flex gap-3 items-center justify-between  mid-tab:flex-col mid-tab:items-start w-full">
            <label
              htmlFor="newWidget-info"
              className="text-[#674188] font-semibold"
            >
              Information
            </label>
            <div className="mid-tab:w-full">
              <textarea
                name=""
                id=""
                rows={3}
                placeholder="enter widget info. "
                className="border-2 border-[#C8A1E0] text-[#674188] rounded outline-none px-1 resize-none overflow-auto w-[13rem] md:w-[16rem] mid-tab:w-full custom-scrollbar"
                value={newWidget.info}
                onChange={(e) => handleInfo(e.target.value)}
              />

              {validationError.widgetInfo && (
                <ValidationError error={validationError.widgetInfo} />
              )}
            </div>
          </div>
        </fieldset>

        <div className="w-full flex justify-center gap-4">
          <button
            type="submit"
            className="uppercase px-5 py-2 bg-[#671488] text-[#F7EFE5] active:scale-90 w-[100px] rounded font-bold transition-all"
          >
            ADD
          </button>
          <button
            type="reset"
            className="uppercase px-5 py-2 bg-[#aa4290] text-[#F7EFE5] active:scale-90 w-[100px] rounded font-bold transition-all"
          >
            RESET
          </button>
        </div>
      </form>
    </section>
  );
});

AddNew.displayName = "AddNew";

export default AddNew;
