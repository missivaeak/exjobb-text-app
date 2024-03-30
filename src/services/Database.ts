// import { enablePromise, openDatabase, ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage'
import * as SQLite from '../libs/sqlite/next'
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'

import Picture from '../classes/Picture'
import Sound from '../classes/references/Sound'
import Container from '../classes/references/Container'
import Scene from '../classes/references/Scene'
import Region from '../classes/references/Region'
import ReferenceOptions from '../classes/references/ReferenceOptions'
import Reference from '../classes/references/Reference'

import type CoordinatesType from '../types/CoordinatesType'
import type ShapeInterface from '../classes/shapes/ShapeInterface'
import Circle from '../classes/shapes/Circle'
import Rectangle from '../classes/shapes/Rectangle'

const tbls = {
  picture: 'picture',
  setting: 'setting',
  container: 'container',
  scene: 'scene',
  region: 'region',
  sound: 'sound',
  startingPointPicture: 'startingpoint_picture',
  startingPointContainer: 'startingpoint_container',
  pictureContainer: 'picture_x_container',
  pictureScene: 'picture_x_scene',
  containerScene: 'container_x_scene',
  containerContainer: 'container_x_container',
}

const views = {
  startingPointContainers: 'v_startingpoint_containers',
  containerPictures: 'v_container_pictures',
  containerContainers: 'v_container_containers',
  containerScenes: 'v_container_scenes',
  scenePictures: 'v_scene_pictures',
}

// enablePromise(true)

export default class Database {
  private connection: Promise<SQLite.SQLiteDatabase>

  constructor() {
    // const docDir = FileSystem.documentDirectory ?? ''

    // this.connection = new Promise(async (resolve) => {
    //   if (!(await FileSystem.getInfoAsync(docDir + 'SQLite')).exists) {
    //     await FileSystem.makeDirectoryAsync(docDir + 'SQLite');
    //   }

    //   const downloadResult = await FileSystem.downloadAsync(
    //     Asset.fromModule(require('../assets/main.db')).uri,
    //     docDir + 'SQLite/main.db'
    //   )

    //   const dbFileInfo = await FileSystem.getInfoAsync(docDir + 'SQLite/main.db')
    //   console.log('main.db exists:', dbFileInfo.exists)

    //   resolve(await SQLite.openDatabaseAsync('main.db'))
    // })

    this.connection = new Promise(async (resolve) => {
      const db = SQLite.openDatabaseAsync('eeoeoeaeo', {useNewConnection: true})

      // const schemaAsset = await Asset.loadAsync(require('../assets/schema.sql'))
      // const schemaSql = await FileSystem.readAsStringAsync(schemaAsset[0].localUri ?? '')
      // const settingAsset = await Asset.loadAsync(require('../assets/setting.sql'))
      // const settingSql = await FileSystem.readAsStringAsync(settingAsset[0].localUri ?? '')

      // console.log(await db.execAsync([{sql:schemaSql, args: []}], false))

      // await db.transactionAsync(async (tx) => {
      //   console.log(await tx.executeSqlAsync(schemaSql))
      //   await tx.executeSqlAsync(settingSql)
      // }, false)

      await this.init(await db)

      resolve(db)
    })

  }

  /**
   * General things
   */

  async init(db: SQLite.SQLiteDatabase) {
    const schemaAsset = await Asset.loadAsync(require('../assets/schema.sql'))
    const schemaSql = await FileSystem.readAsStringAsync(schemaAsset[0].localUri ?? '')
    const settingAsset = await Asset.loadAsync(require('../assets/setting.sql'))
    const settingSql = await FileSystem.readAsStringAsync(settingAsset[0].localUri ?? '')

    await db.execAsync(schemaSql)
    await db.execAsync(settingSql)
  
    // db.transactionAsync(async (tx) => {
    //   console.log(await tx.executeSqlAsync(`CREATE TABLE 'picture' (
    //     'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    //     'format' VARCHAR(20) NOT NULL,
    //     'source' VARCHAR(40) NOT NULL
    // );`))
    // }, false)
    // console.log(await db.execAsync([{
    //   sql:`CREATE TABLE 'picture' (
    //       'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    //       'format' VARCHAR(20) NOT NULL,
    //       'source' VARCHAR(40) NOT NULL
    //   );`,
    //   args: []}
    // ], false))
    // await db.transactionAsync(async (tx) => {
    //   console.log(await tx.executeSqlAsync(schemaSql))
    //   console.log(await tx.executeSqlAsync(settingSql))
    // }, false)
  }

