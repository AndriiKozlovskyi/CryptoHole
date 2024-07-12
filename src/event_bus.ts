import mitt from 'mitt'

type Events = {
    changeSelectedDate: Date
}

export const emitter = mitt<Events>()
