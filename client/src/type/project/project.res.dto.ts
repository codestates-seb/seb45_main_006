// 가져다쓰기 편하게 interface
export interface CommonResProjects {
    boardId: number;
    title: string;
    createdAt: string;
    modifiedAt: string;
    startDate: string;
    deadline: string;
    recruitNum: number;
    recruitStatus: boolean;
    viewCount: number;
}

export interface GetResAllProjects {
    data: CommonResProjects[];
}

export interface GetResDetailProject extends CommonResProjects {
    content: string;
}

export interface PatchResProject extends GetResDetailProject {}

// 응답 바디가 없음
export interface PostResProject {}
export interface DeleteResProject {}
