import elastic from 'elasticsearch'

export const elasticClient = elastic.Client({
  host: process.env.ELASTIC_SERVER
})