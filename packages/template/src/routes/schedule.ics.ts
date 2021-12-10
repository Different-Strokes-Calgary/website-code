import * as _iCal from 'node-ical'
import type * as svelteKit from '@sveltejs/kit'
import fetch from 'node-fetch'
const iCal = _iCal.async

const scheduleUrl =
  'https://calendar.google.com/calendar/ical/differentstrokesyyc%40gmail.com/public/basic.ics'

// FIXME: Implement caching if we ever do server-side instead of static rendering
export const get: svelteKit.RequestHandler = async function (request) {
  const response = await fetch(scheduleUrl)
  const body = await response.text()
  return {
    headers: {
      'content-type': 'text/plain'
    },
    body
  }
}
