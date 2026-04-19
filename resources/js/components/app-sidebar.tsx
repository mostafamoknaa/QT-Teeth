import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    FileText,
    FolderGit2,
    HeartPulse,
    LayoutGrid,
    MessageSquare,
    Users,
    CalendarCheck,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { useTranslations } from '@/hooks/use-translations';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { t } = useTranslations();
    const { locale } = usePage().props;

    const mainNavItems: NavItem[] = [
        {
            title: t('admin.dashboard'),
            href: '/admin/dashboard',
            icon: LayoutGrid,
        },
        {
            title: t('admin.users'),
            href: '/admin/users',
            icon: Users,
        },
        {
            title: t('admin.articles'),
            href: '/admin/articles',
            icon: FileText,
        },
        {
            title: t('admin.doctors'),
            href: '/admin/doctors',
            icon: Users,
        },
        {
            title: t('admin.testimonials'),
            href: '/admin/testimonials',
            icon: MessageSquare,
        },
        {
            title: t('admin.services'),
            href: '/admin/services',
            icon: HeartPulse,
        },
        {
            title: t('admin.appointments'),
            href: '/admin/appointments',
            icon: CalendarCheck,
        },
    ];

    const footerNavItems: NavItem[] = [];
    return (
        <Sidebar collapsible="icon" variant="inset" side={locale === 'ar' ? 'right' : 'left'}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
