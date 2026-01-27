import { Link } from '@/i18n/routing';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <div className="space-y-6">
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
                    Página no encontrada
                </h2>
                <p className="mx-auto max-w-md text-muted-foreground">
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Button asChild>
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Ir al inicio
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/contacto">
                            Contactar
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
