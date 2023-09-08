import { IInput } from "@component/Input";
import SearchInput from "@component/board/SearchInput";
import CommonSearchFilters from "@component/board/SearchFilters";

interface ISearchInput extends IInput {
    selectedStacks: Array<string>;
    setSelectedStacks: (v: Array<string>) => void;
    selectedPos: Array<string>;
    setSelectedPos: (v: Array<string>) => void;
}

function SearchFilter({
    value,
    onChange,
    placeholder,
    selectedStacks,
    setSelectedStacks,
    selectedPos,
    setSelectedPos,
}: ISearchInput) {
    return (
        <div className="my-20 flex flex-col p-10 md:flex-row md:justify-between">
            <CommonSearchFilters
                needStack={true}
                needPos={true}
                selectedStacks={selectedStacks}
                setSelectedStacks={setSelectedStacks}
                selectedPos={selectedPos}
                setSelectedPos={setSelectedPos}
            />

            <div className="sm:w-480 md:w-300">
                <SearchInput value={value} onChange={onChange} placeholder={placeholder} />
            </div>
        </div>
    );
}

export default SearchFilter;
