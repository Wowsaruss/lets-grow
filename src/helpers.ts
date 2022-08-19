export const addEditMapping = async (values: any) => {
    const newValues: any = {}
    const keys = Object.keys(values)

    await keys.forEach((key, _) => {
        if (values[key] === '' || values[key] === 0) {
            return (newValues[key] = null)
        }
        return (newValues[key] = values[key])
    })

    return newValues
}
