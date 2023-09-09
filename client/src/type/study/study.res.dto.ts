// 가져다쓰기 편하게 interface
export interface CommonResStudies {
    boardId: number;
    title: string;
    createdAt: string;
    modifiedAt: string;
    recruitNum: number;
    recruitStatus: boolean;
    viewCount: number;
}

export interface GetResAllStudies {
    data: CommonResStudies[];
}

export interface GetResDetailStudy extends CommonResStudies {
    content: string;
}

export interface PatchResStudy extends GetResDetailStudy {}

// 응답 바디가 없음
export interface PostResStudy {}
export interface DeleteResStudy {}