  async ping() {
    // (await this.connection).transactionAsync(async (tx) => {
    //   const result = await tx.executeSqlAsync(`SELECT name FROM sqlite_schema
    //   WHERE type='table'
    //   ORDER BY name;`, [])
    //   for (const row of result.rows) {
    //     console.log(row)
    //   }
    // }, true)
    // const statement = await (await this.connection).prepareAsync(`SELECT name FROM sqlite_schema
    // WHERE type='table'
    // ORDER BY name;`)
    // const resultSet = await statement.executeAsync()
    // console.log(await resultSet.getAllAsync())

    // statement.finalizeAsync()

    // const query = `SELECT * FROM setting WHERE variable = ?;`
    // const resultSet = await (await this.connection).runAsync(query, ["first_run"])
    // console.log(await resultSet.getFirstAsync())
    // const firstRun = resultSet[0].rows.item(0).value as string
    // let resultSet: SQLite.SQLiteExecuteAsyncResult<unknown>

    // const statement = await (await this.connection).prepareAsync(`SELECT * FROM setting WHERE variable = $variable;`)

    // try {
    //   resultSet = await statement.executeAsync({ $variable: 'first_run'})
    // } finally {
    //   statement.finalizeAsync()
    // }

    // console.log(await this.connection)

    // console.log(await resultSet.getAllAsync())
    // const firstRun = resultSet[0].rows.item(0).value as string

    // return {firstRun}

    const statement = await (await this.connection).prepareAsync('SELECT * FROM setting WHERE variable = ?;')
    const result = await statement.executeAsync(['first_run'])
    const firstRun = (await result.getFirstAsync() as any).value as string
    await statement.finalizeAsync()

    return {firstRun}
  }

  async setSetting(variable: string, value: string) {
    // const query =
    //   `INSERT OR REPLACE INTO ${tbls.setting}(variable, value) values(?, ?)`

    // return (await this.connection).executeSql(query, [variable, value])

    const statement = await (await this.connection).prepareAsync(`INSERT OR REPLACE INTO ${tbls.setting}(variable, value) values(?, ?)`)
    const resultSet = await statement.executeAsync([variable, value])
    const result = await resultSet.getFirstAsync()
    await statement.finalizeAsync()

    return result
  }

  async delete(deleteeObj: Picture | Container | Scene | Region | Sound) {
    switch (true) {
      case deleteeObj instanceof Picture:
        await this.deletePicture(deleteeObj)
        break
      case deleteeObj instanceof Container:
        await this.deleteContainer(deleteeObj)
        break
      case deleteeObj instanceof Region:
        await this.deleteRegion(deleteeObj)
        break
      case deleteeObj instanceof Scene:
        await this.deleteScene(deleteeObj)
        break
    }
  }

  /**
   * Sync things
   */

  async sync(synceeObj: Container | Scene | Region) {
    switch (true) {
      case synceeObj instanceof Container:
        if (
          synceeObj.type === 'folder' ||
          synceeObj.type === 'startingPoint'
        ) {
          return await this.syncFolder(synceeObj)
        }
        return await this.syncPlace(synceeObj)
      case synceeObj instanceof Scene:
        return await this.syncScene(synceeObj)
    }

    return synceeObj
  }

  async syncFolder(folder: Container) {
  //   const containers = await this.getContainersOf(folder)

  //   folder.removeAllContainers()

  //   if (containers) {
  //     for (const container of containers) {
  //       folder.addContainer(container)
  //     }
  //   }

  //   return folder
  }

