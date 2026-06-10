import { Card, CardContent } from '@/components/ui/Card';
import styles from './page.module.css';

export default function DashboardPage() {
  // Datos mock para el MVP
  const stats = [
    { label: 'Proyectos Activos', value: '12' },
    { label: 'Acciones en curso', value: '34' },
    { label: 'Subtareas de esta semana', value: '89' },
    { label: 'Completadas (30 días)', value: '156' },
  ];

  return (
    <div>
      <div className={styles.grid}>
        {stats.map((stat, i) => (
          <Card key={i} className={styles.statCard}>
            <CardContent>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className={styles.recentSection}>
        <h2>Actividad Reciente</h2>
        <Card>
          <CardContent>
            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
              Los avances recientes aparecerán aquí una vez que se conecte con la base de datos de Supabase.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
