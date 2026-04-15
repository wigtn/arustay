import { setRequestLocale } from 'next-intl/server';
import Nav from '@/components/Nav';
import FloatingCTA from '@/components/FloatingCTA';
import About from './sections/About';
import Rooms from './sections/Rooms';
import LongStay from './sections/LongStay';
import Facilities from './sections/Facilities';
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
      <About />
      <Rooms />
      <LongStay />
      <Facilities />
      <Location />
      <GuestNotes />
      <Faq />
      <Booking />
      <FloatingCTA />
    </main>
  );
}