  async syncPlace(place: Container) {
    const scenes = await this.getScenesOf(place)

    place.removeAllScenes()

    if (scenes) {
      for (const scene of scenes) {
        place.addScene(scene)
      }
    }

    return place
  }

  async syncScene(scene: Scene) {
    const regions = await this.getRegionsOf(scene)

    scene.removeAllRegions()

    if (regions) {
      for (const region of regions) {
        scene.addRegion(region)
      }
    }

    return scene
  }

  /**
   * Starting point things
   */

  async getStartingPoint() {
    // const query = `SELECT * FROM ${tbls.startingPointContainer}`
    // const containers: Array<Container> = []
    // const resultSet = await (await this.connection).executeSql(query)
    // resultSet.forEach(result => {
    //   for (let index = 0; index < result.rows.length; index++) {
    //     containers.push(result.rows.item(index))
    //   }
    // })

    const picture = await this.getStartingPointPicture()
    const options: ReferenceOptions = {
      type: 'startingPoint',
      name: 'Hem',
      description: 'Appens utgångspunkten.'
    }

    return new Container(options, 0, picture)
  }

  async setStartingPointPicture(pictureId: number) {
    // const deleteQuery = `DELETE FROM ${tbls.startingPointPicture}`
    // const insertQuery = `INSERT INTO ${tbls.startingPointPicture}(picture_id) values(?)`

    // await (await this.connection).executeSql(deleteQuery)
    // await (await this.connection).executeSql(insertQuery, [pictureId])

    // return

    const statement1 = await (await this.connection).prepareAsync(`DELETE FROM ${tbls.startingPointPicture}`)
    await statement1.executeAsync()
    await statement1.finalizeAsync()

    const statement2 = await (await this.connection).prepareAsync(`INSERT INTO ${tbls.startingPointPicture}(picture_id) values(?)`)
    const resultSet = await statement2.executeAsync([pictureId])
    const result = await resultSet.getAllAsync()
    await statement2.finalizeAsync()

    return result
  }

  async getStartingPointPicture() {
    // const query = `
    //   SELECT
    //     p.id, p.format, p.source, s.picture_id
    //   FROM
    //     ${tbls.picture} as p, ${tbls.startingPointPicture} as s
    //   WHERE 
    //     p.id = s.picture_id
    //   `
    // const resultSet = await (await this.connection).executeSql(query)
    // const picture = resultSet[0].rows.item(0)

    const statement = await (await this.connection).prepareAsync(`
    SELECT
      p.id, p.format, p.source, s.picture_id
    FROM
      ${tbls.picture} as p, ${tbls.startingPointPicture} as s
    WHERE 
      p.id = s.picture_id
    `)
    const resultSet = await statement.executeAsync()
    const result = await resultSet.getFirstAsync() as any
    await statement.finalizeAsync()

    return new Picture(result.source, result.id, result.format)
  }

  /**
   * Picture things
   */

  async getPictures() {
    const pictures: Array<Picture> = []
    // const query = `SELECT id, format, source FROM ${tbls.picture}`
    // const resultSet = await (await this.connection).executeSql(query)

    const statement = await (await this.connection).prepareAsync(`SELECT id, format, source FROM ${tbls.picture}`)
    const resultSet = await statement.executeAsync()
    const result = await resultSet.getAllAsync()
    await statement.finalizeAsync()

    result.forEach((data: any) => {
      const picture = new Picture(data.source, data.id, data.format)
      pictures.push(picture)
    })

    return pictures
  }

  async insertPicture(path: string, format: string) {
    // const query =
    //   `INSERT INTO ${tbls.picture}(format, source) values(?, ?)`

    // const resultSet = await (await this.connection).executeSql(query, [format, path])

    const statement = await (await this.connection).prepareAsync(`INSERT INTO ${tbls.picture}(format, source) values(?, ?)`)
    const resultSet = await statement.executeAsync([format, path])
    const insertId = await resultSet.lastInsertRowId
    await statement.finalizeAsync()

    return new Picture(path, insertId, format)
  }

