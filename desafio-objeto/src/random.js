function calcular () {
    let n =1000000;
    let rn = [];
    for (let i = 0; i < n; i++){
        let numero = Math.random() * (1000 - 1) + 1;
        console.log(numero)
        rn.push(numero)
    }
    return rn
}

process.on('message', (msg) => {
   
    console.log(msg)
    const res = calcular()
    process.send(res)
})