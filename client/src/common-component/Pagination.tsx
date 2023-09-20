import { useEffect, useState } from "react";

import { getPaginationRange } from "@util/pagination-helper";

import Typography from "@component/Typography";

type IPagination = {
    curPage: number;
    setCurPage: (curPage: number) => void;
    totalPages: number;
};

// TODO: 디자인 수정
function Pagination({ curPage, setCurPage, totalPages }: IPagination) {
    // // 마지막 페이지네이션 숫자 = (데이터 총 개수 / 한 페이지 당 데이터 개수) 의 올림
    // // 예시) 마지막 페이지네이션 숫자(15) = (데이터 총 개수(146) / 한 페이지 당 데이터 개수(10))의 올림
    // const [endPage, setEndPage] = useState<number>(Math.ceil(totalItems / size));
    // // getPaginationRange 함수로 페이지네이션에 표출할 페이지네이션 arr 받아옴
    const [paginationArr, setPaginationArr] = useState<Array<number>>(getPaginationRange(curPage, totalPages));

    useEffect(() => {
        setPaginationArr(getPaginationRange(curPage, totalPages));
    }, [curPage, totalPages]);

    return (
        <ol className="my-40 flex w-full justify-center">
            {paginationArr[0] !== 1 ? (
                <button className="mr-8" onClick={() => setCurPage(paginationArr[0] - 1)}>
                    <Typography type="Body" text="&lt;&lt;" />
                </button>
            ) : null}
            {paginationArr.map((v, i) => (
                <li key={v} className="mr-6 flex">
                    <button onClick={() => setCurPage(v)} className="mr-6">
                        {curPage === v ? (
                            <Typography type="Highlight" text={v.toString()} color="text-main" />
                        ) : (
                            <Typography type="Body" text={v.toString()} />
                        )}
                    </button>
                    {i !== paginationArr.length - 1 ? <Typography type="Body" text="/" /> : null}
                </li>
            ))}
            {paginationArr[paginationArr.length - 1] !== totalPages ? (
                <button onClick={() => setCurPage(paginationArr[paginationArr.length - 1] + 1)}>
                    <Typography type="Body" text="&gt;&gt;" />
                </button>
            ) : null}
        </ol>
    );
}

export default Pagination;
