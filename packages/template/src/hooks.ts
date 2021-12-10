import type { GetSession, Handle } from '@sveltejs/kit'

const page_index = '@dirListing($pages)'

export const handle: Handle = async ({ request, resolve }) => {
  request.locals.pages = page_index

  if (request.query.has('_method')) {
    request.method = request.query.get('_method').toUpperCase()
  }

  return resolve(request)
}

export const getSession: GetSession = (request) => {
  return { pages: request.locals.pages }
}
