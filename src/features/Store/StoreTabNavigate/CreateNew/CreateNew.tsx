import React, { useState } from "react";
import useWidgetAppContext from "@context/WidgetAppContext";
import { CATEGORY, VALIDATION_ERROR } from "types/index";
import addNewWidgetFormValidation from "@utils/addNewWidgetValidation";
import DropDown from "@components/Form/DropDown/DropDown";
import { useSearchParams } from "react-router-dom";
import TextInput from "@components/Form/TextInput/TextInput";
import TextArea from "@components/Form/TextArea/TextArea";
import CreateNewButton from "@components/Form/CreateNewButton/CreateNewButton";

const CreateNew = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { widgetList, handleAddNewWidget } = useWidgetAppContext();
  const [validationError, setValidationError] = useState<VALIDATION_ERROR>({
    chooseCategory: "",
    newCategory: "",
    widgetInfo: "",
    widgetTitle: "",
  });
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <section className="my-5 px-2">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-4"
        onReset={resetFormData}
      >
        {/* category */}
        <DropDown
          category={category}
          error={validationError.chooseCategory}
          handleChooseCategory={handleChooseCategory}
        />
        {/* new category */}

        {category?.categoryId === "new" && (
          <TextInput
            error={validationError.newCategory}
            handleOnChange={(e) => handleNewCategory(e.target.value)}
            label="New Category"
            placeholder="enter category name "
            value={newCategory}
            disabled={
              category
                ? widgetList
                    ?.map((widget) => widget?.categoryId)
                    ?.includes(category.categoryId)
                : true
            }
          />
        )}

        {/* widget */}
        <fieldset className="flex flex-col gap-4 border-2 border-[#C8A1E0] rounded-md p-3">
          <legend className="text-lg font-bold px-2.5 uppercase text-[#674188] ">
            widget
          </legend>

          {/* title */}
          <TextInput
            label="Title"
            placeholder="enter title"
            value={newWidget.title}
            handleOnChange={(e) => handleTitle(e.target.value)}
            error={validationError.widgetTitle}
          />
          {/* information */}
          <TextArea
            label="Information"
            placeholder="enter something about widget"
            value={newWidget.info}
            handleOnChange={(e) => handleInfo(e.target.value)}
            error={validationError.widgetInfo}
            row={3}
          />
        </fieldset>

        <div className="w-full flex justify-center flex-wrap gap-4 text-[#F7EFE5] uppercase font-bold my-3">
          <CreateNewButton
            text="Create"
            type="submit"
            className=" hover:bg-[#671488] border-2 border-[#671488] text-[#671488] hover:text-[#F7EFE5] "
          />
          <CreateNewButton
            type="reset"
            text="RESET"
            className="hover:bg-[#aa4290] border-2 border-[#aa4290] text-[#aa4290] hover:text-[#F7EFE5] "
          />
        </div>
      </form>
    </section>
  );
});

CreateNew.displayName = "CreateNew";

export default CreateNew;
