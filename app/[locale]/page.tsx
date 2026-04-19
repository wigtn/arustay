import { setRequestLocale } from 'next-intl/server';
import Nav from '@/components/Nav';
import FloatingCTA from '@/components/FloatingCTA';
import Hero from './sections/Hero';
import About from './sections/About';
import Rooms from './sections/Rooms';
import Facilities from './sections/Facilities';
import LongStay from './sections/LongStay';
import Location from './sections/Location';
import GuestNotes from './sections/GuestNotes';
import Faq from './sections/Faq';
import Booking from './sections/Booking';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Rooms />
      <Facilities />
      <LongStay />
      <Location />
      <GuestNotes />
      <Faq />
      <Booking />
      <FloatingCTA />
    </main>
  );
}
