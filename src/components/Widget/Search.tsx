import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useNavigate, useSearchParams } from "react-router-dom";
import { WIDGET } from "../../types";
import useWidgetAppContext from "../../context/WidgetAppContext";
import DisplayWidgetList from "./DisplayWidgetList";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Search = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const setUrlSearchParam = (query: string) => {
    setSearchParams({ q: query });
  };
  const getUrlSearchParam = (): string => {
    return searchParams.get("q") || "";
  };
  const [searchTerm, setSearchTerm] = useState<string>(getUrlSearchParam());
  const { handleSearch } = useWidgetAppContext();
  const [searchResult, setSearchResult] = useState<WIDGET[]>([]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("search result", );
    setSearchResult(handleSearch(searchTerm));
  };
  const handleReset = () => {
    setSearchTerm("");
    setUrlSearchParam("");
  };
  useEffect(() => {
    setUrlSearchParam(searchTerm);
  }, [searchTerm]);
  useEffect(() => {
    setSearchResult(handleSearch(searchTerm));
  }, []);

  return (
    <div className="w-full h-full">
      <div className="flex items-center">
        <AiOutlineArrowLeft
          className="text-2xl cursor-pointer mx-1"
          onClick={() => navigate("..")}
        />
        <form
          className="w-full pr-3 my-4"
          onSubmit={handleOnSubmit}
          onReset={handleReset}
        >
          <div className="flex items-center w-full h-10 bg-[#C8A1E0] rounded-3xl  overflow-hidden  text-[#671488] ">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="search..."
              className="outline-none border-none bg-inherit w-full font-semibold px-3 py-4"
            />
            <button
              type="reset"
              className=" text-3xl mx-1 active:scale-90 transition-all"
            >
              <TiDelete />
            </button>
            <button
              type="submit"
              className="text-xl active:scale-90 transition-all mr-2"
            >
              <FaSearch />
            </button>
          </div>
        </form>
      </div>

      <div className="mx-2">
        <DisplayWidgetList widgetList={searchResult} isSearch={true} />
        {searchResult.length === 0 && (
          <div className="my-5 text-neutral-600 text-lg text-center">
            not found
          </div>
        )}
      </div>
    </div>
  );
});
Search.displayName = "Search";

export default Search;
