import { Request, Response } from 'express'
import { Client } from 'pg'

export const getLink = (client: Client) => (req: Request, res: Response) => {
  const query = `
    SELECT url, timer
    FROM data
    WHERE id = $1
  `
  const values = [+req.params.id]
  client.query(query, values, (err, data) => {
    if(err) {
      console.error(err)
    }
    res.json(data.rows[0])
  })
}
