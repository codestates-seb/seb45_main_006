import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import Typography from "@component/Typography";
import dayjs from "dayjs";

registerLocale("ko", ko);

const DateChoice = ({
    startDate,
    setStartDate,
    deadline,
    setDeadline,
}: {
    startDate: string;
    setStartDate: (v: string) => void;
    deadline: string;
    setDeadline: (v: string) => void;
}) => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);

    useEffect(() => {
        if (dateRange[0]) {
            setDeadline("");
            setStartDate(dayjs(dateRange[0]).format("YYYY/MM/DD"));
        }
        if (dateRange[1]) {
            setDeadline(dayjs(dateRange[1]).format("YYYY/MM/DD"));
        }
        setStart(dateRange[0]);
        setEnd(dateRange[1]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateRange]);

    useEffect(() => {
        if (startDate && deadline) {
            setStart(new Date(startDate));
            setEnd(new Date(deadline));
        }
    }, [startDate, deadline]);

    return (
        <div className="my-10 flex flex-col p-10">
            <div className="mb-10 flex">
                <Typography text="프로젝트 기간" type="Body" />
                <Typography text="*" type="Body" color="text-warn" />
            </div>
            <DatePicker
                dateFormat="yyyy/MM/dd"
                selectsRange={true}
                startDate={start}
                endDate={end}
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
