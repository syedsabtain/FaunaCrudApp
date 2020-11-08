const fauna = require('faunadb')
const q = fauna.query
const dotenv = require('dotenv')
dotenv.config()

exports.handler = async (event) => {
  try {
    
      const data = JSON.parse(event.body)
      const adminClient = new fauna.Client({secret:process.env.FAUNADB_KEY})

      const result = await adminClient.query(

        q.Delete(
          q.Ref(q.Collection('CrudApp'),data.data)
        )
      )


    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
