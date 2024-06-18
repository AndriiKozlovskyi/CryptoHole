import mitt from 'mitt'

type Events = {
  saveProject: undefined
  unsaveProject: undefined
  updateSavedProject: undefined
  updateProject: undefined
  addSavedProject: undefined

}

export const emitter = mitt<Events>()