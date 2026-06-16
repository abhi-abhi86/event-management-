// Initialize Icons
lucide.createIcons();
const userRole = localStorage.getItem('userRole');
const userEmail = localStorage.getItem('userEmail');

// Application State
const STORAGE_KEY = 'eventflow_volunteers';
let volunteers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'Registration Desk', status: 'Approved' },
    { id: '2', name: 'Bob Johnson', email: 'bob@example.com', role: 'Crowd Control', status: 'Pending' },
    { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Stage Hand', status: 'Rejected' },
    { id: '4', name: 'Diana Evans', email: 'diana@example.com', role: 'Runner', status: 'Approved' },
    { id: '5', name: 'Ethan Ford', email: 'ethan@example.com', role: 'Technical Support', status: 'Approved' },
    { id: '6', name: 'Fiona Garcia', email: 'fiona@example.com', role: 'Usher', status: 'Pending' },
    { id: '7', name: 'George Harris', email: 'george@example.com', role: 'First Aid', status: 'Approved' },
    { id: '8', name: 'Hannah Irving', email: 'hannah@example.com', role: 'Information Booth', status: 'Approved' },
    { id: '9', name: 'Ian Jones', email: 'ian@example.com', role: 'Parking Attendant', status: 'Pending' },
    { id: '10', name: 'Julia King', email: 'julia@example.com', role: 'VIP Escort', status: 'Approved' },
    { id: '11', name: 'Kevin Lee', email: 'kevin@example.com', role: 'Registration Desk', status: 'Pending' },
    { id: '12', name: 'Laura Miller', email: 'laura@example.com', role: 'Crowd Control', status: 'Approved' },
    { id: '13', name: 'Mike Nelson', email: 'mike@example.com', role: 'Stage Hand', status: 'Approved' },
    { id: '14', name: 'Nina Owen', email: 'nina@example.com', role: 'Runner', status: 'Rejected' },
    { id: '15', name: 'Oscar Perez', email: 'oscar@example.com', role: 'Technical Support', status: 'Approved' },
    { id: '16', name: 'Paula Quinn', email: 'paula@example.com', role: 'Usher', status: 'Pending' },
    { id: '17', name: 'Quinn Roberts', email: 'quinn@example.com', role: 'First Aid', status: 'Approved' },
    { id: '18', name: 'Rachel Scott', email: 'rachel@example.com', role: 'Information Booth', status: 'Pending' },
    { id: '19', name: 'Sam Taylor', email: 'sam@example.com', role: 'Parking Attendant', status: 'Approved' },
    { id: '20', name: 'Tina Underwood', email: 'tina@example.com', role: 'VIP Escort', status: 'Approved' },
    { id: '21', name: 'Umar Vargas', email: 'umar@example.com', role: 'Registration Desk', status: 'Rejected' },
    { id: '22', name: 'Victor White', email: 'victor@example.com', role: 'Crowd Control', status: 'Approved' },
    { id: '23', name: 'Wendy Xavier', email: 'wendy@example.com', role: 'Stage Hand', status: 'Pending' },
    { id: '24', name: 'Xavier Young', email: 'xavier@example.com', role: 'Runner', status: 'Approved' },
    { id: '25', name: 'Yara Zane', email: 'yara@example.com', role: 'Technical Support', status: 'Pending' },
    { id: '26', name: 'Zack Adams', email: 'zack@example.com', role: 'Usher', status: 'Approved' },
    { id: '27', name: 'Amy Baker', email: 'amy@example.com', role: 'First Aid', status: 'Rejected' },
    { id: '28', name: 'Brian Clark', email: 'brian@example.com', role: 'Information Booth', status: 'Approved' },
    { id: '29', name: 'Chloe Diaz', email: 'chloe@example.com', role: 'Parking Attendant', status: 'Pending' },
    { id: '30', name: 'Daniel Ellis', email: 'daniel@example.com', role: 'VIP Escort', status: 'Approved' }
];

const getVisibleVolunteers = () => {
    if (userRole === 'admin') {
        return volunteers;
    }
    return volunteers.filter(v => v.email === userEmail);
};

// Save state to localStorage
const saveState = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(volunteers));
    updateDashboard();
};

