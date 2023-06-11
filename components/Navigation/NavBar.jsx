import { AiOutlineSearch } from "react-icons/ai";

const NavBar = ({
  valueSearch,
  onChangeSearch,
  valueSort,
  onChangeSort,
  filteredItems,
}) => {
  return (
    <div className="bg-dark rounded-lg p-2 w-full">
      <div className="flex items-center justify-between gap-1">
        <div className="cursor-pointer flex p-1 font-bold text-2xl gap-1 items-center text-primary">
          {filteredItems}
          <span className="font-lg text-xl text-white hidden sm:flex lg:flex">
            Found
          </span>
        </div>
        <div className="flex lg:gap-2 sm:gap-2">
          <div className="relative">
            <div className="inset-y-0 absolute flex items-center pl-2 pointer-events-none">
              <AiOutlineSearch className="w-5 h-5 text-white" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 pl-8 focus:ring-primary focus:outline-none focus:ring-2
                       rounded-lg text-base bg-[#4b4747] placeholder-white text-white"
              placeholder="Search Products Here..."
              value={valueSearch}
              onChange={onChangeSearch}
            />
          </div>
          <div className="space-x-2 flex items-center">
            <label className="mb-2 text-lg font-bold text-white hidden lg:flex">
              Sort by:
            </label>
            <select
              value={valueSort}
              onChange={onChangeSort}
              className="rounded-lg text-base p-2 bg-[#4b4747]
            text-white focus:ring-primary focus:outline-none focus:ring-2"
            >
              <option value="latest">Latest</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-price">Highest Price</option>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
