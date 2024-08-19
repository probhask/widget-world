import { v4 as uuidv4 } from "uuid";
import type { WIDGET } from "types/index";

const useWidget = () => {
  // 1️⃣ add new widget
  const addNewWidget = (
    list: WIDGET[],
    title: string,
    info: string,
    isNewCategory: boolean,
    categoryId?: string,
    category?: string
  ) => {
    const newList: WIDGET[] = list;
    // if new category
    if (isNewCategory && category) {
      const { newCategoryList, newCategoryId } = addNewCategory(
        newList,
        category
      );

      const newData = newCategoryList.map((item) => {
        if (item.categoryId === newCategoryId) {
          item.data.push({ id: uuidv4(), title, info, hide: false });
        }
        return item;
      });
      return newData;
    }

    for (const widgetData of newList) {
      if (widgetData.categoryId === categoryId) {
        widgetData.data.push({ id: uuidv4(), title, info, hide: false });
      }
    }

    return [...newList];
  };

  // 2️⃣ add new category
  const addNewCategory = (
    list: WIDGET[],
    category: string
  ): { newCategoryList: WIDGET[]; newCategoryId: string } => {
    let alreadyExist: boolean = false;
    const newCategoryId = uuidv4();
    const newList = list;
    newList.map((item) => {
      if (item.category.toLowerCase() === category.toLowerCase()) {
        alreadyExist = true;
        return;
      }
    });
    if (!alreadyExist) {
      newList.push({ categoryId: newCategoryId, category, data: [] });
    }
    return { newCategoryList: newList, newCategoryId };
  };

  // 3️⃣ remove a widget
  const removeWidget = (list: WIDGET[], widgetId: string): WIDGET[] => {
    return list.map((item) => {
      return {
        ...item,
        data: item.data.filter((item) => item.id !== widgetId),
      };
    });
  };

  // 4️⃣hide toggle
  const hideToggle = (list: WIDGET[], widgetId: string): WIDGET[] => {
    const copyList = list;

    for (const widgetData of copyList) {
      for (const widget of widgetData.data) {
        if (widget.id === widgetId) {
          widget.hide = !widget.hide;
          break;
        }
      }
    }
    return [...copyList];
  };

  // 5️⃣ remove category
  const removeCategory = (list: WIDGET[], categoryId: string): WIDGET[] => {
    return list.filter((item) => item.categoryId !== categoryId);
  };

  // 6️⃣ search
  const searchWidget = (list: WIDGET[], queryString: string): WIDGET[] => {
    const result = list
      .flatMap((widgetData) => ({
        ...widgetData,
        data: widgetData.data.filter((item) =>
          item.title.toLowerCase().includes(queryString.toLowerCase())
        ),
      }))
      .filter((item) => item.data.length > 0);

    return result;
  };

  return {
    addNewCategory,
    addNewWidget,
    removeWidget,
    hideToggle,
    removeCategory,
    searchWidget,
  };
};

export default useWidget;
