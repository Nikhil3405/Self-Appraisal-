import sql from 'mssql';

// const config = {
//     server: "192.168.29.12\\CHIDUSQL",
//     port: 1433,
//     databse: "aittest",
//     user: 'sa',
//     password: "deane",
//     options: {
//         encrypt: false,
//         trustServerCertificate: true,
//     },
// };

const config = {
 user: 'sa',
 password: 'deane',
 server: '38.188.203.50', // public IP address of the server
 port: 1433,
 database: 'aittest',
 options: {
   encrypt: true, // depending on your SQL Server version
   trustServerCertificate: true,    
 },
};   

export async function connectToDatabase() {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (err) {
        console.error("Database connection failed: ", err);
        throw err;
    }
}

module.exports = { connectToDatabase };