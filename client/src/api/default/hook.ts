import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

import { GetDefaultPosition, GetDefaultStack } from "@type/default/default.res.dto";
import { getDefaultStack, getDefaultPostion } from "./api";

// 기술스택 리스트
export const useGetDefaultStack = () => {
    return useQuery<GetDefaultStack, AxiosError, GetDefaultStack>({
        queryKey: ["tags"],
        queryFn: getDefaultStack,
    });
};

// 포지션 리스트
export const useGetDefaultPostion = () => {
    return useQuery<GetDefaultPosition, AxiosError, GetDefaultPosition>({
        queryKey: ["tags"],
        queryFn: getDefaultPostion,
    });
};
