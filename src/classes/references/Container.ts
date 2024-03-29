// app/models/Container.ts

import Reference from "./Reference"
import ReferenceOptions from "./ReferenceOptions"
import Scene from "./Scene"
import Picture from "../Picture"
import Database from "../../services/Database"

export default class Container extends Reference {
    protected _scenes: Array<Scene>
    protected _picture: Picture
    protected _containers: Array<Container>

    constructor(options: ReferenceOptions, databaseId: number, picture: Picture) {
        super(options, databaseId)
        this._picture = picture
        this._scenes = []
        this._containers = []
    }

    get picture(): Picture {
        return this._picture
    }

    set picture(picture: Picture) {
        this._picture = picture
    }

    get scenes(): Array<Scene> {
        return this._scenes
    }

    addScene(scene: Scene) {
        this._scenes.push(scene)
    }

    removeScene(scene: Scene) {
        for (const index of this._scenes.keys()) {
            if (this._scenes[index] === scene) {
                this._scenes.splice(index, 1)
                return
            }
        }
    }

    removeSceneByIndex(index: number) {
        const scene = this._scenes.splice(index, 1)[0]

        return scene
    }

    get containers(): Array<Container> {
        return this._containers
    }

    addContainer(container: Container) {
        this._containers.push(container)
    }

    removeContainer(container: Container) {
        for (const index of this._containers.keys()) {
            if (this._containers[index].databaseId === container.databaseId) {
                this._containers.splice(index, 1)
                return
            }
        }
    }

    removeContainerByIndex(index: number) {
        const container = this._containers.splice(index, 1)[0]

        return container
    }

    removeAllContainers() {
        this._containers = []
    }

    removeAllScenes() {
        this._scenes = []
    }
}
