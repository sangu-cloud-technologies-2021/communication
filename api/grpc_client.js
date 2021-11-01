const PROTO_PATH = "./sum.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const SumService = grpc.loadPackageDefinition(packageDefinition).SumService;

const client = new SumService(
    "localhost:30043",
    grpc.credentials.createInsecure()
);

module.exports = (numbers) => {
    return new Promise((resolve, reject) => {
        client.sum({ numbers }, (err, data) => {
            if (err) return reject(err)
            resolve(data.sum)
        })
    })
};
