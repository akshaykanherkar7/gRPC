const pb = require('../proto/greet_pb');

// TYPES OF API in gRPC
// 1.Unary API
exports.greet = (call, callback) => {
    console.log("Greet was Invoked");
    const res = new pb.GreetResponse()
        .setResult(`Hello ${call.request.getFirstName()}`);

    callback(null, res);
}

// 2.Server Streaming
exports.greetManyTimes = (call, _) => {
    console.log('GreetManyTimes was Invoked');

    const res = new pb.GreetResponse();

    for(let i=0; i<10; i++) {
        res.setResult(`Hello ${call.request.getFirstName()} - number ${i}`);
        call.write(res);
    }
    
    call.end();
}

// 3.Client Streaming
exports.longGreet = (call, callback) => {
    console.log('LongGreek was Invoked');

    let greet = '';

    call.on('data', (req) => {
        greet += `Hello ${req.getFirstName()}\n`
    })

    call.on('end', () => {
        const res = new pb.GreetResponse()
            .setResult(greet);
         
        callback(null, res);
    })
}

// 4.Bi-Directional streaming API
exports.greetEveryone = (call, _) => {
    console.log('GreekEveryOne was Invoked');

    call.on('data', (req) => {
        console.log(`Recieved request: ${req}`) ;
        const res = new pb.GreetResponse()
            .setResult(`Hello ${req.getFirstName()}`);
            
        console.log(`Sending response: ${res}`);
        call.write(res);
    })

    call.on('end', () => call.end());
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
exports.greetWithDeadline = async (call, callback) => {
    console.log('GreetWithDeadline was Invoked');

    for(let i=0; i<3; i++) {
        if(call.cancelled) {
            return console.log('The client cancelled the request!')
        }
        await sleep(1000)
    }

    const res = new pb.GreetResponse()
        .setResult(`Hello ${call.request.getFirstName()}`);
        
    callback(null, res);
}