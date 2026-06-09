import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(authenticated)/dashboard/attributes/edit',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(authenticated)/dashboard/attributes/edit"!</div>
}
