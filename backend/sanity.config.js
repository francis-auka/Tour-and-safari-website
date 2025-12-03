import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import schemas from './schemas'

export default defineConfig({
    name: 'lindberg-safaris',
    title: 'Lindberg Safaris CMS',

    projectId: 'nk22ixww',
    dataset: 'production',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemas,
    },
})
