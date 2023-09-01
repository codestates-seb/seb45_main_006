import Text from "@component/common/Text";
import IconGithub from "@assets/icon_github.png";
import Button from "@component/common/Button";

import { TbDeviceDesktopCode } from "react-icons/tb";
import { PiUserFocus } from "react-icons/pi";

import { GetResTodoOwnerUser } from "@type/todo/todo.res.dto";

type ITodoUserCard = {
    ownerUser?: GetResTodoOwnerUser;
};

function TodoUserCard({ ownerUser }: ITodoUserCard) {
    return (
        <>
            {ownerUser ? (
                <figure
                    className="w-244 cursor-pointer rounded border-1 border-borderline p-12 hover:bg-background"
                    onClick={() => {}}
                >
                    <div className="mb-4 h-117 w-220 rounded border-1 border-borderline">
                        <img
                            className="h-full w-full"
                            src={ownerUser.image}
                            alt={`${ownerUser.lastName}의 프로필 이미지`}
                        />
                    </div>
                    <figcaption className="mb-4">
                        <Text type="Label" text={ownerUser.lastName} />
                    </figcaption>
                    <ol>
                        <li className="flex h-max py-4">
                            <img src={IconGithub} alt="깃허브 아이콘" className="mr-8 h-24 w-24" />
                            <div className="w-80 min-w-80">
                                <Text type="Highlight" text="깃허브 ID" />
                            </div>
                            <Text type="Body" text={ownerUser.username} />
                        </li>
                        <li className="flex h-max py-4">
                            <div className="mr-8">
                                <TbDeviceDesktopCode size={"1.5rem"} />
                            </div>
                            <div className="w-80 min-w-80">
                                <Text type="Highlight" text="기술 스택" />
                            </div>
                            <div className="flex flex-wrap">
                                <Button type="STUDY" label="javascript" isFullBtn={false} />
                                <Button type="STUDY" label="typescript" isFullBtn={false} />
                                <Text type="Body" text="..." />
                            </div>
                        </li>
                        <li className="flex h-max py-4">
                            <div className="mr-8">
                                <PiUserFocus size={"1.5rem"} />
                            </div>
                            <div className="w-80 min-w-80">
                                <Text type="Highlight" text="포지션" />
                            </div>
                            <div className="flex flex-wrap">
                                <Button type="PROJECT" label="FE" isFullBtn={false} />
                                <Button type="PROJECT" label="BE" isFullBtn={false} />
                            </div>
                        </li>
                    </ol>
                </figure>
            ) : null}
        </>
    );
}

export default TodoUserCard;
