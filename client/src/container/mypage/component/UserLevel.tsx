import { useGetMyLevel } from "@api/member-activity/hook";

function UserLevel() {
    const { data: userLevel } = useGetMyLevel();
    console.log(userLevel);
    return (
        <div className="flex flex-1 flex-col">
            <div className="flex flex-col items-center rounded-md bg-white p-40 shadow-md">hello</div>
        </div>
    );
}

export default UserLevel;
