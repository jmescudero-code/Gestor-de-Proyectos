'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderKanban, ListTodo, LogOut } from 'lucide-react';
import styles from './Sidebar.module.css';
import { supabase } from '@/lib/supabase';

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Error al intentar cerrar sesión en Supabase (modo placeholder):', err);
    }
    window.location.href = '/login';
  };

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Proyectos', href: '/dashboard/projects', icon: FolderKanban },
    { name: 'Gantt', href: '/dashboard/gantt', icon: ListTodo },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <div style={{width: 24, height: 24, backgroundColor: 'var(--color-light-blue)', borderRadius: 4, transform: 'rotate(45deg)'}}></div>
          GrupaMar
        </div>
      </div>
      
      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>U</div>
          <div style={{flex: 1, overflow: 'hidden'}}>
            <div style={{fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>Usuario Demo</div>
            <div style={{fontSize: '0.75rem', color: '#666', cursor: 'pointer'}} onClick={handleLogout}>
              Cerrar sesión
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
