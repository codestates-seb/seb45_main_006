import Typography from "@component/Typography";
import { Switch } from "@material-tailwind/react";

function Toggle({ status, setStatus, label }: { status: boolean; setStatus: (v: boolean) => void; label: string }) {
    return (
        <>
            <div className="flex items-center justify-center gap-8">
                <Typography type="Highlight" text={`모집 중인 ${label}만 보기`}></Typography>
                <div>
                    <Switch
                        checked={status}
                        id="custom-switch-component"
                        ripple={false}
                        onChange={(e) => setStatus(e.currentTarget.checked)}
                        className="h-full w-full checked:bg-main"
                        containerProps={{
                            className: "w-40 h-20",
                        }}
                        circleProps={{
                            className: "before:hidden w-18 h-18 left-0.5 border-none",
                        }}
                        crossOrigin={undefined}
                    />
                </div>
            </div>
        </>
    );
}
export default Toggle;
