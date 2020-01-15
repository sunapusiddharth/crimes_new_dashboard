const winston = require('winston')
const consoleTransport = new winston.transports.Console()

const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)
const csv = require('fast-csv')
var arrests_national_adults = require('../../model/arrests/arrests_national_adults');
var arrests_national_drug = require('../../model/arrests/arrests_national_drug');
var arrests_national_juvenile = require('../../model/arrests/arrests_national_juvenile');
var arrests_national = require('../../model/arrests/arrests_national');
const fs = require('fs')

function populateArrestsNationalAdult(req, res) {
    const csvFilePath = __root + '\\data\\arrests_national_adults.csv'
    fs.createReadStream(csvFilePath)
        .pipe(csv.parse({
            headers: true
        }))
        .on('data', row => {
            row.year = isNaN(row.year) || !row.year ? 0 :parseInt(row.year)
            row.agencies = isNaN(row.agencies) || !row.agencies ? 0 :parseInt(row.agencies)
            row.population = isNaN(row.population) || !row.population ? 0 :parseInt(row.population)
            row.total_male = isNaN(row.total_male) || !row.total_male ? 0 :parseInt(row.total_male)
            row.total_female = isNaN(row.total_female) || !row.total_female ? 0 :parseInt(row.total_female)
            row.m_18 = isNaN(row.m_18) || !row.m_18 ? 0 :parseInt(row.m_18)
            row.m_19 = isNaN(row.m_19) || !row.m_19 ? 0 :parseInt(row.m_19)
            row.m_20 = isNaN(row.m_20) || !row.m_20 ? 0 :parseInt(row.m_20)
            row.m_21 = isNaN(row.m_21) || !row.m_21 ? 0 :parseInt(row.m_21)
            row.m_22 = isNaN(row.m_22) || !row.m_22 ? 0 :parseInt(row.m_22)
            row.m_23 = isNaN(row.m_23) || !row.m_23 ? 0 :parseInt(row.m_23)
            row.m_24 = isNaN(row.m_24) || !row.m_24 ? 0 :parseInt(row.m_24)
            row.m_25_29 = isNaN(row.m_25_29) || !row.m_25_29 ? 0 :parseInt(row.m_25_29)
            row.m_30_34 = isNaN(row.m_30_34) || !row.m_30_34 ? 0 :parseInt(row.m_30_34)
            row.m_35_39 = isNaN(row.m_35_39) || !row.m_35_39 ? 0 :parseInt(row.m_35_39)
            row.m_40_44 = isNaN(row.m_40_44) || !row.m_40_44 ? 0 :parseInt(row.m_40_44)
            row.m_45_49 = isNaN(row.m_45_49) || !row.m_45_49 ? 0 :parseInt(row.m_45_49)
            row.m_50_54 = isNaN(row.m_50_54) || !row.m_50_54 ? 0 :parseInt(row.m_50_54)
            row.m_55_59 = isNaN(row.m_55_59) || !row.m_55_59 ? 0 :parseInt(row.m_55_59)
            row.m_60_64 = isNaN(row.m_60_64) || !row.m_60_64 ? 0 :parseInt(row.m_60_64)
            row.m_65p = isNaN(row.m_65p) || !row.m_65p ? 0 :parseInt(row.m_65p)
            row.f_18 = isNaN(row.f_18) || !row.f_18 ? 0 :parseInt(row.f_18)
            row.f_19 = isNaN(row.f_19) || !row.f_19 ? 0 :parseInt(row.f_19)
            row.f_20 = isNaN(row.f_20) || !row.f_20 ? 0 :parseInt(row.f_20)
            row.f_21 = isNaN(row.f_21) || !row.f_21 ? 0 :parseInt(row.f_21)
            row.f_22 = isNaN(row.f_22) || !row.f_22 ? 0 :parseInt(row.f_22)
            row.f_23 = isNaN(row.f_23) || !row.f_23 ? 0 :parseInt(row.f_23)
            row.f_24 = isNaN(row.f_24) || !row.f_24 ? 0 :parseInt(row.f_24)
            row.f_25_29 = isNaN(row.f_25_29) || !row.f_25_29 ? 0 :parseInt(row.f_25_29)
            row.f_30_34 = isNaN(row.f_30_34) || !row.f_30_34 ? 0 :parseInt(row.f_30_34)
            row.f_35_39 = isNaN(row.f_35_39) || !row.f_35_39 ? 0 :parseInt(row.f_35_39)
            row.f_40_44 = isNaN(row.f_40_44) || !row.f_40_44 ? 0 :parseInt(row.f_40_44)
            row.f_45_49 = isNaN(row.f_45_49) || !row.f_45_49 ? 0 :parseInt(row.f_45_49)
            row.f_50_54 = isNaN(row.f_50_54) || !row.f_50_54 ? 0 :parseInt(row.f_50_54)
            row.f_55_59 = isNaN(row.f_55_59) || !row.f_55_59 ? 0 :parseInt(row.f_55_59)
            row.f_60_64 = isNaN(row.f_60_64) || !row.f_60_64 ? 0 :parseInt(row.f_60_64)
            row.f_65p = isNaN(row.f_65p) || !row.f_65p ? 0 :parseInt(row.f_65p)
            row.race_agencies = isNaN(row.race_agencies) || !row.race_agencies ? 0 :parseInt(row.race_agencies)
            row.race_population = isNaN(row.race_population) || !row.race_population ? 0 :parseInt(row.race_population)
            row.white = isNaN(row.white) || !row.white ? 0 :parseInt(row.white)
            row.black = isNaN(row.black) || !row.black ? 0 :parseInt(row.black)
            row.asian_pacific_islander = isNaN(row.asian_pacific_islander) || !row.asian_pacific_islander ? 0 :parseInt(row.asian_pacific_islander)
            row.american_indian = isNaN(row.american_indian) || !row.american_indian ? 0 :parseInt(row.american_indian)
            // console.log("row=",row)
            // process.exit(0)
            arrests_national_adults.create(row, function (err, crime) {
                if(err){
                    logger.error("Error in fn : populateArrestsNationalAdult",err)
                }
                logger.info("Success in fn : populateArrestsNationalAdult",crime)
                // process.exit(0)
            })

        })
    res.status(200).send('Process running in background !!!!')
}

