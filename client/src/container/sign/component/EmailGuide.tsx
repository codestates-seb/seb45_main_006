import Typography from "@component/Typography";

function EmailGuide() {
    return (
        <div className="flex h-300 flex-col items-center justify-start">
            <Typography type="SmallLabel" text="이메일 인증을 위해 메일을 전송하였으며," />
            <Typography type="SmallLabel" text="메일 도착까지 1분 정도 소요될 수 있습니다." />
            <br />
            <Typography type="SmallLabel" text="수신한 메일이 없다면 스팸함 확인 부탁드립니다!" />
            <br />
            <br />
        </div>
    );
}

export default EmailGuide;
