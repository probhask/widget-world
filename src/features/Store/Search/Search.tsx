import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import StoreWidgetList from "@components/StoresWidgetList/StoreWidgetList";
import useWidgetAppContext from "@context/WidgetAppContext";
import SearchBar from "./SearchBar/SearchBar";
import type { WIDGET } from "types/index";

const Search = React.memo(() => {
  const [searchResult, setSearchResult] = useState<WIDGET[]>([]);
  const { handleSearch } = useWidgetAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const setUrlSearchParam = (query: string) => {
    setSearchParams({ q: query });
  };
  const getUrlSearchParam = (): string => {
    return searchParams.get("q") || "";
  };
  const [debounceValue, setDebounceValue] =
    useState<string>(getUrlSearchParam());

  const handleSearchWidget = (query: string) => {
    if (query) {
      setSearchResult(handleSearch(query));
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearchWidget(debounceValue);
  };
  const handleReset = () => {
    setUrlSearchParam("");
  };

  useEffect(() => {
    if (getUrlSearchParam()) {
      setDebounceValue(getUrlSearchParam());
    }
    if (debounceValue.length) {
      setIsSearching(true);
      handleSearchWidget(debounceValue);
      setIsSearching(false);
    }
  }, [debounceValue]);
  useEffect(() => {
    if (!getUrlSearchParam()) {
      setSearchResult([]);
    }
    const timeout = setTimeout(() => {
      setDebounceValue(getUrlSearchParam());
    }, 500);
    return () => clearInterval(timeout);
  }, [getUrlSearchParam()]);

  return (
    <div className="w-full h-full">
      <SearchBar
        handleOnSubmit={handleOnSubmit}
        handleReset={handleReset}
        getUrlSearchParam={getUrlSearchParam}
        setUrlSearchParam={setUrlSearchParam}
      />
      <div className="mx-2">
        <StoreWidgetList widgetList={searchResult} isSearch={true} />

        {!isSearching &&
          getUrlSearchParam().length === 0 &&
          searchResult.length === 0 && (
            <div className="mt-10 text-lg text-center font-bold text-[#671488] uppercase">
              search widget's
            </div>
          )}

        {!isSearching && getUrlSearchParam() && searchResult.length === 0 && (
          <div className="mt-10 text-lg text-center font-bold text-[#671488] uppercase">
            match not found
          </div>
        )}
        {isSearching && (
          <div className="mt-10 text-lg text-center font-bold text-[#671488] uppercase">
            searching ...
          </div>
        )}
      </div>
    </div>
  );
});
Search.displayName = "Search";

export default Search;
