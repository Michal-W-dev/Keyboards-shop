import { useState, useEffect } from 'react';
import genBackground from '../utils/generateBackground'


interface bgHook { [props: string]: number }

/**  
 * Generate dark background with light stripes
 * @param stripesNum - number of stripes
 * @param topSatur - top saturation (light stripes)
 * @param lowSatur - low saturation (dark stripes)
 * @returns backgroundImage
 * */

export default function useBackgroundHook({ stripesNum, topSatur, lowSatur }: bgHook) {
  const [backgroundImage, setBackgroundImage] = useState('')

  useEffect(() => {
    setBackgroundImage(genBackground(stripesNum, topSatur, lowSatur))
  }, [stripesNum, topSatur, lowSatur])

  return backgroundImage
}