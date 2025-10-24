// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve file statici

const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6IjljOTJjMTc4ODg5MDZkMTFiZWU5MWVmZTA1YzE2ZWMwMGMxNzUxNTQ5MjUwYzg1Nzg3OGI5Y2Q0MzRhNWEwM2Y1NWI1ODBkNmRhMDI1NzExIiwiaWF0IjoxNzYxMzM5OTY5LjIxNzgyOSwibmJmIjoxNzYxMzM5OTY5LjIxNzgzMSwiZXhwIjoxNzkyODc1OTY5LjIxMDY2Mywic3ViIjoiMTE5NDczOTYiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIiwidXNlci5pbmZvIl19.L4FjT-QWKzPiWWgV-MgxMez1d14PvCwkhS2DZPRqwIoRYBJH5HVnhWuleZde7CtofJnHG6HuW0c8VUoBfDnXGNeJTv5-wruwJWhCsf-DECFHVNJa08y8XWiXPID5bUKLkWZ5SlLZoaV360NbKtCI_UJVIQ2cQHq0EtNqCtMOxtsMDAtGz-E0WJ0zkD3ijfuHOv_J1wQsfyAXnpYi3t6Ag0y8ugaJdwqy4tEpD2dkWuI3eB7X2gEQemm_MJJ2Zm8fSoqxYDX3vug8Y7Be5t2kd1LCt9TSU7yuMQW8RwHsazAVh0yQXBOvDQVrvBzj4TmvMAsK-vjCDOF_16OYvnl8h_wUMUOoSHmTNrSblYu6InSrHHZHb9QrGtp7PY6GR30wXXN1w4qaH5aOUVNN66KuOFcRN6-Oo7X4vcvu24h8q3uhxhaAxq7t8dMUeHRQ8LA300V1cii4vGQqzNdYDpuL2lDm9PXrxtEQ9azo9-_RjhqQ5DjqIbyN5kahYUepegdo5C0AtGOoSE5hh7RQUMnq-G39ZygZjO2j3YPTdQRsaYRHXbNh-VS4ykZzKWE5dXWbcg8An0Gxte4pxc5ZsXheEJ8hYpbVSfQFhrDm0wci4BMNmI04NxmOuPW-NVwrO5PAEJ_7vwMGYvDpuGGSDwPLWwRY_O3QvzevVWyB_xVt4eE';

// Endpoint per ottenere i negozi
app.get('/api/shops', async (req, res) => {
    try {
        console.log('Richiesta negozi ricevuta');
        const response = await fetch('https://api.printify.com/v1/shops.json', {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Errore API: ${response.status} ${response.statusText}`);
        }
        
        const shops = await response.json();
        console.log(`Trovati ${shops.length} negozi`);
        res.json(shops);
    } catch (error) {
        console.error('Errore nel caricamento negozi:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint per ottenere i prodotti di un negozio
app.get('/api/shops/:shopId/products', async (req, res) => {
    try {
        const { shopId } = req.params;
        console.log(`Richiesta prodotti per negozio: ${shopId}`);
        
        const response = await fetch(`https://api.printify.com/v1/shops/${shopId}/products.json`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Errore API: ${response.status}`);
        }
        
        const products = await response.json();
        console.log(`Trovati ${products.data ? products.data.length : 0} prodotti`);
        res.json(products);
    } catch (error) {
        console.error('Errore nel caricamento prodotti:', error);
        res.status(500).json({ error: error.message });
    }
});

// Servi la pagina HTML principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`);
    console.log(`Apri http://localhost:${PORT} nel browser`);
});

// Aggiungi questo endpoint di test
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server funziona!', timestamp: new Date() });
});