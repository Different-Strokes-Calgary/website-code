import { NodePath } from '@dsc/utils/node'
import * as website from '@dsc/website'

/** @type {import('@dsc/utils/node').NodePath} */
export const project_path = new NodePath(new URL(import.meta.url)).parent.parent
export const website_path = new NodePath(website.module_path)
export const workspace_path = website_path.parent
export const pages_path = website_path.join('pages').resolved
export const images_path = website_path.join('images').resolved
export const lib_path = project_path.join('src', 'lib').resolved
