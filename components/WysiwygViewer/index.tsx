'use client';

import { Viewer, ViewerProps } from '@toast-ui/react-editor';
import { useTheme } from 'next-themes';
import { ComponentProps, forwardRef, useEffect } from 'react';
import { getToastUIViewerElement } from './utils';

const WysiwygViewer = forwardRef<ComponentProps<typeof Viewer>['ref'], Props>((props, ref) => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const editorElement = getToastUIViewerElement().parentElement;
    if (!editorElement) return;

    if (resolvedTheme === 'dark') {
      editorElement.classList.add('toastui-editor-dark');
    } else {
      editorElement.classList.remove('toastui-editor-dark');
    }
  }, [resolvedTheme]);

  return <Viewer ref={ref} {...props} />;
});

WysiwygViewer.displayName = 'WysiwygViewer';

type Props = ViewerProps;

export default WysiwygViewer;
