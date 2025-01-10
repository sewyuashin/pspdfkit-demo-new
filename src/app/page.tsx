'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    const container = containerRef.current;

    const loadPSPDFKit = async () => {
      try {
        console.log('Loading PSPDFKit...');
        const PSPDFKit = await import('pspdfkit');
        console.log('PSPDFKit loaded successfully');

        if (container) {
          // Unload any existing instance
          if (instanceRef.current) {
            PSPDFKit.default.unload(container);
          }

          console.log('Initializing viewer...');
          instanceRef.current = await PSPDFKit.default.load({
            container,
            document: '/pspdfkit-web-demo.pdf',
            baseUrl: '/pspdfkit-lib',
            toolbarItems: [
              ...PSPDFKit.default.defaultToolbarItems,
              { type: 'sidebar-thumbnails' },
              { type: 'sidebar-document-outline' }
            ],
          });
          console.log('Viewer initialized successfully');
        }
      } catch (error) {
        console.error('Error loading PSPDFKit:', error);
      }
    };

    loadPSPDFKit();

    return () => {
      if (container && instanceRef.current) {
        import('pspdfkit').then((PSPDFKit) => {
          PSPDFKit.default.unload(container);
        });
      }
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="w-full h-screen" ref={containerRef} />
    </main>
  );
}
