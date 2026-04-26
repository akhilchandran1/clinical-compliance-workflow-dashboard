import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import StudiesView from '../views/StudiesView.vue'
import StudyDetailsView from '../views/StudyDetailsView.vue'
import DocumentsView from '../views/DocumentsView.vue'
import ReviewQueueView from '../views/ReviewQueueView.vue'
import AuditTrailView from '../views/AuditTrailView.vue'
import ComplianceAlertsView from '../views/ComplianceAlertsView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'welcome', component: WelcomeView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView },
    { path: '/studies', name: 'studies', component: StudiesView },
    { path: '/studies/:id', name: 'study-details', component: StudyDetailsView },
    { path: '/documents', name: 'documents', component: DocumentsView },
    { path: '/review-queue', name: 'review-queue', component: ReviewQueueView },
    { path: '/audit-trail', name: 'audit-trail', component: AuditTrailView },
    { path: '/compliance-alerts', name: 'compliance-alerts', component: ComplianceAlertsView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

export default router
