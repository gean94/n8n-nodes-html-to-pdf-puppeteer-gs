"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlToPdf = void 0;
const HtmlToPdf_description_1 = require("./HtmlToPdf.description");
const puppeteer_1 = __importDefault(require("puppeteer"));
class HtmlToPdf {
    description = HtmlToPdf_description_1.description;
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            // Obtener tipo de entrada
            const inputType = this.getNodeParameter('inputType', i);
            let html = '';
            if (inputType === 'string') {
                html = this.getNodeParameter('htmlString', i, '');
            }
            else if (inputType === 'binary') {
                const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i);
                if (item.binary && item.binary[binaryPropertyName]) {
                    html = Buffer.from(item.binary[binaryPropertyName].data, 'base64').toString('utf8');
                }
                else {
                    throw new Error(`No se encontró la propiedad binaria "${binaryPropertyName}" en el item de entrada`);
                }
            }
            // Generar PDF con Puppeteer
            const browser = await puppeteer_1.default.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
            const page = await browser.newPage();
            // Fijar viewport decente para que los gradientes se vean bien
            await page.setViewport({ width: 1200, height: 1600 });
            await page.setContent(html, { waitUntil: 'networkidle0' });
            // Espera extra para asegurar que fuentes/emojis se rendericen
            await new Promise(resolve => setTimeout(resolve, 300));
            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true, // <--- esto es clave para ver colores y gradientes
                scale: 1,
            });
            const fileName = `reporte-${Date.now()}.pdf`;
            const fileSize = pdfBuffer.length;
            await browser.close();
            // Devolver PDF como salida binaria
            returnData.push({
                json: {
                    fileName,
                    fileSize,
                    fileExtension: 'pdf',
                    mimeType: 'application/pdf',
                },
                binary: {
                    pdf: {
                        data: pdfBuffer.toString('base64'),
                        mimeType: 'application/pdf',
                        fileName,
                        fileExtension: 'pdf'
                    },
                },
            });
        }
        return [returnData];
    }
}
exports.HtmlToPdf = HtmlToPdf;
