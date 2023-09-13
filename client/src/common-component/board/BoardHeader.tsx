import CommonBtn from "@component/CommonBtn";
import Typography from "@component/Typography";
import SearchInput from "@component/board/SearchInput";
import SearchFilter from "@container/info/component/SearchFilter";

import { CATEGORY_NAME } from "@type/info/common";

function BoardHeader({
    label,
    searchValue,
    onChange,
    onClickSearchHandler,
    onClickRegisterHandler,
    category,
    setCategory,
}: {
    label: string;
    searchValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickSearchHandler: () => void;
    onClickRegisterHandler: () => void;
    category?: CATEGORY_NAME | "";
    setCategory?: (v: CATEGORY_NAME | "") => void;
}) {
    console.log(category);
    return (
        <div className="fixed z-10 flex w-full max-w-screen-xl flex-col  bg-white p-8">
            <div className="flex justify-end">
                <div className="mr-12 w-200">
                    <SearchInput
                        value={searchValue}
                        onChange={onChange}
                        placeholder={`${label}게시판 검색`}
                        onClickSearchHandler={onClickSearchHandler}
                    />
                </div>
                <CommonBtn size="LG" color="MAIN" styleType="FILLED" onClick={onClickRegisterHandler}>
                    <Typography type="Highlight" text={`${label}게시판 등록`} />
                </CommonBtn>
            </div>
            {setCategory && (
                <div className="flex flex-1 flex-col">
                    <SearchFilter category={category || ""} setCategory={setCategory} />
                </div>
            )}
        </div>
    );
}

export default BoardHeader;
