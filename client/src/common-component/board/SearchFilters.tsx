import { useState, useRef, useEffect, RefObject } from "react";

import { useRecoilValue } from "recoil";
import { defaultPostionAtom, defaultStackAtom } from "@feature/Global";

import Typography from "@component/Typography";
import AutoCompletionTags from "@component/AutoCompletionTags";

import { VscTriangleDown } from "react-icons/vsc";
import { AiFillCloseCircle } from "react-icons/ai";

export const ShowResult = ({
    text,
    selectedTags,
    setSelectedTags,
}: {
    text: string;
    selectedTags: Array<string>;
    setSelectedTags: (tags: Array<string>) => void;
}) => {
    const filterSuggestion = (value: string) => {
        setSelectedTags([...selectedTags].filter((v) => v !== value));
    };

    return (
        <div className="flex items-center">
            <div className="mr-8 min-w-40 text-center">
                <Typography text={text} type="SmallLabel" styles="font-bold" color="text-button-next" />
            </div>
            <div className="flex flex-wrap">
                {selectedTags.map((v) => (
                    <div className="mr-8 flex" key={v}>
                        <Typography text={v} type="SmallLabel" styles="font-bold mr-4" />
                        <button onClick={() => filterSuggestion(v)}>
                            <AiFillCloseCircle size="0.8rem" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const SearchButton = ({ text, onClickHandler }: { text: string; onClickHandler?: () => void }) => (
    <button
        onClick={onClickHandler}
        className="relative mr-8 w-110 rounded-sm border-1 border-borderline px-8 py-4 text-left"
    >
        <Typography type="SmallLabel" text={text} />
        <div className="absolute right-10 top-4">
            <VscTriangleDown size="1.2rem" />
        </div>
    </button>
);

function SearchFilters({
    needStack = false,
    needPos = false,
    needOrder = false,
    selectedStacks = [],
    setSelectedStacks,
    selectedPos = [],
    setSelectedPos,
    selectedOrder = [],
    setSelectedOrder,
}: {
    needStack?: boolean;
    needPos?: boolean;
    needOrder?: boolean;
    selectedStacks?: Array<string>;
    setSelectedStacks?: (tags: Array<string>) => void;
    selectedPos?: Array<string>;
    setSelectedPos?: (tags: Array<string>) => void;
    selectedOrder?: Array<string>;
    setSelectedOrder?: (tags: Array<string>) => void;
}) {
    const dropdownRef: RefObject<HTMLDivElement> = useRef(null);
    const [clickStack, setClickStack] = useState(false);
    const [clickPos, setClickPos] = useState(false);
    const [clickOrder, setClickOrder] = useState(false);

    useEffect(() => {
        const outsideClick = (e: MouseEvent) => {
            if ((clickStack || clickPos || clickOrder) && !dropdownRef.current?.contains(e.target as Node)) {
                setClickStack(false);
                setClickPos(false);
                setClickOrder(false);
            }
        };

        document.body.addEventListener("click", outsideClick);

        return () => {
            document.body.removeEventListener("click", outsideClick);
        };
    }, [clickOrder, clickPos, clickStack]);

    const onClickStackHandler = () => {
        setClickStack(true);
        setClickPos(false);
        setClickOrder(false);
    };

    const onClickPosHandler = () => {
        setClickStack(false);
        setClickPos(true);
        setClickOrder(false);
    };

    const onClickOrderHandler = () => {
        setClickStack(false);
        setClickPos(false);
        setClickOrder(true);
    };

    const defaultPosition = useRecoilValue(defaultPostionAtom);
    const defaultStack = useRecoilValue(defaultStackAtom);

    return (
        <div className="mb-8 w-full sm:w-480" ref={dropdownRef}>
            <div className="flex">
                {needStack && <SearchButton text="스택 검색" onClickHandler={onClickStackHandler} />}
                {needPos && <SearchButton text="포지션 검색" onClickHandler={onClickPosHandler} />}
                {needOrder && (
                    <div className="relative">
                        <SearchButton text="정렬 방식" onClickHandler={onClickOrderHandler} />
                        {clickOrder && setSelectedOrder && (
                            <ol className="absolute top-34 h-61 w-110 border-1 border-borderline bg-white">
                                <li
                                    onClick={() => setSelectedOrder(["인기순"])}
                                    className="flex h-30 w-full cursor-pointer items-center justify-center border-b-1 border-borderline hover:bg-background"
                                >
                                    <Typography text="인기순" type="SmallLabel" styles="font-bold" />
                                </li>
                                <li
                                    onClick={() => setSelectedOrder(["최신순"])}
                                    className="flex h-30 w-full cursor-pointer items-center justify-center hover:bg-background"
                                >
                                    <Typography text="최신순" type="SmallLabel" styles="font-bold" />
                                </li>
                            </ol>
                        )}
                    </div>
                )}
            </div>
            {(selectedStacks.length > 0 || selectedPos.length > 0 || selectedOrder.length > 0) && (
                <div className="my-10 w-full rounded-sm border-1 border-borderline p-4">
                    <Typography text="검색 필터" type="SmallLabel" styles="font-bold mb-8" color="text-button-next" />

                    {needStack && setSelectedStacks && (
                        <ShowResult text="스택" selectedTags={selectedStacks} setSelectedTags={setSelectedStacks} />
                    )}
                    {needPos && setSelectedPos && (
                        <ShowResult text="포지션" selectedTags={selectedPos} setSelectedTags={setSelectedPos} />
                    )}
                    {needOrder && setSelectedOrder && (
                        <ShowResult text="정렬" selectedTags={selectedOrder} setSelectedTags={setSelectedOrder} />
                    )}
                </div>
            )}
            {clickStack && setSelectedStacks && (
                <AutoCompletionTags
                    type="UNDERLINED"
                    placeholder="검색할 기술 스택을 입력해주세요."
                    showResult={false}
                    selectedTags={selectedStacks}
                    setSelectedTags={setSelectedStacks}
                    defaultSuggestions={defaultStack}
                />
            )}
            {clickPos && setSelectedPos && (
                <AutoCompletionTags
                    type="UNDERLINED"
                    placeholder="검색할 포지션을 입력해주세요."
                    showResult={false}
                    selectedTags={selectedPos}
                    setSelectedTags={setSelectedPos}
                    defaultSuggestions={defaultPosition}
                />
            )}
        </div>
    );
}

export default SearchFilters;
