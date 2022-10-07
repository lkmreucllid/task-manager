const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be positive')
            }
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async() => {
    const sum = await add(78, 65)
    console.log(sum)
    const sum1 = await add(sum, -30)
    console.log(sum1)
    const sum3 = await add(sum1, 5)
    return sum3
}

doWork().then((result) => {
    console.log('result', result)
}).catch((e) => {
    console.log(e)
})