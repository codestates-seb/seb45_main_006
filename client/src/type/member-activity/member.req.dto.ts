export interface PagingWithId {
    page: number;
    memberId: number;
}

// 나의 레벨 조회
export interface MemberId {
    memberId: number;
}

export interface PagingWithBoardLiked {
    page: number;
    likedType: "likes" | "bookmark";
}
