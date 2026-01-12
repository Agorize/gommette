export const uuid = () => {
  const s4 = () => Math.random().toString(36).substr(2, 4)

  return `${s4()}${s4()}-${s4()}${s4()}-${s4()}${s4()}-${s4()}-${s4()}${s4()}${s4()}`.toLowerCase()
}
