import axios from "axios";
import { useEffect, useState } from "react";

import SignLayout from "@container/sign/component/SignLayout";

function OauthUser() {
    const [data, setData] = useState<unknown | null>(null);
    console.log(data);

    useEffect(() => {
        const url = new URL(window.location.href);
        const hash = url.hash;
        if (hash) {
            const accessToken = hash.split("=")[1].split("&")[0];
            axios
                .get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken, {
                    headers: {
                        authorization: `token ${accessToken}`,
                        accept: "application/json",
                    },
                })
                .then((data) => {
                    console.log(data);
                    setData(data);
                })
                .catch((e) => console.log(e, "oAuth token expired"));
        }
    }, []);

    return <SignLayout title="Google Oauth 회원가입">hello</SignLayout>;
}

export default OauthUser;
