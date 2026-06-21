import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(app)/(authenticated)/dashboard/attributes/edit',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(authenticated)/dashboard/attributes/edit"!</div>
}
