import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { idea } from './idea'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, idea],
}
