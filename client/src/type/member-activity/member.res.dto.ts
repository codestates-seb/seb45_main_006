import { PageInfo } from "@type/common";
import { CommonResProjects } from "@type/project/project.res.dto";
import { CommonResStudies } from "@type/study/study.res.dto";
import { InfoDefaultType } from "@type/info/info.res.dto";
import { QuestionDefaultType } from "@type/question/question.res.dto";

// 유저의 프로젝트
export interface GetResProjectOfMember {
    pageInfo: PageInfo;
    data: Array<CommonResProjects>;
}

// 유저의 스터디
export interface GetResStudyOfMember {
    pageInfo: PageInfo;
    data: Array<CommonResStudies>;
}

// 유저의 자유게시글
export interface GetResInfoOfMember {
    pageInfo: PageInfo;
    data: Array<InfoDefaultType>;
}

// 유저의 질문게시글
export interface GetResQuestionOfMember {
    pageInfo: PageInfo;
    data: Array<QuestionDefaultType>;
}
