import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Props = {
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
  setUrlSearchParam: (query: string) => void;
  getUrlSearchParam: () => string;
};

const SearchBar = React.memo(
  ({
    handleOnSubmit,
    handleReset,
    getUrlSearchParam,
    setUrlSearchParam,
  }: Props) => {
    const navigate = useNavigate();

    return (
      <div className="flex items-center mb-2">
        <span
          title="go back"
          className="text-2xl cursor-pointer mx-1 active:scale-90 transition-all bg-[#C8A1E0] h-10 w-11 flex justify-center items-center text-[#671488] rounded-full"
          onClick={() => navigate("..")}
        >
          <AiOutlineArrowLeft />
        </span>
        <form
          className="w-full pr-3 my-4"
          onSubmit={handleOnSubmit}
          onReset={handleReset}
        >
          <div className="flex items-center w-full h-10 bg-[#C8A1E0] rounded-3xl  overflow-hidden  text-[#671488] ">
            <input
              type="text"
              id="search"
              value={getUrlSearchParam()}
              onChange={(e) => setUrlSearchParam(e.target.value)}
              placeholder="enter widget title"
              className="outline-none border-none bg-inherit w-full font-semibold px-3 pl-4 py-4 text-lg"
            />
            <button
              type="reset"
              title="clear"
              className=" text-xl mx-2 active:scale-90 transition-all"
            >
              <MdClose />
            </button>
            <button
              type="submit"
              title="search"
              className="text-xl active:scale-90 transition-all mr-3"
            >
              <FaSearch />
            </button>
          </div>
        </form>
      </div>
    );
  }
);

export default SearchBar;
