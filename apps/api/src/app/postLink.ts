import { LinkData } from '@ready-set-redirect/api-interfaces'
import { Request, Response } from 'express'
import { Client } from 'pg'

interface postLinkRequest extends Request {
  body: LinkData
}

export const postLink = (client: Client) => (req: postLinkRequest, res: Response) => {
  const query = `
    INSERT INTO data (url, timer)
    VALUES ($1, $2)
    RETURNING id
  `
  const values = [req.body.url, req.body.timer]
  client.query(query, values, (err, data) => {
    if(err) {
      console.error(err)
    }
    res.json(data.rows[0].id)
  })
}
