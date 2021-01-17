const mysql = require('mysql');
/**
 * Mysql bağlantısını gerçekleştirir.
 * 
 * @param
 * @return void
 */
function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'atikvar',
    });
}


// GRPC
var PROTO_PATH = __dirname + '/proto/user.proto';
const grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
  });

var user_proto = grpc.loadPackageDefinition(packageDefinition).user;

function addUser(call, callback){
    const connection = getConnection();
    const isAdded = "SELECT * FROM kullanicilar WHERE kullanici_adi = ?";

    connection.query(isAdded,[call.request.username],(err,rows,fields) => {
        console.log(rows.length);
        if(err) {
            console.log("MySql de bir hata oluştu");
            callback(null, {isAdded: false})
            console.log("İlk hata")
        }
        else if(rows.length>=1)
            {
                callback(null, {isAdded: false})
                console.log("hata yok ama kayıtlı");
            }
        else{
            console.log("böyle bir kayıt yok");
            const queryString = "INSERT INTO kullanicilar (kurum_adi,kullanici_adi,sifre) VALUES (?,?,?)";
            connection.query(queryString,[
                call.request.company_name,
                call.request.username,
                call.request.password
            ], (err,rows,fields) => {
                if(err){
                    console.log("MySql de bir hata oluştu");
                    callback(null, {isAdded: false})
                }
                else
                {
                    console.log("Eklendi");
                    callback(null, {isAdded: true})
                }
            });
        }
    });
}

var server = new grpc.Server();
server.addService(user_proto.UserService.service, {addUser: addUser});
server.bind('127.0.0.1:8080', grpc.ServerCredentials.createInsecure());
server.start();
console.log('grpc server is live', '127.0.0.1:8080');