import Typography from "@component/Typography";
import MarkdownEditor from "@component/MarkdownEditor";

function BoardContent({
    label,
    required = false,
    content,
    setContent,
}: {
    label: string;
    required?: boolean;
    content: string;
    setContent: (v: string) => void;
}) {
    return (
        <div className="my-10 flex flex-col p-10">
            <div className="mb-10 flex">
                <Typography text={`${label}`} type="Body" />
                {required && <Typography text="*" type="Body" color="text-warn" />}
            </div>
            <MarkdownEditor content={content} setContent={setContent} height={400} maxlength={1000} />
        </div>
    );
}

export default BoardContent;
