import { redirect } from 'next/navigation';

export default function Dashboard() {
    // Přesměrování na Portfolio (nyní výchozí stránka dashboardu)
    redirect('/dashboard/portfolio');
}