'use client';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { EditorProps, Editor as ToastUIEditor } from '@toast-ui/react-editor';
import { useTheme } from 'next-themes';
import { ComponentProps, CSSProperties, forwardRef, useEffect } from 'react';
import { getToastUIEditorElement } from './utils';

const Editor = forwardRef<ComponentProps<typeof ToastUIEditor>['ref'], Props>(
  ({ height, ...props }, ref) => {
    const { resolvedTheme } = useTheme();

    useEffect(() => {
      const editorElement = getToastUIEditorElement();
      if (!editorElement) return;

      if (resolvedTheme === 'dark') {
        editorElement.classList.add('toastui-editor-dark');
      } else {
        editorElement.classList.remove('toastui-editor-dark');
      }
    }, [ref, resolvedTheme]);

    useEffect(() => {
      const editorContainerElement = getToastUIEditorElement().parentElement;
      if (!editorContainerElement || !height) return;

      editorContainerElement.style.setProperty('height', height);
    }, [ref, height]);

    return (
      <ToastUIEditor
        ref={ref}
        initialValue="<p></p>"
        initialEditType="wysiwyg"
        hideModeSwitch
        plugins={[colorSyntax]}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['image', 'table', 'link'],
        ]}
        {...props}
      />
    );
  },
);

type Props = EditorProps & {
  height?: CSSProperties['height'];
};

export default Editor;
