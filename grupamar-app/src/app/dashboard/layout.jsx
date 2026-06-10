import Sidebar from '@/components/layout/Sidebar';
import styles from './layout.module.css';

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Gestor de Proyectos</h1>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
