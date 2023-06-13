const connectDB = require("../config/db")



const getVisitorFromDB = (email) => {
    return new Promise((resolve, reject) => {
          connectDB.query({
              sql: `SELECT * FROM visitors where email = ?`,
              values: [email]
          }, (err,result)=> {
                  if(err) {
                      reject(err)
                  }
                  resolve(result)
  
          })
          
      })
  }

  const insertVisitorToDB = (visitor_id, username, email, passwordSalt, passwordHarsh, phone) => {
    return new Promise((resolve, reject) => {
          connectDB.query({
            sql: `INSERT INTO visitors (visitor_id, username, email, passwordSalt, passwordHarsh, phone) values(?,?,?,?,?,?)`,
            values: [visitor_id, username, email, passwordSalt, passwordHarsh, phone]
          }, (err,result)=> {
                  if(err) {
                    console.log(err)
                      reject(err)
                  }
                  resolve(result)
  
          })
          
      })
  }


  module.exports = {getVisitorFromDB, insertVisitorToDB}