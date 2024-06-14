import mitt from 'mitt'

type Events = {
  saveProject: undefined
  unsaveProject: undefined
}

export const emitter = mitt<Events>()