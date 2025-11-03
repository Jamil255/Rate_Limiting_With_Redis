export const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'data',
        product: 'iron',
        id: 22,
      })
    }, 3000)
  })
}
