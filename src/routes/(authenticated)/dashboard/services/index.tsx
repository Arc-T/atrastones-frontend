import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/dashboard/services/')({
  component: ServicesIndex,
})

function ServicesIndex() {
  return <div>Hello "/dashboard/services/"!</div>
}
