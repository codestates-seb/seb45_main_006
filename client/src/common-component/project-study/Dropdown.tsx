import { Select, Option } from "@material-tailwind/react";

export default function SelectDefault() {
    return (
        <div className="mb-20 mt-10 p-10">
            <label>모집여부</label>
            <Select className="flex h-40 rounded-md">
                <Option>모집 중</Option>
                <Option>모집 완료</Option>
            </Select>
        </div>
    );
}
