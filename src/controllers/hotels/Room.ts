import RoomService from '../../services/hotels/Room'
import { Request, Response } from 'express'

class RoomController {
    private roomService: RoomService

    constructor() {
        this.roomService = new RoomService()
    }

    create = async (request: Request, response: Response) => {
        try {
            const room = await this.roomService.create(request.body)

            response.status(201).send(room)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    update = async (request: Request, response: Response) => {
        const { body, params } = request
        const id = Number(params.id)

        try {
            await this.roomService.update(id, body)
            response.send({'msg': 'Room has been updated successfully'})
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    destroy = async (request: Request, response: Response) => {
        const id = Number(request.params.id)

        try {
            await this.roomService.destroy(id)
            response.send({'msg': 'Room has been deleted successfully'})
        } catch (error: any) {
            response.status(404).send({ error: error.message })
        }
    }
}

export default RoomController
