import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import StoreWidgetList from "@components/StoresWidgetList/StoreWidgetList";
import useWidgetAppContext from "@context/WidgetAppContext";
import SearchBar from "./SearchBar/SearchBar";
import type { WIDGET } from "types/index";

const Search = React.memo(() => {
  const [searchResult, setSearchResult] = useState<WIDGET[]>([]);
  const { handleSearch } = useWidgetAppContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const setUrlSearchParam = (query: string) => {
    setSearchParams({ q: query });
  };
  const getUrlSearchParam = (): string => {
    return searchParams.get("q") || "";
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (getUrlSearchParam()) {
      setSearchResult(handleSearch(getUrlSearchParam()));
    }
  };
  const handleReset = useCallback(() => {
    setUrlSearchParam("");
  }, []);

  useEffect(() => {
    if (getUrlSearchParam()) {
      setSearchResult(handleSearch(getUrlSearchParam()));
    }
  }, []);

  return (
    <div className="w-full h-full">
      <SearchBar
        handleOnSubmit={handleOnSubmit}
        handleReset={handleReset}
        getUrlSearchParam={getUrlSearchParam}
        setUrlSearchParam={setUrlSearchParam}
      />
      <div className="mx-2">
        {searchResult.length === 0 && (
          <div className="mt-10 text-lg text-center font-bold text-[#671488] uppercase">
            match not found
          </div>
        )}
      </div>
    </div>
  );
});
Search.displayName = "Search";

export default Search;
