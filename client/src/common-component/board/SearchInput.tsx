import Input, { IInput } from "@component/Input";
import search from "@assets/search.svg";

function SearchInput({ value, onChange, placeholder }: IInput) {
    return (
        <div className="relative w-full">
            <Input
                name="search"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxlength={100}
                borderStyle="border-1 border-borderline"
            />
            <div className="absolute right-10 top-8">
                <img src={search} className="h-20 w-20" />
            </div>
        </div>
    );
}

export default SearchInput;
