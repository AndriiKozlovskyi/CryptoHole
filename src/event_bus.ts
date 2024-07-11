import mitt from 'mitt'

type Events = {
    selectedDateChange: Date
}

export const emitter = mitt<Events>()
