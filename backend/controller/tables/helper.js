const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

const csvFilePath1 = __root + '\\data\\boston_crime_data.csv'
const csvFilePath2 = __root + '\\data\\ca_law_enforcement_by_agency.csv'
const csvFilePath3 = __root + '\\data\\ca_law_enforcement_by_campus.csv'
const csvFilePath4 = __root + '\\data\\ca_law_enforcement_by_city.csv'
const csvFilePath5 = __root + '\\data\\ca_law_enforcement_by_county.csv'
const csvFilePath6 = __root + '\\data\\denver_crime_data.csv'
const csvFilePath7 = __root + '\\data\\District-wise_Crimes_committed_against_Women_2015_1.csv'
const csvFilePath8 = __root + '\\data\\crime_in_vancouver.csv'
const csvFilePath9 = __root + '\\data\\crimes_in_baltimore.csv'
const csvFilePath10 = __root + '\\data\\dc_metro_crime.csv'

const csv = require('fast-csv')
const boston_crimes_data = require('../../model/boston_crime_data');
const california_law_enforcement_byAgency = require('../../model/california_law_enforcement_byAgency');
const california_law_enforcement_by_city = require('../../model/california_law_enforcement_by_city');
const california_law_enforcement_by_county = require('../../model/california_law_enforcement_by_county');
const california_law_enfrcement_by_campus = require('../../model/california_law_enfrcement_by_campus');
const denver_crime_data = require('../../model/denver_crime_data');
const district_wise_crimes_commited_women = require('../../model/district_wise_crimes_commited_women');
const vancouver_crime_data = require('../../model/vancouver_crime_data');
const dc_metro_crime = require('../../model/dc_metro_crime');
const baltimore_crimes = require('../../model/baltimore_crimes');

const fs = require('fs')

async function populateTableBostonCrimes(req, res) {
    try {
        let data_appended_to_db = []
        await fs.createReadStream(csvFilePath1)
            .pipe(csv.parse({
                headers: true
            }))
            .on('data', row => {
                row.OFFENSE_CODE = parseInt(row.OFFENSE_CODE)
                row.DISTRICT = row.state_id ? parseInt(row.DISTRICT) : 0
                row.REPORTING_AREA = parseInt(row.REPORTING_AREA)
                row.SHOOTING = parseInt(row.SHOOTING)
                row.YEAR = parseInt(row.YEAR)
                row.MONTH = parseInt(row.MONTH)
                row.HOUR = parseInt(row.HOUR)
                row.Lat = parseInt(row.Lat)
                row.Long = parseInt(row.Long)
                // console.log("row=",row)
                boston_crimes_data.create(row, function (err, crime) {
                    if (err) logger.error("werror in function populateTableBostonCrimes ")
                    logger.info("success  in function  populateTableBostonCrimes")
                    data_appended_to_db.push(crime)
                })

            })
        res.status(200).send(data_appended_to_db)
    } catch (error) {
        res.status(500).send(error)
    }

}


async function populateTableDenverCrimes(req, res) {
    try {
        let data_appended_to_db = []
        await fs.createReadStream(csvFilePath6)
            .pipe(csv.parse({
                headers: true
            }))
            .on('data', row => {
                row.INCIDENT_ID = parseInt(row.INCIDENT_ID)
                row.OFFENSE_ID = row.OFFENSE_ID ? parseInt(row.OFFENSE_ID) : 0
                row.OFFENSE_CODE = parseInt(row.OFFENSE_CODE)
                row.OFFENSE_CODE_EXTENSION = parseInt(row.OFFENSE_CODE_EXTENSION)
                row.OFFENSE_CATEGORY_ID = row.OFFENSE_CATEGORY_ID ? parseInt(row.OFFENSE_CATEGORY_ID) : 0
                row.INCIDENT_ADDRESS = parseInt(row.INCIDENT_ADDRESS)
                row.GEO_X = isNaN(row.GEO_X) ? 0 : parseInt(row.GEO_X)
                row.GEO_Y = isNaN(row.GEO_Y) ? 0 : parseInt(row.GEO_Y)
                row.GEO_LON = isNaN(row.GEO_LON) ? 0 : parseInt(row.GEO_LON)
                row.GEO_LAT = isNaN(row.GEO_LAT) ? 0 : parseInt(row.GEO_LAT)
                row.DISTRICT_ID = isNaN(row.DISTRICT_ID) ? 0 : parseInt(row.DISTRICT_ID)
                row.PRECINCT_ID = isNaN(row.PRECINCT_ID) ? 0 : parseInt(row.PRECINCT_ID)
                row.IS_CRIME = isNaN(row.IS_CRIME) ? 0 : parseInt(row.IS_CRIME)
                row.IS_TRAFFIC = isNaN(row.IS_TRAFFIC) ? 0 : parseInt(row.IS_TRAFFIC)
                // console.log("row=",row)
                denver_crime_data.create(row, function (err, crime) {
                    if (err) logger.error("werror in function populateTableDenverCrimes ", err)
                    logger.info("success  in function  populateTableDenverCrimes")
                    data_appended_to_db.push(crime)
                    // process.exit(0)
                })

            })
        res.status(200).send(data_appended_to_db)
    } catch (error) {
        res.status(500).send(error)
    }

}


