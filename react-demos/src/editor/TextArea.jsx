import React, { useState, useRef, useEffect } from "react";
import "./TextArea.css";

const TextArea = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [code, setCode] = useState("");
    const [dimensions, setDimensions] = useState({ width: 50, height: 90 });
    const [position, setPosition] = useState({ right: 0, bottom: 0 });
    const textareaRef = useRef(null);
    const widgetRef = useRef(null);
    const isResizing = useRef(false);
    const isDragging = useRef(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        // Focus on textarea when expanding
        if (!isExpanded) {
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                    // Position cursor at the beginning
                    textareaRef.current.selectionStart = 0;
                    textareaRef.current.selectionEnd = 0;
                }
            }, 100); // Small delay to ensure the component is fully rendered
        }
    };

    const handleClear = () => {
        setCode("");
        // Focus and position cursor at the beginning after clearing
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.selectionStart = 0;
                textareaRef.current.selectionEnd = 0;
            }
        }, 0);
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    // Syntax highlighting function - returns React elements
    const highlightSyntax = (code) => {
        const keywords = [
            "const",
            "let",
            "var",
            "function",
            "return",
            "if",
            "else",
            "for",
            "while",
            "do",
            "switch",
            "case",
            "break",
            "continue",
            "try",
            "catch",
            "finally",
            "throw",
            "new",
            "this",
            "typeof",
            "instanceof",
            "in",
            "of",
            "import",
            "export",
            "from",
            "default",
            "as",
            "class",
            "extends",
            "constructor",
            "super",
            "static",
            "async",
            "await",
            "Promise",
            "true",
            "false",
            "null",
            "undefined",
            "void",
            "delete",
            "React",
            "useState",
            "useEffect",
            "useContext",
            "useReducer",
            "useCallback",
            "useMemo",
            "useRef",
            "Component",
            "PureComponent",
            "Fragment",
            "createElement",
            "cloneElement",
            "props",
            "state",
            "render",
            "componentDidMount",
            "componentDidUpdate",
            "componentWillUnmount",
        ];

        const lines = code.split("\n");

        return lines.map((line, lineIndex) => {
            const tokens = tokenizeLine(line, keywords);

            return (
                <div key={lineIndex}>
                    {tokens.map((token, tokenIndex) => {
                        const { text, type } = token;
                        const className = `syntax-${type}`;

                        return (
                            <span key={tokenIndex} className={className}>
                                {text}
                            </span>
                        );
                    })}
                    {lineIndex < lines.length - 1 && "\n"}
                </div>
            );
        });
    };

    // Tokenize a single line of code
    const tokenizeLine = (line, keywords) => {
        const tokens = [];
        let current = "";
        let i = 0;

        const addToken = (text, type = "text") => {
            if (text) {
                tokens.push({ text, type });
            }
        };

        const flushCurrent = () => {
            if (current) {
                // Check if current token is a keyword
                if (keywords.includes(current)) {
                    addToken(current, "keyword");
                } else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(current)) {
                    // Check if it's a function (look ahead for parentheses)
                    const remainingLine = line.slice(i).trim();
                    if (remainingLine.startsWith("(")) {
                        addToken(current, "function");
                    } else {
                        addToken(current, "text");
                    }
                } else if (/^\d+\.?\d*$/.test(current)) {
                    addToken(current, "number");
                } else {
                    addToken(current, "text");
                }
                current = "";
            }
        };

        while (i < line.length) {
            const char = line[i];
            const nextChar = line[i + 1];

            // Handle comments
            if (char === "/" && nextChar === "/") {
                flushCurrent();
                addToken(line.slice(i), "comment");
                break;
            }

            if (char === "/" && nextChar === "*") {
                flushCurrent();
                let commentEnd = line.indexOf("*/", i + 2);
                if (commentEnd === -1) commentEnd = line.length;
                else commentEnd += 2;
                addToken(line.slice(i, commentEnd), "comment");
                i = commentEnd;
                continue;
            }

            // Handle strings
            if (char === '"' || char === "'" || char === "`") {
                flushCurrent();
                const quote = char;
                let stringEnd = i + 1;
                let escaped = false;

                while (stringEnd < line.length) {
                    if (escaped) {
                        escaped = false;
                    } else if (line[stringEnd] === "\\") {
                        escaped = true;
                    } else if (line[stringEnd] === quote) {
                        stringEnd++;
                        break;
                    }
                    stringEnd++;
                }

                addToken(line.slice(i, stringEnd), "string");
                i = stringEnd;
                continue;
            }

            // Handle operators and punctuation
            if (/[+\-*/%=!<>&|^~?:;,.\[\]{}()]/.test(char)) {
                flushCurrent();
                addToken(char, "operator");
                i++;
                continue;
            }

            // Handle whitespace
            if (/\s/.test(char)) {
                flushCurrent();
                let whitespace = "";
                while (i < line.length && /\s/.test(line[i])) {
                    whitespace += line[i];
                    i++;
                }
                addToken(whitespace, "text");
                continue;
            }

            // Build up current token
            current += char;
            i++;
        }

        flushCurrent();
        return tokens;
    };

    // Handle tab key for indentation and auto-completion
    const handleKeyDown = (e) => {
        const textarea = e.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // Tab key for indentation
        if (e.key === "Tab") {
            e.preventDefault();
            const newCode =
                code.substring(0, start) + "  " + code.substring(end);
            setCode(newCode);

            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + 2;
            }, 0);
            return;
        }

        // Auto-completion for brackets, parentheses, and braces
        const pairs = {
            "(": ")",
            "[": "]",
            "{": "}",
            '"': '"',
            "'": "'",
        };

        if (pairs[e.key]) {
            e.preventDefault();
            const selectedText = code.substring(start, end);
            const openChar = e.key;
            const closeChar = pairs[e.key];

            let newCode;
            let newCursorPos;

            if (selectedText) {
                // Wrap selected text
                newCode =
                    code.substring(0, start) +
                    openChar +
                    selectedText +
                    closeChar +
                    code.substring(end);
                newCursorPos = end + 2;
            } else {
                // Insert pair and position cursor between them
                newCode =
                    code.substring(0, start) +
                    openChar +
                    closeChar +
                    code.substring(end);
                newCursorPos = start + 1;
            }

            setCode(newCode);
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = newCursorPos;
            }, 0);
            return;
        }

        // Handle closing characters - skip if next character is the same
        if (
            e.key === ")" ||
            e.key === "]" ||
            e.key === "}" ||
            e.key === '"' ||
            e.key === "'"
        ) {
            const nextChar = code.charAt(start);
            if (nextChar === e.key) {
                e.preventDefault();
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 1;
                }, 0);
                return;
            }
        }

        // Handle backspace for auto-removal of pairs
        if (e.key === "Backspace" && start === end) {
            const prevChar = code.charAt(start - 1);
            const nextChar = code.charAt(start);
            const pairToRemove = {
                "(": ")",
                "[": "]",
                "{": "}",
                '"': '"',
                "'": "'",
            };

            if (pairToRemove[prevChar] === nextChar) {
                e.preventDefault();
                const newCode =
                    code.substring(0, start - 1) + code.substring(start + 1);
                setCode(newCode);
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start - 1;
                }, 0);
                return;
            }
        }

        // Handle Enter key for auto-indentation in braces
        if (e.key === "Enter") {
            const prevChar = code.charAt(start - 1);
            const nextChar = code.charAt(start);

            if (prevChar === "{" && nextChar === "}") {
                e.preventDefault();

                // Get current line indentation
                const lineStart = code.lastIndexOf("\n", start - 1) + 1;
                const currentLine = code.substring(lineStart, start - 1);
                const indent = currentLine.match(/^\s*/)[0];

                const newCode =
                    code.substring(0, start) +
                    "\n" +
                    indent +
                    "  " +
                    "\n" +
                    indent +
                    code.substring(start);

                setCode(newCode);
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd =
                        start + indent.length + 3;
                }, 0);
                return;
            }
        }
    };

    // Resize functionality
    const handleMouseDown = (e, direction) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing.current = direction;

        const startX = e.clientX;
        const startY = e.clientY;
        const rect = widgetRef.current.getBoundingClientRect();

        // Store initial position and size
        const initialLeft = rect.left;
        const initialTop = rect.top;
        const initialWidth = rect.width;
        const initialHeight = rect.height;
        const initialRight = window.innerWidth - rect.right;
        const initialBottom = window.innerHeight - rect.bottom;

        const handleMouseMove = (e) => {
            if (!isResizing.current) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            let newWidth = initialWidth;
            let newHeight = initialHeight;
            let newRight = initialRight;
            let newBottom = initialBottom;

            // Handle horizontal resizing
            if (direction.includes("right")) {
                // Expanding to the right - only change width
                newWidth = Math.max(
                    300,
                    Math.min(
                        window.innerWidth - initialLeft - 20,
                        initialWidth + deltaX
                    )
                );
            }
            if (direction.includes("left")) {
                // Expanding to the left - change both width and right position
                const maxWidth = window.innerWidth - initialRight - 20;
                newWidth = Math.max(
                    300,
                    Math.min(maxWidth, initialWidth - deltaX)
                );
                // Adjust right position to keep the right edge fixed
                newRight = window.innerWidth - (initialLeft + initialWidth);
            }

            // Handle vertical resizing
            if (direction.includes("bottom")) {
                // Expanding downward - only change height
                newHeight = Math.max(
                    200,
                    Math.min(
                        window.innerHeight - initialTop - 20,
                        initialHeight + deltaY
                    )
                );
            }
            if (direction.includes("top")) {
                // Expanding upward - change both height and bottom position
                const maxHeight = window.innerHeight - initialBottom - 20;
                newHeight = Math.max(
                    200,
                    Math.min(maxHeight, initialHeight - deltaY)
                );
                // Adjust bottom position to keep the bottom edge fixed
                newBottom = window.innerHeight - (initialTop + initialHeight);
            }

            // Convert to percentages for state
            const widthPercent = (newWidth / window.innerWidth) * 100;
            const heightPercent = (newHeight / window.innerHeight) * 100;
            const rightPercent = (newRight / window.innerWidth) * 100;
            const bottomPercent = (newBottom / window.innerHeight) * 100;

            setDimensions({ width: widthPercent, height: heightPercent });
            setPosition({ right: rightPercent, bottom: bottomPercent });
        };

        const handleMouseUp = () => {
            isResizing.current = false;
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };

        // Set cursor for the entire document during resize
        document.body.style.cursor = getResizeCursor(direction);
        document.body.style.userSelect = "none";

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const getResizeCursor = (direction) => {
        const cursors = {
            top: "n-resize",
            right: "e-resize",
            bottom: "s-resize",
            left: "w-resize",
            "top left": "nw-resize",
            "top right": "ne-resize",
            "bottom left": "sw-resize",
            "bottom right": "se-resize",
        };
        return cursors[direction] || "default";
    };

    // Drag functionality for moving the editor
    const handleDragStart = (e) => {
        // Don't start drag if clicking on buttons
        if (
            e.target.tagName === "BUTTON" ||
            e.target.tagName === "SVG" ||
            e.target.tagName === "PATH"
        ) {
            return;
        }

        e.preventDefault();
        isDragging.current = true;

        const startX = e.clientX;
        const startY = e.clientY;
        const rect = widgetRef.current.getBoundingClientRect();

        const startRight = window.innerWidth - rect.right;
        const startBottom = window.innerHeight - rect.bottom;

        const handleDragMove = (e) => {
            if (!isDragging.current) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            // Calculate new position
            const newRight = startRight - deltaX;
            const newBottom = startBottom - deltaY;

            // Constrain to screen boundaries
            const maxRight = window.innerWidth - rect.width;
            const maxBottom = window.innerHeight - rect.height;

            const constrainedRight = Math.max(0, Math.min(maxRight, newRight));
            const constrainedBottom = Math.max(
                0,
                Math.min(maxBottom, newBottom)
            );

            // Convert to percentages
            const rightPercent = (constrainedRight / window.innerWidth) * 100;
            const bottomPercent =
                (constrainedBottom / window.innerHeight) * 100;

            setPosition({ right: rightPercent, bottom: bottomPercent });
        };

        const handleDragEnd = () => {
            isDragging.current = false;
            document.removeEventListener("mousemove", handleDragMove);
            document.removeEventListener("mouseup", handleDragEnd);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };

        // Set cursor and prevent text selection
        document.body.style.cursor = "move";
        document.body.style.userSelect = "none";

        document.addEventListener("mousemove", handleDragMove);
        document.addEventListener("mouseup", handleDragEnd);
    };

    return (
        <>
            {/* Floating Widget */}
            <div
                ref={widgetRef}
                className={`floating-widget ${
                    isExpanded ? "expanded" : "collapsed"
                }`}
                style={
                    isExpanded
                        ? {
                              width: `${dimensions.width}%`,
                              height: `${dimensions.height}%`,
                              right: `${position.right}%`,
                              bottom: `${position.bottom}%`,
                          }
                        : {}
                }
            >
                {!isExpanded ? (
                    // Collapsed state - floating button
                    <button
                        onClick={handleToggle}
                        className="floating-button"
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
                    <div className="editor-container">
                        {/* Resize Handles */}
                        <div
                            className="resize-handle resize-top"
                            onMouseDown={(e) => handleMouseDown(e, "top")}
                        ></div>
                        <div
                            className="resize-handle resize-right"
                            onMouseDown={(e) => handleMouseDown(e, "right")}
                        ></div>
                        <div
                            className="resize-handle resize-bottom"
                            onMouseDown={(e) => handleMouseDown(e, "bottom")}
                        ></div>
                        <div
                            className="resize-handle resize-left"
                            onMouseDown={(e) => handleMouseDown(e, "left")}
                        ></div>
                        <div
                            className="resize-handle resize-top-left"
                            onMouseDown={(e) => handleMouseDown(e, "top left")}
                        ></div>
                        <div
                            className="resize-handle resize-top-right"
                            onMouseDown={(e) => handleMouseDown(e, "top right")}
                        ></div>
                        <div
                            className="resize-handle resize-bottom-left"
                            onMouseDown={(e) =>
                                handleMouseDown(e, "bottom left")
                            }
                        ></div>
                        <div
                            className="resize-handle resize-bottom-right"
                            onMouseDown={(e) =>
                                handleMouseDown(e, "bottom right")
                            }
                        ></div>

                        {/* Header */}
                        <div
                            className="editor-header"
                            onMouseDown={handleDragStart}
                        >
                            <h3 className="editor-title">Code Practice</h3>
                            <div className="header-buttons">
                                <button
                                    onClick={handleClear}
                                    className="clear-button"
                                    title="Clear Code"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={handleToggle}
                                    className="minimize-button"
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
                        <div className="editor-content">
                            {/* Line numbers */}
                            <div className="line-numbers">
                                {code.split("\n").map((_, index) => (
                                    <div key={index} className="line-number">
                                        {index + 1}
                                    </div>
                                ))}
                            </div>

                            {/* Code textarea */}
                            <div className="textarea-container">
                                {/* Syntax highlighting overlay */}
                                <div className="syntax-overlay">
                                    {highlightSyntax(code)}
                                </div>
                                <textarea
                                    ref={textareaRef}
                                    value={code}
                                    onChange={handleCodeChange}
                                    onKeyDown={handleKeyDown}
                                    className="code-textarea"
                                    placeholder="Start coding here..."
                                    spellCheck={false}
                                />
                            </div>
                        </div>

                        {/* Footer with stats */}
                        <div className="editor-footer">
                            Lines: {code.split("\n").length} | Characters:{" "}
                            {code.length}
                        </div>
                    </div>
                )}
            </div>

            {/* Backdrop when expanded */}
            {isExpanded && <div className="backdrop" onClick={handleToggle} />}
        </>
    );
};

export default TextArea;