function populateArrestsNationalDrug(req, res) {
    const csvFilePath = __root + '\\data\\arrests_national_drug.csv'
    fs.createReadStream(csvFilePath)
        .pipe(csv.parse({
            headers: true
        }))
        .on('data', row => {
            row.year = isNaN(row.year) || !row.year ? 0 :parseInt(row.year)
            row.id = isNaN(row.id) || !row.id ? 0 :parseInt(row.id)
            row.population = isNaN(row.population) || !row.population ? 0 :parseInt(row.population)
            row.state_abbr = isNaN(row.state_abbr) || !row.state_abbr ? 0 :parseInt(row.state_abbr)
            row.agencies = isNaN(row.agencies) || !row.agencies ? 0 :parseInt(row.agencies)
            row.total_arrests = isNaN(row.total_arrests) || !row.total_arrests ? 0 :parseInt(row.total_arrests)
            row.total_manufacture = isNaN(row.total_manufacture) || !row.total_manufacture ? 0 :parseInt(row.total_manufacture)
            row.opioid_manufacture = isNaN(row.opioid_manufacture) || !row.opioid_manufacture ? 0 :parseInt(row.opioid_manufacture)
            row.marijuana_manufacture = isNaN(row.marijuana_manufacture) || !row.marijuana_manufacture ? 0 :parseInt(row.marijuana_manufacture)
            row.synthetic_manufacture = isNaN(row.synthetic_manufacture) || !row.synthetic_manufacture ? 0 :parseInt(row.synthetic_manufacture)
            row.other_manufacture = isNaN(row.other_manufacture) || !row.other_manufacture ? 0 :parseInt(row.other_manufacture)
            row.total_possess = isNaN(row.total_possess) || !row.total_possess ? 0 :parseInt(row.total_possess)
            row.opioid_possess = isNaN(row.opioid_possess) || !row.opioid_possess ? 0 :parseInt(row.opioid_possess)
            row.marijuana_possess = isNaN(row.marijuana_possess) || !row.marijuana_possess ? 0 :parseInt(row.marijuana_possess)
            row.synthetic_possess = isNaN(row.synthetic_possess) || !row.synthetic_possess ? 0 :parseInt(row.synthetic_possess)
            row.other_possess = isNaN(row.other_possess) || !row.other_possess ? 0 :parseInt(row.other_possess)
            // console.log("row=",row)
            // process.exit(0)
            arrests_national_drug.create(row, function (err, crime) {
                if(err){
                    logger.error("Error in fn : populateArrestsNationalDrug",err)
                }
                logger.info("Success in fn : populateArrestsNationalDrug",crime)
            })

        })
    res.status(200).send('Process running in background !!!!')
}

