const Currency = (number) => {
  return number.toFixed(0).replace(/./g, function(c, i, a) {
    return i && c !== "." && ((a.length - i) % 3 === 0) ? '.' + c : c
  })
}

export default Currency
