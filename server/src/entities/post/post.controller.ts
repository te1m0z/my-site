import type { Request, Response } from 'express'
import { ZodError } from 'zod'
//
import { getAllPosts, getPostById } from './post.services'
import { getPostsSchema, getPostByIdSchema } from './post.validation'
//
import { wrongData, somethingWentWrong } from '@/helpers/http'

abstract class PostController {

  static async all(req: Request, res: Response) {
    //
    try {
      //
      getPostsSchema.parse(req.query)
      //
    } catch (error: unknown) {
      //
      if (error instanceof ZodError) {
        return wrongData(res, error.issues)
      }
      //
      return somethingWentWrong(res)
    }
    //
    const posts = await getAllPosts()
    //
    return res.json(posts)
  }

  static async getById(req: Request, res: Response) {
    //
    try {
      //
      const { id } = getPostByIdSchema.parse(req.params)
      //
      const posts = await getPostById(id)
      //
      return res.json(posts)
      //
    } catch (error: unknown) {
      //
      if (error instanceof ZodError) {
        return wrongData(res, error.issues)
      }
      //
      return somethingWentWrong(res)
    }
  }

  static create(req: Request, res: Response) {
    return res.json({ name: 'dima' })
  }
}

export {
  PostController,
}
