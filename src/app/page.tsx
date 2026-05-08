import { Hero } from '@/components/home/hero'
import { FeaturedProperties } from '@/components/home/featured-properties'
import { CategoriesSection } from '@/components/home/categories-section'
import { StatsSection } from '@/components/home/stats-section'
import { WhyChooseUs } from '@/components/home/why-choose-us'
import { featuredProperties } from '@/lib/mock-data'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties properties={featuredProperties} />
      <CategoriesSection />
      <StatsSection />
      <WhyChooseUs />
    </>
  )
}