  // private async getPictureOfContainer(container: Container) {
  //   const query = `
  //     SELECT
  //       p.id, p.format, p.source, s.picture_id, s.container_id
  //     FROM
  //       ${tbls.picture} as p, ${tbls.pictureContainer} as c
  //     WHERE 
  //       s.container_id = ? AND
  //       p.id = s.picture_id
  //     `
  //   const resultSet = await (await this.connection).executeSql(query, [container.databaseId])
  //   const picture = resultSet[0].rows.item(0)

  //   return new Picture(picture.source, picture.id, picture.format)
  // }

  private async deletePicture(picture: Picture) {
  //   const query =
  //     `DELETE FROM ${tbls.picture} WHERE id = ?`

  //   const resultSet = await (await this.connection).executeSql(query, [picture.databaseId])

  //   return resultSet[0]
  }

  /**
   * Container things
   */

  async addContainer(options: ReferenceOptions, picture: Picture) {
    // even if objects dont require a parent in the javascript runtime
    // we require a parent at database insertion
    if (!options.parent) {
      throw new Error('Error adding container to database. New container has no parent.')
    }

    const containerStatement = await (await this.connection).prepareAsync(`INSERT INTO ${tbls.container}(type, name, description) values(?, ?, ?)`)
    const containerResultSet = await containerStatement.executeAsync([
      options.type,
      options.name,
      options.description
    ])
    const containerInsertId = await containerResultSet.lastInsertRowId
    await containerStatement.finalizeAsync()
  
    // const containerQuery =
    //   `INSERT INTO ${tbls.container}(type, name, description) VALUES(?, ?, ?)`
    // const resultSet = await (await this.connection).executeSql(containerQuery, [
    //   options.type,
    //   options.name,
    //   options.description
    // ])
    // const containerId = resultSet[0].insertId
    const container = new Container(options, containerInsertId, picture)

    // const pictureQuery =
    //   `INSERT INTO ${tbls.pictureContainer}(picture_id, container_id) VALUES(?, ?)`
    // await (await this.connection).executeSql(pictureQuery, [picture.databaseId, containerId])

    const pictureStatement = await (await this.connection).prepareAsync(`INSERT INTO ${tbls.pictureContainer}(picture_id, container_id) VALUES(?, ?)`)
    const pictureResultSet = await pictureStatement.executeAsync([
      picture.databaseId,
      containerInsertId
    ])
    // console.log(pictureResultSet.lastInsertRowId)
    // const pictureInsertId = await pictureResultSet.lastInsertRowId
    await pictureStatement.finalizeAsync()

    // if the parent is added to the starting point we use this table
    if (options.parent.type === 'startingPoint') {
      // const parentQuery = 
      //   `INSERT INTO ${tbls.startingPointContainer}(container_id) VALUES(?)`
      // await (await this.connection).executeSql(parentQuery, [containerId])

      const parentStatement = await (await this.connection).prepareAsync(`INSERT INTO ${tbls.startingPointContainer}(container_id) VALUES(?)`)
      await parentStatement.executeAsync([
        containerInsertId
      ])
      await parentStatement.finalizeAsync()

      return container
    }

    // default parent table
    // const parentQuery = 
    //   `INSERT INTO ${tbls.containerContainer}(child_id, parent_id) VALUES(?, ?)`
    // await (await this.connection).executeSql(parentQuery, [containerId, options.parent.databaseId])

    const parentStatement = await (await this.connection).prepareAsync(`INSERT INTO ${tbls.containerContainer}(child_id, parent_id) VALUES(?, ?)`)
    await parentStatement.executeAsync([
      containerInsertId,
      options.parent.databaseId
    ])
    await parentStatement.finalizeAsync()

    return container
  }

