'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { gsap } from 'gsap'

const MagicText = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = false,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  shiny = false,
  shinySpeed = 5,
  mode = 'sentence', // 'sentence' | 'continuous'
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnVisible)

  const cursorRef = useRef(null)
  const containerRef = useRef(null)

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])

  // For continuous mode, build one full string that contains \n between items
  const continuousFullText = useMemo(() => textArray.join('\n'), [textArray])

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed
    const { min, max } = variableSpeed
    return Math.random() * (max - min) + min
  }, [variableSpeed, typingSpeed])

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return
    return textColors[currentTextIndex % textColors.length]
  }

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [startOnVisible])

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 })
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true
      })
    }
  }, [showCursor, cursorBlinkDuration])

  useEffect(() => {
    if (!isVisible) return

    let timeout
    // choose the current text to work on depending on mode
    const targetText =
      mode === 'continuous'
        ? continuousFullText
        : textArray[currentTextIndex]

    const processedText = reverseMode
      ? targetText.split('').reverse().join('')
      : targetText

    const runTyping = () => {
      // If mode is continuous and we want a single pass that stays, we never set isDeleting
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false)

          if (currentTextIndex === textArray.length - 1 && !loop) return
          if (onSentenceComplete)
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex)

          setCurrentTextIndex(prev => (prev + 1) % textArray.length)
          setCurrentCharIndex(0)

          timeout = setTimeout(() => {}, pauseDuration)
        } else {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1))
          }, deletingSpeed)
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev + processedText[currentCharIndex])
            setCurrentCharIndex(prev => prev + 1)
          }, variableSpeed ? getRandomSpeed() : typingSpeed)
        } else {
          // finished typing current target
          if (mode === 'continuous') {
            // In continuous mode: stop here unless loop is true.
            if (loop) {
              timeout = setTimeout(() => setIsDeleting(true), pauseDuration)
            } else {
              // stay put (do not delete, do not advance). call callback once.
              if (onSentenceComplete) onSentenceComplete(processedText, 0)
            }
          } else {
            // sentence mode (original behavior)
            if (!loop && currentTextIndex === textArray.length - 1) return
            timeout = setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        }
      }
    }

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(runTyping, initialDelay)
    } else {
      runTyping()
    }

    return () => clearTimeout(timeout)
    // note: minimal deps to avoid over-firing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    mode,
    continuousFullText
  ])

  const hideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < (mode === 'continuous' ? continuousFullText.length : textArray[currentTextIndex].length) ||
      isDeleting)

  // Render displayedText with line breaks
  const renderWithLineBreaks = textToRender =>
    textToRender.split('\n').map((line, i, arr) => (
      <React.Fragment key={i}>
        <span>{line}</span>
        {i < arr.length - 1 && <br />}
      </React.Fragment>
    ))

  return (
    <Component
      ref={containerRef}
      className={`inline-block tracking-tight ${className}`}
      {...props}
    >
      <span
        className={`${shiny ? 'animate-shine bg-clip-text text-transparent' : ''} inline`}
        style={{
          color: getCurrentTextColor() || 'inherit',
          backgroundImage: shiny
            ? 'linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 60%)'
            : 'none',
          backgroundSize: '200% 100%',
          animationDuration: `${shinySpeed}s`,
          WebkitBackgroundClip: shiny ? 'text' : undefined
        }}
      >
        {renderWithLineBreaks(displayedText)}
      </span>

      {showCursor && (
        <span
          ref={cursorRef}
          className={`ml-1 inline-block ${hideCursor ? 'hidden' : ''} ${cursorClassName}`}
        >
          {cursorCharacter}
        </span>
      )}
    </Component>
  )
}

export default MagicText
