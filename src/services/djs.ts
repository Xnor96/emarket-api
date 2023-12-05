import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat')
var utc = require('dayjs/plugin/utc')

dayjs.extend(utc)
dayjs.extend(customParseFormat)

const djs = dayjs

export default djs