import { LinkData } from '@ready-set-redirect/api-interfaces'
import { Request, Response } from 'express'
import { Client } from 'pg';

export const postLink = (client: Client) => (req: Request, res: Response) => {
  const query = `
    INSERT INTO data (url, timer)
    VALUES ($1, $2)
    RETURNING id
  `;
  const values = [req.body.url, req.body.timer];
  client.query(query, values, (err, data) => {
    res.json(data.rows[0].id)
  })
}