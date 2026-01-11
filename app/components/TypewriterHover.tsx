'use client';

import { useEffect } from 'react';

/**
 * TypewriterHover Component
 * Adds a typewriter effect to links with the "typewriter-hover" class.
 * When hovering over a link, the text specified in the data-hover-text attribute
 * will be typed out character-by-character next to the link.
 */
export default function TypewriterHover() {
    useEffect(() => {
        const links = document.querySelectorAll<HTMLAnchorElement>('.typewriter-hover');

        links.forEach((link) => {
            let typingInterval: NodeJS.Timeout;
            let deletingInterval: NodeJS.Timeout;
            let deleteTimeout: NodeJS.Timeout;
            let mouseHovered = false;

            const startDeletion = (span: HTMLElement) => {
                // Wait 2 seconds before starting deletion (like delayAfterTyping in TypeWriter.tsx)
                deleteTimeout = setTimeout(() => {
                    // Delete characters one at a time
                    deletingInterval = setInterval(() => {
                        const currentText = span.textContent || '';
                        if (currentText.length > 0) {
                            span.textContent = currentText.slice(0, -1);
                        } else {
                            clearInterval(deletingInterval);
                            span.remove(); // Clean up the DOM when fully deleted
                        }
                    }, 30); // Speed: 30ms per character
                }, 1500); // Wait 2000ms (2 seconds) before deleting
            };

            const handleMouseEnter = () => {
                const textToType = link.getAttribute('data-hover-text');
                if (!textToType) return;

                // Safety check: if span already exists, don't add another
                if (link.querySelector('.hover-text-span')) return;

                // Create the span to hold the generated text
                const span = document.createElement('span');
                span.className = 'hover-text-span';
                link.appendChild(span);

                let i = 0;
                mouseHovered = true;

                // Clear any existing intervals to prevent conflicts
                clearInterval(typingInterval);
                clearInterval(deletingInterval);
                clearTimeout(deleteTimeout);

                // Typing Loop
                typingInterval = setInterval(() => {
                    if (i < textToType.length) {
                        span.textContent += textToType.charAt(i);
                        i++;
                    } else {
                        clearInterval(typingInterval); // Stop when full text is typed
                        // If mouse has already left, start deletion sequence
                        if (!mouseHovered) {
                            startDeletion(span);
                        }
                    }
                }, 40); // Speed: 40ms per character
            };

            const handleMouseLeave = () => {
                mouseHovered = false;
                const span = link.querySelector('.hover-text-span') as HTMLElement;
                if (!span) return;

                // Check if typing is still in progress
                const textToType = link.getAttribute('data-hover-text') || '';
                const currentText = span.textContent || '';

                if (currentText.length >= textToType.length) {
                    // Typing is complete, start deletion immediately
                    startDeletion(span);
                }
                // If typing is still in progress, the typing interval will handle it
            };

            link.addEventListener('mouseenter', handleMouseEnter);
            link.addEventListener('mouseleave', handleMouseLeave);

            // Cleanup function to remove event listeners when component unmounts
            return () => {
                link.removeEventListener('mouseenter', handleMouseEnter);
                link.removeEventListener('mouseleave', handleMouseLeave);
                clearInterval(typingInterval);
                clearInterval(deletingInterval);
                clearTimeout(deleteTimeout);
            };
        });
    }, []);

    return null; // This component doesn't render anything
}