  async deleteContainer(container: Container) {
  //   const query =
  //     `DELETE FROM ${tbls.container} WHERE id = ?`
  //   const resultSet = await (await this.connection).executeSql(query, [container.databaseId])

  //   return resultSet[0]
  // }

  // async getContainersOf(container: Container) {
  //   if (container.type === 'startingPoint') {
  //     return await this.getContainersOfStartingPoint()
  //   }

  //   return await this.getContainersOfFolderOrPlace(container)
  }

  async getContainersOfStartingPoint() {
    const containers: Array<Container> = []
    // const query = `
    //   SELECT
    //     c.id,
    //     c.type,
    //     c.name,
    //     c.description,
    //     p.picture_id,
    //     p.format,
    //     p.source
    //   FROM
    //     ${views.startingPointContainers} AS c
    //   LEFT JOIN
    //     ${views.containerPictures} AS p
    //     ON c.id = p.container_id;`
    // const resultSet = await (await this.connection).executeSql(query)

    const statement = await (await this.connection).prepareAsync(`
      SELECT
        c.id,
        c.type,
        c.name,
        c.description,
        p.picture_id,
        p.format,
        p.source
      FROM
        ${views.startingPointContainers} AS c
      LEFT JOIN
        ${views.containerPictures} AS p
        ON c.id = p.container_id;`)
    const resultSet = await statement.executeAsync()
    const result = await resultSet.getAllAsync()
    await statement.finalizeAsync()

    result.forEach((data: any) => {
        const options: ReferenceOptions = {
          type: data.type,
          name: data.name,
          description: data.description
        }
        const picture = new Picture(data.source, data.picture_id, data.format)

        const container = new Container(options, data.id, picture)

        containers.push(container)
    })

    return containers
  }

  // async getContainersOfFolderOrPlace(container: Container) {
  //   const containers: Array<Container> = []
  //   const query = `
  //     SELECT
  //       c.id,
  //       c.type,
  //       c.name,
  //       c.description,
  //       p.picture_id,
  //       p.format,
  //       p.source
  //     FROM
  //       ${views.containerContainers} AS c
  //     LEFT JOIN
  //       ${views.containerPictures} AS p
  //       ON c.id = p.container_id
  //     WHERE
  //     c.parent_id = ?;`
  //   const resultSet = await (await this.connection).executeSql(query, [container.databaseId])

  //   resultSet.forEach(result => {
  //     for (let index = 0; index < result.rows.length; index++) {
  //       const data = result.rows.item(index)
  //       const options: ReferenceOptions = {
  //         type: data.type,
  //         name: data.name,
  //         description: data.description
  //       }
  //       const picture = new Picture(data.source, data.picture_id, data.format)

  //       const container = new Container(options, data.id, picture)
  //       containers.push(container)
  //     }
  //   })

  //   return containers
  // }

  /**
   * Scene things
   */

  async addScene(options: ReferenceOptions, picture: Picture) {
    // even if objects dont require a parent in the javascript runtime
    // we require a parent at database insertion
    if (!options.parent) {
      throw new Error('Error adding scene to database. New scene has no parent.')
    }

    const sceneStatement = await (await this.connection).prepareAsync(
      `INSERT INTO ${tbls.scene}(name, description) VALUES(?, ?)`
    )
    const sceneResultSet = await sceneStatement.executeAsync([
      options.name,
      options.description
    ])
    const sceneId = await sceneResultSet.lastInsertRowId
    await sceneStatement.finalizeAsync()

    // const sceneQuery =
    //   `INSERT INTO ${tbls.scene}(name, description) VALUES(?, ?)`
    // const resultSet = await (await this.connection).executeSql(sceneQuery, [
    //   options.name,
    //   options.description
    // ])
    // const sceneId = resultSet[0].insertId
    const scene = new Container(options, sceneId, picture)

    const pictureStatement = await (await this.connection).prepareAsync(
      `INSERT INTO ${tbls.pictureScene}(picture_id, scene_id) VALUES(?, ?)`
    )
    await pictureStatement.executeAsync([
      picture.databaseId,
      sceneId
    ])
    await pictureStatement.finalizeAsync()

    // const pictureQuery =
    //   `INSERT INTO ${tbls.pictureScene}(picture_id, scene_id) VALUES(?, ?)`
    // await (await this.connection).executeSql(pictureQuery, [picture.databaseId, sceneId])

    // default parent table
    const parentStatement = await (await this.connection).prepareAsync(
      `INSERT INTO ${tbls.containerScene}(scene_id, container_id) VALUES(?, ?)`
    )
    await parentStatement.executeAsync([
      sceneId,
      options.parent.databaseId
    ])
    await parentStatement.finalizeAsync()
    // const parentQuery = 
    //   `INSERT INTO ${tbls.containerScene}(scene_id, container_id) VALUES(?, ?)`
    // await (await this.connection).executeSql(parentQuery, [sceneId, options.parent.databaseId])

    return scene
  }

