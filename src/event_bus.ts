import mitt from 'mitt'

type Events = {
  saveProject: undefined
  unsaveProject: undefined
  updateSavedProject: undefined
}

export const emitter = mitt<Events>()