async function californiaLawEnforcementbyAgency(req, res) {
    try {
        let data_appended_to_db = []
        await fs.createReadStream(csvFilePath2)
            .pipe(csv.parse({
                headers: true
            }))
            .on('data', row => {
                row.total_law_enforcement = isNaN(row.total_law_enforcement) ? 0 : parseInt(row.total_law_enforcement)
                row.total_officers = isNaN(row.total_officers) ? 0 : parseInt(row.total_officers)
                row.total_civilians = isNaN(row.total_civilians) ? 0 : parseInt(row.total_civilians)

                // console.log("row=",row)
                california_law_enforcement_byAgency.create(row, function (err, crime) {
                    if (err) logger.error("werror in function californiaLawEnforcementbyAgency ")
                    logger.info("success  in function  californiaLawEnforcementbyAgency")
                    data_appended_to_db.push(crime)
                })

            })
        res.status(200).send(data_appended_to_db)
    } catch (error) {
        res.status(500).send(error)
    }

}

async function californiaLawEnforcementbyCampus(req, res) {
    try {
        let data_appended_to_db = []
        await fs.createReadStream(csvFilePath3)
            .pipe(csv.parse({
                headers: true
            }))
            .on('data', row => {
                row.Total_law_enforcement_employees = isNaN(row.Total_law_enforcement_employees) ? 0 : parseInt(row.Total_law_enforcement_employees)
                row.total_officers = isNaN(row.total_officers) ? 0 : parseInt(row.total_officers)
                row.total_civilians = isNaN(row.total_civilians) ? 0 : parseInt(row.total_civilians)

                // console.log("row=",row)
                california_law_enfrcement_by_campus.create(row, function (err, crime) {
                    if (err) logger.error("werror in function californiaLawEnforcementbyCampus ")
                    logger.info("success  in function  californiaLawEnforcementbyCampus")
                    data_appended_to_db.push(crime)
                })

            })
        res.status(200).send(data_appended_to_db)
    } catch (error) {
        res.status(500).send(error)
    }

}

async function californiaLawEnforcementbyCity(req, res) {
    try {
        let data_appended_to_db = []
        await fs.createReadStream(csvFilePath4)
            .pipe(csv.parse({
                headers: true
            }))
            .on('data', row => {
                row.Total_law_enforcement_employees = isNaN(row.Total_law_enforcement_employees) ? 0 : parseInt(row.Total_law_enforcement_employees)
                row.total_officers = isNaN(row.total_officers) ? 0 : parseInt(row.total_officers)
                row.total_civilians = isNaN(row.total_civilians) ? 0 : parseInt(row.total_civilians)

                // console.log("row=",row)
                california_law_enforcement_by_city.create(row, function (err, crime) {
                    if (err) logger.error("werror in function californiaLawEnforcementbyCity ")
                    logger.info("success  in function  californiaLawEnforcementbyCity")
                    data_appended_to_db.push(crime)
                })

            })
        res.status(200).send(data_appended_to_db)
    } catch (error) {
        res.status(500).send(error)
    }

}

