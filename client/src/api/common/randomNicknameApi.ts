import axios from "axios";
import { getItemFromStorage, setItemToStorage } from "@util/localstorage-helper";
import { getRandomIDNotTracing } from "@util/random-helper";

const apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT || "";

// refresh token으로 access token 요청하는 함수
export const setRandomNickname = async () => {
    const baseURL = apiEndpoint;
    const accessToken = getItemFromStorage("accessToken") || "";
    console.log("???? accessToken", accessToken);

    const { data: userWithoutNickname } = await axios.request({
        baseURL,
        url: "/members",
        method: "get",
        headers: { Authorization: `Bearer ${accessToken}` },
        data: {},
        timeout: 1000 * 10,
        validateStatus: () => {
            return true;
        },
    });
    console.log("userWithoutNickname", userWithoutNickname);

    const randomNickname = getRandomIDNotTracing();
    const user = userWithoutNickname;
    if (!user.nickname) {
        const reqObj = {
            memberId: user.memberId,
            nickname: randomNickname,
            profilePicture: user.profilePicture,
            githubId: user.githubId,
            introduction: user.introduction,
            listEnroll: user.listEnroll,
            stack: user.stack,
            position: user.position,
        };

        setItemToStorage("nickname", randomNickname);

        await axios.request({
            baseURL,
            url: "/members",
            method: "patch",
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { ...reqObj },
            timeout: 1000 * 10,
            validateStatus: () => {
                return true;
            },
        });
    }
};
