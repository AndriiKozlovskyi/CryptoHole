import mitt from 'mitt'

type Events = {
  saveProject: undefined
  unsaveProject: undefined
  updateSavedProject: undefined
  addSavedProject: undefined

}

export const emitter = mitt<Events>()