function populateArrestsNationalJuvenile(req, res) {
    const csvFilePath = __root + '\\data\\arrests_national_juvenile.csv'
    fs.createReadStream(csvFilePath)
        .pipe(csv.parse({
            headers: true
        }))
        .on('data', row => {
            row.id = isNaN(row.id) || !row.id ? 0 :parseInt(row.id)
            row.population = isNaN(row.population) || !row.population ? 0 :parseInt(row.population)
            row.total_male = isNaN(row.total_male) || !row.total_male ? 0 :parseInt(row.total_male)
            row.total_female = isNaN(row.total_female) || !row.total_female ? 0 :parseInt(row.total_female)
            row.year = isNaN(row.year) || !row.year ? 0 :parseInt(row.year)
            row.agencies = isNaN(row.agencies) || !row.agencies ? 0 :parseInt(row.agencies)
            row.m_0_9 = isNaN(row.m_0_9) || !row.m_0_9 ? 0 :parseInt(row.m_0_9)
            row.m_10_12 = isNaN(row.m_10_12) || !row.m_10_12 ? 0 :parseInt(row.m_10_12)
            row.m_13_14 = isNaN(row.m_13_14) || !row.m_13_14 ? 0 :parseInt(row.m_13_14)
            row.m_15 = isNaN(row.m_15) || !row.m_15 ? 0 :parseInt(row.m_15)
            row.m_16 = isNaN(row.m_16) || !row.m_16 ? 0 :parseInt(row.m_16)
            row.m_17 = isNaN(row.m_17) || !row.m_17 ? 0 :parseInt(row.m_17)
            row.f_0_9 = isNaN(row.f_0_9) || !row.f_0_9 ? 0 :parseInt(row.f_0_9)
            row.f_10_12 = isNaN(row.f_10_12) || !row.f_10_12 ? 0 :parseInt(row.f_10_12)
            row.f_13_14 = isNaN(row.f_13_14) || !row.f_13_14f_13_14 ? 0 :parseInt(row.m_50_54)
            row.f_15 = isNaN(row.f_15) || !row.f_15 ? 0 :parseInt(row.f_15)
            row.f_16 = isNaN(row.f_16) || !row.f_16 ? 0 :parseInt(row.f_16)
            row.f_17 = isNaN(row.f_17) || !row.f_17 ? 0 :parseInt(row.f_17)
            row.race_agencies = isNaN(row.race_agencies) || !row.race_agencies ? 0 :parseInt(row.race_agencies)
            row.race_population = isNaN(row.race_population) || !row.race_population ? 0 :parseInt(row.race_population)
            row.white = isNaN(row.white) || !row.white ? 0 :parseInt(row.white)
            row.black = isNaN(row.black) || !row.black ? 0 :parseInt(row.black)
            row.asian_pacific_islander = isNaN(row.asian_pacific_islander) || !row.asian_pacific_islander ? 0 :parseInt(row.asian_pacific_islander)
            row.american_indian = isNaN(row.american_indian) || !row.american_indian ? 0 :parseInt(row.american_indian)
            // console.log("row=",row)
            // process.exit(0)
            arrests_national_juvenile.create(row, function (err, crime) {
                if(err){
                    logger.error("Error in fn : populateArrestsNationalJuvenile",err)
                }
                logger.info("Success in fn : populateArrestsNationalJuvenile",crime)
                // process.exit(0)
            })

        })
    res.status(200).send('Process running in background !!!!')
}

