import mitt from 'mitt'

type Events = {
    changeSelectedDate: Date,
    contextMenu: number,
}
export const emitter = mitt<Events>()
