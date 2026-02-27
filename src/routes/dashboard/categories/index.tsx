import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/categories/')({
  component: CategoriesIndex,
})

export default function CategoriesIndex() {
  return <div>Hello "/dashboard/categories/"!</div>
}
