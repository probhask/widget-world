import type { CATEGORY, VALIDATION_ERROR, WIDGET } from "../types";

const categoryAlreadyExist = (categoryName: string, widgetList: WIDGET[]) => {
  for (const item of widgetList) {
    if (
      item.category.toLowerCase().trim() === categoryName.toLowerCase().trim()
    ) {
      return true;
    }
  }
  return false;
};

const titleInWidgetAlreadyExist = (
  widgetList: WIDGET[],
  title: string,
  categoryId: string
): boolean => {
  if (categoryId === "new") {
    return false;
  }
  for (const item of widgetList) {
    if (item.categoryId === categoryId) {
      for (const widget of item.data) {
        if (widget.title.toLowerCase().trim() === title.toLowerCase().trim()) {
          return true;
        }
      }
    }
  }
  return false;
};

const addNewWidgetFormValidation = (
  widgetList: WIDGET[],
  category: CATEGORY | null,
  newCategory: string,
  newWidget: {
    title: string;
    info: string;
  }
): {
  result: boolean;
  validationError: VALIDATION_ERROR;
} => {
  let validationError: VALIDATION_ERROR = {
    chooseCategory: "",
    newCategory: "",
    widgetInfo: "",
    widgetTitle: "",
  };

  if (category) {
    validationError.chooseCategory = "";
    //validation for new category
    if (category.categoryId === "new") {
      // new category not given
      if (!newCategory) {
        validationError.newCategory = "required";
      } else if (categoryAlreadyExist(newCategory, widgetList)) {
        validationError.newCategory = "category with this name already exist";
      }
      // else {
      //   validationError.newCategory = "";
      // }
    }
  }
  // category not given
  else {
    validationError.chooseCategory = "choose category";
  }

  // info not given
  if (!newWidget.info) {
    validationError.widgetInfo = "required";
  }
  // else {
  //   validationError.widgetInfo = "";
  // }
  // title not given
  if (!newWidget.title) {
    validationError.widgetTitle = "required";
  } else {
    // if title already exist in widget
    if (category) {
      if (
        titleInWidgetAlreadyExist(
          widgetList,
          newWidget.title,
          category?.categoryId === "new" ? newCategory : category?.categoryId
        )
      ) {
        validationError.widgetTitle = "title already exist in this category";
      }
      // all title validation done
      // else {
      //   validationError.widgetTitle = "";
      // }
    }
  }

  // console.log(category, newCategory, newWidget.info, newWidget.title);

  // if (
  //   category &&
  //   newCategory &&
  //   newWidget.info &&
  //   newWidget.title &&
  //   validationError.chooseCategory === "" &&
  //   validationError.newCategory === "" &&
  //   validationError.widgetTitle === "" &&
  //   validationError.widgetInfo === ""
  // ) {
  //   console.log("validation pass");

  //   return { result: true, validationError };
  // } else {
  //   console.log("validation fail");

  //   return { result: false, validationError };
  // }
  const isValid = Object.values(validationError).every((error) => error === "");

  return { result: isValid, validationError };
};

export default addNewWidgetFormValidation;
