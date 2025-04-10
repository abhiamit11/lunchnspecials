import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";

const fontSizeArr = ['12px', '14px', '16px', '20px', '24px', '32px', '42px', '54px', '68px', '84px', '98px'];

const Size: any = Quill.import('attributors/style/size');
Size.whitelist = fontSizeArr;
Quill.register(Size, true);

const FontAttributor: any = Quill.import('attributors/class/font');
const fontArr = [
    'montserrat'
];
FontAttributor.whitelist = fontArr
Quill.register(FontAttributor, true);

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ size: fontSizeArr }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': fontArr }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

const QuillEditor = forwardRef(
    ({ readOnly, defaultValue, onTextChange, onSelectionChange }: any, ref: any) => {
        const containerRef = useRef(null);
        const defaultValueRef = useRef(defaultValue);
        const onTextChangeRef = useRef(onTextChange);
        const onSelectionChangeRef = useRef(onSelectionChange);

        useLayoutEffect(() => {
            onTextChangeRef.current = onTextChange;
            onSelectionChangeRef.current = onSelectionChange;
        });

        useEffect(() => {
            ref.current?.enable(!readOnly);
        }, [ref, readOnly]);

        useEffect(() => {
            const container: any = containerRef.current;
            const editorContainer = container.appendChild(
                container.ownerDocument.createElement("article"),
            );
            const quill = new Quill(editorContainer, {
                theme: "snow",
                modules: {
                    toolbar: toolbarOptions,
                },
            });

            ref.current = quill;

            if (defaultValueRef.current) {
                console.log('defaultValueRef.current', defaultValueRef.current)
                quill.root.innerHTML = defaultValueRef.current
                // quill.setContents(defaultValueRef.current);
            }

            quill.on(Quill.events.TEXT_CHANGE, () => {
                onTextChangeRef.current?.(quill.root.innerHTML);
            });

            quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
                onSelectionChangeRef.current?.(...args);
            });

            return () => {
                ref.current = null;
                container.innerHTML = "";
            };
        }, [ref]);

        return (
            <div ref={containerRef} className='dark:bg-white/80 dark:text-black'></div>
        )

    },
);

QuillEditor.displayName = "Editor";

export default QuillEditor;

QuillEditor.propTypes = {
    readOnly: PropTypes.bool,
    defaultValue: PropTypes.string,
    onTextChange: PropTypes.func,
    onSelectionChange: PropTypes.func,
};