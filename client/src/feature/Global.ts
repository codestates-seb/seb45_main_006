import { atom } from "recoil";

export const dropdownShow = atom<boolean>({
    key: "dropdownShow",
    default: false,
});
