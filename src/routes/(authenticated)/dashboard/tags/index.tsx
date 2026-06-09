import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/dashboard/tags/')({
  component: TagsIndex,
})

function TagsIndex() {
  return <div>Hello "/dashboard/tags/"!</div>
}
