import React, { useState, useRef, useEffect } from "react";

const TextArea = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [code, setCode] = useState("// Start coding here...\n");
    const textareaRef = useRef(null);

    // Auto-resize textarea
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [code, isExpanded]);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleClear = () => {
        setCode("// Start coding here...\n");
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    // Handle tab key for indentation
    const handleKeyDown = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const newCode =
                code.substring(0, start) + "  " + code.substring(end);
            setCode(newCode);

            // Restore cursor position after state update
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 2;
            }, 0);
        }
    };

    return (
        <>
            {/* Floating Widget */}
            <div
                className={`fixed transition-all duration-300 ease-in-out z-50 ${
                    isExpanded
                        ? "bottom-0 right-0 w-1/2 h-1/2 rounded-tl-lg"
                        : "bottom-6 right-6 w-16 h-16 rounded-full"
                }`}
                style={{
                    backgroundColor: isExpanded ? "#1e1e1e" : "#4f46e5",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                }}
            >
                {!isExpanded ? (
                    // Collapsed state - floating button
                    <button
                        onClick={handleToggle}
                        className="w-full h-full flex items-center justify-center text-white hover:bg-indigo-600 transition-colors rounded-full"
                        title="Open Code Editor"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                        </svg>
                    </button>
                ) : (
                    // Expanded state - code editor
                    <div className="w-full h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 border-b border-gray-600">
                            <h3 className="text-white font-medium text-sm">
                                Code Practice
                            </h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleClear}
                                    className="text-gray-300 hover:text-white transition-colors text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
                                    title="Clear Code"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={handleToggle}
                                    className="text-gray-300 hover:text-white transition-colors"
                                    title="Minimize"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Code Editor */}
                        <div className="flex-1 flex">
                            {/* Line numbers */}
                            <div className="bg-gray-800 px-3 py-4 border-r border-gray-600">
                                <div
                                    className="text-gray-500 font-mono text-sm text-right"
                                    style={{ lineHeight: "1.5" }}
                                >
                                    {code.split("\n").map((_, index) => (
                                        <div
                                            key={index}
                                            style={{ height: "1.5em" }}
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Code textarea */}
                            <div className="flex-1 relative">
                                <textarea
                                    ref={textareaRef}
                                    value={code}
                                    onChange={handleCodeChange}
                                    onKeyDown={handleKeyDown}
                                    className="w-full h-full p-4 bg-transparent text-gray-100 font-mono text-sm resize-none outline-none"
                                    style={{
                                        fontFamily:
                                            'Consolas, Monaco, "Courier New", monospace',
                                        lineHeight: "1.5",
                                        tabSize: 2,
                                    }}
                                    placeholder="Start coding here..."
                                    spellCheck={false}
                                />

                                {/* Code syntax highlighting overlay */}
                                <div
                                    className="absolute top-0 left-0 p-4 pointer-events-none text-transparent font-mono text-sm"
                                    style={{ lineHeight: "1.5" }}
                                >
                                    <pre
                                        style={{
                                            margin: 0,
                                            fontFamily: "inherit",
                                        }}
                                    >
                                        <code
                                            dangerouslySetInnerHTML={{
                                                __html: code
                                                    .replace(
                                                        /\/\/.*$/gm,
                                                        '<span style="color: #6a9955">$&</span>'
                                                    )
                                                    .replace(
                                                        /(function|const|let|var|if|else|for|while|return|import|export|class|extends)/g,
                                                        '<span style="color: #569cd6">$1</span>'
                                                    )
                                                    .replace(
                                                        /(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g,
                                                        '<span style="color: #ce9178">$&</span>'
                                                    )
                                                    .replace(
                                                        /\b(\d+)\b/g,
                                                        '<span style="color: #b5cea8">$1</span>'
                                                    ),
                                            }}
                                        />
                                    </pre>
                                </div>
                            </div>
                        </div>

                        {/* Footer with stats */}
                        <div className="p-2 border-t border-gray-600 text-xs text-gray-400">
                            Lines: {code.split("\n").length} | Characters:{" "}
                            {code.length}
                        </div>
                    </div>
                )}
            </div>

            {/* Backdrop when expanded */}
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-20 z-40"
                    onClick={handleToggle}
                />
            )}
        </>
    );
};

export default TextArea;
