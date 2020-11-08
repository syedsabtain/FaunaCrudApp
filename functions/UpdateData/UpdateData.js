const fauna = require('faunadb')
const q = fauna.query
const dotenv = require('dotenv')
dotenv.config()
exports.handler = async (event) => {
  try {
    const datar = JSON.parse(event.body)

    console.log(datar,'data')
    const adminClient = new fauna.Client({secret:process.env.FAUNADB_key})

    const result = await adminClient.query(

      q.Update(
        q.Ref(q.Collection('CrudApp'),datar.data.ref),
        {data:{information:datar.data.information}}
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
