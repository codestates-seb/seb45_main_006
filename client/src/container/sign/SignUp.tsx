import progress from "@assets/progress_bar1.png";
import googleImg from "@assets/google.png";
import githubImg from "@assets/github.png";
import fontImg from "@assets/font.png";

function SignUp() {
    const handleGoogleClick = () => {
        console.log("on google handle clicked");
    };

    return (
        <>
            <div className="w-1180 bg-background flex h-screen justify-center">
                <div className="w-501 h-614 flex-cal justify-items-center rounded bg-white">
                    <div className="h-300 pt-25 flex-col justify-center">
                        <div className="flex-col justify-between"></div>
                        <div className="flex justify-center">
                            <img className="w-210 flex justify-center" src={progress} />
                        </div>
                        <div className="pt-25 flex justify-center text-2xl font-bold">
                            회원가입 방법을
                            <br />
                            선택해주세요!
                        </div>
                        <img className="flex right" src={fontImg} />
                    </div>
                    <div className="flex-col justify-between">
                        <button className="w-350 m-auto flex justify-center rounded bg-black p-8">
                            <span className="font-bold text-white">DevSquad로 가입하기</span>
                        </button>
                        <button
                            className="w-350 m-auto flex justify-center rounded border-2 border-solid border-black p-6 mt-25"
                            onClick={handleGoogleClick}
                        >
                            <img className="w-30 flex pr-5" src={googleImg} />
                            <span className="font-bold text-black">Google 계정으로 가입</span>
                        </button>
                        <button className="w-350 m-auto flex justify-center rounded border-2 border-solid border-black p-6 mt-25">
                            <img className="w-30 flex pr-5" src={githubImg} />
                            <span className="font-bold text-black">GitHub 계정으로 가입</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
