import React, { useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css'; // Import the Quill stylesheet
import Quill from "quill"

const TextEditor = () => {
    const editorRef = useRef(null); // Reference to the editor container
    const quillRef = useRef(null); // Reference to the Quill instance
    const [editorContent, setEditorContent] = useState(''); // State to store the content

    useEffect(() => {
        // Initialize Quill only once the component is mounted
        if (editorRef.current && !quillRef.current) {
            // Initialize Quill editor
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow', // Choose a theme
                modules: {
                    toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['bold', 'italic', 'underline'],
                        [{ 'align': [] }],
                        ['link'],
                        ['image'],
                        ['blockquote'],
                        ['code-block']
                    ],
                },
            });

            // Set up event listener to capture changes in the editor
            quillRef.current.on('text-change', () => {
                setEditorContent(quillRef.current.root.innerHTML);
            });
        }

        return () => {
            // Clean up Quill instance when component unmounts
            if (quillRef.current) {
                quillRef.current = null;
            }
        };
    }, []);

    return (
        <div>
            <div ref={editorRef} style={{ minHeight: '300px' }}></div> {/* Quill editor */}
            <div>
                <h3>Editor Content:</h3>
                <div>{editorContent}</div> {/* Display the editor's content */}
            </div>
        </div>
    );
};

export default TextEditor;
