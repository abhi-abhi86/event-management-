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

        const filtered = volunteers.filter(v => {
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

const updateDashboard = () => {
    document.getElementById('stat-total').innerText = volunteers.length;
    document.getElementById('stat-pending').innerText = volunteers.filter(v => v.status === 'Pending').length;
    document.getElementById('stat-active').innerText = volunteers.filter(v => v.status === 'Approved').length;
    renderTable();
};

// Initial Load
updateDashboard();