  async deleteScene(scene: Scene) {
    const statement = await (await this.connection).prepareAsync(
      `DELETE FROM ${tbls.scene} WHERE id = ?`
    )
    await statement.executeAsync(scene.databaseId)
    await statement.finalizeAsync()
    // const query =
    //   `DELETE FROM ${tbls.region} WHERE id = ?`
    // const resultSet = await (await this.connection).executeSql(query, [region.databaseId])

    // return resultSet[0]
    return
  }

  async getScenesOf(place: Container) {
    const scenes: Array<Scene> = []
    const statement = await (await this.connection).prepareAsync(`
      SELECT
        s.id,
        s.name,
        s.description,
        p.picture_id,
        p.format,
        p.source
      FROM
        ${views.containerScenes} AS s
      LEFT JOIN
        ${views.scenePictures} AS p
        ON s.id = p.scene_id
      WHERE
      s.container_id = ?;`)
    const resultSet = await statement.executeAsync([place.databaseId])
    const result = await resultSet.getAllAsync()

    result.forEach((data: any) => {
      console.log(data)
      const options: ReferenceOptions = {
        type: data.type,
        name: data.name,
        description: data.description
      }
      const picture = new Picture(data.source, data.picture_id, data.format)

      // const scene = new Container(options, data.id, picture)
      const scene = new Scene(options, data.id, picture)
      console.log(scene)
      scenes.push(scene)
    })

    return scenes
  }

  /** 
   * Parent things
   */

  async getParentOf(reference: Reference) {
  //   switch(reference.type) {
  //     case 'folder':
  //       return this.getParentOfFolder(reference as Container)
      
  //     default:
  //       throw new Error('Error getting parent of:' + reference)
  //   }
  }

  // private async getParentOfFolder(folder: Container) {
  //   const query = `
  //     SELECT
  //       c.id, c.type, c.name, c.description, x.child_id, x_parent_id
  //     FROM
  //       ${tbls.container} as c, ${tbls.containerContainer} as x
  //     WHERE 
  //       x.child_id = ? AND
  //       x.parent_id = c.id
  //     `
  //   const resultSet = await (await this.connection).executeSql(query, [folder.databaseId])
  //   const parent = resultSet[0].rows.item(0)
  //   const options: ReferenceOptions = {
  //     type: 'folder',
  //     name: parent.name,
  //     description: parent.description
  //   }
  //   const picture = await this.getPictureOfContainer(folder)

  //   return new Container(options, parent.id, picture)
  // }

  /**
   * Sound things
   */

  // async insertSound(filename: string, format?: string) {
  //   const query =
  //     `INSERT INTO ${tbls.sound}(format, source, name, description) values(?, ?, ?, ?)`

  //   const options: ReferenceOptions = {
  //     type: 'sound',
  //     name: '',
  //     description: ''
  //   }

  //   const resultSet = await (await this.connection).executeSql(query, [format ?? '', filename, options.name, options.description])

  //   return new Sound(options, filename, resultSet[0].insertId, format)
  // }

  // async getSound(databaseId: number) {
  //   const query =
  //     `SELECT
  //       id,
  //       source,
  //       format,
  //       name,
  //       description
  //     FROM ${tbls.sound}
  //     WHERE
  //       id = ?`

