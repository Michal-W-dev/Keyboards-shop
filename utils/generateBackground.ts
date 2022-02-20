type Fn = (a: number, b: number, c: number) => string


const genBackground: Fn = (arrLength, topSatur, lowSatur) => {
  const randPercArr = Array(arrLength).fill(0).map((_, idx) => (
    idx * (100 / arrLength) + Math.ceil(Math.random() * (100 / arrLength))
  ))

  const linearBackground = Array(arrLength).fill(0).map((_, idx) => {
    const nextPercent = idx % 2 ? randPercArr[idx - 1] : randPercArr[idx]
    // Random saturation from 0 to 100
    const randSaturation = Math.ceil(Math.random() * (topSatur - lowSatur)) + lowSatur
    return `, hsl(210, 8%, ${randSaturation}%) ${nextPercent}%`
  })

  return `linear-gradient(25deg ${linearBackground.join('')})`
}

export default genBackground;