import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/discounts/')({
  component: DiscountIndex,
})

function DiscountIndex() {
  return <div>Hello "/dashboard/discounts/"!</div>
}
