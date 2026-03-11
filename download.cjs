const https = require('https');
const fs = require('fs');
const path = require('path');

const uris = [
    { file: 'tesla.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/2018_Tesla_Model_3_Standard_Range_Plus.jpg/800px-2018_Tesla_Model_3_Standard_Range_Plus.jpg' },
    { file: 'mustang.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/2006_Ford_Mustang_GT_coupe.jpg/800px-2006_Ford_Mustang_GT_coupe.jpg' },
    { file: 'x5.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/2019_BMW_X5_M50d_Automatic_3.0_Front.jpg/800px-2019_BMW_X5_M50d_Automatic_3.0_Front.jpg' },
    { file: 'q7.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/2019_Audi_Q7_S_Line_50_TDI_Quattro_Automatic_3.0_Front.jpg/800px-2019_Audi_Q7_S_Line_50_TDI_Quattro_Automatic_3.0_Front.jpg' },
    { file: 'camry.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/800px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg' },
    { file: 'jeep.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/2018_Jeep_Wrangler_Sahara_Unlimited_2.0_Front.jpg/800px-2018_Jeep_Wrangler_Sahara_Unlimited_2.0_Front.jpg' },
    { file: 'porsche.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Porsche_911_Carrera_S_%28992%29_IMG_3601.jpg/800px-Porsche_911_Carrera_S_%28992%29_IMG_3601.jpg' },
    { file: 'civic.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/2017_Honda_Civic_Type_R_%28FK8%29_hatchback_%282018-07-16%29.jpg/800px-2017_Honda_Civic_Type_R_%28FK8%29_hatchback_%282018-07-16%29.jpg' }
];

const dir = path.join(__dirname, 'public', 'vehicles');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function download() {
    for (const u of uris) {
        await new Promise((resolve) => {
            https.get(u.url, { headers: { 'User-Agent': `NexgileBot/1.0 (${Math.random()})` } }, res => {
                if (res.statusCode !== 200) {
                    console.error(`Failed ${u.file}: HTTP ${res.statusCode}`);
                    resolve();
                    return;
                }
                const stream = fs.createWriteStream(path.join(dir, u.file));
                res.pipe(stream);
                stream.on('finish', () => {
                    console.log('Downloaded', u.file);
                    setTimeout(resolve, 500); // Wait 500ms between downloads
                });
            }).on('error', e => {
                console.error(e);
                resolve();
            });
        });
    }
}
download();
