const { SumResponse } = require('../proto/sum_pb');
const { PrimesResponse } = require('../proto/primes_pb');
const { AvgResponse } = require('../proto/avg_pb');
const { MaxResponse } = require('../proto/max_pb');

exports.sum = (call, callback) => {
    console.log("Sum was Invoked");
    const res = new SumResponse()
        .setResult(
            call.request.getFirstNumber() + call.request.getSecondNumber()
        );

    callback(null, res);    
}  

exports.primes = (call, _) => {
    console.log('Primes was Invoked');
    
    let k = 2;
    let number = call.request.getNumber();
    const res = new PrimesResponse();
    while(number > 1) {
        if(number % k == 0) {
            res.setResult(k)
            call.write(res);
            number = number / k;
        } else {
            k = k + 1;
        }
    }

    call.end();
}

exports.aVG = (call, callback) => {
    console.log('Avg was invoked');
    let count = 0.0;
    let total = 0.0;
  
    call.on('data', (req) => {
      total += req.getNumber();
      ++count;
    });
  
    call.on('end', () => {
      const res = new AvgResponse()
          .setResult(total / count);
  
      callback(null, res);
    });
  };

exports.max = (call, _) => {
    console.log('Max was Invoked');

    let max = 0;
    
    call.on('data', (req) => {
     let num = req.getNumber();
       if(num > max) {
        const res = new MaxResponse()
            .setResult(num);
        call.write(res);
        max = num;
       } 
    })
    call.on('end', () => call.end());
}