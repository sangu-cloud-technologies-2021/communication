const PROTO_PATH = "./sum.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const sum = require('./sum')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const customersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(customersProto.SumService.service, {
    sum: (call, callback) => {
        console.log(call.request)
        callback(null, {sum: sum(call.request.numbers)});
    },
});


server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");
server.start();
