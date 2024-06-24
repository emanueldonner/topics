export const load = async ({ locals: { supabase } }) => {
  const { data: topics, error } = await supabase.from('topics').select('name').limit(5).order('name')
  console.log('topics', topics, error)
  return { topics: topics ?? [] }
}