async function californiaLawEnforcementbyCounty(req, res) {
    try {
        let data_appended_to_db = []
        await fs.createReadStream(csvFilePath5)
            .pipe(csv.parse({
                headers: true
            }))
            .on('data', row => {
                row.Metropolitan_Nonmetropolitan = isNaN(row.Metropolitan_Nonmetropolitan) ? 0 : parseInt(row.Metropolitan_Nonmetropolitan)
                row.County = isNaN(row.County) ? 0 : parseInt(row.County)
                row.Violent_crime = isNaN(row.Violent_crime) ? 0 : parseInt(row.Violent_crime)
                row.Murder_and_nonnegligent_manslaughter = isNaN(row.Murder_and_nonnegligent_manslaughter) ? 0 : parseInt(row.Murder_and_nonnegligent_manslaughter)
                row.rape_revised_definition = isNaN(row.rape_revised_definition) ? 0 : parseInt(row.rape_revised_definition)
                row.rape_legacy_defnition = isNaN(row.rape_legacy_defnition) ? 0 : parseInt(row.rape_legacy_defnition)
                row.robbery = isNaN(row.robbery) ? 0 : parseInt(row.robbery)
                row.aggravated_assault = isNaN(row.aggravated_assault) ? 0 : parseInt(row.aggravated_assault)
                row.property_crime = isNaN(row.property_crime) ? 0 : parseInt(row.property_crime)
                row.burglary = isNaN(row.burglary) ? 0 : parseInt(row.burglary)
                row.larceny_theft = isNaN(row.larceny_theft) ? 0 : parseInt(row.larceny_theft)
                row.motor_vehicle_theft = isNaN(row.motor_vehicle_theft) ? 0 : parseInt(row.motor_vehicle_theft)
                row.arson = isNaN(row.arson) ? 0 : parseInt(row.arson)

                // console.log("row=",row)
                california_law_enforcement_by_county.create(row, function (err, crime) {
                    if (err) logger.error("werror in function californiaLawEnforcementbyCounty ")
                    logger.info("success  in function  californiaLawEnforcementbyCounty")
                    data_appended_to_db.push(crime)
                })

            })
        res.status(200).send(data_appended_to_db)
    } catch (error) {
        res.status(500).send(error)
    }

}

async function populateTableVancouverCrimes(req, res) {
    try {
        let data_appended_to_db = []
        await fs.createReadStream(csvFilePath8)
            .pipe(csv.parse({
                headers: true
            }))
            .on('data', row => {
                row.Latitude = isNaN(row.Latitude) ? 0 : parseInt(row.Latitude)
                row.Longitude = isNaN(row.Longitude) ? 0 : parseInt(row.Longitude)
                // console.log("row=",row)
                // process.exit(0)
                let record = {
                    TYPE: row.TYPE,
                    date: `${row.YEAR}/${row.MONTH}/${row.DAY} ${row.HOUR}:${row.MINUTE}:00`,
                    HUNDRED_BLOCK: row.HUNDRED_BLOCK,
                    NEIGHBOURHOOD: row.NEIGHBOURHOOD,
                    Latitude: row.Latitude,
                    Longitude: row.Longitude
                }
                vancouver_crime_data.create(record, function (err, crime) {
                    if (err) logger.error("werror in function populateTableVancouverCrimes ")
                    logger.info("success  in function  populateTableVancouverCrimes")
                    data_appended_to_db.push(crime)
                })

            })
        res.status(200).send(data_appended_to_db)
    } catch (error) {
        res.status(500).send(error)
    }

}

