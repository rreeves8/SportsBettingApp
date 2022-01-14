export function CreateKeyTable(){
    import { sqlConn } from '../config'
    
    sqlConn.connect((error)=>{
        if(error){
            throw error
        }
        else{
            sqlConn.query('CREATE TABLE Keys (privateKey VARCHAR(255), address VARCHAR(255))"')
        }
    })
}
