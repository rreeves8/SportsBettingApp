import jwt from 'jsonwebtoken'

import { tokenPassword, tokenExpireyTime } from "../../ServerConfig.js"

export function generateToken(email) {
    return jwt.sign({email: email}, tokenPassword, { expiresIn: tokenExpireyTime });
}

export function verifyToken(token){
    return jwt.verify(token, tokenPassword)
}