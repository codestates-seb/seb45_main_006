import dayjs from "dayjs";
import { DateTime } from "luxon";

export const localizedChatResponse = (createAt: string) => {
    const utcTimestamp = DateTime.fromISO(createAt, { zone: "utc" });
    const localizedTimestamp = utcTimestamp.setZone("Asia/Seoul");

    // 로컬 시간대로 변환한 타임스탬프를 적용
    return dayjs(localizedTimestamp.toISO()).format("YYYY-MM-DD hh:mm");
};
