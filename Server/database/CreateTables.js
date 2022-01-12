
export function CreateKeyTable(){
    let conn = require('./Connection');
    
    conn.connect((error)=>{
        if(error){
            throw error
        }
        else{
            conn.query('CREATE TABLE Keys (privateKey VARCHAR(255), address VARCHAR(255))"')
        }
    })
}