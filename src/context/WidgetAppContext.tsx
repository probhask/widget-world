import { ReactNode, useState, useContext, createContext } from "react";
import useWidget from "@hook/useWidget";
import { WIDGET } from "types/index";

type WidgetAppContextPropsTypes = {
  widgetList: WIDGET[];
  handleAddNewWidget: ({
    info,
    title,
    isNewCategory,
    categoryId,
    newCategory,
  }: ADD_NEW_WIDGET_FUNC_PARAM) => void;
  deleteWidget: (widgetId: string) => void;
  deleteCategory: (categoryId: string) => void;
  toggleHideUnHide: (widgetId: string) => void;
  handleSearch: (queryString: string) => WIDGET[];
};

export type ADD_NEW_WIDGET_FUNC_PARAM = {
  title: string;
  info: string;
  isNewCategory: boolean;
  categoryId?: string;
  newCategory?: string;
};

// ⭐ context
export const WidgetAppContext = createContext<
  WidgetAppContextPropsTypes | undefined
>(undefined);

const getLocalStorageWidgetList = (): WIDGET[] => {
  const raw = localStorage?.getItem("widget-list");
  if (raw) {
    const parse = JSON.parse(raw);
    return parse;
  }
  return [];
};
const setLocalStorageWidgetList = (list: WIDGET[]): void => {
  localStorage.setItem("widget-list", JSON.stringify(list));
};

// ⭐ Context provider
export const WidgetAppContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {
    addNewWidget,
    hideToggle,
    removeWidget,
    removeCategory,
    searchWidget,
  } = useWidget();
  const [widgetList, setWidgetList] = useState<WIDGET[]>(
    getLocalStorageWidgetList()
  );

  const handleAddNewWidget = ({
    info,
    title,
    isNewCategory,
    categoryId,
    newCategory,
  }: ADD_NEW_WIDGET_FUNC_PARAM) => {
    const newWidgetAdd = addNewWidget(
      widgetList,
      title,
      info,
      isNewCategory,
      categoryId,
      newCategory
    );
    setWidgetList(newWidgetAdd);
    setLocalStorageWidgetList(newWidgetAdd);
  };
  const deleteWidget = (widgetId: string) => {
    const newList = removeWidget(widgetList, widgetId);
    setWidgetList(newList);
    setLocalStorageWidgetList(newList);
  };
  const deleteCategory = (categoryId: string) => {
    const newList = removeCategory(widgetList, categoryId);
    setWidgetList(newList);
    setLocalStorageWidgetList(newList);
  };

  const toggleHideUnHide = (widgetId: string) => {
    const newList = hideToggle(widgetList, widgetId);
    setWidgetList(newList);
    setLocalStorageWidgetList(newList);
  };

  const handleSearch = (queryString: string) => {
    return searchWidget(widgetList, queryString);
  };
  return (
    <WidgetAppContext.Provider
      value={{
        widgetList,
        handleAddNewWidget,
        deleteWidget,
        toggleHideUnHide,
        deleteCategory,
        handleSearch,
      }}
    >
      {children}
    </WidgetAppContext.Provider>
  );
};

// ⭐ context provider hook
const useWidgetAppContext = () => {
  const context = useContext(WidgetAppContext);
  if (!context) {
    throw new Error(
      "useWidgetAppContext must be used within WidgetAppContextProvider"
    );
  }
  return context;
};

export default useWidgetAppContext;
