// ===== Navigation Mobile Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// ปิดเมนูเมื่อคลิกลิงก์
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Active Link on Scroll =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Number Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateCounter();
};

// Intersection Observer สำหรับ counter
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(animateCounter);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // ปิดอันอื่นก่อน
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle อันที่คลิก
        item.classList.toggle('active');
    });
});

// ===== Supabase Setup =====
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
    'https://jcomkijbdmeyffekfarg.supabase.co/rest/v1/',       // 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impjb21raWpiZG1leWZmZWtmYXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MTM2OTMsImV4cCI6MjA5MzE4OTY5M30.Rmy2E3a36qFZKsqKEMlrIK9uKPdx8dmnN0m7IJ1tquU'   // 
)

// ===== Form Submission =====
const feedbackForm = document.getElementById('feedbackForm');
const successModal = document.getElementById('successModal');

feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        student_id: document.getElementById('studentId').value,
        faculty: document.getElementById('faculty').value,
        category: document.getElementById('category').value,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        email: document.getElementById('email').value,
        anonymous: document.getElementById('anonymous').checked,
        status: 'pending'
    }

    // บันทึกลง Supabase
    const { error } = await supabase
        .from('submissions')
        .insert([formData])

    if (error) {
        alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        console.error(error)
        return
    }

    // แสดง Modal สำเร็จ
    const trackingCode = `VCE-2024-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`
    document.querySelector('.tracking-display').textContent = trackingCode
    successModal.classList.add('show')
    feedbackForm.reset()
});

function closeModal() {
    successModal.classList.remove('show');
}

// ปิด Modal เมื่อคลิกข้างนอก
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeModal();
    }
});

// ===== Smooth Scroll for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
