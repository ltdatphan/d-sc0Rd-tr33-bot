let cron = require('node-cron');

const sampleTrigger = () => console.log("Triggering cron")

const cronConverter = (msg = '') => {
    if (!msg)
        return

    if (msg.includes('*'))
        return msg

    let cron = msg.split(' ');

    let [number, unit] = cron

    if (unit.includes('second'))
        return `*/${number} * * * * *`
    
    if (unit.includes('minute'))
        return `*/${number} * * * *`
}

const scheduleCall = (msg = '', callback = () => sampleTrigger) => {
    let cronRegex = cronConverter(msg);
    
    if (!callback)
        callback = () => sampleTrigger()

    if (cronRegex === undefined || !cronRegex.includes('*'))
        throw TypeError("Invalid cron expression")
        
    if (typeof callback !== 'function')
        throw TypeError("Callback must be a function")
    
    if (typeof msg !== 'string')
        throw TypeError("Message must be a string")
    
    if (msg.length < 1)
        throw TypeError("Message must not be empty")
    
    if (msg.includes('*'))
        throw TypeError("Message must not contain wildcard")

    return cron.schedule(cronRegex, () => {
        console.log(`running a task: ${msg}`);
        callback()
    })
}

module.exports.cronConverter = cronConverter;
module.exports.scheduleCall = scheduleCall;