// Toast Notification System
const showToast = (message, type = 'success') => {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');

    const bgColor = type === 'success' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200';
    const iconColor = type === 'success' ? 'text-emerald-500' : 'text-red-500';
    const iconName = type === 'success' ? 'check-circle' : 'x-circle';

    toast.className = `flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg pointer-events-auto ${bgColor} toast-enter`;
    toast.innerHTML = `
        <i data-lucide="${iconName}" class="w-5 h-5 ${iconColor}"></i>
        <p class="text-sm font-medium text-slate-800">${message}</p>
    `;

    container.appendChild(toast);
    lucide.createIcons({ root: toast });

    requestAnimationFrame(() => {
        toast.classList.remove('toast-enter');
        toast.classList.add('toast-enter-active');
    });

    setTimeout(() => {
        toast.classList.remove('toast-enter-active');
        toast.classList.add('toast-exit-active');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Modal Logic
const openModal = (id) => {
    const modal = document.getElementById(id);
    const content = modal.firstElementChild;
    modal.classList.remove('hidden');
    void modal.offsetWidth;
    modal.classList.remove('opacity-0');
    content.classList.remove('scale-95');
};

const closeModal = (id) => {
    const modal = document.getElementById(id);
    const content = modal.firstElementChild;
    modal.classList.add('opacity-0');
    content.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
};

// Close Modals on click outside
window.addEventListener('click', (event) => {
    if (event.target.id === 'registerModal') closeModal('registerModal');
    if (event.target.id === 'confirmModal') closeModal('confirmModal');
});

// Action Handlers
let itemToDelete = null;

const requestDelete = (id) => {
    itemToDelete = id;
    openModal('confirmModal');
};

const updateStatus = (id, newStatus) => {
    const vIndex = volunteers.findIndex(v => v.id === id);
    if (vIndex > -1) {
        volunteers[vIndex].status = newStatus;
        saveState();
        const actionText = newStatus === 'Approved' ? 'approved' : 'rejected';
        showToast(`Volunteer ${actionText}.`);
    }
};

// Event Delegation for dynamically generated Table Buttons
document.getElementById('volunteerTableBody').addEventListener('click', (e) => {
    if (userRole !== 'admin') return; // Extra layer of protection

    const target = e.target.closest('button');
    if (!target) return;

    const id = target.dataset.id;
    const action = target.dataset.action;

    if (action === 'approve') updateStatus(id, 'Approved');
    if (action === 'reject') updateStatus(id, 'Rejected');
    if (action === 'delete') requestDelete(id);
});

// Static Event Listeners
document.getElementById('exportCsvBtn').addEventListener('click', () => {
    if (volunteers.length === 0) {
        showToast('No data to export', 'error');
        return;
    }
    const headers = ['Name', 'Email', 'Role', 'Status'];
    const csvRows = [headers.join(',')];
    volunteers.forEach(v => {
        csvRows.push([`"${v.name}"`, `"${v.email}"`, `"${v.role}"`, `"${v.status}"`].join(','));
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'volunteers_export.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('CSV downloaded successfully');
});

document.getElementById('openRegisterModalBtn').addEventListener('click', () => openModal('registerModal'));
document.getElementById('closeRegisterModalBtn1').addEventListener('click', () => closeModal('registerModal'));
document.getElementById('closeRegisterModalBtn2').addEventListener('click', () => closeModal('registerModal'));
document.getElementById('closeConfirmModalBtn').addEventListener('click', () => closeModal('confirmModal'));

document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (itemToDelete) {
        volunteers = volunteers.filter(v => v.id !== itemToDelete);
        saveState();
        showToast('Volunteer removed successfully.');
        closeModal('confirmModal');
        itemToDelete = null;
    }
});

// Form Handling
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('volName').value.trim();
    const email = document.getElementById('volEmail').value.trim();
    const role = document.getElementById('volRole').value;

    if (name && email && role) {
        volunteers.unshift({
            id: Date.now().toString(),
            name,
            email,
            role,
            status: 'Pending'
        });
        saveState();
        showToast('Volunteer registered successfully.');
        closeModal('registerModal');
        e.target.reset();
    }
});

// Rendering Engine
const renderTable = () => {
        const tbody = document.getElementById('volunteerTableBody');
        const emptyState = document.getElementById('emptyState');
        const search = document.getElementById('searchInput').value.toLowerCase();
        const filter = document.getElementById('statusFilter').value;

        tbody.innerHTML = '';

        const visible = getVisibleVolunteers();
        const filtered = visible.filter(v => {
            const matchesSearch = v.name.toLowerCase().includes(search) || v.email.toLowerCase().includes(search);
            const matchesFilter = filter === 'All' || v.status === filter;
            return matchesSearch && matchesFilter;
        });

        if (filtered.length === 0) {
            tbody.parentElement.classList.add('hidden');
            emptyState.classList.remove('hidden');
            emptyState.classList.add('flex');
            return;
        }

        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');
        tbody.parentElement.classList.remove('hidden');

        filtered.forEach(v => {
                    const tr = document.createElement('tr');

                    // Highlight the logged-in user's row
                    const isCurrentUser = userRole === 'volunteer' && v.email === userEmail;
                    tr.className = isCurrentUser ? 'bg-indigo-50/60 hover:bg-indigo-100/50 transition group' : 'hover:bg-slate-50 transition group';

                    let statusClass = '';
                    if (v.status === 'Approved') statusClass = 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
                    else if (v.status === 'Pending') statusClass = 'bg-amber-50 text-amber-700 ring-amber-600/20';
                    else statusClass = 'bg-red-50 text-red-700 ring-red-600/20';

                    tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                        ${v.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div class="font-medium text-slate-900">${v.name} ${isCurrentUser ? '<span class="ml-2 inline-flex items-center rounded-full bg-indigo-200 px-2 py-0.5 text-[10px] font-bold text-indigo-800 uppercase tracking-wide">You</span>' : ''}</div>
                        <div class="text-xs text-slate-500">${v.email}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-slate-700">${v.role}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusClass}">
                    ${v.status}
                </span>
            </td>
            ${userRole === 'admin' ? `
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end gap-2">
                        ${v.status === 'Pending' ? `
                            <button data-action="approve" data-id="${v.id}" class="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition" title="Approve">
                                <i data-lucide="check" class="w-4 h-4"></i>
                            </button>
                            <button data-action="reject" data-id="${v.id}" class="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition" title="Reject">
                                <i data-lucide="x" class="w-4 h-4"></i>
                            </button>
                        ` : ''}
                        <button data-action="delete" data-id="${v.id}" class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </td>
            ` : ''}
        `;
        tbody.appendChild(tr);
    });
    
    lucide.createIcons({ root: tbody });
};

document.getElementById('searchInput').addEventListener('input', renderTable);
document.getElementById('statusFilter').addEventListener('change', renderTable);

// Theme Switcher for Dashboard
const themeToggle = document.getElementById('themeToggle');
const themeToggleIcon = document.getElementById('themeToggleIcon');
if (themeToggle && themeToggleIcon) {
    const updateThemeIcon = (theme) => {
        if (theme === 'dark') {
            themeToggleIcon.setAttribute('data-lucide', 'sun');
        } else {
            themeToggleIcon.setAttribute('data-lucide', 'moon');
        }
        if (window.lucide) lucide.createIcons({ root: themeToggle });
    };

    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        const newTheme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Update charts color dynamically
        if (statusChartInstance && trendChartInstance) {
            const color = newTheme === 'dark' ? '#94a3b8' : '#475569';
            statusChartInstance.options.plugins.legend.labels.color = color;
            trendChartInstance.options.scales.y.ticks.color = color;
            trendChartInstance.options.scales.x.ticks.color = color;
            trendChartInstance.options.scales.y.grid.color = newTheme === 'dark' ? '#334155' : '#e2e8f0';
            statusChartInstance.update();
            trendChartInstance.update();
        }
    });
}

// Chart.js Instances
let statusChartInstance = null;
let trendChartInstance = null;

const renderCharts = () => {
    const statusCanvas = document.getElementById('statusChart');
    const trendCanvas = document.getElementById('trendChart');
    if (!statusCanvas || !trendCanvas) return;

    const visible = getVisibleVolunteers();
    const approvedCount = visible.filter(v => v.status === 'Approved').length;
    const pendingCount = visible.filter(v => v.status === 'Pending').length;
    const rejectedCount = visible.filter(v => v.status === 'Rejected').length;

    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const textColor = currentTheme === 'dark' ? '#94a3b8' : '#475569';

    // 1. Doughnut Chart
    if (statusChartInstance) {
        statusChartInstance.data.datasets[0].data = [approvedCount, pendingCount, rejectedCount];
        statusChartInstance.update();
    } else {
        statusChartInstance = new Chart(statusCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Approved', 'Pending', 'Rejected'],
                datasets: [{
                    data: [approvedCount, pendingCount, rejectedCount],
                    backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: textColor,
                            font: { family: 'Inter', size: 12 }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }

    // 2. Trend Bar Chart
    const roles = [...new Set(visible.map(v => v.role))].slice(0, 5);
    const countsByRole = roles.map(r => visible.filter(v => v.role === r).length);

    if (trendChartInstance) {
        trendChartInstance.data.labels = roles;
        trendChartInstance.data.datasets[0].data = countsByRole;
        trendChartInstance.update();
    } else {
        trendChartInstance = new Chart(trendCanvas, {
            type: 'bar',
            data: {
                labels: roles,
                datasets: [{
                    label: 'Registrations',
                    data: countsByRole,
                    backgroundColor: '#6366f1',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: currentTheme === 'dark' ? '#334155' : '#e2e8f0' },
                        ticks: { color: textColor }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: textColor }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
};

const renderVolunteerGamification = () => {
    const container = document.getElementById('dashboardAnalyticsContainer');
    if (!container) return;

    const visible = getVisibleVolunteers();
    const approvedCount = visible.filter(v => v.status === 'Approved').length;
    const pendingCount = visible.filter(v => v.status === 'Pending').length;

    const impactScore = (approvedCount * 50) + (pendingCount * 10);
    const targetScore = 200;
    const percent = Math.min(Math.round((impactScore / targetScore) * 100), 100);
    const dashoffset = 251.2 - (251.2 * percent) / 100;

    const badge = impactScore >= 150 ? 'Gold Star' : (impactScore >= 50 ? 'Silver Helper' : 'Bronze Volunteer');
    const badgeColor = impactScore >= 150 ? 'text-amber-500' : (impactScore >= 50 ? 'text-slate-400' : 'text-amber-700');

    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Card 1: Impact Ring -->
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col md:flex-row items-center gap-6 h-auto md:h-[180px] transition-colors">
                <div class="relative w-24 h-24 shrink-0 flex items-center justify-center">
                    <svg class="w-full h-full transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="#f1f5f9" stroke-width="8" fill="transparent" class="stroke-slate-100 dark:stroke-slate-700" />
                        <circle cx="48" cy="48" r="40" stroke="#6366f1" stroke-width="8" fill="transparent" 
                            stroke-dasharray="251.2" stroke-dashoffset="${dashoffset}" stroke-linecap="round" />
                    </svg>
                    <span class="absolute text-xl font-bold text-slate-800 dark:text-white">${percent}%</span>
                </div>
                <div class="flex-grow text-center md:text-left">
                    <span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Level Progress</span>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mt-1">Community Impact Score</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">You have earned <span class="font-semibold text-indigo-600 dark:text-indigo-400">${impactScore}</span> impact points. Reach 200 points to level up!</p>
                </div>
            </div>

            <!-- Card 2: Volunteer Badges -->
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex items-center gap-6 h-auto md:h-[180px] transition-colors">
                <div class="w-16 h-16 rounded-full bg-indigo-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0">
                    <i data-lucide="award" class="w-8 h-8 ${badgeColor}"></i>
                </div>
                <div>
                    <span class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Current Rank</span>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mt-1">${badge} Badge</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">Rank is determined by approved shifts and registrations. Keep making a difference!</p>
                </div>
            </div>
        </div>
    `;

    if (window.lucide) lucide.createIcons({ root: container });
};

const initializeAnalyticsContainer = () => {
    const container = document.getElementById('dashboardAnalyticsContainer');
    if (!container) return;

    if (userRole === 'admin') {
        container.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Chart 1 Card -->
                <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col h-[320px] transition-colors">
                    <h3 class="text-sm font-semibold text-slate-900 dark:text-white mb-4">Registration Status Distribution</h3>
                    <div class="relative flex-grow flex items-center justify-center min-h-0">
                        <canvas id="statusChart"></canvas>
                    </div>
                </div>
                <!-- Chart 2 Card -->
                <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col h-[320px] transition-colors">
                    <h3 class="text-sm font-semibold text-slate-900 dark:text-white mb-4">Registration Trend Overview</h3>
                    <div class="relative flex-grow min-h-0">
                        <canvas id="trendChart"></canvas>
                    </div>
                </div>
            </div>
        `;
        renderCharts();
    } else {
        renderVolunteerGamification();
    }
};

const updateDashboard = () => {
    const visible = getVisibleVolunteers();
    document.getElementById('stat-total').innerText = visible.length;
    document.getElementById('stat-pending').innerText = visible.filter(v => v.status === 'Pending').length;
    document.getElementById('stat-active').innerText = visible.filter(v => v.status === 'Approved').length;
    
    // Update stats labels for volunteers dynamically
    if (userRole !== 'admin') {
        const totalLabel = document.getElementById('stat-total-label');
        if (totalLabel) totalLabel.innerText = 'My Registrations';
        const pendingLabel = document.getElementById('stat-pending-label');
        if (pendingLabel) pendingLabel.innerText = 'My Pending';
        const activeLabel = document.getElementById('stat-active-label');
        if (activeLabel) activeLabel.innerText = 'My Approved';
    }
    
    initializeAnalyticsContainer();
    renderTable();
};

// Initial Load
updateDashboard();