import progress from "@assets/progress_bar1.png";
import googleImg from "@assets/google.png";
import githubImg from "@assets/github.png";
import fontImg from "@assets/font.png";

function SignUp() {
    const handleGoogleClick = () => {};

    return (
        <>
            <div className="flex h-screen w-1120 justify-center bg-background">
                <div className="h-614 w-501 flex-col justify-items-center rounded bg-white">
                    <div className="h-300 flex-col justify-center pt-25">
                        <div className="flex justify-center">
                            <img className="flex w-210 justify-center" src={progress} />
                        </div>
                        <div className="flex justify-center pt-25 text-2xl font-bold">
                            회원가입 방법을
                            <br />
                            선택해주세요!
                        </div>
                        <div className="flex justify-center"></div>
                        <img className="" src={fontImg} />
                    </div>
                    <div className="flex-col justify-between">
                        <button className="m-auto flex w-350 justify-center rounded bg-black p-8">
                            <span className="font-bold text-white">DevSquad로 가입하기</span>
                        </button>
                        <button
                            className="m-auto mt-25 flex w-350 justify-center rounded border-2 border-solid border-black p-6"
                            onClick={handleGoogleClick}
                        >
                            <img className="flex w-30 pr-5" src={googleImg} />
                            <span className="font-bold text-black">Google 계정으로 가입</span>
                        </button>
                        <button className="m-auto mt-25 flex w-350 justify-center rounded border-2 border-solid border-black p-6">
                            <img className="flex w-30 pr-5" src={githubImg} />
                            <span className="font-bold text-black">GitHub 계정으로 가입</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
