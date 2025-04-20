class PayrollCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedMonth = this.currentDate.getMonth();
        this.selectedYear = this.currentDate.getFullYear();
        this.initializeCalendar();
    }

    initializeCalendar() {
        this.setupEventListeners();
        this.renderCalendar();
    }

    setupEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.selectedMonth--;
            if (this.selectedMonth < 0) {
                this.selectedMonth = 11;
                this.selectedYear--;
            }
            this.renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.selectedMonth++;
            if (this.selectedMonth > 11) {
                this.selectedMonth = 0;
                this.selectedYear++;
            }
            this.renderCalendar();
        });
    }

    isPayday(day) {
        return day === 15 || day === 30 || (day === this.getDaysInMonth() && this.getDaysInMonth() < 30);
    }

    isCutoff(day) {
        return day === 15 || day === this.getDaysInMonth();
    }

    getDaysInMonth() {
        return new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    }

    renderCalendar() {
        const monthYear = document.getElementById('monthYear');
        const calendar = document.getElementById('calendar');
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];

        monthYear.textContent = `${months[this.selectedMonth]} ${this.selectedYear}`;
        calendar.innerHTML = '';

        const firstDay = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
        const daysInMonth = this.getDaysInMonth();

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            calendar.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const currentDate = new Date(this.selectedYear, this.selectedMonth, day);
            const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

            if (isWeekend) {
                dayElement.classList.add('weekend');
            }
            if (this.isPayday(day)) {
                dayElement.classList.add('payday');
            }
            if (this.isCutoff(day)) {
                dayElement.classList.add('cutoff');
            }

            // Check if it's today
            const today = new Date();
            if (today.getDate() === day && 
                today.getMonth() === this.selectedMonth && 
                today.getFullYear() === this.selectedYear) {
                dayElement.classList.add('today');
            }

            dayElement.innerHTML = `
                <div>${day}</div>
                ${this.isPayday(day) ? '<div style="font-size: 0.8em; color: green;">Payday</div>' : ''}
                ${this.isCutoff(day) ? '<div style="font-size: 0.8em; color: blue;">Cut-off</div>' : ''}
            `;

            calendar.appendChild(dayElement);
        }
    }
}

// Initialize the calendar when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PayrollCalendar();
});
