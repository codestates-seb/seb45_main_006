import { useState } from "react";

import UserCard from "@component/board/UserCard";
import Pagination from "@component/Pagination";
import SearchFilter from "@container/user/component/SearchFilter";
import SkeletonUi from "@container/user/component/SkeletonUi";

import { useGetAllMembers } from "@api/member/hook";

function UserList() {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    // 검색어 필터
    const [searchValue, setSearchValue] = useState<string>("");
    // 검색 버튼 또는 엔터를 눌렀을 때 조회하기 위한 검색 파라미터
    const [search, setSearch] = useState<string>("");
    // 스택, 포지션 필터
    const [selectedStacks, setSelectedStacks] = useState<Array<string>>([]);
    const [selectedPos, setSelectedPos] = useState<Array<string>>([]);
    // 차단 후 새로 데이터를 불러오기 위한 queryKey로서 사용
    const [blockedMemberId, setBlockedMemberId] = useState(0);

    const {
        data: users,
        isLoading,
        refetch: refetchAllMembers,
    } = useGetAllMembers({
        page: curPage,
        stacks: selectedStacks.join(","),
        posiions: selectedPos.join(","),
        blockedMemberId,
        nickname: search,
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    };

    const onClickSearchHandler = () => {
        setSearch(searchValue);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full sm:w-11/12">
                <SearchFilter
                    value={searchValue}
                    onChange={onChange}
                    placeholder="유저 검색"
                    selectedStacks={selectedStacks}
                    setSelectedStacks={setSelectedStacks}
                    selectedPos={selectedPos}
                    setSelectedPos={setSelectedPos}
                    onClickSearchHandler={onClickSearchHandler}
                />
                <div className="my-20 flex flex-wrap">
                    {!isLoading && users?.data ? (
                        users.data.map((v, i) => (
                            <UserCard
                                key={`${v.nickname}${i}`}
                                user={v}
                                setBlockedMemberId={setBlockedMemberId}
                                refetchAllMembers={refetchAllMembers}
                            />
                        ))
                    ) : (
                        <>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <SkeletonUi key={`skeleton-${i}`} />
                            ))}
                        </>
                    )}
                </div>
            </div>
            <Pagination curPage={curPage} setCurPage={setCurPage} totalPages={users?.pageInfo.totalPages || 1} />
        </div>
    );
}

export default UserList;
