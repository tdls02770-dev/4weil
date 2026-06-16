import { getSearchParamsWithLocation, FiveParyer } from "./prayertiming_model.js";
import { fajr,Dhuhr,Asr,Maghrib,Isha } from "./translate.js";
import { timeleft } from "./translate.js";

export async function PrayersTime() {
    const params = await getSearchParamsWithLocation();
    const prayer_timings = await FiveParyer(params);
    
    // تشغيل دالة العد التنازلي بعد تحميل الواجهة مباشرة
    setTimeout(() => {
        startPrayerCountdown();
    }, 100);

    return `
    <div class="page">
        <div class="countdown-section">
            <span id="next-prayer-label">جاري حساب الصلاة القادمة...</span>
            <span id="countdown-timer">00:00:00</span>
        </div>

        <div class="prayers-container">
            <div class="prayer-card">
                <span class="prayer-name">${fajr.get()}</span>
                <span class="prayer-time" id="time-0">${prayer_timings[0]}</span>
            </div>

            <div class="prayer-card">
                <span class="prayer-name">${Dhuhr.get()}</span>
                <span class="prayer-time" id="time-1">${prayer_timings[1]}</span>
            </div>

            <div class="prayer-card">
                <span class="prayer-name">${Asr.get()}</span>
                <span class="prayer-time" id="time-2">${prayer_timings[2]}</span>
            </div>

            <div class="prayer-card">
                <span class="prayer-name">${Maghrib.get()}</span>
                <span class="prayer-time" id="time-3">${prayer_timings[3]}</span>
            </div>

            <div class="prayer-card">
                <span class="prayer-name">${Isha.get()}</span>
                <span class="prayer-time" id="time-4">${prayer_timings[4]}</span>
            </div>
        </div>
    </div>
    `;
}

function startPrayerCountdown() {
    const prayerNames = ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"];
    
    // جلب الأوقات المكتوبة في الكروت
    const prayerTimes = Array.from({length: 5}, (_, i) => {
        const timeText = document.getElementById(`time-${i}`)?.innerText || "00:00";
        // تنظيف النص من أي مسافات زائدة
        return timeText.replace(/\s+/g, ''); 
    });

    function updateTimer() {
        const now = new Date();
        let nextPrayerIndex = -1;
        let nextPrayerTime = null;

        // تحويل مواقيت الصلوات اليوم إلى كائنات Date لليوم الحالي
        const targetDates = prayerTimes.map(timeStr => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            const date = new Date(now);
            date.setHours(hours, minutes, 0, 0);
            return date;
        });

        // البحث عن الصلاة القادمة المتبقية اليوم
        for (let i = 0; i < 5; i++) {
            if (targetDates[i] > now) {
                nextPrayerIndex = i;
                nextPrayerTime = targetDates[i];
                break;
            }
        }

        // إذا انتهت صلوات اليوم، الصلاة القادمة هي فجر الغد
        if (nextPrayerIndex === -1) {
            nextPrayerIndex = 0;
            const [hours, minutes] = prayerTimes[0].split(':').map(Number);
            nextPrayerTime = new Date(now);
            nextPrayerTime.setDate(now.getDate() + 1); // إضافة يوم
            nextPrayerTime.setHours(hours, minutes, 0, 0);
        }

        // حساب فارق التوقيت بالملي ثانية
        const diff = nextPrayerTime - now;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // تنسيق الأرقام لتظهر دائماً من خانتين (مثال: 05 بدلاً من 5)
        const format = (num) => String(num).padStart(2, '0');

        // تحديث النصوص في الواجهة
        const labelEl = document.getElementById("next-prayer-label");
        const timerEl = document.getElementById("countdown-timer");

        if (labelEl && timerEl) {
            labelEl.innerText = `${timeleft.value()} ${prayerNames[nextPrayerIndex]}`;
            timerEl.innerText = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
        }
    }

    // تحديث فوري ثم تكرار كل ثانية
    updateTimer();
    setInterval(updateTimer, 1000);
}