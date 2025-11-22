import React, { useState, useRef, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';


const TINYMCE_KEY = 'keyforthemce';
const TextEditor=(props:any)=> {
    const editorRef = useRef(null as any);
    const [contentEditor, setContentEditor] = useState(props.value || '');

   const handleEditorChange = (content:any, editor:any) => {
     setContentEditor(content);
     // Call parent's onChange if provided
     if (props.onChange) {
       props.onChange(content);
     }
   }

  
  // Sync external value changes
  useEffect(() => {
    if (props.value !== undefined && props.value !== contentEditor) {
      setContentEditor(props.value);
    }
  }, [props.value]);

  // Load LaTeX for equation rendering
  useEffect(() => {
    // Load MathJax from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.min.js';
    script.async = true;
    script.onload = () => {
      // Trigger MathJax to process any existing equations
      const mathJax = (window as any).MathJax;
      if (mathJax) {
        mathJax.contentDocument = document;
        mathJax.typesetPromise?.([document.body]).catch((err: any) => console.log(err));
      }
    };
    document.head.appendChild(script);
  }, []);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const insertEquation = (editor: any) => {
    const equation = prompt('Enter LaTeX equation (e.g., \\frac{a}{b} or x^2 + y^2 = z^2):', '');
    if (equation) {
      const mathHtml = `<span class="mce-equation" data-equation="${equation.replace(/"/g, '&quot;')}">$$${equation}$$</span>`;
      editor.insertContent(mathHtml);
    }
  };

/* 
  file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
  edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
  view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
  insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
  format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
  tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
  table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
  help: { title: 'Help', items: 'help' } */


  
  return (
    <>
<Editor
        onInit={(evt: any, editor: any) => editorRef.current = editor}
        apiKey={TINYMCE_KEY}
        tinymceScriptSrc={'https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.7.0/tinymce.min.js'} 
  
        init={{
          height: props.height,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview','pagebreak',
            'anchor', 'searchreplace', 'visualblocks', 'visualchars', 'fullscreen', 'emoticons',
            'insertdatetime', 'media', 'table', 'template', 'help', 'wordcount', 'codesample'
          ],
          toolbar: 'undo redo | blocks | image link media codesample | mathequation |table|' +
            'bold italic superscript subscript |charmap emoticons | forecolor backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat',
          content_style: `body { font-family:Helvetica,Arial,sans-serif; font-size:16px }
            .mce-equation { background-color: #f0f0f0; padding: 4px 6px; border-radius: 3px; display: inline-block; margin: 0 2px; }`,
          placeholder: props.placeholder,
          setup: (editor: any) => {
            // Register custom equation button
            editor.ui.registry.addButton('mathequation', {
              text: '∑ Math',
              tooltip: 'Insert Mathematical Equation',
              onAction: () => insertEquation(editor)
            });

            // Add blur event handler
            if (props.onBlur) {
              editor.on('blur', () => {
                props.onBlur();
              });
            }
          }
        }}
        
        value={contentEditor}
        onEditorChange={handleEditorChange}
      />


  </>
  )
}

export default TextEditor