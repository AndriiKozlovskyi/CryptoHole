import { useRepo, type Collection } from 'pinia-orm'
import store from '../store/store'
import Tag from '@/models/tag_model'
import TagApi from '@/api/tag_api'
import TagResponse from '@/dtos/responses/tag_response'
import TagRequest from '@/dtos/requests/tag_request'

export default class TagManager {
  protected static get repository() {
    return useRepo(Tag, store)
  }

  static all(): Collection<Tag> {
    return this.repository.all()
  }

  static getById(id: number): Tag | null {
    return this.repository.find(id)
  }

  static async loadAll() {
    const response = await TagApi.getAllTags()
    const tags = this.getFormatedTags(response.data)

    this.repository.save(tags)
  }

  static async createTag(tag: TagRequest) {
    const tagResponse = await TagApi.createTag(tag)
    const tagResult = this.getFormatedTag(tagResponse.data)

    this.repository.save(tagResult)
  }

  static async deleteTag(id: number) {
    await TagApi.deleteTag(id)

    this.repository.destroy(id)
  }

  public static getFormatedTags(tags: Array<TagResponse>) {
    const _this = this
    return tags.map((tag) => {
      return _this.getFormatedTag(tag)
    })
  }

  public static getTagsIds(tags: Array<TagResponse>): Array<number> {
    return tags.map((tag) => {
      return tag.id;
    })
  }

  static getTagByName(name: string) {
    return this.repository.where('name', name).first()
  }

  private static getFormatedTag(tagResponse: TagResponse) {
    return {
      id: tagResponse.id,
      name: tagResponse.name
    }
  }
}