function populateArrestsNational(req, res) {
    const csvFilePath = __root + '\\data\\arrests_national.csv'
    fs.createReadStream(csvFilePath)
        .pipe(csv.parse({
            headers: true
        }))
        .on('data', row => {
            row.year = isNaN(row.year) || !row.year ? 0 :parseInt(row.year)
            row.id = isNaN(row.id) || !row.id ? 0 :parseInt(row.id)
            row.population = isNaN(row.population) || !row.population ? 0 :parseInt(row.population)
            row.homicide = isNaN(row.homicide) || !row.homicide ? 0 :parseInt(row.homicide)
            row.rape = isNaN(row.rape) || !row.rape ? 0 :parseInt(row.rape)
            row.total_arrests = isNaN(row.total_arrests) || !row.total_arrests ? 0 :parseInt(row.total_arrests)
            row.robbery = isNaN(row.robbery) || !row.robbery ? 0 :parseInt(row.robbery)
            row.aggravated_assault = isNaN(row.aggravated_assault) || !row.aggravated_assault ? 0 :parseInt(row.aggravated_assault)
            row.burglary = isNaN(row.burglary) || !row.burglary ? 0 :parseInt(row.burglary)
            row.larceny = isNaN(row.larceny) || !row.larceny ? 0 :parseInt(row.larceny)
            row.motor_vehicle_theft = isNaN(row.motor_vehicle_theft) || !row.motor_vehicle_theft ? 0 :parseInt(row.motor_vehicle_theft)
            row.arson = isNaN(row.arson) || !row.arson ? 0 :parseInt(row.arson)
            row.violent_crime = isNaN(row.violent_crime) || !row.violent_crime ? 0 :parseInt(row.violent_crime)
            row.property_crime = isNaN(row.property_crime) || !row.property_crime ? 0 :parseInt(row.property_crime)
            row.other_assault = isNaN(row.other_assault) || !row.other_assault ? 0 :parseInt(row.other_assault)
            row.forgery = isNaN(row.forgery) || !row.forgery ? 0 :parseInt(row.forgery)
            row.fraud = isNaN(row.fraud) || !row.fraud ? 0 :parseInt(row.fraud)
            row.embezzlement = isNaN(row.embezzlement) || !row.embezzlement ? 0 :parseInt(row.embezzlement)
            row.stolen_property = isNaN(row.stolen_property) || !row.stolen_property ? 0 :parseInt(row.stolen_property)
            row.vandalism = isNaN(row.vandalism) || !row.vandalism ? 0 :parseInt(row.vandalism)
            row.weapons = isNaN(row.weapons) || !row.weapons ? 0 :parseInt(row.weapons)
            row.prostitution = isNaN(row.prostitution) || !row.prostitution ? 0 :parseInt(row.prostitution)
            row.other_sex_offenses = isNaN(row.other_sex_offenses) || !row.other_sex_offenses ? 0 :parseInt(row.other_sex_offenses)
            row.drug_abuse = isNaN(row.drug_abuse) || !row.drug_abuse ? 0 :parseInt(row.drug_abuse)
            row.gambling = isNaN(row.gambling) || !row.gambling ? 0 :parseInt(row.gambling)
            row.against_family = isNaN(row.against_family) || !row.against_family ? 0 :parseInt(row.against_family)
            row.dui = isNaN(row.dui) || !row.dui ? 0 :parseInt(row.dui)
            row.liquor_laws = isNaN(row.liquor_laws) || !row.liquor_laws ? 0 :parseInt(row.liquor_laws)
            row.drunkenness = isNaN(row.drunkenness) || !row.drunkenness ? 0 :parseInt(row.drunkenness)
            row.disorderly_conduct = isNaN(row.disorderly_conduct) || !row.disorderly_conduct ? 0 :parseInt(row.disorderly_conduct)
            row.vagrancy = isNaN(row.vagrancy) || !row.vagrancy ? 0 :parseInt(row.vagrancy)
            row.other = isNaN(row.other) || !row.other ? 0 :parseInt(row.other)
            row.suspicion = isNaN(row.suspicion) || !row.suspicion ? 0 :parseInt(row.suspicion)
            row.prostitution = isNaN(row.prostitution) || !row.prostitution ? 0 :parseInt(row.prostitution)
            row.prostitution = isNaN(row.prostitution) || !row.prostitution ? 0 :parseInt(row.prostitution)
            // console.log("row=",row)
            // process.exit(0)
            arrests_national.create(row, function (err, crime) {
                if(err){
                    logger.error("Error in fn : populateArrestsNationalDrug",err)
                }
                logger.info("Success in fn : populateArrestsNationalDrug",crime)
            })

        })
    res.status(200).send('Process running in background !!!!')
}

module.exports = {
    populateArrestsNationalAdult,
    populateArrestsNationalDrug,
    populateArrestsNationalJuvenile,
    populateArrestsNational
}