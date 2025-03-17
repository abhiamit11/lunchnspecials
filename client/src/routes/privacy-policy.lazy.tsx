import { PrivacyPolicy } from '@/pages'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/privacy-policy')({
  component: PrivacyPolicy,
})