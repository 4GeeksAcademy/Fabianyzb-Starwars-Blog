export default function addThousandSeparator(num) {
    if (typeof num !== 'number' && typeof num !== 'string') return
  
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')
  }
  