  //   const resultSet = await (await this.connection).executeSql(query, [databaseId])
  //   const data = resultSet[0].rows.item(0)

  //   const options: ReferenceOptions = {
  //     type: 'sound',
  //     name: data.name,
  //     description: data.description
  //   }

  //   return new Sound(options, data.source, data.id, data.format)
  // }

  /**
   * Region things
   */

  async insertRegion(
    origin: CoordinatesType,
    shape: ShapeInterface,
    // sound: Sound,
    scene: Scene
  ) {
    const statement = await (await this.connection).prepareAsync(
      `INSERT INTO ${tbls.region}(
        scene_id,
        position_x,
        position_y,
        shape_type,
        shape_properties,
        action_type,
        action_id
      ) values(?, ?, ?, ?, ?, ?, ?)`
    )
    const resultSet = await statement.executeAsync(
      scene.databaseId,
      origin.x,
      origin.y,
      shape.properties.type,
      JSON.stringify(shape.properties),
      'sound',
      1
    )
    const insertId = resultSet.lastInsertRowId
    await statement.finalizeAsync()
    // const query =
    //   `INSERT INTO ${tbls.region}(
    //     scene_id,
    //     position_x,
    //     position_y,
    //     shape_type,
    //     shape_properties,
    //     action_type,
    //     action_id
    //   ) values(?, ?, ?, ?, ?, ?, ?)`

    // const resultSet = await (await this.connection).executeSql(query, [
    //   scene.databaseId,
    //   origin.x,
    //   origin.y,
    //   shape.properties.type,
    //   JSON.stringify(shape.properties),
    //   'sound',
    //   1
    // ])

    return new Region(origin, shape, null, insertId)
  }

  async deleteRegion(region: Region) {
    const statement = await (await this.connection).prepareAsync(
      `DELETE FROM ${tbls.region} WHERE id = ?`
    )
    await statement.executeAsync(region.databaseId)
    await statement.finalizeAsync()
    // const query =
    //   `DELETE FROM ${tbls.region} WHERE id = ?`
    // const resultSet = await (await this.connection).executeSql(query, [region.databaseId])

    // return resultSet[0]
    return
  }

  async getRegionsOf(scene: Scene) {
    const regions: Array<Region> = []

    const statement = await (await this.connection).prepareAsync(
      `SELECT
      id,
      scene_id,
      position_x,
      position_y,
      shape_type,
      shape_properties,
      action_type,
      action_id
    FROM
      ${tbls.region}
    WHERE
      scene_id = ?`
    )
    const sceneResultSet = await statement.executeAsync([
      scene.databaseId
    ])
    const result = await sceneResultSet.getAllAsync()
    await statement.finalizeAsync()

    // const query =
    //   `SELECT
    //     id,
    //     scene_id,
    //     position_x,
    //     position_y,
    //     shape_type,
    //     shape_properties,
    //     action_type,
    //     action_id
    //   FROM
    //     ${tbls.region}
    //   WHERE
    //     scene_id = ?`
    // const resultSet = await (await this.connection).executeSql(query, [scene.databaseId])

    for (const data of result as any[]) {
        let shape: ShapeInterface
        let action: Reference
        const shapeProperties = JSON.parse(data.shape_properties)

        switch (shapeProperties.type) {
          case 'circle':
            shape = new Circle({radius: shapeProperties.radius})
            break
          case 'rectangle':
            shape = new Rectangle({
              width: shapeProperties.width,
              height: shapeProperties.height
            })
            break
          default:
            throw new Error('Shape type ' + shapeProperties.type + ' is not a valid shape type.')
        }

        switch (data.action_type) {
          case 'sound':
            // action = await this.getSound(data.action_id)
            action = null
            break
          default:
            throw new Error('Action type ' + data.action_type + ' is not a valid action type.')
        }

        const region = new Region({
          x: data.position_x,
          y: data.position_y
        }, shape, action, data.id)
        regions.push(region)
    }

    return regions
  }
}
