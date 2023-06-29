# gRPC
It's all about Google Remote Procedure Call(gRPC)

* ***gRPC (Google Remote Procedure Call) is an open-source remote procedure call (RPC) framework developed by Google. In simple words, gRPC allows you to define and implement efficient client-server communication by abstracting away the underlying network details.***

  **Here's how it works:**
  
    1) **Protocol Buffers (protobuf):** gRPC uses Protocol Buffers as the interface definition language. It allows you to define the structure of your data using a simple language-agnostic format. With protobuf, you define your data structures and services in a **.proto** file.
    2) **Code Generation:** Using the **.proto** file, you can generate client and server code in various programming languages. These generated code files provide classes, methods, and data structures that you can use to build your client and server applications.
    3) **Bi-directional Communication:** Once you have the generated code, you can establish bi-directional communication between the client and server. The client can call remote methods on the server using generated stubs, and the server can respond to those requests. This allows applications to communicate and exchange data efficiently over the network.
    4) **Efficiency and Performance:** gRPC is designed to be highly efficient and performant. It uses the HTTP/2 protocol as the underlying transport layer, enabling features like multiplexing, header compression, and server push. This results in faster and more efficient communication compared to traditional REST APIs.
    5) **Support for Multiple Programming Languages:** gRPC supports multiple programming languages, including JavaScript, Python, Java, Go, C++, and more. This allows you to build client and server applications in your preferred language while maintaining interoperability.
    6) **Support for Unary and Streaming Calls:** gRPC supports both unary and streaming RPCs. Unary RPCs involve a single request and a single response, while streaming RPCs allow the client and server to exchange a stream of messages.

***Overall, gRPC simplifies the process of building distributed systems by providing a standardized and efficient way for client-server communication. It abstracts away the complexities of network communication, serialization, and message passing, allowing developers to focus on defining their APIs and building robust applications.***
