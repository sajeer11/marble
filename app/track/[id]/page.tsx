import TrackShipment from '@/components/Profile/TrackShipment';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: 'Track Order | MarbleLux',
  description: 'Track your MarbleLux order',
};

export default async function Track({ params }: Props) {
  const { id } = await params;
  return <TrackShipment />;
}
