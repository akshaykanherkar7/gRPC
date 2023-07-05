const fs = require('fs');
const grpc = require('@grpc/grpc-js');
const { BlogServiceClient } = require('../proto/blog_grpc_pb');
const { Blog, BlogId } = require('../proto/blog_pb');

function creatBlog(client) {
    console.log('---creatBlog was Invoked---');

    return new Promise((resolve, reject) => {
        const req = new Blog()
            .setAuthorId('Akshay')
            .setTitle('My first blog')
            .setContent('Content of the first blog');

        client.creatBlog(req, (err, res) => {
            if(err) {
                reject(err);
            }

            console.log(`Blog was created: ${res}`);
            resolve(res.getId());
        })
    })
}

async function main() {
    const tls = true;
    let creds;
    if(tls){
        const rootCert = fs.readFileSync('./ssl/ca.crt');
        creds = grpc.ChannelCredentials.createSsl(rootCert);
    } else {
        creds = grpc.ChannelCredentials.createInsecure();
    } 
    const client = new BlogServiceClient('localhost:50051', creds);

    const id = await creatBlog(client);

    client.close();
}

main();