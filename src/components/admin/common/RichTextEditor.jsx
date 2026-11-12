import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function RichTextEditor({ value, onChange, placeholder }) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    return (
        <div className="bg-white dark:bg-[#400d14] rounded-xl overflow-hidden border border-stone-200 dark:border-amber-500/30 text-stone-800 dark:text-cream-100">
            <ReactQuill
                theme="snow"
                value={value || ''}
                onChange={onChange}
                modules={modules}
                placeholder={placeholder || "Type content here..."}
                className="custom-quill-editor"
            />
        </div>
    );
}