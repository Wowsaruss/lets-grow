export const addEditMapping = async (values: any) => {
    const newValues: any = {}
    const keys = Object.keys(values)

    await keys.forEach((key, _) => {
        if (
            key.includes('transplant') ||
            key.includes('start') ||
            key === 'last_day_to_plant'
        ) {
            if (values[key]) {
                return (newValues[key] = `${getReadableMonth(
                    values[key].getMonth() + 1
                )} ${values[key].getDate()}`)
            }
        }
        if (values[key] === '' || values[key] === 0) {
            return (newValues[key] = null)
        }
        return (newValues[key] = values[key])
    })

    return newValues
}

export const getReadableMonth = (monthNumber: number) => {
    switch (monthNumber) {
        case 1:
            return 'January'
        case 2:
            return 'February'
        case 3:
            return 'March'
        case 4:
            return 'April'
        case 5:
            return 'May'
        case 6:
            return 'June'
        case 7:
            return 'July'
        case 8:
            return 'August'
        case 9:
            return 'September'
        case 10:
            return 'October'
        case 11:
            return 'November'
        case 12:
            return 'December'
        default:
            return ''
    }
}