async function populateTableBaltimoreCrimes(req, res) {
    try {
        let data_appended_to_db = []
        await fs.createReadStream(csvFilePath9)
            .pipe(csv.parse({
                headers: true
            }))
            .on('data', row => {
                row.Latitude = isNaN(row.Latitude) ? 0 : parseInt(row.Latitude)
                row.Longitude = isNaN(row.Longitude) ? 0 : parseInt(row.Longitude)
                row.Post = isNaN(row.Post) ? 0 : parseInt(row.Post)
                row.TotalIncidents = isNaN(row.TotalIncidents) ? 0 : parseInt(row.TotalIncidents)
                // console.log("row=",row)
                let record = {
                    CrimeDate: row.CrimeDate,
                    CrimeTime: row.CrimeTime,
                    CrimeCode: row.CrimeCode,
                    Location: row.Location,
                    Description: row.Description,
                    InsideOutside: row.InsideOutside,
                    Weapon: row.Weapon,
                    Post: row.Post,
                    District: row.District,
                    Neighborhood: row.Neighborhood,
                    Longitude: row.Longitude,
                    Latitude: row.Latitude,
                    Location: row.Location,
                    Premise: row.Premise,
                    TotalIncidents: row.TotalIncidents
                }
                baltimore_crimes.create(record, function (err, crime) {
                    if (err) logger.error("werror in function populateTableBaltimoreCrimes ", err)
                    logger.info("success  in function  populateTableBaltimoreCrimes")
                    data_appended_to_db.push(crime)
                })

            })
        res.status(200).send(data_appended_to_db)
    } catch (error) {
        res.status(500).send(error)
    }

}

async function populateTableDCMetroCrimes(req, res) {
    try {
        let data_appended_to_db = []
        await fs.createReadStream(csvFilePath10)
            .pipe(csv.parse({
                headers: true
            }))
            .on('data', row => {
                row.Latitude = isNaN(row.Latitude) ? 0 : parseInt(row.Latitude)
                row.Longitude = isNaN(row.Longitude) ? 0 : parseInt(row.Longitude)
                row.DISTRICT = isNaN(row.DISTRICT) ? 0 : parseInt(row.DISTRICT)
                row.PSA = isNaN(row.PSA) ? 0 : parseInt(row.PSA)
                row.WARD = isNaN(row.WARD) ? 0 : parseInt(row.WARD)
                row.ANC = isNaN(row.ANC) ? 0 : parseInt(row.ANC)
                row.BLOCK_GROUP = isNaN(row.BLOCK_GROUP) ? 0 : parseInt(row.BLOCK_GROUP)
                row.CENSUS_TRACT = isNaN(row.CENSUS_TRACT) ? 0 : parseInt(row.CENSUS_TRACT)
                row.CCN = isNaN(row.CCN) ? 0 : parseInt(row.CCN)
                row.XBLOCK = isNaN(row.XBLOCK) ? 0 : parseInt(row.XBLOCK)
                row.YBLOCK = isNaN(row.YBLOCK) ? 0 : parseInt(row.YBLOCK)
                // console.log("row=",row)
                // process.exit(0)
                let record = {
                    "SHIFT": row.SHIFT,
                    "OFFENSE": row.OFFENSE,
                    "METHOD": row.METHOD,
                    "BLOCK": row.BLOCK,
                    "DISTRICT": row.DISTRICT,
                    "PSA": row.PSA,
                    "WARD": row.WARD,
                    "ANC": row.ANC,
                    "NEIGHBORHOOD_CLUSTER": row.NEIGHBORHOOD_CLUSTER,
                    "BLOCK_GROUP": row.BLOCK_GROUP,
                    "CENSUS_TRACT": row.CENSUS_TRACT,
                    "VOTING_PRECINCT": row.VOTING_PRECINCT,
                    "CCN": row.CCN,
                    "XBLOCK": row.XBLOCK,
                    "YBLOCK": row.YBLOCK,
                    "date": row.date,
                    "EW": row.EW,
                    "NS": row.NS,
                    "quad": row.quad,
                    "crimetype": row.crimetype
                }
                dc_metro_crime.create(record, function (err, crime) {
                    if (err) logger.error("werror in function populateTableDCMetroCrimes ", err)
                    logger.info("success  in function  populateTableDCMetroCrimes")
                    data_appended_to_db.push(crime)
                })

            })
        res.status(200).send(data_appended_to_db)
    } catch (error) {
        res.status(500).send(error)
    }

}

module.exports = {
    populateTableBostonCrimes,
    populateTableDenverCrimes,
    californiaLawEnforcementbyAgency,
    californiaLawEnforcementbyCampus,
    californiaLawEnforcementbyCity,
    californiaLawEnforcementbyCounty,
    populateTableDCMetroCrimes,
    populateTableBaltimoreCrimes,
    populateTableVancouverCrimes
}