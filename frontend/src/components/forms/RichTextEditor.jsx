import React, { useState, useRef, useEffect } from 'react';
import {
    FiBold, FiItalic, FiUnderline, FiList, FiLink, FiCode
} from 'react-icons/fi';

const RichTextEditor = ({
    label,
    name,
    value,
    onChange,
    error = '',
    required = false,
    placeholder = 'Start writing...',
    minHeight = '200px',
    className = '',
}) => {
    const [content, setContent] = useState(value || '');
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && content !== editorRef.current.innerHTML) {
            setContent(value || '');
            if (editorRef.current) {
                editorRef.current.innerHTML = value || '';
            }
        }
    }, [value]);

    const handleInput = () => {
        const newContent = editorRef.current.innerHTML;
        setContent(newContent);
        onChange({ target: { name, value: newContent } });
    };

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current.focus();
    };

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            execCommand('createLink', url);
        }
    };

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="border border-gray-300 rounded-lg overflow-hidden">
                {/* Toolbar */}
                <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-1 flex-wrap">
                    <button
                        type="button"
                        onClick={() => execCommand('bold')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Bold"
                    >
                        <FiBold />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('italic')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Italic"
                    >
                        <FiItalic />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('underline')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Underline"
                    >
                        <FiUnderline />
                    </button>
                    <div className="w-px bg-gray-300 mx-1" />
                    <button
                        type="button"
                        onClick={() => execCommand('insertUnorderedList')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Bullet List"
                    >
                        <FiList />
                    </button>
                    <button
                        type="button"
                        onClick={insertLink}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Insert Link"
                    >
                        <FiLink />
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('formatBlock', '<pre>')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Code Block"
                    >
                        <FiCode />
                    </button>
                </div>

                {/* Editor */}
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    className="p-3 outline-none overflow-auto prose max-w-none"
                    style={{ minHeight }}
                    data-placeholder={placeholder}
                />
            </div>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

            <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
        }
      `}</style>
        </div>
    );
};

export default RichTextEditor;
