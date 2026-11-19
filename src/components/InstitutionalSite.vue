<script setup>
  import gsap from 'gsap'
  import { onMounted, onUnmounted } from 'vue'
  import { siteConfig as c } from '../config/siteConfig'
  import AccessibilityMenu from './AccessibilityMenu.vue'
  import BlogSection from './BlogSection.vue'
  import ContactSection from './ContactSection.vue'
  import FooterSection from './FooterSection.vue'
  import GoogleReviewsSection from './GoogleReviewsSection.vue'
  import HeaderNavigation from './HeaderNavigation.vue'
  import PracticeAreas from './PracticeAreas.vue'
  import ProductShowcase from './ProductShowcase.vue'
  import QuizCallout from './QuizCallout.vue'
  import TeamSection from './TeamSection.vue'

  let motion

  onMounted(() => {
    motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.editorial-photo', { y: 10 }, { y: 0, duration: 0.65, ease: 'power2.out', clearProps: 'transform' })
    })
  })

  onUnmounted(() => {
    motion?.revert()
  })
</script>

<template>
  <a class="skip-link" href="#main-content">Pular para o conteúdo</a>
  <HeaderNavigation />

  <section class="hero" :style="{ backgroundImage: `url(${c.hero.backgroundImage})` }">
    <div class="wrap">
      <p>{{ c.hero.eyebrow }}</p>
      <h1>{{ c.hero.title }}</h1>
      <span>{{ c.hero.subtitle }}</span>
    </div>
  </section>

  <main id="main-content" class="wrap" tabindex="-1">
    <div class="editorial-layout">
      <article id="escritorio">
        <img
          :alt="c.about.photoAlt"
          class="editorial-photo"
          height="880"
          :src="c.about.photo"
          width="1600"
        >
        <p class="eyebrow">O ESCRITÓRIO</p>
        <h2>{{ c.about.title }}</h2>
        <p class="lead">{{ c.about.subtitle }}</p>
        <p>{{ c.about.text }}</p>
        <a class="text-link" href="#equipe">Conheça nossa equipe <i aria-hidden="true" class="mdi mdi-arrow-right" /></a>
      </article>
      <aside aria-label="Nossas especialidades" class="practice-sidebar">
        <h2>Como podemos ajudar?</h2>
        <p>Conheça nossas áreas de atuação</p>
        <a v-for="(area, index) in c.practiceAreas" :key="area.title" :href="`#area-${index}`">
          {{ area.title }}<i aria-hidden="true" class="mdi mdi-chevron-right" />
        </a>
        <a class="outline-button" href="#contato">Entre em contato <i aria-hidden="true" class="mdi mdi-arrow-right" /></a>
        <div class="sidebar-note">
          <i aria-hidden="true" class="mdi mdi-message-text-outline" />
          <p>Orientação clara.<br>Atendimento próximo.</p>
          <small>{{ c.contact.businessHours }}</small>
        </div>
      </aside>
    </div>

    <ProductShowcase variant="site" />
    <PracticeAreas />
    <QuizCallout variant="site" />
    <TeamSection />
    <GoogleReviewsSection />
    <BlogSection />
    <ContactSection />
  </main>

  <FooterSection />

  <AccessibilityMenu />
</template>
