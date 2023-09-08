import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

import "./MarkdownEditor.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

function MarkdownEditor({
    content,
    setContent,
    height = 200,
}: {
    content: string;
    setContent: (v: string) => void;
    height?: number;
}) {
    const onChange = (value?: string) => {
        if (value) {
            setContent(value);
        } else {
            setContent("");
        }
    };

    // TODO: tailwindcss @base 스타일 (css reset 관련) 으로 인해 ol, ul 스타일 표시 안되는 이슈 수정 필요
    // TODO: presinged s3 업로드
    // TODO: 이미지 드래그 앤 드롭 구현
    // TODO: 스크롤 이벤트
    return (
        <>
            <div data-color-mode="light" className="hidden lg:block">
                <MDEditor
                    value={content}
                    onChange={onChange}
                    extraCommands={[]}
                    preview="live"
                    visibleDragbar={false}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                    }}
                    height={height}
                />
            </div>
            <div data-color-mode="light" className="block lg:hidden">
                <MDEditor
                    value={content}
                    onChange={onChange}
                    extraCommands={[]}
                    preview="live"
                    visibleDragbar={false}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                    }}
                    height={height}
                />
            </div>
        </>
    );
}

export default MarkdownEditor;
