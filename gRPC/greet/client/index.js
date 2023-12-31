const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const { GreetServiceClient } = require('../proto/greet_grpc_pb');
const { GreetRequest } = require('../proto/greet_pb');

// TYPES OF GRPC API Implementation from Client

// 1.Unary API
function doGreet(client) {
    console.log("doGreet was Invoked");

    const req = new GreetRequest()
        .setFirstName('Clement');
    
    client.greet(req, (err, res) => {
        if(err) {
            return console.log(err);
        }

        console.log(`Greet: ${res.getResult()}`);
    })
}

// 2.Server Streaming
function doGreetManyTimes(client) {
    console.log('doGreetManyTimes is Invoked');

    const req = new GreetRequest()
        .setFirstName('Akshay');
    
    const call = client.greetManyTimes(req);

    call.on('data', (res) => {
        console.log(`GreetManyTimes: ${res.getResult()}`);
    })
}

// 3.Client Streaming
function doLongGreet(client) {
    console.log('doLongGreet was Invoked');

    const names = ["Akshay", "Mahesh", "AJ", "Ganesh"];
    const call = client.longGreet((err, res) => {
        if(err) {
            return console.log('err', err);
        }

        console.log(`LongGreet: ${res.getResult()}`);
    })
    
    names.map((name) => {
        return new GreetRequest().setFirstName(name);
    }).forEach((req) => call.write(req));

    call.end();
}

// 4.Bi-Directional streaming api client implementation
function doGreetEveryone(client) {
    console.log('doGreetEveryone is Invoked');

    const names = ["Akshay", "Mahesh", "AJ", "Ganesh"];
    const call = client.greetEveryone();

    call.on('data', (res) => {
        console.log(`GreetEveryone: ${res.getResult()}`);
    })

    names.map((name) => {
        return new GreetRequest().setFirstName(name);
    }).forEach((req) => call.write(req));

    call.end();
}

function doGreetWithDeadline(client, ms) {
    console.log('doGreetWithDeadline is Invoked');
    const req = new GreetRequest()
        .setFirstName("Akshay");

    client.greetWithDeadline(req, {
        deadline: new Date(Date.now() + ms)
    }, (err, res) => {
        if(err) {
            return console.log('err', err);
        }

        console.log(`GreetWithDeadline: ${res.getResult()}`);
    })
    
}

function main() {
    const tls = true;
    let creds;
    if(tls){
        const rootCert = fs.readFileSync('./ssl/ca.crt');
        creds = grpc.ChannelCredentials.createSsl(rootCert);
    } else {
        creds = grpc.ChannelCredentials.createInsecure();
    } 
    const client = new GreetServiceClient('localhost:50051', creds);

    doGreet(client);
    // doGreetManyTimes(client);
    // doLongGreet(client);
    // doGreetEveryone(client);
    // doGreetWithDeadline(client, 5000);
    // doGreetWithDeadline(client, 1000); // error deadline
    client.close();
}

main();