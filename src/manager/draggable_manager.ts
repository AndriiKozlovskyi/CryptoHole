// DragManager.ts
import LocalStorageManager from '@/manager/local_storage_manager.ts'

class DragManager {
  static container: HTMLElement | null = null
  static el: HTMLElement | null = null
  static cOffX: number = 0
  static cOffY: number = 0
  static d: string = 'dragging'

  static init(name: string): void {
    this.el = document.getElementById(name) as HTMLElement
    this.el.style.position = 'relative'
    this.el.style.width = '18rem'
    this.el.style.zIndex = '1000'
    this.el.style.paddingTop = '1rem'
    this.el.style.paddingLeft = '1rem'
    this.el.style.paddingRight = '1rem'

    this.container = document.getElementById('container')

    this.el.addEventListener('mousedown', this.dragStart.bind(this))
  }

  static dragStart(e: MouseEvent): void {
    e.preventDefault()
    console.log('vrevb')

    this.cOffX = e.clientX - this.el!.offsetLeft
    this.cOffY = e.clientY - this.el!.offsetTop

    document.addEventListener('mousemove', this.dragMove.bind(this))
    document.addEventListener('mouseup', this.dragEnd.bind(this))

    this.el!.classList.add(this.d)
    this.container!.style.cursor = 'move'
  }

  static dragMove(e: MouseEvent): void {
    e.preventDefault()

    const index = Array.prototype.indexOf.call(this.el!.parentNode!.children, this.el)
    console.log(index)
    this.el!.style.top = (e.clientY - index * this.el!.offsetHeight - this.cOffY).toString() + 'px'
    this.el!.style.left = (e.clientX - this.cOffX).toString() + 'px'
  }

  static dragEnd(e: MouseEvent): void {
    e.preventDefault()

    document.removeEventListener('mousemove', this.dragMove.bind(this))
    document.removeEventListener('mouseup', this.dragEnd.bind(this))

    this.container!.style.cursor = ''

    const dropZones = document.querySelectorAll('.drop-zone')
    const elRect = this.el!.getBoundingClientRect()

    let closestDropZone: HTMLElement | null = null
    let minDistance: number = Infinity

    dropZones.forEach((dropZone) => {
      const dropZoneRect = (dropZone as HTMLElement).getBoundingClientRect()

      if (this.isIntersecting(elRect, dropZoneRect)) {
        const elCenter = {
          x: elRect.left + elRect.width / 2,
          y: elRect.top + elRect.height / 2
        }
        const dropZoneCenter = {
          x: dropZoneRect.left + dropZoneRect.width / 2,
          y: dropZoneRect.top + dropZoneRect.height / 2
        }

        const distance = Math.sqrt(
          Math.pow(elCenter.x - dropZoneCenter.x, 2) + Math.pow(elCenter.y - dropZoneCenter.y, 2)
        )

        if (distance < minDistance) {
          minDistance = distance
          closestDropZone = dropZone as HTMLElement
        }
      }
    })

    if (closestDropZone) {
      const project = LocalStorageManager.getSavedProjectByName(this.el!.id)
      project.status = closestDropZone.id
      LocalStorageManager.updateSavedProject(project)

      closestDropZone.appendChild(this.el!)
      this.el!.style.position = 'relative'
      this.el!.style.paddingTop = '1rem'
      this.el!.style.paddingLeft = '1rem'
      this.el!.style.paddingRight = '1rem'

      this.el!.style.left = '0px'
      this.el!.style.top = '0px'
      this.el!.classList.remove(this.d)
    }
  }

  static isIntersecting(rect1: DOMRect, rect2: DOMRect): boolean {
    return !(
      rect2.left > rect1.right ||
      rect2.right < rect1.left ||
      rect2.top > rect1.bottom ||
      rect2.bottom < rect1.top
    )
  }
}

export default DragManager
