"use client"
import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import {LayoutGroup, motion} from "framer-motion"

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0)
  const interval = React.useRef()
  const [isRunning, setIsRunning] = React.useState(false)
  const [selectedColor, setSelectedColor] = React.useState(COLORS[0])
  
  function getColor(time) {
    const colorIndex = time % COLORS.length;
    console.log(time)
    console.log(COLORS[colorIndex])
    return COLORS[colorIndex]
  }

  React.useEffect(() => {
    console.log("IS RUNNING", isRunning)
    if (isRunning) {
      interval.current = setInterval(() => {
        setTimeElapsed(prevState => {
          const newTimeElapsed = prevState + 1;
          setSelectedColor(getColor(newTimeElapsed));
          return newTimeElapsed;
        });
      }, 1000)
    }
    return () => {
      clearInterval(interval.current)
    }
  }, [isRunning])

  const widgetId = React.useId()

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div
                layout="position"
                layoutId={widgetId}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30
                }}
                  className={
                    styles.selectedColorOutline
                  }
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={() => {
            setIsRunning(prevState => !prevState)

          }}>
            {isRunning ? <Pause/> : <Play />}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button onClick={() => {
            setIsRunning(false)
            setSelectedColor(COLORS[0])
            setTimeElapsed(0)
          }}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
