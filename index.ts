/** Получение случайного числа в диапазоне 0-62 */
const getRandom = () => Math.floor(Math.random() * 62);

/** Преобразование случайного кода в код символов латиницы и цифр */
const randomToCode = (code: number) => {
  if (code > 35) return code + 61;
  if (code > 9) return code + 55;
  return code + 48;
};

const randomToSymbol = (a: number) => String.fromCharCode(randomToCode(a));

const getRandomSymbol = (): string => randomToSymbol(getRandom());

const wait = (ms: number) => new Promise(res => setTimeout(res, ms))

/** main program class and types */
type NumRange = {
  position: number,
  length: number
}
type SymbolUnit = {
  symbol: string,
  isNum: boolean
}

class RandomString {

  numberCount = 0;
  symbolCount = 0;
  symbols: Array<SymbolUnit> = []
  numberRanges: Array<NumRange> = []

  constructor(len: number) {
    for (let x = 0; x < len; x++) {
      const symbol = getRandomSymbol();
      const isNum = !isNaN(parseInt(symbol))

      this.symbols.push({
        symbol,
        isNum
      });
      isNum ? this.numberCount++ : this.symbolCount++
    }
  }

  replaceSymbols(char: string) {
    this.symbols.forEach(x => { if (!x.isNum) x.symbol = char })
  }
  replaceNums(char: string) {
    this.symbols.forEach(x => { if (x.isNum) x.symbol = char })
  }
  getString(): string {
    return this.symbols.map(x => x.symbol).join('')
  }
  getStrLengt() {
    return { symbols: this.symbolCount, nums: this.numberCount }
  }
}

const sourceBanner = document.querySelector('.source-string')
const repl1Banner = document.querySelector('.repl-1')
const repl2Banner = document.querySelector('.repl-2')
const numBn = document.querySelector('.num-bn')

const reset = () => [sourceBanner, repl1Banner, repl2Banner, numBn].forEach(el => el!.innerHTML = '')


const start = async () => {
  reset()

  const len = window.prompt('Введите длину строки')
  if (!len || isNaN(parseInt(len))) {
    alert('Неверный ввод !')
    return
  }

  const rnd = new RandomString(parseInt(len))
  sourceBanner!.innerHTML = rnd.getString()
  await wait(1000)


  const repl1 = window.prompt('Введите первый символ для замены!')
  if (!repl1 || repl1.length > 1) {
    alert('Неверный ввод !')
    return
  }
  rnd.replaceSymbols(repl1)
  repl1Banner!.innerHTML = rnd.getString()
  await wait(1000)

  const repl2 = window.prompt('Введите второй символ для замены!')
  if (!repl2 || repl2.length > 1) {
    alert('Неверный ввод !')
    return
  }
  rnd.replaceNums(repl2)
  repl2Banner!.innerHTML = rnd.getString()
  await wait(500)
  const counters = rnd.getStrLengt()
  numBn!.innerHTML = `Количество символов: ${counters.symbols} и ${counters.nums}`

}

const main = () => {
  document.querySelector('.start-btn')!.addEventListener('click', start)
}

main()


