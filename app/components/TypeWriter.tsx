'use client';

import { useState, useEffect } from 'react';

interface TypeWriterProps {
    words: string[];
    typingSpeed?: number; // milliseconds per character
    deleteSpeed?: number; // milliseconds per character when deleting
    delayAfterTyping?: number; // milliseconds to wait after word is fully typed
    delayAfterDeleting?: number; // milliseconds to wait after word is fully deleted
}

export default function TypeWriter({
    words,
    typingSpeed = 100,
    deleteSpeed = 50,
    delayAfterTyping = 2000,
    delayAfterDeleting = 500,
}: TypeWriterProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const currentWord = words[currentWordIndex];

        if (isPaused) {
            // Wait before starting to delete or type next word
            const pauseTimeout = setTimeout(() => {
                setIsPaused(false);
            }, isDeleting ? delayAfterTyping : delayAfterDeleting);

            return () => clearTimeout(pauseTimeout);
        }

        if (!isDeleting && currentText === currentWord) {
            // Finished typing, pause then start deleting
            setIsPaused(true);
            setIsDeleting(true);
            return;
        }

        if (isDeleting && currentText === '') {
            // Finished deleting, move to next word, pause, then start typing
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
            setIsPaused(true);
            setIsDeleting(false);
            return;
        }

        // Type or delete one character
        const timeout = setTimeout(
            () => {
                if (isDeleting) {
                    setCurrentText(currentWord.substring(0, currentText.length - 1));
                } else {
                    setCurrentText(currentWord.substring(0, currentText.length + 1));
                }
            },
            isDeleting ? deleteSpeed : typingSpeed
        );

        return () => clearTimeout(timeout);
    }, [
        currentText,
        currentWordIndex,
        isDeleting,
        isPaused,
        words,
        typingSpeed,
        deleteSpeed,
        delayAfterTyping,
        delayAfterDeleting,
    ]);

    return (
        <span className="typewriter">
            {currentText}
            <span className="cursor">|</span>
        </span>
    );
}
