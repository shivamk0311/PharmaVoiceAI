const fs = require("fs")
const csv = require("csv-parser")
const prisma = require('../../../lib/prisma')

const importPatientsFromCsv = async (filePath) => {
    const rows = []
    
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                rows.push(row);
            })
            .on("end", async () => {
                try {
                    const validPatients = [];
                    const errors = [];
                    
                    rows.forEach((row, index) => {
                        const rowNumber = index + 2;
                        
                        const fullName = row.fullName?.trim();
                        const phoneNumber = row.phoneNumber?.trim();
                        const dateOfBirth = row.dateOfBirth?.trim();
                        const medicationName = row.medicationName?.trim();
                        const copayAmount = row.copayAmount?.trim();
                        const hasCardOnFile = row.hasCardOnFile?.trim()?.toLowerCase() === 'true';

                        if(!fullName || !phoneNumber || !dateOfBirth || !medicationName || !copayAmount){
                            errors.push({
                                row: rowNumber,
                                reason: "Missing Full Name, Phone Number, Date of Birth, Medication Name, or CoPay Amount.",
                            })
                            return;
                        }

                        const parsedBirthDate = new Date(dateOfBirth);

                        if(isNaN(parsedBirthDate.getTime())){
                            errors.push({
                                row: rowNumber,
                                reason: "Invalid format for Date of Birth."
                            })
                            return;
                        }

                        const parsedCopayAmount = Number(copayAmount);

                        if (isNaN(parsedCopayAmount) || parsedCopayAmount < 0){
                            errors.push({
                                row: rowNumber,
                                reason: "Invalid copay amount."
                            })
                            return;
                        }

                        validPatients.push({
                            fullName,
                            phoneNumber,
                            dateOfBirth: parsedBirthDate,
                            medicationName,
                            copayAmount: parsedCopayAmount,
                            hasCardOnFile,
                        });
                    });
                    if (validPatients.length > 0) {
                        await prisma.patient.createMany({
                            data: validPatients,
                            skipDuplicates: false,
                        });
                    }

                    resolve({
                        totalRows: rows.length,
                        imported: validPatients.length,
                        failed: errors.length,
                        errors,
                    })

                } catch (error) {
                    reject(error)
                }
            })
            .on("error", reject)
    });
};

module.exports = {
    importPatientsFromCsv,
}