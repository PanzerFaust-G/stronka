const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event) => {
  const { nick, email, pass, ip } = JSON.parse(event.body)
  const { data } = await supabase.from('users').select('nick').eq('nick', nick).single()
  if (data) return { statusCode: 400, body: 'Nick zajęty' }
  await supabase.from('users').insert({ nick, email, password: pass, ip })
  return { statusCode: 200, body: 'OK' }
}