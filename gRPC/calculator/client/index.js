const grpc = require('@grpc/grpc-js');
const { CalculatorServiceClient } = require('../proto/calculator_grpc_pb');
const { SumRequest } = require('../proto/sum_pb');
const { PrimesRequest } = require('../proto/primes_pb');
const { AvgRequest } = require('../proto/avg_pb');
const { MaxRequest } = require('../proto/max_pb');

function doSum(client) {
    console.log("doSum was Invoked");

    const req = new SumRequest()
        .setFirstNumber(1)
        .setSecondNumber(2);

    client.sum(req, (err, res) => {
        if(err) {
            return console.log('err', err);
        }

        console.log(`Sum is: ${res.getResult()}`);
    })
}

function primeNumber(client) {
    console.log('primeNumber was Invoked');

    const req = new PrimesRequest()
        .setNumber(1290392840);

    const call = client.primes(req);

    call.on('data', (res) => {
        console.log(`Prime is: ${res.getResult()}`);
    })
}

function doAvg(client) {
    console.log('doAvg was invoked');
    const numbers = [...Array(11).keys()].slice(1);
    const call = client.aVG((err, res) => {
      if (err) {
        return console.error(err);
      }
  
      console.log(`Avg: ${res.getResult()}`);
    });
  
    numbers.map((number) => {
      return new AvgRequest().setNumber(number);
    }).forEach((req) => call.write(req));
  
    call.end();
}

function doMax(client) {
    console.log('doMax is Invoked');
    
    const numbers = [1,5,3,6,2,20];
    const call = client.max()
    
    call.on('data', (res) => {
        console.log(`Max number is: ${res.getResult()}`)
    })

    numbers.map((num) => {
        return new MaxRequest().setNumber(num);
    }).forEach((req) => call.write(req));

    call.end();
}

function main() {
    const creds = grpc.ChannelCredentials.createInsecure();
    const client = new CalculatorServiceClient('localhost:50051', creds);

    // doSum(client);
    // primeNumber(client);
    // doAvg(client);
    doMax(client);
    client.close();
}

main();