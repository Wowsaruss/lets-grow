import dotenv from 'dotenv';

dotenv.config();

export default {
    audience: process.env.AUTH0_AUDIENCE || '',
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL || '',
    tokenSigningAlg: process.env.SIGNING_ALG || ''
}; 