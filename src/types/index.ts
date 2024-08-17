export type WIDGET_ITEM = {
  id: string;
  title: string;
  info: string;
  hide: boolean;
};

export type WIDGET = {
  category: string;
  categoryId: string;
  data: WIDGET_ITEM[];
};
export type WIDGET_STORE_TAB = "add-new" | "existing";

export type VALIDATION_ERROR = {
  chooseCategory: string;
  newCategory: string;
  widgetTitle: string;
  widgetInfo: string;
};

export type CATEGORY = {
  category: string;
  categoryId: string;
};
