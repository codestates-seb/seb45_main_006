import Input, { IInput } from "@component/Input";
import search from "@assets/search.svg";

interface ISearchInput extends IInput {
    onClickSearchHandler: () => void;
}

function SearchInput({ value, onChange, placeholder, onClickSearchHandler }: ISearchInput) {
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            onClickSearchHandler();
        }
    };

    return (
        <div className="relative w-full">
            <Input
                name="search"
                value={value}
                onChange={onChange}
                onKeyDownHandler={onKeyDownHandler}
                placeholder={placeholder}
                maxlength={100}
                borderStyle="border-1 border-borderline"
            />
            <button className="absolute right-10 top-8" onClick={onClickSearchHandler}>
                <img src={search} className="h-20 w-20" />
            </button>
        </div>
    );
}

export default SearchInput;
