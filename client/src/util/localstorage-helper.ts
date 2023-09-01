// 로컬스토리지에 해당 키의 값이 있는지 확인하는 함수
const isEmpty = (value: string) => {
    return (
        value === "" ||
        value === null ||
        value === undefined ||
        (typeof value === "object" && !Object.keys(value).length)
    );
};

// 로컬스토리지에 저장된 값을 파싱하여 가져오는 함수
export const getItemFromStorage = (key: string) => {
    if (isEmpty(key)) {
        throw Error("키 값이 올바르지 않습니다.");
    }

    const value = localStorage.getItem(key);

    if (value === null) {
        return null;
    }

    try {
        const data = JSON.parse(value);
        return data;
    } catch (e) {
        return value;
    }
};

// 로컬스토리지에 키와 그에 해당하는 값을 저장하는 함수
export const setItemToStorage = (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// 로컬스토리지에 키에 해당하는 값을 지우는 함수
export const removeDataFromStorage = (key: string) => {
    if (isEmpty(key)) {
        throw Error("키 값이 올바르지 않습니다.");
    }

    localStorage.removeItem(key);
};

// 로컬스토리지의 모든 키와 값을 삭제하는 함수
export const clearStorage = () => {
    localStorage.clear();
};
