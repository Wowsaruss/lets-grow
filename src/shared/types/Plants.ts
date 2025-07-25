export interface Plant {
    id: string
    authorId?: number
    commonName: string
    scientificName: string
    description: string
    plantFamilyId?: number
    plantTypeId?: number
    daysToGermination?: number
    daysToHarvest?: number
    indeterminate?: boolean
    germinationTempHigh?: number
    germinationTempLow?: number
    light?: string
    water?: string
    soil?: string
    perennial?: boolean
    heirloom?: boolean
    hybrid?: boolean
    openPollinated?: boolean
    selfPollinated?: boolean
    spacing?: number
    rowSpacing?: number
    pruning?: string
    sowingDepth?: number
    deletedAt?: string
    createdAt?: Date
    updatedAt?: Date
    userVote?: boolean | null
    greenThumbsUp?: number
    greenThumbsDown?: number
    variety?: string
}
