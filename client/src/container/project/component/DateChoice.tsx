import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import Typography from "@component/Typography";
import dayjs from "dayjs";

registerLocale("ko", ko);

const DateChoice = ({ onChange }: { onChange: (start: string, end: string) => void }) => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

    useEffect(() => {
        if (startDate && endDate) {
            const start = dayjs(startDate).format("M/D");
            const end = dayjs(endDate).format("M/D");
            onChange(start, end);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate]);

    return (
        <div className="my-10 flex flex-col p-10">
            <div className="mb-10 flex">
                <Typography text="프로젝트 기간" type="Body" />
                <Typography text="*" type="Body" color="text-warn" />
            </div>
            <DatePicker
                dateFormat="yyyy-MM-dd"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setDateRange(update);
                }}
                locale="ko"
                minDate={new Date()}
                className="w-full rounded-md p-6"
                placeholderText="choice your date"
            />
        </div>
    );
};

export default DateChoice;
