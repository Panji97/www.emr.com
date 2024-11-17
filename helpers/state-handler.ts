export const handlePending = <T extends { status: string; error: string | null }>(state: T) => {
    state.status = 'loading'
    state.error = null
}

export const handleFulfilled = <T extends { status: string; data: any }>(state: T, action: any) => {
    state.status = 'successed'
    state.data = action.payload
}

export const handleRejected = <T extends { status: string; error: string | null }>(state: T, action: any) => {
    state.status = 'failed'
    state.error = action.payload
}
