import { useState, MouseEvent, useEffect } from 'react';

type FnReturn = [{ left: number, width: number }, string, (e: MouseEvent) => void, () => void]
let prevElement: EventTarget;

/**
 * Line animation on navbar, which follow hovered nav-links. Function return:
 * @param left - left pxs from hovered nav-link (div.underline styles)
 * @param width - width of hovered nav-link  (div.underline styles)
 * @param lineAnimation - change classes, if hovered (div.underline class)
 * @param handleMouseMoveEvents - navbar fns, detecting which nav-link is hovered
 */

export default function useLineAnimState(): FnReturn {
  const [left, setLeftPos] = useState(0);
  const [width, setWidth] = useState(46);
  const [lineAnimation, setLineAnimation] = useState('');


  const removeLineAnimation = () => setLeftPos(0)

  useEffect(() => {
    if (lineAnimation === 'lineDisappear') {
      // Remove line below button, immediately after resize
      window.addEventListener("resize", removeLineAnimation);
      return () => window.removeEventListener("resize", removeLineAnimation);
    }
  }, [lineAnimation]);


  const handleMouseMove = (e: MouseEvent) => {
    let { className, offsetLeft, offsetWidth } = e.target as HTMLElement;

    // Change state - on different buttons with class 'follow'
    if (className.includes('follow') && prevElement !== e.target) {
      setLeftPos(offsetLeft);
      setWidth(offsetWidth);
      setLineAnimation('lineAppear')
      prevElement = e.target
    }
  }
  const handleMouseOut = () => setLineAnimation('lineDisappear')
  return [{ left, width }, lineAnimation, handleMouseMove, handleMouseOut]
}